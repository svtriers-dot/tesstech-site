'use client';

import Link from 'next/link';
import { ArrowRight, ChevronDown, CheckCircle } from 'lucide-react';
import { heroBullets } from '@/data/content';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[700px] h-[700px] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-600/8 blur-[80px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Trusted Expertise in Strategy and Systems
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-4 leading-tight">
          Tess Technology
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light mb-8">
          Анализ рынков, социальное и{' '}
          <span className="gradient-text font-medium">экономическое моделирование</span>
        </p>

        {/* Bullet points */}
        <ul className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 mb-10">
          {heroBullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-2 text-gray-400 text-sm sm:text-base">
              <CheckCircle size={16} className="text-indigo-400 shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contacts"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/25"
          >
            Связаться с нами
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/services"
            className="flex items-center gap-2 px-8 py-4 rounded-xl border border-[#2A2A3E] hover:border-indigo-500/50 text-gray-300 hover:text-white font-semibold text-base transition-all duration-200 hover:bg-white/5"
          >
            Наши продукты
          </Link>
        </div>

        {/* Social proof bar */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {[
            { value: '300+', label: 'кейсов' },
            { value: '10+', label: 'лет опыта' },
            { value: '20+', label: 'экспертов' },
            { value: '100K+', label: 'источников данных' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{s.value}</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#products"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-indigo-400 transition-colors"
        aria-label="Прокрутить вниз"
      >
        <span className="text-xs">Подробнее</span>
        <ChevronDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
