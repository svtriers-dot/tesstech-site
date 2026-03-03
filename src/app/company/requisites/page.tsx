import type { Metadata } from 'next';
import { company } from '@/data/content';

export const metadata: Metadata = {
  title: 'Реквизиты',
  description: 'Реквизиты компании Tess Technology',
};

const requisites = [
  { label: 'Полное наименование', value: 'ООО «Тесс Технология»' },
  { label: 'Сокращённое наименование', value: 'ООО «ТессТех»' },
  { label: 'ИНН', value: company.inn },
  { label: 'ОГРН', value: company.ogrn },
  { label: 'Юридический адрес', value: '127000, г. Москва, ул. Примерная, д. 1' },
  { label: 'Фактический адрес', value: '127000, г. Москва, ул. Примерная, д. 1' },
  { label: 'Расчётный счёт', value: '40702810000000000000' },
  { label: 'Банк', value: 'АО «Тинькофф Банк»' },
  { label: 'БИК', value: '044525974' },
  { label: 'Кор. счёт', value: '30101810145250000974' },
];

export default function RequisitesPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6">
          Документы
        </div>
        <h1 className="text-4xl font-bold text-white mb-12">Реквизиты</h1>

        <div className="divide-y divide-[#2A2A3E] rounded-2xl border border-[#2A2A3E] bg-[#0F0F1A] overflow-hidden">
          {requisites.map((r) => (
            <div key={r.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-6 py-4">
              <span className="text-sm text-gray-500 sm:w-48 shrink-0">{r.label}</span>
              <span className="text-sm text-white font-medium">{r.value}</span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-gray-600 text-center">
          * Реквизиты носят ознакомительный характер. Для получения актуальных реквизитов обратитесь к нам напрямую.
        </p>
      </div>
    </div>
  );
}
