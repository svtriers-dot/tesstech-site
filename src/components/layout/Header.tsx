'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navigation, services } from '@/data/content';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-[#0A0A0F]/95 backdrop-blur-md border-b border-[#2A2A3E]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <div>
              <span className="font-semibold text-white text-lg tracking-tight">Tess</span>
              <span className="font-light text-indigo-400 text-lg"> Technology</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => {
              if (item.href === '/services') {
                return (
                  <div key={item.href} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen((v) => !v)}
                      className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-indigo-400 ${
                        pathname.startsWith('/services') ? 'text-indigo-400' : 'text-gray-300'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl border border-[#2A2A3E] bg-[#0A0A0F]/98 backdrop-blur-md shadow-xl shadow-black/40 overflow-hidden">
                        <div className="p-2">
                          {services.map((s) => (
                            <Link
                              key={s.slug}
                              href={`/services/${s.slug}`}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors hover:bg-indigo-500/10 hover:text-indigo-300 ${
                                pathname === `/services/${s.slug}` ? 'bg-indigo-500/10 text-indigo-300' : 'text-gray-300'
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                              {s.shortTitle}
                            </Link>
                          ))}
                          <div className="border-t border-[#2A2A3E] mt-2 pt-2">
                            <Link
                              href="/services"
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                            >
                              Все продукты →
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-indigo-400 ${
                    pathname === item.href || pathname.startsWith(item.href + '/')
                      ? 'text-indigo-400'
                      : 'text-gray-300'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/contacts"
              className="hidden lg:inline-flex items-center px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              Связаться
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Меню"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-[#2A2A3E] bg-[#0A0A0F]/98">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navigation.map((item) => {
              if (item.href === '/services') {
                return (
                  <div key={item.href}>
                    <button
                      onClick={() => setMobileProductsOpen((v) => !v)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        pathname.startsWith('/services')
                          ? 'bg-indigo-600/20 text-indigo-400'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {mobileProductsOpen && (
                      <div className="ml-4 mt-1 space-y-1">
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                          >
                            <span className="w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                            {s.shortTitle}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-indigo-600/20 text-indigo-400'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contacts"
              className="block mt-3 px-4 py-3 rounded-lg bg-indigo-600 text-white text-sm font-medium text-center hover:bg-indigo-500 transition-colors"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
