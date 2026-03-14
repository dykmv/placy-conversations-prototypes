"use client";

import { useState } from "react";
import type { Communication, Dialog } from "@/lib/communications-data";
import {
  getChannelIcon,
  getIntentColor,
  getDurationOrMessages,
} from "@/lib/conversations-data";

interface PanelProps {
  communication: Communication | null;
  onClose: () => void;
}

function formatDateLabel(dateStr: string): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

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
  return dateStr;
}

function getDurationOrMsgsForDialog(dialog: Dialog): string {
  if (dialog.duration) return dialog.duration;
  if (dialog.messageCount) return `${dialog.messageCount} msgs`;
  return "—";
}

function groupDialogsByDate(dialogs: Dialog[]): Record<string, Dialog[]> {
  const groups: Record<string, Dialog[]> = {};
  for (const dialog of dialogs) {
    if (!groups[dialog.date]) {
      groups[dialog.date] = [];
    }
    groups[dialog.date].push(dialog);
  }
  return groups;
}

function AudioPlayerPlaceholder({ duration }: { duration: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
      <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
      <div className="flex h-2 flex-1 items-center gap-px">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="w-1 rounded-full bg-gray-300"
            style={{
              height: `${4 + Math.random() * 16}px`,
            }}
          />
        ))}
      </div>
      <span className="shrink-0 text-xs text-gray-500">{duration}</span>
    </div>
  );
}

function ChatBubbles({
  messages,
}: {
  messages: Dialog["messages"];
}) {
  return (
    <div className="flex flex-col gap-2">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
              msg.sender === "client"
                ? "bg-green-100 text-green-900"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            <p>{msg.text}</p>
            <p
              className={`mt-1 text-[11px] ${
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
  );
}

function EmailFormDisplay({ dialog }: { dialog: Dialog }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
      <div className="mb-2 flex items-center gap-2 text-gray-500">
        <span>📧</span>
        <span>Form submission</span>
        <span className="text-xs">— {dialog.time}</span>
      </div>
      <p className="text-gray-700">{dialog.summary}</p>
      <p className="mt-1 text-xs text-gray-400">Source: {dialog.source}</p>
    </div>
  );
}

function LeadCreatedCard({ lead }: { lead: NonNullable<Dialog["leadCreated"]> }) {
  return (
    <div className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-800">
        <span>🎯</span>
        <span>Lead created</span>
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">
          {lead.intent}
        </span>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
          {lead.propertyType}
        </span>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
          {lead.location}
        </span>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
          {lead.price}
        </span>
      </div>
      <button className="mt-2 text-xs font-medium text-emerald-700 transition-colors hover:text-emerald-900">
        Open lead ↗
      </button>
    </div>
  );
}

function DialogEntry({
  dialog,
  isLatest,
  expandedIds,
  toggleExpand,
}: {
  dialog: Dialog;
  isLatest: boolean;
  expandedIds: Set<string>;
  toggleExpand: (id: string) => void;
}) {
  const isExpanded = expandedIds.has(dialog.id);

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      {/* Collapsed row — always visible, acts as toggle */}
      <button
        onClick={() => toggleExpand(dialog.id)}
        className="flex w-full items-center gap-2 px-4 py-2.5 text-left transition-colors hover:bg-gray-50"
      >
        <span className="shrink-0 text-sm">
          {getChannelIcon(dialog.channel)}
        </span>
        <span className="shrink-0 text-xs text-gray-500">{dialog.time}</span>
        <span className="shrink-0 text-xs text-gray-400">
          {getDurationOrMsgsForDialog(dialog)}
        </span>
        <span className="min-w-0 flex-1 truncate text-sm text-gray-700">
          {dialog.summary}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4">
          {dialog.channel === "phone" && (
            <div className="space-y-3">
              <AudioPlayerPlaceholder duration={dialog.duration || "0:00"} />
              {dialog.messages.length > 0 && (
                <details className="group">
                  <summary className="cursor-pointer text-xs font-medium text-blue-600 hover:text-blue-800">
                    Read transcription
                  </summary>
                  <div className="mt-2">
                    <ChatBubbles messages={dialog.messages} />
                  </div>
                </details>
              )}
            </div>
          )}

          {dialog.channel === "whatsapp" && (
            <ChatBubbles messages={dialog.messages} />
          )}

          {dialog.channel === "email" && (
            <EmailFormDisplay dialog={dialog} />
          )}

          {dialog.leadCreated && (
            <LeadCreatedCard lead={dialog.leadCreated} />
          )}
        </div>
      )}
    </div>
  );
}

export function PanelA({ communication, onClose }: PanelProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // When communication changes, auto-expand the latest dialog
  const latestDialogId = communication?.dialogs[0]?.id;

  // Build effective expanded set: latest is always in unless explicitly toggled
  const [manualToggles, setManualToggles] = useState<
    Record<string, boolean>
  >({});
  const [lastCommId, setLastCommId] = useState<string | null>(null);

  // Reset manual toggles when communication changes
  if (communication && communication.id !== lastCommId) {
    setManualToggles({});
    setLastCommId(communication.id);
  }

  const effectiveExpanded = new Set<string>();
  if (communication) {
    // Latest dialog expanded by default
    if (latestDialogId && manualToggles[latestDialogId] !== false) {
      effectiveExpanded.add(latestDialogId);
    }
    // Other dialogs only if manually expanded
    for (const [id, val] of Object.entries(manualToggles)) {
      if (val) effectiveExpanded.add(id);
      else effectiveExpanded.delete(id);
    }
  }

  function toggleExpand(id: string) {
    setManualToggles((prev) => ({
      ...prev,
      [id]: !effectiveExpanded.has(id),
    }));
  }

  if (!communication) return null;

  const latestDialog = communication.dialogs[0];
  const dialogsByDate = groupDialogsByDate(communication.dialogs);
  const dateKeys = Object.keys(dialogsByDate);

  return (
    <div
      className="fixed right-0 top-0 z-50 flex h-full w-[480px] flex-col border-l border-gray-200 bg-white shadow-xl transition-transform duration-300"
    >
      {/* Header — sticky */}
      <div className="shrink-0 border-b border-gray-200 px-5 py-4">
        {/* Close button */}
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-gray-900">
              {communication.clientName || communication.clientPhone}
            </h2>
            <div className="mt-0.5 flex flex-col gap-0.5">
              <span className="text-sm text-gray-500">
                {communication.clientPhone}
              </span>
              {communication.clientEmail && (
                <span className="text-sm text-gray-500">
                  {communication.clientEmail}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Action buttons */}
        <div className="mt-3 flex gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50">
            <span>💬</span> WhatsApp
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50">
            <span>📞</span> Call
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50">
            Open Client ↗
          </button>
        </div>
      </div>

      {/* Summary block — the hero */}
      <div className="shrink-0 border-b border-gray-200 px-5 py-4">
        <p className="text-sm leading-relaxed text-gray-800">
          {latestDialog?.summary || "No summary available."}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {communication.intent && (
            <span
              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getIntentColor(communication.intent)}`}
            >
              {communication.intent}
            </span>
          )}
          {communication.propertyType && (
            <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {communication.propertyType}
            </span>
          )}
          {communication.location && (
            <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {communication.location}
            </span>
          )}
          {communication.price && (
            <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {communication.price}
            </span>
          )}
        </div>

        {/* Human needed banner */}
        {latestDialog?.humanNeeded && (
          <div className="mt-3 flex items-center gap-2 rounded-md bg-amber-50 border border-amber-200 px-3 py-2 text-sm text-amber-800">
            <span>👤</span>
            <span>Human contact requested — Pending</span>
          </div>
        )}
      </div>

      {/* Timeline — scrollable */}
      <div className="flex-1 overflow-y-auto">
        {dateKeys.map((dateKey) => (
          <div key={dateKey}>
            {/* Date separator */}
            <div className="sticky top-0 z-10 flex items-center gap-3 bg-gray-50/95 px-5 py-2 backdrop-blur-sm">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="shrink-0 text-xs font-medium text-gray-500">
                {formatDateLabel(dateKey)}
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Dialogs for this date */}
            {dialogsByDate[dateKey].map((dialog) => (
              <DialogEntry
                key={dialog.id}
                dialog={dialog}
                isLatest={dialog.id === latestDialogId}
                expandedIds={effectiveExpanded}
                toggleExpand={toggleExpand}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
