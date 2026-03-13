"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiItem {
  label: string;
  value: string | number;
}

interface KpiCardProps {
  title: string;
  mainValue: string | number;
  mainSuffix?: string;
  items?: KpiItem[];
  accent?: boolean;
  accentCondition?: boolean;
  badge?: string;
  badgeHighlight?: boolean;
  onClick?: () => void;
  className?: string;
}

export function KpiCard({
  title,
  mainValue,
  mainSuffix,
  items,
  accent,
  accentCondition,
  badge,
  badgeHighlight,
  onClick,
  className,
}: KpiCardProps) {
  const isAccent = accent && (accentCondition === undefined || accentCondition);

  return (
    <Card
      className={cn(
        "transition-all",
        isAccent && "border-red-300 bg-red-50",
        onClick && "cursor-pointer hover:shadow-md",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-5">
        <p
          className={cn(
            "text-sm font-medium mb-2",
            isAccent ? "text-red-600" : "text-muted-foreground"
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "text-3xl font-bold tracking-tight",
            isAccent ? "text-red-700" : "text-foreground"
          )}
        >
          {mainValue}
          {mainSuffix && (
            <span className="text-lg font-normal text-muted-foreground ml-1">
              {mainSuffix}
            </span>
          )}
        </p>
        {items && items.length > 0 && (
          <div className="mt-3 space-y-1">
            {items.map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        )}
        {badge && (
          <div
            className={cn(
              "mt-3 inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full",
              badgeHighlight
                ? "bg-amber-100 text-amber-700"
                : "bg-muted text-muted-foreground"
            )}
          >
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                badgeHighlight ? "bg-amber-500" : "bg-muted-foreground/50"
              )}
            />
            {badge}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
