import { Clock, TrendingUp, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="border-b border-border px-6 py-3">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary flex size-9 items-center justify-center rounded-full">
            <Wallet size={20} className="text-primary-foreground" />
          </div>
          <span className="text-lg select-none">
            <span className="text-muted-foreground font-medium">Planej</span>
            <span className="font-extrabold">.ai</span>
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="secondary"
            icon={TrendingUp}
            onClick={() => navigate("/")}
          >
            <span className="hidden sm:inline">Nova simulação</span>
          </Button>
          <Button
            variant="secondary"
            icon={Clock}
            onClick={() => navigate("/historico")}
          >
            <span className="hidden sm:inline">Histórico</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}
