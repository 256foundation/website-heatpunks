'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navigation, type NavItem } from '@/data/site';
import { MobileNav } from './MobileNav';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--card-border)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/80">
      <div className="section-container">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="Hashrate Heatpunks"
              width={40}
              height={40}
              className="h-8 w-auto"
              priority
            />
            <span className="hidden sm:block whitespace-nowrap font-mono text-sm font-bold tracking-wide text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
              HASHRATE HEATPUNKS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <NavItemComponent key={item.href} item={item} />
            ))}
          </nav>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function NavItemComponent({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const baseClasses = "font-mono text-xs tracking-wider px-3 py-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors";

  if (!item.children) {
    if (item.external) {
      const isOutline = item.variant === 'outline';
      const opensNewTab = item.newTab !== false;
      return (
        <a
          href={item.href}
          {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={`font-mono text-xs tracking-wider px-3 py-1.5 inline-flex items-center gap-1 transition-colors whitespace-nowrap ${
            isOutline
              ? 'border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]'
              : 'bg-[var(--accent)] text-[var(--accent-contrast)] hover:bg-[var(--accent-light)]'
          }`}
        >
          {item.name.toUpperCase()}
          {opensNewTab && <span className="text-[10px]">↗</span>}
        </a>
      );
    }
    return (
      <Link href={item.href} className={baseClasses}>
        {item.name.toUpperCase()}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={item.href}
        className={`${baseClasses} inline-flex items-center gap-1`}
      >
        {item.name.toUpperCase()}
        <ChevronDownIcon className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Link>

      {isOpen && (
        <div className="absolute top-full left-0 pt-1 animate-fade-in">
          <div className="bg-[var(--card-background)] border border-[var(--card-border)] py-1 min-w-[140px] shadow-lg">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block px-4 py-2 font-mono text-xs tracking-wider text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--background)] transition-colors"
              >
                <span className="text-[var(--accent)] mr-2">&gt;</span>
                {child.name.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
