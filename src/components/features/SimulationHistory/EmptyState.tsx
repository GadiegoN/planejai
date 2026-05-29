import { PiggyBank, Plus } from "lucide-react";

import { Button } from "../../shared/Button";

interface EmptyStateProps {
  onCreateSimulation: () => void;
}

export function EmptyState({ onCreateSimulation }: EmptyStateProps) {
  return (
    <section className="bg-card rounded-2xl border border-border p-8 text-center shadow-[4px_4px_18px_0px_rgba(0,0,0,0.12)]">
      <div className="bg-muted-primary mx-auto mb-4 flex size-14 items-center justify-center rounded-full">
        <PiggyBank size={28} className="text-primary" />
      </div>
      <h2 className="text-xl font-semibold">Nenhuma simulação salva</h2>
      <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm">
        Crie uma simulação para acompanhar seus objetivos e acessar os insights
        financeiros depois.
      </p>
      <Button
        className="mx-auto mt-6"
        icon={Plus}
        onClick={onCreateSimulation}
      >
        Nova simulação
      </Button>
    </section>
  );
}
