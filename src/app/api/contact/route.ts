import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Введите имя'),
  email: z.string().email('Некорректный email'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'Сообщение слишком короткое'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    // Log to console (replace with email sending in production)
    console.log('New contact form submission:', data);

    // In production: send email via nodemailer or Resend API
    // await sendEmail({ to: 'info@tesstech.ru', ...data });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return NextResponse.json(
        { success: false, error: firstError?.message ?? 'Ошибка валидации' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера. Попробуйте позже.' },
      { status: 500 }
    );
  }
}
