import { Shield, Zap, Globe, FlaskConical } from 'lucide-react';

const advantages = [
  {
    icon: FlaskConical,
    title: 'Сложные задачи',
    description:
      'Берёмся за проекты, которые не решаются классическими маркетинговыми методами. Специализация на нестандартных рынках.',
  },
  {
    icon: Globe,
    title: 'Собственные данные',
    description:
      '100 000+ источников в собственных базах данных. Экономические и статистические показатели со всего мира.',
  },
  {
    icon: Zap,
    title: 'ИИ + математика',
    description:
      'Сочетаем математическое моделирование и машинное обучение. Первые в России провели исследование рынка AI-железа.',
  },
  {
    icon: Shield,
    title: 'Международный уровень',
    description:
      'Команда из 20+ экспертов с международным опытом. 300+ успешных кейсов от малого бизнеса до международных компаний.',
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-4">
            Почему мы
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Наши преимущества
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Работаем на стыке маркетинга и экономического моделирования уже более 10 лет
          </p>
        </div>

        {/* Advantages grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex gap-5 p-6 rounded-2xl border border-[#2A2A3E] bg-[#0F0F1A] hover:border-indigo-500/30 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
