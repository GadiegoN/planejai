import {
  CalendarClock,
  CheckCircle2,
  Goal,
  PiggyBank,
  Trash2,
  Wallet,
} from "lucide-react";

import { Button } from "../../shared/Button";
import type { SimulationRecord } from "../../../data/simulation";
import { formatCurrency, parseCurrency } from "../../../utils/currency";
import { formatDate } from "../../../utils/date";
import { calcMonthlySavings } from "../../../utils/simulation";
import { MetricRow } from "./MetricRow";

interface SimulationHistoryCardProps {
  simulation: SimulationRecord;
  onDelete: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export function SimulationHistoryCard({
  simulation,
  onDelete,
  onViewDetails,
}: SimulationHistoryCardProps) {
  const monthlySavings = calcMonthlySavings(simulation);
  const goalAmount = parseCurrency(simulation.goalAmount);

  return (
    <article className="bg-card flex min-h-80 flex-col rounded-2xl border border-border p-5 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.12)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-primary mb-2 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase">
            <Goal size={16} />
            Meta
          </div>
          <h2 className="truncate text-xl font-semibold">
            {simulation.goalName}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Salva em {formatDate(simulation.createdAt)}
          </p>
        </div>
        <Button
          aria-label={`Excluir simulação ${simulation.goalName}`}
          className="shrink-0 px-3 text-red-500 hover:bg-red-500/10"
          variant="ghost"
          icon={Trash2}
          onClick={() => onDelete(simulation.id)}
        />
      </div>

      <div className="grid gap-3 text-sm">
        <MetricRow
          icon={Wallet}
          label="Custo da meta"
          value={formatCurrency(goalAmount)}
        />
        <MetricRow
          icon={CalendarClock}
          label="Prazo"
          value={`${simulation.goalDeadline} meses`}
        />
        <MetricRow
          icon={PiggyBank}
          label="Sobra mensal"
          value={formatCurrency(monthlySavings)}
        />
      </div>

      <div className="text-muted-foreground mt-5 flex items-center gap-2 text-sm">
        <CheckCircle2
          size={16}
          className={simulation.insight ? "text-primary" : "text-muted-foreground"}
        />
        {simulation.insight ? "Insights gerados" : "Insights pendentes"}
      </div>

      <Button
        className="mt-auto w-full"
        onClick={() => onViewDetails(simulation.id)}
      >
        Ver detalhes
      </Button>
    </article>
  );
}
