"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { getPeakHours, generateSummary } from "@/lib/mock-data";

type ViewMode = "hours" | "days";

// --- All channels (stacked) ---

interface AllChannelsProps {
  mode: "all";
  hourlyData: { hour: string; voice: number; text: number; forms: number }[];
  dailyData: {
    day: string;
    voice: number;
    text: number;
    forms: number;
    isWeekend: boolean;
  }[];
}

// --- Single channel ---

interface SingleChannelProps {
  mode: "single";
  hourlyData: { hour: string; count: number }[];
  dailyData: { day: string; count: number; isWeekend: boolean }[];
  color: string;
  label: string;
  summary: string;
}

type ActivityChartProps = AllChannelsProps | SingleChannelProps;

function ViewToggle({
  view,
  onChange,
}: {
  view: ViewMode;
  onChange: (v: ViewMode) => void;
}) {
  return (
    <div className="inline-flex rounded-lg bg-muted p-0.5">
      <button
        onClick={() => onChange("hours")}
        className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
          view === "hours"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        By Hours
      </button>
      <button
        onClick={() => onChange("days")}
        className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
          view === "days"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        By Day of Week
      </button>
    </div>
  );
}

export function ActivityChart(props: ActivityChartProps) {
  const [view, setView] = useState<ViewMode>("hours");

  if (props.mode === "all") {
    const { hourlyData, dailyData } = props;
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Lead Activity by Time of Day
            </CardTitle>
            <ViewToggle view={view} onChange={setView} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              {view === "hours" ? (
                <BarChart data={hourlyData} barGap={0} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="hour" tick={{ fontSize: 11 }} interval={1} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="voice"
                    name="Voice"
                    fill="#6366f1"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar
                    dataKey="text"
                    name="Text"
                    fill="#22c55e"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar
                    dataKey="forms"
                    name="Lead Forms"
                    fill="#f59e0b"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              ) : (
                <BarChart data={dailyData} barGap={0} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="voice"
                    name="Voice"
                    fill="#6366f1"
                    radius={[2, 2, 0, 0]}
                  >
                    {dailyData.map((entry) => (
                      <Cell
                        key={entry.day}
                        fill={entry.isWeekend ? "#a5b4fc" : "#6366f1"}
                      />
                    ))}
                  </Bar>
                  <Bar
                    dataKey="text"
                    name="Text"
                    fill="#22c55e"
                    radius={[2, 2, 0, 0]}
                  >
                    {dailyData.map((entry) => (
                      <Cell
                        key={entry.day}
                        fill={entry.isWeekend ? "#86efac" : "#22c55e"}
                      />
                    ))}
                  </Bar>
                  <Bar
                    dataKey="forms"
                    name="Lead Forms"
                    fill="#f59e0b"
                    radius={[2, 2, 0, 0]}
                  >
                    {dailyData.map((entry) => (
                      <Cell
                        key={entry.day}
                        fill={entry.isWeekend ? "#fcd34d" : "#f59e0b"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
          {view === "days" && (
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#6366f1] inline-block" />
                Weekday
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#a5b4fc] inline-block" />
                Weekend
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Single channel
  const { hourlyData, dailyData, color, label, summary } = props;
  const peakHours = getPeakHours(hourlyData);
  const weekendColor = color + "66"; // lighter version

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Lead Activity by Time of Day
          </CardTitle>
          <ViewToggle view={view} onChange={setView} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            {view === "hours" ? (
              <BarChart data={hourlyData} barCategoryGap="15%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" tick={{ fontSize: 11 }} interval={1} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" name={label} radius={[3, 3, 0, 0]}>
                  {hourlyData.map((entry) => (
                    <Cell
                      key={entry.hour}
                      fill={
                        peakHours.includes(entry.hour) ? "#f59e0b" : color
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <BarChart data={dailyData} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" name={label} radius={[3, 3, 0, 0]}>
                  {dailyData.map((entry) => (
                    <Cell
                      key={entry.day}
                      fill={entry.isWeekend ? weekendColor : color}
                    />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
        {view === "hours" && (
          <div className="flex gap-2 mt-3">
            {peakHours.map((h) => (
              <span
                key={h}
                className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium"
              >
                Peak: {h}
              </span>
            ))}
          </div>
        )}
        {view === "days" && (
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-sm inline-block"
                style={{ backgroundColor: color }}
              />
              Weekday
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-sm inline-block"
                style={{ backgroundColor: weekendColor }}
              />
              Weekend
            </span>
          </div>
        )}
        {/* Text summary */}
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed bg-muted/50 rounded-lg px-4 py-3">
          {summary}
        </p>
      </CardContent>
    </Card>
  );
}
