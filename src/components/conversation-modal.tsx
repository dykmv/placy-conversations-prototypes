"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  type Conversation,
  getChannelLabel,
  getIntentColor,
  getStatusColor,
} from "@/lib/conversations-data";

interface ConversationModalProps {
  conversation: Conversation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConversationModal({
  conversation,
  open,
  onOpenChange,
}: ConversationModalProps) {
  if (!conversation) return null;

  const c = conversation;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            {c.clientName || c.clientPhone}
            <Badge variant="outline" className={getStatusColor(c.status)}>
              {c.status}
            </Badge>
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {c.date} {c.time} · via {getChannelLabel(c.channel)} · {c.id}
          </p>
        </DialogHeader>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {c.intent && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getIntentColor(c.intent)}`}>
              {c.intent.charAt(0).toUpperCase() + c.intent.slice(1)}
            </span>
          )}
          {c.propertyType && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
              {c.propertyType.charAt(0).toUpperCase() + c.propertyType.slice(1)}
            </span>
          )}
          {c.location && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
              {c.location}
            </span>
          )}
          {c.refNumber && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
              #{c.refNumber}
            </span>
          )}
          {c.price && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
              {c.price}
            </span>
          )}
        </div>

        <Separator />

        {/* Summary */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Summary</h4>
          <p className="text-sm leading-relaxed">{c.summary}</p>
        </div>

        <Separator />

        {/* Audio player for calls */}
        {c.channel === "phone" && c.duration && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Call Recording</h4>
            <div className="bg-muted rounded-lg p-4 flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center text-sm shrink-0">
                ▶
              </button>
              <div className="flex-1">
                <div className="h-8 bg-muted-foreground/20 rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-foreground/40 rounded-full" />
                </div>
              </div>
              <span className="text-sm text-muted-foreground shrink-0">
                0:00 / {c.duration}
              </span>
            </div>
            <button className="text-sm text-primary mt-2 hover:underline">
              ↓ Read transcription
            </button>
          </div>
        )}

        {/* Chat messages for WhatsApp */}
        {c.channel === "whatsapp" && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Conversation</h4>
            <div className="space-y-3">
              {/* Simulated messages */}
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium shrink-0">
                  P
                </div>
                <div className="bg-muted rounded-lg px-3 py-2 text-sm max-w-[80%]">
                  Hello! Thank you for contacting us. How can I help you today?
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <div className="bg-emerald-100 rounded-lg px-3 py-2 text-sm max-w-[80%]">
                  {c.summary.split(".")[0]}.
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-200 flex items-center justify-center text-xs font-medium shrink-0">
                  {c.clientName ? c.clientName.split(" ").map(n => n[0]).join("") : "?"}
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium shrink-0">
                  P
                </div>
                <div className="bg-muted rounded-lg px-3 py-2 text-sm max-w-[80%]">
                  I have several options that might work for you. Let me check our listings...
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {c.messageCount ? `${c.messageCount} messages total` : ""} · View full conversation
              </p>
            </div>
          </div>
        )}

        {/* Lead form for email */}
        {c.channel === "email" && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Lead Form Submission</h4>
            <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Source</span>
                <span>{c.source}</span>
              </div>
              {c.refNumber && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ref #</span>
                  <span>{c.refNumber}</span>
                </div>
              )}
              {c.clientEmail && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span>{c.clientEmail}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone</span>
                <span>{c.clientPhone}</span>
              </div>
            </div>
          </div>
        )}

        <Separator />

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Channel</span>
            <span>{getChannelLabel(c.channel)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Language</span>
            <span>{c.language}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Lead Level</span>
            <span>{"★".repeat(c.leadLevel)}{"☆".repeat(5 - c.leadLevel)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Human Needed</span>
            <span>{c.humanNeeded ? "Yes" : "No"}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button className="flex-1 h-9 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
            💬 WhatsApp
          </button>
          <button className="flex-1 h-9 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2">
            📞 Call {c.clientPhone}
          </button>
          <button className="h-9 px-4 rounded-lg border text-sm font-medium hover:bg-muted transition-colors">
            Open Lead
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
