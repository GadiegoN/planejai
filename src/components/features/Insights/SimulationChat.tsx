import { MessageCircle } from "lucide-react";

import { useSimulationChat } from "../../../hooks/useSimulationChat";
import { ChatForm } from "./ChatForm";
import { ChatMessageList } from "./ChatMessageList";

interface SimulationChatProps {
  simulationId: string;
}

export function SimulationChat({ simulationId }: SimulationChatProps) {
  const { messages, isLoading, error, sendQuestion } =
    useSimulationChat(simulationId);

  return (
    <section className="mt-8 border-t border-border pt-6">
      <div className="mb-4 flex items-center gap-2">
        <MessageCircle size={18} className="text-primary" />
        <h2 className="text-sm font-semibold">
          Conversando com o Educador Financeiro
        </h2>
      </div>

      <ChatMessageList messages={messages} isLoading={isLoading} />

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      <ChatForm isLoading={isLoading} onSubmit={sendQuestion} />
    </section>
  );
}
