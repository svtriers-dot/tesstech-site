import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Brain, Database, Compass, BarChart2, Zap, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { services } from '@/data/content';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  chart: BarChart2,
  zap: Zap,
  brain: Brain,
  database: Database,
  compass: Compass,
};

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: 'Услуга не найдена' };
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon] || Brain;
  const otherServices = services.filter((s) => s.slug !== slug);

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/8 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-400 transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Все услуги
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
                <Icon size={26} className="text-indigo-400" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">{service.title}</h1>
            <p className="text-gray-400 text-xl leading-relaxed">{service.fullDescription}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Features */}
            <div className="p-8 rounded-2xl border border-[#2A2A3E] bg-[#0F0F1A]">
              <h2 className="text-xl font-bold text-white mb-6">Что включает услуга</h2>
              <ul className="space-y-4">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Results */}
            <div className="p-8 rounded-2xl border border-[#2A2A3E] bg-[#0F0F1A]">
              <h2 className="text-xl font-bold text-white mb-6">Что вы получите</h2>
              <ul className="space-y-4">
                {service.results.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    </div>
                    <span className="text-gray-300 text-sm">{r}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-[#2A2A3E]">
                <Link
                  href="/contacts"
                  className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-200"
                >
                  Обсудить проект <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Other services */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Другие услуги</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherServices.map((s) => {
                const OtherIcon = iconMap[s.icon] || Brain;
                return (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group flex items-center gap-4 p-5 rounded-xl border border-[#2A2A3E] bg-[#0F0F1A] hover:border-indigo-500/40 transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <OtherIcon size={18} className="text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-sm group-hover:text-indigo-300 transition-colors">
                        {s.shortTitle}
                      </h3>
                      <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{s.description}</p>
                    </div>
                    <ArrowRight size={14} className="text-gray-600 group-hover:text-indigo-400 transition-colors shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
