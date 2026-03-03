import type { Metadata } from 'next';
import { Tag } from 'lucide-react';
import { projects } from '@/data/content';

export const metadata: Metadata = {
  title: 'Проекты',
  description: '300+ успешных кейсов Tess Technology — от нанометаллов до рынка GPU для ИИ.',
};

export default function ProjectsPage() {
  const categories = Array.from(new Set(projects.map((p) => p.category)));

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/8 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6">
            Кейсы
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Наши проекты
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            300+ успешных кейсов — от небольших проектов до компаний международного уровня
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories filter (static display) */}
          <div className="flex flex-wrap gap-2 mb-10">
            <span className="px-4 py-1.5 rounded-full bg-indigo-600 text-white text-sm font-medium">
              Все
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-4 py-1.5 rounded-full border border-[#2A2A3E] text-gray-400 text-sm hover:border-indigo-500/40 hover:text-indigo-400 transition-colors cursor-default"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project) => (
              <div
                key={project.slug}
                className="group p-6 lg:p-8 rounded-2xl border border-[#2A2A3E] bg-[#0F0F1A] hover:border-indigo-500/40 card-hover"
              >
                {/* Category */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A2E] border border-[#2A2A3E] text-xs text-gray-400 mb-4">
                  <Tag size={10} />
                  {project.category}
                </div>

                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Results */}
                <div className="space-y-2 pt-4 border-t border-[#2A2A3E]">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Результаты
                  </h3>
                  {project.results.map((r) => (
                    <div key={r} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 text-center p-10 rounded-2xl border border-[#2A2A3E] bg-[#0F0F1A]">
            <p className="text-gray-400 text-lg mb-2">
              Это лишь часть из 300+ реализованных проектов
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Свяжитесь с нами, чтобы узнать о релевантных для вашей отрасли кейсах
            </p>
            <a
              href="/contacts"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-200"
            >
              Получить список кейсов
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
