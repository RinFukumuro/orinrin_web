"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/lib/i18n/config";

interface HeaderProps {
  locale: Locale;
  dict: {
    nav: {
      home: string;
      portfolio: string;
      blog: string;
      contact: string;
    };
  };
}

export default function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const otherLocale = locale === "ja" ? "en" : "ja";
  const switchedPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const navItems = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/portfolio`, label: dict.nav.portfolio },
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}`;
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/70 backdrop-blur-xl" style={{ borderBottom: "1px solid rgba(139, 92, 246, 0.1)" }}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-xl font-bold bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity glow-text"
        >
          Orinrin
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? "text-primary-light drop-shadow-[0_0_8px_rgba(14,165,233,0.4)]"
                  : "text-text-muted hover:text-text"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={switchedPath}
            className="text-sm px-3 py-1 rounded-full text-text-muted hover:text-primary-light transition-all duration-200"
            style={{ border: "1px solid rgba(139, 92, 246, 0.2)" }}
          >
            {otherLocale.toUpperCase()}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-text-muted hover:text-text p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface/95 backdrop-blur-xl overflow-hidden"
            style={{ borderBottom: "1px solid rgba(139, 92, 246, 0.1)" }}
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-primary-light"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={switchedPath}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-primary-light"
              >
                {otherLocale === "en" ? "English" : "日本語"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
