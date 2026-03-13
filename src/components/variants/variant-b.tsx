"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  conversations, getChannelIcon, getIntentColor, getStatusColor, getDurationOrMessages, getChannelLabel,
} from "@/lib/conversations-data";
import { ConversationModal } from "@/components/conversation-modal";
import type { Conversation } from "@/lib/conversations-data";

export function VariantB() {
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Conversations</h2>
      <p className="text-sm text-muted-foreground mb-4">Card list with rich previews</p>

      <div className="flex flex-col gap-3 max-w-4xl">
        {conversations.map((c) => (
          <Card
            key={c.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => { setSelected(c); setOpen(true); }}
          >
            <CardContent className="p-4">
              {/* Line 1: Client + meta */}
              <div className="flex items-center gap-2">
                <span className="text-base">{getChannelIcon(c.channel)}</span>
                <span className="font-semibold text-sm">{c.clientName || c.clientPhone}</span>
                {c.clientName && (
                  <span className="text-xs text-muted-foreground">{c.clientPhone}</span>
                )}
                <span className="flex-1" />
                <span className="text-xs text-muted-foreground">{c.time}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  {getDurationOrMessages(c)}
                </span>
              </div>

              {/* Line 2: RE tags */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {c.intent && (
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getIntentColor(c.intent)}`}>
                    {c.intent.charAt(0).toUpperCase() + c.intent.slice(1)}
                  </span>
                )}
                {c.propertyType && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {c.propertyType.charAt(0).toUpperCase() + c.propertyType.slice(1)}
                  </span>
                )}
                {c.location && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {c.location}
                  </span>
                )}
                {c.refNumber && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    #{c.refNumber}
                  </span>
                )}
                {c.price && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {c.price}
                  </span>
                )}
              </div>

              {/* Line 3: Summary */}
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                {c.summary}
              </p>

              {/* Line 4: Source + Status */}
              <div className="flex items-center mt-2">
                <span className="text-xs text-muted-foreground">{c.source} · {c.date}</span>
                <span className="flex-1" />
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(c.status)}`}>
                  {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ConversationModal conversation={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
}
