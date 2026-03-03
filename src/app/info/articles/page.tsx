import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { articles } from '@/data/content';

export const metadata: Metadata = {
  title: 'Статьи',
  description: 'Аналитические материалы и методологические статьи от Tess Technology.',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function ArticlesPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/8 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6">
            Публикации
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Статьи</h1>
          <p className="text-gray-400 text-xl max-w-xl mx-auto">
            Аналитика рынков, методология и взгляд на индустрию от экспертов Tess Technology
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/info/articles/${article.slug}`}
              className="group block p-6 lg:p-8 rounded-2xl border border-[#2A2A3E] bg-[#0F0F1A] hover:border-indigo-500/40 card-hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {article.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar size={12} />
                  {formatDate(article.publishedAt)}
                </div>
              </div>

              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                {article.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{article.excerpt}</p>

              <div className="inline-flex items-center gap-1.5 text-sm text-indigo-400 group-hover:text-indigo-300 font-medium transition-colors">
                Читать статью
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
