"use client";

import { useState } from "react";
import {
  conversations, getChannelIcon, getIntentColor, getStatusColor, getDurationOrMessages,
} from "@/lib/conversations-data";
import { ConversationModal } from "@/components/conversation-modal";
import type { Conversation } from "@/lib/conversations-data";

export function VariantE() {
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Conversations</h2>
      <p className="text-sm text-muted-foreground mb-4">Two-line rows — summary visible inline</p>

      <div className="rounded-lg border divide-y">
        {conversations.map((c) => (
          <div
            key={c.id}
            className="px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => { setSelected(c); setOpen(true); }}
          >
            {/* Line 1 */}
            <div className="flex items-center gap-3">
              <span className="text-base shrink-0">{getChannelIcon(c.channel)}</span>
              <span className="font-medium text-sm">{c.clientName || c.clientPhone}</span>
              {c.clientName && (
                <span className="text-xs text-muted-foreground">{c.clientPhone}</span>
              )}
              <span className="flex-1" />
              {c.intent && (
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${getIntentColor(c.intent)}`}>
                  {c.intent.charAt(0).toUpperCase() + c.intent.slice(1)}
                </span>
              )}
              <span className="text-xs text-muted-foreground shrink-0">
                {getDurationOrMessages(c)}
              </span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${getStatusColor(c.status)}`}>
                {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
              </span>
              <span className="text-xs text-muted-foreground shrink-0">{c.time}</span>
            </div>

            {/* Line 2 */}
            <div className="flex items-center gap-2 mt-1.5 ml-[30px]">
              <p className="text-sm text-muted-foreground line-clamp-1 flex-1">{c.summary}</p>
              <span className="text-xs bg-muted px-1.5 py-0.5 rounded shrink-0">{c.source}</span>
              {c.location && (
                <span className="text-xs bg-muted px-1.5 py-0.5 rounded shrink-0">{c.location}</span>
              )}
              {c.refNumber && (
                <span className="text-xs bg-muted px-1.5 py-0.5 rounded shrink-0">#{c.refNumber}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <ConversationModal conversation={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
}
