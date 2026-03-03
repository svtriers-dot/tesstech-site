import type { Metadata } from 'next';
import Link from 'next/link';
import { company, stats, principles } from '@/data/content';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'О компании',
  description:
    'Tess Technology — 10+ лет на рынке аналитики, 300+ кейсов, команда международного уровня.',
};

export default function CompanyPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/8 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6">
              О нас
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {company.name}
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed">{company.tagline}</p>
          </div>
        </div>
      </section>

      {/* About block */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Кто мы</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  Tess Technology — аналитическая компания, работающая на стыке маркетинга и
                  экономического моделирования. Мы агрегируем собственные базы данных с
                  экономическими и статистическими показателями и применяем в аналитике
                  инструменты искусственного интеллекта.
                </p>
                <p>
                  {company.description}
                </p>
                <p>
                  Мы не берёмся за все проекты подряд — специализируемся на аналитике сложных
                  технологических продуктов и задачах, которые не решаются классическими
                  маркетинговыми способами.
                </p>
                <p>
                  Первыми в России провели исследование рынка Аппаратно-Программных Комплексов
                  для Искусственного Интеллекта, рассчитав объём и потенциал рынка как мировых,
                  так и отечественных производителей.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contacts"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-200"
                >
                  Связаться <ArrowRight size={16} />
                </Link>
                <Link
                  href="/company/requisites"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#2A2A3E] hover:border-indigo-500/40 text-gray-300 hover:text-white font-semibold transition-all duration-200"
                >
                  Реквизиты
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl border border-[#2A2A3E] bg-[#0F0F1A] text-center"
                >
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {stat.short || `${stat.value}${stat.suffix}`}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 bg-[#07070C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Принципы Tess Technology</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className="p-7 rounded-2xl border border-[#2A2A3E] bg-[#0F0F1A] hover:border-indigo-500/30 transition-colors"
              >
                <span className="text-xs font-mono text-indigo-500/50 mb-3 block">0{i + 1}</span>
                <h3 className="text-white font-bold text-lg mb-3">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
