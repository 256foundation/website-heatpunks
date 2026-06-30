'use client';

import { useState, useEffect, useRef } from 'react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: number;
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const industryOptions = [
  { value: '', label: 'Select your industry focus' },
  { value: 'Bitcoin Mining', label: 'Bitcoin Mining' },
  { value: 'Heating & Buildings', label: 'Heating & Buildings' },
  { value: 'Both', label: 'Both' },
  { value: 'Other', label: 'Other' },
];

export function WaitlistModal({ isOpen, onClose, year }: WaitlistModalProps) {
  const [formState, setFormState] = useState<FormState>('idle');
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industryFocus: '',
    whyAttend: '',
    contribution: '',
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setError(null);

    try {
      const response = await fetch('/api/summit-invitation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormState('success');
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
        setFormState('error');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
      setFormState('error');
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', company: '', industryFocus: '', whyAttend: '', contribution: '' });
    setFormState('idle');
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[var(--card-background)] border border-[var(--card-border)] p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {formState === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 border-2 border-[var(--accent)] flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-mono text-xl font-bold tracking-wide mb-2">YOU&apos;RE ON THE LIST</h3>
            <p className="text-[var(--muted)] text-sm mb-6">
              We&apos;ve got your info. If you&apos;re a good fit for HPS {year}, we&apos;ll send you the link to purchase your ticket.
            </p>
            <button onClick={handleReset} className="btn-secondary">
              CLOSE
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="section-tag">[HPS {year}]</span>
              <h2 className="font-mono text-xl md:text-2xl font-bold tracking-wide mt-2">
                JOIN THE <span className="text-[var(--accent)]">HPS {year} WAITLIST</span>
              </h2>
              <div className="mt-3 p-3 bg-[var(--background)] border border-[var(--card-border)] font-mono text-xs text-[var(--muted)] space-y-1">
                <p><span className="text-[var(--accent)]">EVENT:</span> Heatpunk Summit {year} · Feb 26–27, Denver, CO</p>
                <p><span className="text-[var(--accent)]">TICKET:</span> $350 — pay in fiat or bitcoin when your spot is confirmed</p>
              </div>
              <p className="text-[var(--muted)] text-sm mt-3">
                Tell us who you are and why you want to attend. If you&apos;re a good fit, we&apos;ll send you the ticket purchase link.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-mono">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-xs tracking-wider text-[var(--muted)] mb-1">
                  NAME <span className="text-[var(--accent)]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--card-border)] text-[var(--foreground)] font-mono text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                  placeholder="Your full name"
                  disabled={formState === 'submitting'}
                />
              </div>

              <div>
                <label className="block font-mono text-xs tracking-wider text-[var(--muted)] mb-1">
                  EMAIL <span className="text-[var(--accent)]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--card-border)] text-[var(--foreground)] font-mono text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                  placeholder="your@email.com"
                  disabled={formState === 'submitting'}
                />
              </div>

              <div>
                <label className="block font-mono text-xs tracking-wider text-[var(--muted)] mb-1">
                  COMPANY / ORGANIZATION <span className="text-[var(--accent)]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--card-border)] text-[var(--foreground)] font-mono text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                  placeholder="Where you work or what you're building"
                  disabled={formState === 'submitting'}
                />
              </div>

              <div>
                <label className="block font-mono text-xs tracking-wider text-[var(--muted)] mb-1">
                  INDUSTRY FOCUS <span className="text-[var(--accent)]">*</span>
                </label>
                <select
                  required
                  value={formData.industryFocus}
                  onChange={(e) => setFormData({ ...formData, industryFocus: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--card-border)] text-[var(--foreground)] font-mono text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                  disabled={formState === 'submitting'}
                >
                  {industryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs tracking-wider text-[var(--muted)] mb-1">
                  WHY DO YOU WANT TO ATTEND? <span className="text-[var(--accent)]">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.whyAttend}
                  onChange={(e) => setFormData({ ...formData, whyAttend: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--card-border)] text-[var(--foreground)] font-mono text-sm focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  placeholder="What draws you to hashrate heating? What are you hoping to learn or contribute?"
                  disabled={formState === 'submitting'}
                />
              </div>

              <div>
                <label className="block font-mono text-xs tracking-wider text-[var(--muted)] mb-1">
                  HOW CAN YOU CONTRIBUTE TO THE DISCUSSION? <span className="text-[var(--accent)]">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.contribution}
                  onChange={(e) => setFormData({ ...formData, contribution: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--card-border)] text-[var(--foreground)] font-mono text-sm focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  placeholder="Share your relevant experience, projects, or expertise. It's okay if you're still learning."
                  disabled={formState === 'submitting'}
                />
              </div>

              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full btn-primary group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {formState === 'submitting' ? (
                    <><LoadingSpinner />SUBMITTING...</>
                  ) : (
                    'JOIN THE WAITLIST'
                  )}
                </span>
                <span className="btn-heat" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}
