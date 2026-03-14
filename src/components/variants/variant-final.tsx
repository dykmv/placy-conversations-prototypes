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

export function VariantFinal() {
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Conversations</h2>
      <p className="text-sm text-muted-foreground mb-4">Final — optimized for quality check & search</p>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Updated</TableHead>
              <TableHead className="w-8" />
              <TableHead className="w-[180px]">Client</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead className="w-[80px]">Intent</TableHead>
              <TableHead className="w-8" />
              <TableHead className="w-[70px]">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conversations.map((c) => (
              <TableRow
                key={c.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => { setSelected(c); setOpen(true); }}
              >
                {/* Date/Time — first, consistent with Leads page */}
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

                {/* Summary */}
                <TableCell>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {c.summary}
                  </p>
                </TableCell>

                {/* Intent badge */}
                <TableCell>
                  {c.intent ? (
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${getIntentColor(c.intent)}`}>
                      {c.intent === "rent_out" ? "Rent Out" : c.intent.charAt(0).toUpperCase() + c.intent.slice(1)}
                    </span>
                  ) : (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 whitespace-nowrap">
                      Irrelevant
                    </span>
                  )}
                </TableCell>

                {/* Human requested icon */}
                <TableCell className="text-center px-1">
                  {c.humanNeeded && (
                    <span className="text-base" title="Human requested">👤</span>
                  )}
                </TableCell>

                {/* Duration / Messages */}
                <TableCell className="text-sm text-muted-foreground text-right">
                  {getDurationOrMessages(c)}
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
