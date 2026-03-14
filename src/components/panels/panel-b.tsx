"use client";

import { useState, useEffect } from "react";
import type { Communication, Dialog } from "@/lib/communications-data";
import { getChannelIcon, getIntentColor, getDurationOrMessages } from "@/lib/conversations-data";

interface PanelProps {
  communication: Communication | null;
  onClose: () => void;
}

function getChannelLabel(channel: string): string {
  switch (channel) {
    case "phone": return "Phone";
    case "whatsapp": return "WhatsApp";
    case "email": return "Email";
    default: return channel;
  }
}

function formatIntent(intent: string | null): string {
  if (!intent) return "Unknown";
  switch (intent) {
    case "buy": return "Buy";
    case "rent": return "Rent";
    case "sell": return "Sell";
    case "rent_out": return "Rent Out";
    case "irrelevant": return "Irrelevant";
    default: return intent;
  }
}

function AudioPlayerPlaceholder({ duration }: { duration: string | null }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700">
        <svg className="h-4 w-4 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
        </svg>
      </button>
      <div className="flex-1">
        <div className="flex items-center gap-1">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-blue-300"
              style={{ height: `${Math.random() * 20 + 4}px` }}
            />
          ))}
        </div>
      </div>
      <span className="shrink-0 text-sm text-gray-500">{duration ?? "0:00"}</span>
    </div>
  );
}

function ChatBubbles({ messages }: { messages: { sender: string; text: string; time: string }[] }) {
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
                : "bg-gray-100 text-gray-900"
            }`}
          >
            <p>{msg.text}</p>
            <p className={`mt-1 text-xs ${msg.sender === "client" ? "text-green-600" : "text-gray-400"}`}>
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
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <h4 className="mb-3 text-sm font-medium text-gray-700">Form Submission</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Source</span>
          <span className="font-medium text-gray-900">{dialog.source}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Dialog ID</span>
          <span className="font-mono text-xs text-gray-600">{dialog.id}</span>
        </div>
      </div>
    </div>
  );
}

export function PanelB({ communication, onClose }: PanelProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Reset to first tab (newest) when communication changes
  useEffect(() => {
    setActiveTab(0);
  }, [communication?.id]);

  if (!communication) return null;

  const { dialogs } = communication;
  const activeDialog = dialogs[activeTab];

  // Build a pseudo-Conversation object for getDurationOrMessages
  const durationDisplay = activeDialog.duration
    ? activeDialog.duration
    : activeDialog.messageCount
    ? `${activeDialog.messageCount} msgs`
    : "\u2014";

  return (
    <div className="fixed right-0 top-0 z-50 flex h-full w-[480px] flex-col border-l border-gray-200 bg-white shadow-xl animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="shrink-0 border-b border-gray-100 px-5 py-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Client info */}
        <h2 className="pr-8 text-lg font-semibold text-gray-900">
          {communication.clientName ?? communication.clientPhone}
        </h2>
        <div className="mt-1 flex flex-col gap-0.5 text-sm text-gray-500">
          <span>{communication.clientPhone}</span>
          {communication.clientEmail && <span>{communication.clientEmail}</span>}
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {communication.intent && (
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getIntentColor(communication.intent)}`}>
              {formatIntent(communication.intent)}
            </span>
          )}
          {communication.propertyType && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {communication.propertyType}
            </span>
          )}
          {communication.location && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {communication.location}
            </span>
          )}
          {communication.price && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {communication.price}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-3 flex gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
            <span>💬</span> WhatsApp
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
            <span>📞</span> Call
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
            Open Client <span className="text-gray-400">↗</span>
          </button>
        </div>
      </div>

      {/* Dialog tabs */}
      <div className="shrink-0 border-b border-gray-200">
        <div className="flex overflow-x-auto px-2">
          {dialogs.map((dialog, index) => (
            <button
              key={dialog.id}
              onClick={() => setActiveTab(index)}
              className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                activeTab === index
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              <span>{getChannelIcon(dialog.channel)}</span>
              <span>{dialog.time}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active dialog content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {activeDialog && (
          <div className="flex flex-col gap-4">
            {/* Dialog metadata */}
            <div>
              <p className="text-sm text-gray-500">
                {activeDialog.date} &middot; via {getChannelLabel(activeDialog.channel)} from {activeDialog.source}
              </p>
              <p className="mt-0.5 text-xs text-gray-400">
                {activeDialog.id} &middot; {durationDisplay}
              </p>
            </div>

            {/* Summary */}
            <div className="rounded-lg bg-gray-50 p-3">
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Summary</h4>
              <p className="text-sm leading-relaxed text-gray-700">{activeDialog.summary}</p>
            </div>

            {/* Full content */}
            <div>
              {activeDialog.channel === "phone" && (
                <div className="flex flex-col gap-3">
                  <AudioPlayerPlaceholder duration={activeDialog.duration} />
                  <button className="self-start text-sm font-medium text-blue-600 hover:text-blue-700">
                    Read transcription
                  </button>
                  {/* Show transcription as chat bubbles if messages exist */}
                  {activeDialog.messages.length > 0 && (
                    <ChatBubbles messages={activeDialog.messages} />
                  )}
                </div>
              )}

              {activeDialog.channel === "whatsapp" && (
                <ChatBubbles messages={activeDialog.messages} />
              )}

              {activeDialog.channel === "email" && (
                <EmailFormDisplay dialog={activeDialog} />
              )}
            </div>

            {/* Human needed banner */}
            {activeDialog.humanNeeded && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                <p className="text-sm font-medium text-amber-800">
                  👤 Human contact requested
                </p>
              </div>
            )}

            {/* Lead created card */}
            {activeDialog.leadCreated && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <p className="mb-2 text-sm font-semibold text-emerald-800">🎯 Lead created</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-emerald-600">Intent</span>
                    <span className="font-medium text-emerald-900">{formatIntent(activeDialog.leadCreated.intent)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600">Property</span>
                    <span className="font-medium text-emerald-900">{activeDialog.leadCreated.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600">Location</span>
                    <span className="font-medium text-emerald-900">{activeDialog.leadCreated.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600">Price</span>
                    <span className="font-medium text-emerald-900">{activeDialog.leadCreated.price}</span>
                  </div>
                </div>
                <button className="mt-3 text-sm font-medium text-emerald-700 hover:text-emerald-800">
                  Open lead ↗
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
