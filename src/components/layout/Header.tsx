"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
      menu: string;
    };
  };
}

export default function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

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
    <header lang={locale} className="fixed top-0 left-0 right-0 z-50 bg-bg/95 backdrop-blur-md border-b border-border">
      <nav aria-label={locale === "ja" ? "メインナビゲーション" : "Main navigation"} className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-xl font-bold text-primary-light hover:text-primary-light transition-colors"
        >
          Rin.
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`text-sm transition-colors ${
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
            hrefLang={otherLocale}
            lang={otherLocale}
            className="text-sm px-3 py-1 rounded border border-primary/40 text-primary-light hover:bg-primary/10 transition-colors"
          >
            {otherLocale.toUpperCase()}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          ref={menuButton}
          type="button"
          className="md:hidden text-text-muted hover:text-text p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={dict.nav.menu}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm transition-colors ${
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
                hrefLang={otherLocale}
                lang={otherLocale}
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
