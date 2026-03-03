import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { articles } from '@/data/content';

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: 'Статья не найдена' };
  return { title: article.title, description: article.excerpt };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/info/articles"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-400 transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Все статьи
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <span className="px-2.5 py-0.5 rounded-full text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {article.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Calendar size={12} />
            {formatDate(article.publishedAt)}
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">{article.title}</h1>

        <div className="text-gray-400 leading-relaxed space-y-4">
          <p className="text-lg">{article.excerpt}</p>
          <p>
            Полный текст статьи в разработке. Следите за обновлениями на нашем сайте или подпишитесь
            на рассылку, чтобы первыми получать аналитические материалы от Tess Technology.
          </p>
          <p>
            Tess Technology регулярно публикует исследования и аналитику по рынкам технологий,
            методологии экономического моделирования и применению ИИ в бизнес-аналитике.
          </p>
        </div>

        <div className="mt-10 pt-8 border-t border-[#2A2A3E]">
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-200"
          >
            Обсудить с экспертом
          </Link>
        </div>
      </div>
    </div>
  );
}
