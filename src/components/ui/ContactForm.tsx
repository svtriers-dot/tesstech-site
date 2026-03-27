'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const schema = z.object({
  name:    z.string().min(2, 'Введите имя (минимум 2 символа)').max(100, 'Имя слишком длинное'),
  email:   z.string().email('Введите корректный email').max(254, 'Email слишком длинный'),
  phone:   z.string().max(30, 'Телефон слишком длинный').optional(),
  company: z.string().max(200, 'Название компании слишком длинное').optional(),
  message: z.string().min(10, 'Опишите задачу подробнее (минимум 10 символов)').max(2000, 'Сообщение слишком длинное (максимум 2000 символов)'),
  // Honeypot: поле-ловушка для ботов — должно оставаться пустым
  _honey:  z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const messageValue = watch('message') ?? '';

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
        reset();
      } else {
        setErrorMsg(json.error || 'Ошибка отправки');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Не удалось отправить. Проверьте соединение.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-14 h-14 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-4">
          <CheckCircle size={26} className="text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Заявка отправлена!</h3>
        <p className="text-gray-400 text-sm max-w-xs">
          Мы свяжемся с вами в ближайшее время для обсуждения вашей задачи.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/*
        Honeypot-поле: скрыто от пользователя визуально и через aria.
        Боты заполняют его автоматически — сервер отклоняет такие заявки.
      */}
      <div aria-hidden="true" style={{ display: 'none' }}>
        <label htmlFor="contact_website">Website</label>
        <input
          {...register('_honey')}
          id="contact_website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">
            Имя <span className="text-red-400">*</span>
          </label>
          <input
            {...register('name')}
            placeholder="Иван Иванов"
            maxLength={100}
            className="w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-[#2A2A3E] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/60 transition-colors"
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="ivan@company.ru"
            maxLength={254}
            className="w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-[#2A2A3E] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/60 transition-colors"
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Телефон</label>
          <input
            {...register('phone')}
            placeholder="+7 (900) 000-00-00"
            maxLength={30}
            className="w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-[#2A2A3E] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/60 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Компания</label>
          <input
            {...register('company')}
            placeholder="Название компании"
            maxLength={200}
            className="w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-[#2A2A3E] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/60 transition-colors"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm text-gray-400">
            Задача / вопрос <span className="text-red-400">*</span>
          </label>
          <span className={`text-xs ${messageValue.length > 1800 ? 'text-red-400' : 'text-gray-600'}`}>
            {messageValue.length}/2000
          </span>
        </div>
        <textarea
          {...register('message')}
          rows={5}
          maxLength={2000}
          placeholder="Опишите вашу задачу или вопрос..."
          className="w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-[#2A2A3E] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/60 transition-colors resize-none"
        />
        {errors.message && (
          <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle size={16} />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
      >
        {status === 'loading' ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Отправка...
          </>
        ) : (
          <>
            <Send size={16} />
            Отправить заявку
          </>
        )}
      </button>

      <p className="text-xs text-gray-600 text-center">
        Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных
      </p>
    </form>
  );
}
