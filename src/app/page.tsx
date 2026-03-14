"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";

const VariantFinalV2 = dynamic(() => import("@/components/variants/variant-final-v2").then(m => ({ default: m.VariantFinalV2 })), { loading: () => <p className="p-8 text-muted-foreground">Loading...</p> });
const VariantFinal = dynamic(() => import("@/components/variants/variant-final").then(m => ({ default: m.VariantFinal })), { loading: () => <p className="p-8 text-muted-foreground">Loading...</p> });
const VariantA = dynamic(() => import("@/components/variants/variant-a").then(m => ({ default: m.VariantA })), { loading: () => <p className="p-8 text-muted-foreground">Loading...</p> });
const VariantB = dynamic(() => import("@/components/variants/variant-b").then(m => ({ default: m.VariantB })), { loading: () => <p className="p-8 text-muted-foreground">Loading...</p> });
const VariantC = dynamic(() => import("@/components/variants/variant-c").then(m => ({ default: m.VariantC })), { loading: () => <p className="p-8 text-muted-foreground">Loading...</p> });
const VariantD = dynamic(() => import("@/components/variants/variant-d").then(m => ({ default: m.VariantD })), { loading: () => <p className="p-8 text-muted-foreground">Loading...</p> });
const VariantE = dynamic(() => import("@/components/variants/variant-e").then(m => ({ default: m.VariantE })), { loading: () => <p className="p-8 text-muted-foreground">Loading...</p> });

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b px-6 py-3">
        <h1 className="text-lg font-semibold">Placy — Conversations Page Prototypes</h1>
        <p className="text-sm text-muted-foreground">Click any row/card to open the conversation modal.</p>
      </div>
      <div className="px-6 py-4">
        <Tabs defaultValue="final-v2">
          <TabsList>
            <TabsTrigger value="final-v2">Final V2</TabsTrigger>
            <TabsTrigger value="final">Final V1</TabsTrigger>
            <TabsTrigger value="a">A: Classic Table</TabsTrigger>
            <TabsTrigger value="b">B: Card List</TabsTrigger>
            <TabsTrigger value="c">C: Compact + Tooltip</TabsTrigger>
            <TabsTrigger value="d">D: Grouped by Channel</TabsTrigger>
            <TabsTrigger value="e">E: Two-Line Rows</TabsTrigger>
          </TabsList>

          <TabsContent value="final-v2"><VariantFinalV2 /></TabsContent>
          <TabsContent value="final"><VariantFinal /></TabsContent>
          <TabsContent value="a"><VariantA /></TabsContent>
          <TabsContent value="b"><VariantB /></TabsContent>
          <TabsContent value="c"><VariantC /></TabsContent>
          <TabsContent value="d"><VariantD /></TabsContent>
          <TabsContent value="e"><VariantE /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
