import type { Metadata } from 'next';
import Link from 'next/link';
import { Brain, Database, Compass, BarChart2, Zap, ArrowRight } from 'lucide-react';
import { services } from '@/data/content';

export const metadata: Metadata = {
  title: 'Продукты',
  description:
    'Анализ технологических рынков, операционная эффективность, матмоделирование и ML — продукты Tess Technology.',
};

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  chart: BarChart2,
  zap: Zap,
  brain: Brain,
  database: Database,
  compass: Compass,
};

export default function ServicesPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/8 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6">
            Наши услуги
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Что мы делаем
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Берёмся за аналитические задачи, недоступные классическим методам — там, где нужна математика, данные и ИИ
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Brain;
            return (
              <div
                key={service.slug}
                className="group relative overflow-hidden rounded-2xl border border-[#2A2A3E] bg-[#0F0F1A] hover:border-indigo-500/40 transition-all duration-300 p-8 lg:p-10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left: title and desc */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
                        <Icon size={22} className="text-indigo-400" />
                      </div>
                      <span className="text-xs font-mono text-indigo-500/50">0{index + 1}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">{service.title}</h2>
                    <p className="text-gray-400 leading-relaxed mb-4">{service.fullDescription}</p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors group/link"
                    >
                      Подробнее об услуге
                      <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Right: features + results */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Что включает
                      </h3>
                      <ul className="space-y-2">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 border-t border-[#2A2A3E]">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Результаты
                      </h3>
                      <ul className="space-y-2">
                        {service.results.map((r) => (
                          <li key={r} className="flex items-start gap-2 text-sm text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Не нашли нужную услугу?
          </h2>
          <p className="text-gray-400 mb-8">
            Свяжитесь с нами — обсудим вашу задачу и предложим оптимальный подход
          </p>
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/25"
          >
            Обсудить задачу <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
