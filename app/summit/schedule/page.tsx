import type { Metadata } from 'next';
import { getScheduleData } from '@/lib/schedule';
import { ScheduleHeader } from '@/components/schedule/ScheduleHeader';
import { DayTabs } from '@/components/schedule/DayTabs';

export const metadata: Metadata = {
  title: 'Summit 2026 Schedule',
  description: 'Full schedule archive for Heatpunk Summit 2026. Workshops, demos, panels, and networking events.',
  openGraph: {
    title: 'Summit 2026 Schedule | Hashrate Heatpunks',
    description: 'Full schedule archive for Heatpunk Summit 2026. Workshops, demos, panels, and networking events.',
    images: ['/api/og?title=SUMMIT%20SCHEDULE&subtitle=FEB%2027-28%2C%202026%20%E2%80%A2%20DENVER%2C%20CO&page=summit'],
  },
};

export default function SchedulePage() {
  const scheduleData = getScheduleData();

  return (
    <div className="relative py-12 md:py-16 bg-[var(--background)] min-h-screen">
      <div className="noise-overlay" />
      <div className="section-container relative z-10">
        <ScheduleHeader summit={scheduleData.summit} days={scheduleData.days} />
        <DayTabs days={scheduleData.days} summit={scheduleData.summit} />
      </div>
    </div>
  );
}
