"use client";

import { useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  conversations, getChannelIcon, getIntentColor, getStatusColor, getDurationOrMessages, getChannelLabel,
  type Channel, type Conversation,
} from "@/lib/conversations-data";
import { ConversationModal } from "@/components/conversation-modal";

const channelGroups: { channel: Channel; label: string; borderColor: string }[] = [
  { channel: "phone", label: "Phone Calls", borderColor: "border-l-indigo-400" },
  { channel: "whatsapp", label: "WhatsApp Chats", borderColor: "border-l-emerald-400" },
  { channel: "email", label: "Email / Lead Forms", borderColor: "border-l-amber-400" },
];

export function VariantD() {
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [open, setOpen] = useState(false);

  const grouped = channelGroups.map((g) => ({
    ...g,
    items: conversations.filter((c) => c.channel === g.channel),
  }));

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Conversations</h2>
      <p className="text-sm text-muted-foreground mb-4">Grouped by channel</p>

      <div className="space-y-6">
        {grouped.map((group) => (
          <div key={group.channel} className={`border-l-2 ${group.borderColor} pl-0`}>
            {/* Group header */}
            <div className="bg-muted rounded-r-lg px-4 py-2 mb-2 flex items-center gap-2">
              <span className="text-base">{getChannelIcon(group.channel)}</span>
              <span className="font-semibold text-sm">
                {group.label} ({group.items.length})
              </span>
            </div>

            {/* Group table */}
            <div className="rounded-r-lg border border-l-0">
              <Table>
                <TableHeader>
                  <TableRow className="text-xs">
                    <TableHead className="w-[70px]">Time</TableHead>
                    <TableHead className="w-[180px]">Client</TableHead>
                    <TableHead>Summary</TableHead>
                    <TableHead className="w-[60px]">Intent</TableHead>
                    <TableHead className="w-[90px]">Source</TableHead>
                    <TableHead className="w-[60px]">Dur.</TableHead>
                    <TableHead className="w-[90px]">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.items.map((c) => (
                    <TableRow
                      key={c.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => { setSelected(c); setOpen(true); }}
                    >
                      <TableCell className="text-sm">
                        <div>{c.time}</div>
                        <div className="text-xs text-muted-foreground">{c.date.replace(", 2026", "")}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-sm">{c.clientName || c.clientPhone}</div>
                        {c.clientName && (
                          <div className="text-xs text-muted-foreground">{c.clientPhone}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground line-clamp-1">{c.summary}</p>
                      </TableCell>
                      <TableCell>
                        {c.intent ? (
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getIntentColor(c.intent)}`}>
                            {c.intent.charAt(0).toUpperCase() + c.intent.slice(1)}
                          </span>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-sm">{c.source}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{getDurationOrMessages(c)}</TableCell>
                      <TableCell>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(c.status)}`}>
                          {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
      </div>

      <ConversationModal conversation={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
}
