import type { LucideIcon } from "lucide-react";

interface MetricRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function MetricRow({ icon: Icon, label, value }: MetricRowProps) {
  return (
    <div className="bg-secondary-button flex items-center justify-between gap-3 rounded-xl px-4 py-3">
      <span className="text-muted-foreground flex items-center gap-2">
        <Icon size={16} className="text-primary" />
        {label}
      </span>
      <strong>{value}</strong>
    </div>
  );
}
