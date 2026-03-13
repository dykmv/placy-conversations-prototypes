// Mock data for Channel Analytics block

// --- Hourly data ---

export const hourlyVoiceData = Array.from({ length: 24 }, (_, i) => {
  const base =
    i >= 8 && i <= 20
      ? 8 + Math.floor(Math.random() * 12)
      : 1 + Math.floor(Math.random() * 4);
  return { hour: `${i}:00`, count: base };
});

export const hourlyTextData = Array.from({ length: 24 }, (_, i) => {
  const base =
    i >= 7 && i <= 22
      ? 12 + Math.floor(Math.random() * 18)
      : 2 + Math.floor(Math.random() * 5);
  return { hour: `${i}:00`, count: base };
});

export const hourlyFormsData = Array.from({ length: 24 }, (_, i) => {
  const base =
    i >= 9 && i <= 18
      ? 3 + Math.floor(Math.random() * 6)
      : Math.floor(Math.random() * 2);
  return { hour: `${i}:00`, count: base };
});

export const hourlyAllData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  voice: hourlyVoiceData[i].count,
  text: hourlyTextData[i].count,
  forms: hourlyFormsData[i].count,
}));

// --- Daily data (by day of week) ---

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const dailyVoiceData = dayNames.map((day, i) => ({
  day,
  count: i < 5 ? 18 + Math.floor(Math.random() * 12) : 8 + Math.floor(Math.random() * 6),
  isWeekend: i >= 5,
}));

export const dailyTextData = dayNames.map((day, i) => ({
  day,
  count: i < 5 ? 22 + Math.floor(Math.random() * 15) : 10 + Math.floor(Math.random() * 8),
  isWeekend: i >= 5,
}));

export const dailyFormsData = dayNames.map((day, i) => ({
  day,
  count: i < 5 ? 16 + Math.floor(Math.random() * 10) : 4 + Math.floor(Math.random() * 5),
  isWeekend: i >= 5,
}));

export const dailyAllData = dayNames.map((day, i) => ({
  day,
  voice: dailyVoiceData[i].count,
  text: dailyTextData[i].count,
  forms: dailyFormsData[i].count,
  isWeekend: i >= 5,
}));

// --- Helpers ---

export function getPeakHours(data: { hour: string; count: number }[]): string[] {
  return [...data]
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
    .map((d) => d.hour);
}

export function getPeakDay(data: { day: string; count: number }[]): string {
  return [...data].sort((a, b) => b.count - a.count)[0].day;
}

export function getWeekdayVsWeekend(
  data: { day: string; count: number; isWeekend: boolean }[]
): { weekday: number; weekend: number } {
  const weekday = data
    .filter((d) => !d.isWeekend)
    .reduce((sum, d) => sum + d.count, 0);
  const weekend = data
    .filter((d) => d.isWeekend)
    .reduce((sum, d) => sum + d.count, 0);
  return { weekday, weekend };
}

export function generateSummary(
  hourlyData: { hour: string; count: number }[],
  dailyData: { day: string; count: number; isWeekend: boolean }[],
  channelLabel: string
): string {
  const peakHours = getPeakHours(hourlyData);
  const peakDay = getPeakDay(dailyData);
  const { weekday, weekend } = getWeekdayVsWeekend(dailyData);
  const weekdayAvg = Math.round(weekday / 5);
  const weekendAvg = Math.round(weekend / 2);

  return `Most ${channelLabel} happen on ${peakDay}s, peaking at ${peakHours[0]}–${peakHours[1]}. Weekday average: ${weekdayAvg}/day, weekend: ${weekendAvg}/day.`;
}

// --- KPI metrics ---

export const voiceMetrics = {
  assistantHandled: {
    total: 75,
    answeredPercent: 100,
    avgCallTime: '52"',
    medianCallTime: '36"',
  },
  humanHandled: {
    total: 79,
    answeredPercent: 89.7,
    avgCallTime: "2'09\"",
    medianCallTime: "1'18\"",
    missedCalls: 8,
    missedPercent: 10.1,
  },
  outsideBusinessHoursPercent: 20,
  repeatCallers: {
    total: 23,
    percent: 14.2,
  },
  avgCallsPerContact: 1.4,
};

export const textMetrics = {
  avgMessagesPerConversation: 12.3,
  avgConversationDuration: "4h 12m",
  avgConversationsPerContact: 1.8,
  humanTakeoverRate: {
    percent: 18.4,
    total: 29,
  },
  outsideBusinessHoursPercent: 61,
};

export const formsMetrics = {
  formsReceived: 142,
  outsideBusinessHoursPercent: 61,
};

export const allChannelTotals = {
  voice: 162,
  text: 158,
  forms: 142,
};
