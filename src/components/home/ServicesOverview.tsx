import Link from 'next/link';
import { BarChart2, Zap, Brain, Database, Compass, ArrowRight } from 'lucide-react';
import { services } from '@/data/content';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  chart: BarChart2,
  zap: Zap,
  brain: Brain,
  database: Database,
  compass: Compass,
};

// Show only first 3 on homepage
const featured = ['market-analysis', 'operational-efficiency', 'mathematical-modeling-ml'];

export default function ServicesOverview() {
  const featuredServices = services.filter((s) => featured.includes(s.slug));

  return (
    <section id="products" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-4">
            Наши продукты
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Что мы делаем
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Специализируемся на аналитике сложных технологических продуктов и задачах,
            нерешаемых классическими маркетинговыми способами
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredServices.map((service, index) => {
            const Icon = iconMap[service.icon] || Brain;
            return (
              <div
                key={service.slug}
                className="group relative p-6 lg:p-8 rounded-2xl border border-[#2A2A3E] bg-[#0F0F1A] hover:border-indigo-500/40 card-hover"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:bg-indigo-500/25 transition-colors">
                    <Icon size={22} className="text-indigo-400" />
                  </div>

                  <span className="text-xs font-mono text-indigo-500/50 mb-2 block">
                    0{index + 1}
                  </span>

                  <h3 className="text-xl font-bold text-white mb-3">{service.shortTitle}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-gray-500">
                        <span className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors group/link"
                  >
                    Подробнее
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#2A2A3E] hover:border-indigo-500/40 text-gray-300 hover:text-white text-sm font-medium transition-all duration-200 hover:bg-white/5"
          >
            Все продукты <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
