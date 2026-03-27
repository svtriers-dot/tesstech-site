import { NextResponse } from 'next/server';
import { z } from 'zod';

// ─── Rate Limiter ────────────────────────────────────────────────────────────
// Простой in-memory лимитер: не более 5 запросов с одного IP за 10 минут.
// Для multi-instance деплоя замените на Redis (Upstash и т.п.).
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 минут

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

// Периодическая очистка устаревших записей (раз в 15 минут)
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 15 * 60 * 1000);

// ─── Validation Schema ───────────────────────────────────────────────────────
const schema = z.object({
  name:     z.string().min(2, 'Введите имя').max(100, 'Имя слишком длинное'),
  email:    z.string().email('Некорректный email').max(254, 'Email слишком длинный'),
  phone:    z.string().max(30, 'Телефон слишком длинный').optional(),
  company:  z.string().max(200, 'Название компании слишком длинное').optional(),
  message:  z.string().min(10, 'Сообщение слишком короткое').max(2000, 'Сообщение слишком длинное'),
  // Honeypot: должно быть пустым — боты заполняют автоматически
  _honey:   z.string().max(0, 'Bot detected').optional(),
});

// ─── Email via Resend ────────────────────────────────────────────────────────
// Добавьте RESEND_API_KEY и CONTACT_EMAIL в .env.local
// RESEND_API_KEY=re_xxxxxxxxxxxx
// CONTACT_EMAIL=info@tesstech.ru
async function sendEmail(data: Omit<z.infer<typeof schema>, '_honey'>) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !toEmail) {
    console.warn(
      '[contact] Email не отправлен: не заданы RESEND_API_KEY и/или CONTACT_EMAIL в .env.local'
    );
    return;
  }

  const html = `
    <h2>Новая заявка с сайта tesstech.ru</h2>
    <table cellpadding="8" style="border-collapse:collapse">
      <tr><td><b>Имя</b></td><td>${data.name}</td></tr>
      <tr><td><b>Email</b></td><td>${data.email}</td></tr>
      ${data.phone   ? `<tr><td><b>Телефон</b></td><td>${data.phone}</td></tr>` : ''}
      ${data.company ? `<tr><td><b>Компания</b></td><td>${data.company}</td></tr>` : ''}
      <tr><td><b>Сообщение</b></td><td style="white-space:pre-wrap">${data.message}</td></tr>
    </table>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: 'no-reply@tesstech.ru',
      to: toEmail,
      subject: `Новая заявка от ${data.name}`,
      html,
      reply_to: data.email,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('[contact] Ошибка отправки email через Resend:', err);
    throw new Error('Email delivery failed');
  }
}

// ─── Handler ─────────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  // Определяем IP клиента
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  // Rate limiting
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: 'Слишком много запросов. Попробуйте через 10 минут.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const data = schema.parse(body);

    // Honeypot: если поле заполнено — тихо отвечаем успехом, не обрабатываем
    if (data._honey) {
      return NextResponse.json({ success: true });
    }

    const { _honey: _, ...emailData } = data;
    await sendEmail(emailData);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return NextResponse.json(
        { success: false, error: firstError?.message ?? 'Ошибка валидации' },
        { status: 400 }
      );
    }
    console.error('[contact] Внутренняя ошибка:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера. Попробуйте позже.' },
      { status: 500 }
    );
  }
}
