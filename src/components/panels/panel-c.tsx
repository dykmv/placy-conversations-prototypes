"use client";

import { useState, useMemo } from "react";
import type { Communication, Dialog } from "@/lib/communications-data";
import { getChannelIcon, getIntentColor } from "@/lib/conversations-data";

interface PanelProps {
  communication: Communication | null;
  onClose: () => void;
}

function getChannelLabel(channel: Dialog["channel"]): string {
  switch (channel) {
    case "phone":
      return "Phone call";
    case "whatsapp":
      return "WhatsApp chat";
    case "email":
      return "Email form";
  }
}

function formatDateLabel(dateStr: string): string {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const todayStr = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const yesterdayStr = yesterday.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (dateStr === todayStr) return "Today";
  if (dateStr === yesterdayStr) return "Yesterday";

  // Try matching without year for "Mar 13, 2026" style dates
  const parts = dateStr.split(", ");
  if (parts.length === 2) {
    const [monthDay] = parts;
    const todayMonthDay = today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const yesterdayMonthDay = yesterday.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    if (monthDay === todayMonthDay) return "Today";
    if (monthDay === yesterdayMonthDay) return "Yesterday";
  }

  // Return short form like "Mar 11"
  if (parts.length === 2) return parts[0];
  return dateStr;
}

function getDurationLabel(dialog: Dialog): string {
  if (dialog.duration) return dialog.duration;
  if (dialog.messageCount) return `${dialog.messageCount} msgs`;
  return "";
}

interface TimelineEntry {
  type: "date-separator";
  label: string;
  key: string;
}
interface DialogEntry {
  type: "dialog";
  dialog: Dialog;
  key: string;
}
interface LeadEntry {
  type: "lead-created";
  dialog: Dialog;
  key: string;
}
type TimelineItem = TimelineEntry | DialogEntry | LeadEntry;

function buildTimeline(dialogs: Dialog[]): TimelineItem[] {
  // Dialogs are already sorted newest-first in the data
  const items: TimelineItem[] = [];
  let currentDate = "";

  for (const dialog of dialogs) {
    if (dialog.date !== currentDate) {
      currentDate = dialog.date;
      items.push({
        type: "date-separator",
        label: formatDateLabel(dialog.date),
        key: `date-${dialog.date}`,
      });
    }
    items.push({ type: "dialog", dialog, key: dialog.id });
    if (dialog.leadCreated) {
      items.push({
        type: "lead-created",
        dialog,
        key: `lead-${dialog.id}`,
      });
    }
  }

  return items;
}

function DialogCard({
  dialog,
  expanded,
  onToggle,
}: {
  dialog: Dialog;
  expanded: boolean;
  onToggle: () => void;
}) {
  const durationLabel = getDurationLabel(dialog);

  return (
    <div
      className="ml-6 relative bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:border-gray-300 transition-colors"
      onClick={onToggle}
    >
      {/* Timeline dot */}
      <div className="absolute -left-[1.625rem] top-4 w-3 h-3 rounded-full border-2 border-gray-300 bg-white z-10" />

      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span>{getChannelIcon(dialog.channel)}</span>
          <span className="font-medium text-gray-900">
            {getChannelLabel(dialog.channel)}
          </span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-500">{dialog.time}</span>
          {durationLabel && (
            <>
              <span className="text-gray-400">·</span>
              <span className="text-gray-500">{durationLabel}</span>
            </>
          )}
        </div>
        <span className="text-gray-400 text-xs">
          {expanded ? "▾" : "▸"}
        </span>
      </div>

      {/* Collapsed summary */}
      {!expanded && (
        <div className="px-4 pb-3">
          <p className="text-sm text-gray-600 truncate">{dialog.summary}</p>
        </div>
      )}

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          {/* Tags row */}
          {(dialog.leadCreated || dialog.humanNeeded) && (
            <div className="flex flex-wrap gap-1.5">
              {dialog.leadCreated && (
                <>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${getIntentColor(dialog.leadCreated.intent)}`}
                  >
                    {dialog.leadCreated.intent}
                  </span>
                  {dialog.leadCreated.propertyType && (
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                      {dialog.leadCreated.propertyType}
                    </span>
                  )}
                  {dialog.leadCreated.location && (
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                      {dialog.leadCreated.location}
                    </span>
                  )}
                  {dialog.leadCreated.price && (
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                      {dialog.leadCreated.price}
                    </span>
                  )}
                </>
              )}
            </div>
          )}

          {/* Full summary */}
          <p className="text-sm text-gray-700">{dialog.summary}</p>

          {/* Content by channel type */}
          {dialog.channel === "phone" && (
            <div className="space-y-2">
              {/* Audio player placeholder */}
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-100">
                <button
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  ▶
                </button>
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full">
                  <div className="w-0 h-full bg-gray-400 rounded-full" />
                </div>
                <span className="text-xs text-gray-400">
                  {dialog.duration || "0:00"}
                </span>
              </div>
              {dialog.messages.length > 0 && (
                <button
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  Read transcription
                </button>
              )}
            </div>
          )}

          {dialog.channel === "whatsapp" && dialog.messages.length > 0 && (
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {dialog.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-1.5 rounded-lg text-sm ${
                      msg.sender === "client"
                        ? "bg-green-100 text-green-900"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p
                      className={`text-[10px] mt-0.5 ${
                        msg.sender === "client"
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {dialog.channel === "email" && (
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 text-sm text-gray-700">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                  Form submission
                </span>
              </div>
              <p>{dialog.summary}</p>
              <p className="text-xs text-gray-400 mt-1">
                Source: {dialog.source}
              </p>
            </div>
          )}

          {/* Human needed badge */}
          {dialog.humanNeeded && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-md text-xs font-medium text-amber-700">
              <span>👤</span> Human contact requested
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function LeadCreatedCard({ dialog }: { dialog: Dialog }) {
  const lead = dialog.leadCreated!;

  return (
    <div className="ml-6 relative">
      {/* Timeline dot — smaller, filled */}
      <div className="absolute -left-[1.375rem] top-3 w-2.5 h-2.5 rounded-full bg-emerald-500 z-10" />

      <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span>🎯</span>
            <span className="font-medium text-emerald-800">Lead created</span>
          </div>
          <button
            className="text-xs text-emerald-700 hover:text-emerald-800 font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            Open lead ↗
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          <span
            className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${getIntentColor(lead.intent)}`}
          >
            {lead.intent}
          </span>
          {lead.propertyType && (
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-white text-gray-700 border border-gray-200">
              {lead.propertyType}
            </span>
          )}
          {lead.location && (
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-white text-gray-700 border border-gray-200">
              {lead.location}
            </span>
          )}
          {lead.price && (
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-white text-gray-700 border border-gray-200">
              {lead.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function PanelC({ communication, onClose }: PanelProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [initialized, setInitialized] = useState<string | null>(null);

  // Build the timeline items
  const timeline = useMemo(() => {
    if (!communication) return [];
    return buildTimeline(communication.dialogs);
  }, [communication]);

  // Auto-expand latest dialog when communication changes
  if (
    communication &&
    communication.id !== initialized &&
    communication.dialogs.length > 0
  ) {
    setInitialized(communication.id);
    setExpandedIds(new Set([communication.dialogs[0].id]));
  }

  // Compute stats line
  const statsLine = useMemo(() => {
    if (!communication) return "";
    const dialogCount = communication.dialogs.length;
    const latestDialog = communication.dialogs[0];
    const leadCount = communication.dialogs.filter(
      (d) => d.leadCreated
    ).length;
    const humanRequested = communication.dialogs.some((d) => d.humanNeeded);

    const parts: string[] = [];
    parts.push(
      `${dialogCount} dialog${dialogCount !== 1 ? "s" : ""}`
    );
    if (latestDialog) {
      parts.push(
        `Last: ${formatDateLabel(latestDialog.date).toLowerCase()} ${latestDialog.time}`
      );
    }
    if (leadCount > 0) {
      parts.push(
        `${leadCount} lead${leadCount !== 1 ? "s" : ""} created`
      );
    }
    if (humanRequested) {
      parts.push("Human requested");
    }
    return parts.join(" \u00B7 ");
  }, [communication]);

  const toggleDialog = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const allDialogIds = communication
    ? communication.dialogs.map((d) => d.id)
    : [];
  const allExpanded =
    allDialogIds.length > 0 && allDialogIds.every((id) => expandedIds.has(id));

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedIds(new Set());
    } else {
      setExpandedIds(new Set(allDialogIds));
    }
  };

  return (
    <>
      {/* Backdrop */}
      {communication && (
        <div
          className="fixed inset-0 bg-black/10 z-40"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-[480px] bg-white border-l border-gray-200 shadow-xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          communication ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {communication && (
          <>
            {/* Sticky header */}
            <div className="flex-shrink-0 border-b border-gray-200 px-5 py-4 bg-white sticky top-0 z-10">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Client name */}
              <h2 className="text-lg font-semibold text-gray-900 pr-8">
                {communication.clientName || communication.clientPhone}
              </h2>

              {/* Phone + email */}
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                <span>{communication.clientPhone}</span>
                {communication.clientEmail && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span>{communication.clientEmail}</span>
                  </>
                )}
              </div>

              {/* Stats line */}
              <p className="mt-2 text-xs text-gray-400">{statsLine}</p>

              {/* Action buttons */}
              <div className="flex items-center gap-2 mt-3">
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                  <span>💬</span> WhatsApp
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                  <span>📞</span> Call
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                  Open Client <span className="text-gray-400">↗</span>
                </button>
              </div>
            </div>

            {/* Scrollable timeline area */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {/* Timeline container with vertical line */}
              <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute left-[0.3125rem] top-0 bottom-0 w-px bg-gray-200" />

                <div className="space-y-3">
                  {timeline.map((item) => {
                    if (item.type === "date-separator") {
                      return (
                        <div
                          key={item.key}
                          className="relative flex items-center py-1"
                        >
                          {/* Dot on timeline */}
                          <div className="absolute left-0 w-[0.625rem] h-[0.625rem] rounded-full bg-gray-300 z-10" />
                          <span className="ml-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {item.label}
                          </span>
                        </div>
                      );
                    }

                    if (item.type === "dialog") {
                      return (
                        <DialogCard
                          key={item.key}
                          dialog={item.dialog}
                          expanded={expandedIds.has(item.dialog.id)}
                          onToggle={() => toggleDialog(item.dialog.id)}
                        />
                      );
                    }

                    if (item.type === "lead-created") {
                      return (
                        <LeadCreatedCard
                          key={item.key}
                          dialog={item.dialog}
                        />
                      );
                    }

                    return null;
                  })}
                </div>
              </div>

              {/* Expand/Collapse all */}
              {allDialogIds.length > 1 && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={toggleAll}
                    className="text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors"
                  >
                    {allExpanded ? "Collapse all" : "Expand all"}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
