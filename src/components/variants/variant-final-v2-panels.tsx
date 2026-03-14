"use client";

import { useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  conversations, getChannelIcon, getIntentColor, getDurationOrMessages,
} from "@/lib/conversations-data";
import {
  communications, panelDemoConversationIds,
} from "@/lib/communications-data";
import type { Conversation } from "@/lib/conversations-data";
import type { Communication } from "@/lib/communications-data";
import { PanelA } from "@/components/panels/panel-a";
import { PanelB } from "@/components/panels/panel-b";
import { PanelC } from "@/components/panels/panel-c";

type PanelVariant = "a" | "b" | "c";

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

// Filter to only the 4 demo conversations
const demoConversations = conversations.filter(c =>
  panelDemoConversationIds.includes(c.id)
);

function findCommunication(conversationId: string): Communication | null {
  return communications.find(comm =>
    comm.dialogs.some(d => d.id === conversationId)
  ) ?? null;
}

export function VariantFinalV2Panels() {
  const [panelVariant, setPanelVariant] = useState<PanelVariant>("a");
  const [selectedComm, setSelectedComm] = useState<Communication | null>(null);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);

  const handleRowClick = (c: Conversation) => {
    const comm = findCommunication(c.id);
    setSelectedComm(comm);
    setSelectedConvId(c.id);
  };

  const handleClose = () => {
    setSelectedComm(null);
    setSelectedConvId(null);
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Conversations</h2>
      <p className="text-sm text-muted-foreground mb-3">Click a row to open the detail panel on the right</p>

      {/* Panel variant sub-tabs */}
      <div className="inline-flex rounded-lg bg-muted p-0.5 mb-4">
        {([
          { key: "a" as PanelVariant, label: "A: Summary-first" },
          { key: "b" as PanelVariant, label: "B: Dialog Viewer" },
          { key: "c" as PanelVariant, label: "C: Timeline" },
        ]).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setPanelVariant(key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              panelVariant === key
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Table — narrows when panel is open */}
      <div className={`transition-all duration-300 ${selectedComm ? "mr-[500px]" : ""}`}>
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
              {demoConversations.map((c) => (
                <TableRow
                  key={c.id}
                  className={`cursor-pointer hover:bg-muted/50 ${
                    c.humanNeeded
                      ? "bg-amber-50 border-l-2 border-l-amber-400 hover:bg-amber-100/60"
                      : ""
                  } ${
                    selectedConvId === c.id
                      ? "bg-blue-50 hover:bg-blue-100/60 ring-1 ring-blue-200"
                      : ""
                  }`}
                  onClick={() => handleRowClick(c)}
                >
                  <TableCell className="text-sm text-muted-foreground">
                    {c.time}
                  </TableCell>
                  <TableCell className="text-center text-base px-1">
                    {getChannelIcon(c.channel)}
                  </TableCell>
                  <TableCell className="font-medium text-sm">
                    {c.clientName || c.clientPhone}
                  </TableCell>
                  <TableCell>
                    <IntentBadge intent={c.intent} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {getDurationOrMessages(c)}
                  </TableCell>
                  <TableCell className="text-center px-1">
                    <HumanNeededIcon needed={c.humanNeeded} />
                  </TableCell>
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
      </div>

      {/* Panel */}
      {panelVariant === "a" && (
        <PanelA communication={selectedComm} onClose={handleClose} />
      )}
      {panelVariant === "b" && (
        <PanelB communication={selectedComm} onClose={handleClose} />
      )}
      {panelVariant === "c" && (
        <PanelC communication={selectedComm} onClose={handleClose} />
      )}
    </div>
  );
}
