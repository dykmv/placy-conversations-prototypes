"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KpiCard } from "@/components/kpi-card";
import { ActivityChart } from "@/components/activity-chart";
import {
  voiceMetrics,
  textMetrics,
  formsMetrics,
  allChannelTotals,
  hourlyVoiceData,
  hourlyTextData,
  hourlyFormsData,
  hourlyAllData,
  dailyVoiceData,
  dailyTextData,
  dailyFormsData,
  dailyAllData,
  generateSummary,
} from "@/lib/mock-data";

export function ChannelAnalytics() {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Channel Analytics</h2>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="voice">Voice</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="forms">Lead Forms</TabsTrigger>
        </TabsList>

        {/* ───── Tab: All ───── */}
        <TabsContent value="all" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KpiCard
              title="Total Voice"
              mainValue={allChannelTotals.voice}
              mainSuffix="calls"
              badge={`${voiceMetrics.outsideBusinessHoursPercent}% outside business hours`}
            />
            <KpiCard
              title="Total Text"
              mainValue={allChannelTotals.text}
              mainSuffix="conversations"
              badge={`${textMetrics.outsideBusinessHoursPercent}% outside business hours`}
              badgeHighlight
            />
            <KpiCard
              title="Total Lead Forms"
              mainValue={allChannelTotals.forms}
              mainSuffix="forms"
              badge={`${formsMetrics.outsideBusinessHoursPercent}% outside business hours`}
              badgeHighlight
            />
          </div>
          <ActivityChart
            mode="all"
            hourlyData={hourlyAllData}
            dailyData={dailyAllData}
          />
        </TabsContent>

        {/* ───── Tab: Voice ───── */}
        <TabsContent value="voice" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KpiCard
              title="Assistant Handled Calls"
              mainValue={voiceMetrics.assistantHandled.total}
              items={[
                {
                  label: "Answered",
                  value: `${voiceMetrics.assistantHandled.answeredPercent}%`,
                },
                {
                  label: "Avg Call Time",
                  value: voiceMetrics.assistantHandled.avgCallTime,
                },
                {
                  label: "Median Call Time",
                  value: voiceMetrics.assistantHandled.medianCallTime,
                },
              ]}
              badge={`${voiceMetrics.outsideBusinessHoursPercent}% outside business hours`}
            />
            <KpiCard
              title="Human Handled Calls"
              mainValue={voiceMetrics.humanHandled.total}
              items={[
                {
                  label: "Answered",
                  value: `${voiceMetrics.humanHandled.answeredPercent}%`,
                },
                {
                  label: "Avg Call Time",
                  value: voiceMetrics.humanHandled.avgCallTime,
                },
                {
                  label: "Median Call Time",
                  value: voiceMetrics.humanHandled.medianCallTime,
                },
              ]}
            />
            <KpiCard
              title="Missed Calls (Human)"
              mainValue={voiceMetrics.humanHandled.missedCalls}
              mainSuffix={`(${voiceMetrics.humanHandled.missedPercent}%)`}
              accent
              accentCondition={voiceMetrics.humanHandled.missedCalls > 0}
              items={[
                {
                  label: "Of human-handled calls",
                  value: `${voiceMetrics.humanHandled.missedCalls} unanswered`,
                },
              ]}
            />
          </div>

          <ActivityChart
            mode="single"
            hourlyData={hourlyVoiceData}
            dailyData={dailyVoiceData}
            color="#6366f1"
            label="Calls"
            summary={generateSummary(hourlyVoiceData, dailyVoiceData, "calls")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <KpiCard
              title="Avg Calls per Contact"
              mainValue={voiceMetrics.avgCallsPerContact}
            />
            <KpiCard
              title="Repeat Callers"
              mainValue={voiceMetrics.repeatCallers.total}
              mainSuffix={`(${voiceMetrics.repeatCallers.percent}%)`}
            />
          </div>
        </TabsContent>

        {/* ───── Tab: Text ───── */}
        <TabsContent value="text" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KpiCard
              title="Avg Messages per Conversation"
              mainValue={textMetrics.avgMessagesPerConversation}
              badge={`${textMetrics.outsideBusinessHoursPercent}% outside business hours`}
              badgeHighlight
            />
            <KpiCard
              title="Avg Conversation Duration"
              mainValue={textMetrics.avgConversationDuration}
            />
            <KpiCard
              title="Human Takeover Rate"
              mainValue={`${textMetrics.humanTakeoverRate.percent}%`}
              mainSuffix={`(${textMetrics.humanTakeoverRate.total} chats)`}
            />
          </div>

          <ActivityChart
            mode="single"
            hourlyData={hourlyTextData}
            dailyData={dailyTextData}
            color="#22c55e"
            label="Messages"
            summary={generateSummary(
              hourlyTextData,
              dailyTextData,
              "conversations"
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <KpiCard
              title="Avg Conversations per Contact"
              mainValue={textMetrics.avgConversationsPerContact}
            />
          </div>
        </TabsContent>

        {/* ───── Tab: Lead Forms ───── */}
        <TabsContent value="forms" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KpiCard
              title="Forms Received"
              mainValue={formsMetrics.formsReceived}
              mainSuffix="forms"
              badge={`${formsMetrics.outsideBusinessHoursPercent}% outside business hours`}
              badgeHighlight
            />
          </div>

          <ActivityChart
            mode="single"
            hourlyData={hourlyFormsData}
            dailyData={dailyFormsData}
            color="#f59e0b"
            label="Forms"
            summary={generateSummary(
              hourlyFormsData,
              dailyFormsData,
              "form submissions"
            )}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
