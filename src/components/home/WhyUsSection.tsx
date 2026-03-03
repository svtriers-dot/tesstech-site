import { Trophy, Star, Shield, Ban } from 'lucide-react';
import { whyUs, whatWeDoNot } from '@/data/content';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  trophy: Trophy,
  star: Star,
  shield: Shield,
};

export default function WhyUsSection() {
  return (
    <>
      {/* Почему Tess Technology */}
      <section className="py-24 bg-[#07070C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-4">
              Наши преимущества
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Почему Tess Technology
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {whyUs.map((item) => {
              const Icon = iconMap[item.icon] || Trophy;
              return (
                <div
                  key={item.title}
                  className="p-7 rounded-2xl border border-[#2A2A3E] bg-[#0F0F1A] text-center hover:border-indigo-500/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-indigo-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Что мы НЕ делаем */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-medium mb-4">
              <Ban size={14} />
              Наши принципы
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Что мы <span className="text-red-400">НЕ</span> делаем
            </h2>
            <p className="text-gray-400 text-lg mt-4 max-w-xl mx-auto">
              Честность — основа долгосрочных отношений с клиентами
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whatWeDoNot.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-[#2A2A3E] bg-[#0F0F1A] hover:border-red-500/20 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                  <Ban size={16} className="text-red-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
