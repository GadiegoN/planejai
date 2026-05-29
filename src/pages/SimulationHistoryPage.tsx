import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { EmptyState } from "../components/features/SimulationHistory/EmptyState";
import { SimulationHistoryCard } from "../components/features/SimulationHistory/SimulationHistoryCard";
import { PageHero } from "../components/shared/PageHero";
import { useSimulationStorage } from "../hooks/useSimulationStorage";

export function SimulationHistoryPage() {
  const navigate = useNavigate();
  const { getAllSimulations, deleteSimulation } = useSimulationStorage();
  const [simulations, setSimulations] = useState(() => getAllSimulations());

  const handleDelete = (id: string) => {
    deleteSimulation(id);
    setSimulations((current) => current.filter((record) => record.id !== id));
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de Simulações"
        subtitle="Veja um resumo das suas simulações salvas e retome os insights gerados."
      />

      {simulations.length === 0 ? (
        <EmptyState onCreateSimulation={() => navigate("/")} />
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {simulations.map((simulation) => (
            <SimulationHistoryCard
              key={simulation.id}
              simulation={simulation}
              onDelete={handleDelete}
              onViewDetails={(id) => navigate(`/resultado/${id}`)}
            />
          ))}
        </section>
      )}
    </main>
  );
}
