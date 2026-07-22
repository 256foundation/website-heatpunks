import { getScheduleData } from '@/lib/schedule';
import { ScheduleHeader } from '@/components/schedule/ScheduleHeader';
import { DayTabs } from '@/components/schedule/DayTabs';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('schedule');

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
