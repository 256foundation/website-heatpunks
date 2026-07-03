'use client';

import React, { Component, ReactNode } from 'react';
import { siteConfig } from '@/data/site';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ForumSectionErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console for debugging
    console.error('Forum section error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI or use provided fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <section className="py-16 md:py-24 bg-[var(--background)]">
          <div className="section-container text-center">
            <span className="section-tag">[ERROR]</span>
            <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-4 text-[var(--error)]">
              FORUM SECTION ERROR
            </h2>
            <p className="text-[var(--muted)] mt-4 mb-6">
              Something went wrong loading the forum content. Please try refreshing the page.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                <span className="font-mono text-xs tracking-wider">REFRESH PAGE</span>
              </button>
              <a
                href={siteConfig.links.forum}
                className="btn-secondary"
              >
                <span className="font-mono text-xs tracking-wider">VISIT FORUM DIRECTLY</span>
              </a>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
