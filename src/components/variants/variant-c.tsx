"use client";

import { useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Tooltip, TooltipContent, TooltipTrigger, TooltipProvider,
} from "@/components/ui/tooltip";
import {
  conversations, getChannelIcon, getIntentColor, getStatusColor, getDurationOrMessages,
} from "@/lib/conversations-data";
import { ConversationModal } from "@/components/conversation-modal";
import type { Conversation } from "@/lib/conversations-data";

function LeadDots({ level }: { level: number }) {
  return (
    <span className="text-xs tracking-wider">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < level ? "text-amber-500" : "text-gray-300"}>●</span>
      ))}
    </span>
  );
}

export function VariantC() {
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Conversations</h2>
      <p className="text-sm text-muted-foreground mb-4">Compact table — hover for summary</p>

      <TooltipProvider delayDuration={200}>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="text-xs">
                <TableHead className="w-6" />
                <TableHead className="w-[60px]">Time</TableHead>
                <TableHead className="w-[150px]">Client</TableHead>
                <TableHead className="w-[50px]">Intent</TableHead>
                <TableHead className="w-[180px]">Property</TableHead>
                <TableHead className="w-[70px]">Ref #</TableHead>
                <TableHead className="w-[80px]">Source</TableHead>
                <TableHead className="w-[60px]">Dur.</TableHead>
                <TableHead className="w-[80px]">Status</TableHead>
                <TableHead className="w-[70px]">Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conversations.map((c) => (
                <Tooltip key={c.id}>
                  <TooltipTrigger asChild>
                    <TableRow
                      className="cursor-pointer hover:bg-muted/50 text-xs"
                      onClick={() => { setSelected(c); setOpen(true); }}
                    >
                      <TableCell className="py-1.5 text-center">{getChannelIcon(c.channel)}</TableCell>
                      <TableCell className="py-1.5">{c.time}</TableCell>
                      <TableCell className="py-1.5 font-medium">{c.clientName || c.clientPhone}</TableCell>
                      <TableCell className="py-1.5">
                        {c.intent ? (
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${getIntentColor(c.intent)}`}>
                            {c.intent.charAt(0).toUpperCase() + c.intent.slice(1)}
                          </span>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="py-1.5 text-muted-foreground truncate max-w-[180px]">
                        {[c.propertyType, c.location].filter(Boolean).join(", ") || "—"}
                      </TableCell>
                      <TableCell className="py-1.5 text-muted-foreground">{c.refNumber || "—"}</TableCell>
                      <TableCell className="py-1.5">{c.source}</TableCell>
                      <TableCell className="py-1.5 text-muted-foreground">{getDurationOrMessages(c)}</TableCell>
                      <TableCell className="py-1.5">
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${getStatusColor(c.status)}`}>
                          {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="py-1.5"><LeadDots level={c.leadLevel} /></TableCell>
                    </TableRow>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-sm text-sm">
                    <p className="font-medium mb-1">{c.clientName || c.clientPhone}</p>
                    <p>{c.summary}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TableBody>
          </Table>
        </div>
      </TooltipProvider>

      <ConversationModal conversation={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
}
