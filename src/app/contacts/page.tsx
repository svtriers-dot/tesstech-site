import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { company } from '@/data/content';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с Tess Technology — обсудим вашу аналитическую задачу.',
};

const contactInfo = [
  {
    icon: Phone,
    label: 'Телефон',
    value: company.phone,
    href: `tel:${company.phone.replace(/\s/g, '')}`,
  },
  {
    icon: Mail,
    label: 'Email',
    value: company.email,
    href: `mailto:${company.email}`,
  },
  {
    icon: MapPin,
    label: 'Адрес',
    value: company.address,
    href: null,
  },
  {
    icon: Clock,
    label: 'Режим работы',
    value: 'Пн–Пт: 9:00–18:00',
    href: null,
  },
];

export default function ContactsPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/8 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6">
              Контакты
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Обсудим вашу задачу
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed">
              Расскажите о проекте — мы изучим его и предложим оптимальный подход.
              Если задача нам не по силам, честно скажем об этом.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: contact info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Контактная информация</h2>

              <div className="space-y-4 mb-10">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-start gap-4 p-5 rounded-xl border border-[#2A2A3E] bg-[#0F0F1A] hover:border-indigo-500/30 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-indigo-400" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-0.5">{item.label}</div>
                        <div className="text-white font-medium">{item.value}</div>
                      </div>
                    </div>
                  );
                  return item.href ? (
                    <a key={item.label} href={item.href}>
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  );
                })}
              </div>

              {/* Note */}
              <div className="p-5 rounded-xl border border-[#2A2A3E] bg-indigo-600/5">
                <p className="text-sm text-gray-400 leading-relaxed">
                  <span className="text-indigo-400 font-medium">Важно:</span> Мы не берёмся за
                  все проекты. Сначала изучаем задачу и только потом решаем, сможем ли дать
                  реальный результат. Это в ваших интересах.
                </p>
              </div>
            </div>

            {/* Right: form */}
            <div className="p-6 lg:p-8 rounded-2xl border border-[#2A2A3E] bg-[#0F0F1A]">
              <h2 className="text-2xl font-bold text-white mb-6">Оставить заявку</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
