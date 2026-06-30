import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ year: string }>;
}

const archivedYears: string[] = [];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year } = await params;

  return {
    title: `Summit ${year}`,
    description: `Archive of Heatpunk Summit ${year}.`,
  };
}

export async function generateStaticParams() {
  return archivedYears.map((year) => ({ year }));
}

export default async function ArchivedSummitPage({ params }: PageProps) {
  const { year } = await params;

  if (!archivedYears.includes(year)) {
    notFound();
  }

  return (
    <div className="py-24">
      <div className="container mx-auto px-4 text-center">
        <span className="inline-block px-4 py-2 bg-olive-500/20 text-olive-500 text-sm font-medium rounded-full mb-6">
          Past Event
        </span>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Heatpunk Summit <span className="text-flame-500">{year}</span>
        </h1>

        <p className="text-[var(--muted)] max-w-2xl mx-auto mb-8">
          This summit has concluded. Watch the recorded sessions on our Education page
          or check out the upcoming summit.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/education"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-flame-500 hover:bg-flame-600 text-white font-medium rounded-lg transition-colors"
          >
            Watch Recordings
          </Link>

          <Link
            href="/summit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--card-background)] border border-[var(--card-border)] hover:border-flame-500/50 font-medium rounded-lg transition-colors"
          >
            View Upcoming Summit
          </Link>
        </div>
      </div>
    </div>
  );
}
