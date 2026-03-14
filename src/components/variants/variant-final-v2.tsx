"use client";

import { useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  conversations, getChannelIcon, getIntentColor, getDurationOrMessages,
} from "@/lib/conversations-data";
import { ConversationModal } from "@/components/conversation-modal";
import type { Conversation } from "@/lib/conversations-data";

function IntentBadge({ intent }: { intent: Conversation["intent"] }) {
  if (!intent) {
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 whitespace-nowrap">
        Not detected
      </span>
    );
  }
  const label = intent === "rent_out" ? "Rent Out"
    : intent === "irrelevant" ? "Irrelevant"
    : intent.charAt(0).toUpperCase() + intent.slice(1);
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${getIntentColor(intent)}`}>
      {label}
    </span>
  );
}

function HumanNeededIcon({ needed }: { needed: boolean }) {
  if (!needed) return null;

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="text-base cursor-default" title="Human contact requested">👤</span>
      {showTooltip && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1 bg-foreground text-background text-xs rounded-md whitespace-nowrap z-50 shadow-lg">
          Human contact requested
        </span>
      )}
    </span>
  );
}

export function VariantFinalV2() {
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Conversations</h2>
      <p className="text-sm text-muted-foreground mb-4">V2 — highlighted human-requested rows, &quot;Not detected&quot; intent</p>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Updated</TableHead>
              <TableHead className="w-8" />
              <TableHead className="w-[180px]">Client</TableHead>
              <TableHead className="w-[80px]">Intent</TableHead>
              <TableHead className="w-[70px]">Duration</TableHead>
              <TableHead className="w-8" />
              <TableHead>Summary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conversations.map((c) => (
              <TableRow
                key={c.id}
                className={`cursor-pointer hover:bg-muted/50 ${
                  c.humanNeeded
                    ? "bg-amber-50 border-l-2 border-l-amber-400 hover:bg-amber-100/60"
                    : ""
                }`}
                onClick={() => { setSelected(c); setOpen(true); }}
              >
                {/* Date/Time */}
                <TableCell className="text-sm text-muted-foreground">
                  {c.time}
                </TableCell>

                {/* Channel icon */}
                <TableCell className="text-center text-base px-1">
                  {getChannelIcon(c.channel)}
                </TableCell>

                {/* Client name */}
                <TableCell className="font-medium text-sm">
                  {c.clientName || c.clientPhone}
                </TableCell>

                {/* Intent */}
                <TableCell>
                  <IntentBadge intent={c.intent} />
                </TableCell>

                {/* Duration / Messages */}
                <TableCell className="text-sm text-muted-foreground">
                  {getDurationOrMessages(c)}
                </TableCell>

                {/* Human requested */}
                <TableCell className="text-center px-1">
                  <HumanNeededIcon needed={c.humanNeeded} />
                </TableCell>

                {/* Summary — last, fills remaining space */}
                <TableCell>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {c.summary}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ConversationModal conversation={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
}
