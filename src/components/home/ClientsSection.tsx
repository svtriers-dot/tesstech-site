import { clients } from '@/data/content';

export default function ClientsSection() {
  return (
    <section className="py-20 border-y border-[#2A2A3E] bg-[#07070C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-sm font-medium uppercase tracking-wider mb-10">
          Нам доверяют
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {clients.map((client) => (
            <div
              key={client.name}
              className="group flex items-center justify-center px-6 py-3 rounded-xl border border-[#2A2A3E] hover:border-indigo-500/30 transition-colors min-w-[120px]"
            >
              <span className="text-gray-400 group-hover:text-gray-200 font-semibold text-sm transition-colors whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
