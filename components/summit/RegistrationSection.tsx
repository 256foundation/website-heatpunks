'use client';

import { useState } from 'react';
import { siteConfig } from '@/data/site';
import { WaitlistModal } from './WaitlistModal';

export function RegistrationSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-[var(--card-background)] to-[var(--background)]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />

      <div className="section-container">
        <div className="mb-8">
          <span className="section-tag">[007]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2">
            SECURE YOUR <span className="text-[var(--accent)]">SPOT</span>
          </h2>
          <p className="text-[var(--muted)] text-sm mt-3 max-w-xl">
            HPS 2027 is invite-curated. Tell us who you are and why you want to attend.
            If you&apos;re a good fit, we&apos;ll send you the link to purchase your ticket ($350).
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
          >
            <span className="relative z-10">JOIN THE WAITLIST</span>
            <span className="btn-heat" />
          </button>

          <a
            href={`mailto:${siteConfig.contact.email}?subject=Summit 2027 Sponsorship`}
            className="btn-outline"
          >
            SPONSOR / DEMO INQUIRY
          </a>
        </div>
      </div>

      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        year={2027}
      />
    </section>
  );
}
