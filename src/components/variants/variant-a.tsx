"use client";

import { useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  conversations, getChannelIcon, getIntentColor, getStatusColor, getDurationOrMessages,
} from "@/lib/conversations-data";
import { ConversationModal } from "@/components/conversation-modal";
import type { Conversation } from "@/lib/conversations-data";

export function VariantA() {
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Conversations</h2>
      <p className="text-sm text-muted-foreground mb-4">Classic table with enhanced cells</p>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              <TableHead className="w-[90px]">Date</TableHead>
              <TableHead className="w-[180px]">Client</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead className="w-[70px]">Intent</TableHead>
              <TableHead className="w-[100px]">Source</TableHead>
              <TableHead className="w-[70px]">Duration</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conversations.map((c) => (
              <TableRow
                key={c.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => { setSelected(c); setOpen(true); }}
              >
                <TableCell className="text-center">{getChannelIcon(c.channel)}</TableCell>
                <TableCell>
                  <div className="text-sm">{c.date.replace(", 2026", "")}</div>
                  <div className="text-xs text-muted-foreground">{c.time}</div>
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
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
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

      <ConversationModal conversation={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
}
