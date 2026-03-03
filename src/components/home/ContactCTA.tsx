import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

export default function ContactCTA() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-[#0F0F1A] to-purple-600/10 p-8 lg:p-16 text-center">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-indigo-600/20 blur-[80px] pointer-events-none" />

          {/* Grid overlay */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6">
              <Mail size={14} />
              Готовы к сотрудничеству
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Есть сложная аналитическая задача?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Расскажите о вашем проекте — мы изучим задачу и предложим оптимальный подход.
              Не берёмся за все проекты подряд, берёмся за те, где можем дать результат.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contacts"
                className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30"
              >
                Обсудить проект
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="mailto:info@tesstech.ru"
                className="flex items-center gap-2 px-8 py-4 rounded-xl border border-[#2A2A3E] hover:border-indigo-500/40 text-gray-300 hover:text-white font-semibold text-base transition-all duration-200 hover:bg-white/5"
              >
                Написать на почту
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
