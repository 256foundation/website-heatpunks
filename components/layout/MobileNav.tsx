'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navigation, type NavItem } from '@/data/site';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleItemClick = (item: NavItem) => {
    if (item.children) {
      setExpandedItem(expandedItem === item.href ? null : item.href);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[var(--gray-light)] hover:text-[var(--flame)] transition-colors"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-14 left-0 right-0 bg-[var(--black)] border-b border-[var(--gray)] animate-fade-in">
          <nav className="section-container py-4 flex flex-col">
            {navigation.map((item) => (
              <div key={item.href} className="border-b border-[var(--gray)] last:border-0">
                {item.children ? (
                  <>
                    <button
                      onClick={() => handleItemClick(item)}
                      className="w-full flex items-center justify-between py-3 font-mono text-xs tracking-wider text-[var(--white)] hover:text-[var(--flame)] transition-colors"
                    >
                      <span>
                        <span className="text-[var(--flame)] mr-2">&gt;</span>
                        {item.name.toUpperCase()}
                      </span>
                      <ChevronDownIcon
                        className={`h-4 w-4 text-[var(--gray-light)] transition-transform ${expandedItem === item.href ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {expandedItem === item.href && (
                      <div className="pl-6 pb-2 flex flex-col gap-1 animate-fade-in">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className="py-2 font-mono text-xs tracking-wider text-[var(--gray-light)] hover:text-[var(--flame)] transition-colors"
                          >
                            {child.name.toUpperCase()}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : item.external ? (
                  <a
                    href={item.href}
                    {...(item.newTab !== false ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-3 font-mono text-xs tracking-wider text-[var(--white)] hover:text-[var(--flame)] transition-colors"
                  >
                    <span>
                      <span className="text-[var(--flame)] mr-2">&gt;</span>
                      {item.name.toUpperCase()}
                    </span>
                    {item.newTab !== false && (
                      <span className="text-[var(--terminal)] text-[10px]">↗</span>
                    )}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 font-mono text-xs tracking-wider text-[var(--white)] hover:text-[var(--flame)] transition-colors"
                  >
                    <span className="text-[var(--flame)] mr-2">&gt;</span>
                    {item.name.toUpperCase()}
                  </Link>
                )}
              </div>
            ))}
          </nav>
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
