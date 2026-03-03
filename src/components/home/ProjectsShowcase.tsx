import Link from 'next/link';
import { ArrowRight, Tag } from 'lucide-react';
import { projects } from '@/data/content';

export default function ProjectsShowcase() {
  const featured = projects.slice(0, 3);

  return (
    <section className="py-24 bg-[#07070C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-4">
              Кейсы
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Избранные проекты
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors shrink-0"
          >
            Все проекты <ArrowRight size={14} />
          </Link>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => (
            <div
              key={project.slug}
              className="group p-6 rounded-2xl border border-[#2A2A3E] bg-[#0F0F1A] hover:border-indigo-500/40 card-hover"
            >
              {/* Category badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A2E] border border-[#2A2A3E] text-xs text-gray-400 mb-4">
                <Tag size={10} />
                {project.category}
              </div>

              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                {project.title}
              </h3>
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
              <div className="space-y-1.5 pt-4 border-t border-[#2A2A3E]">
                {project.results.slice(0, 2).map((r) => (
                  <div key={r} className="flex items-start gap-2 text-xs text-gray-500">
                    <span className="w-1 h-1 rounded-full bg-green-500 mt-1.5 shrink-0" />
                    {r}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
