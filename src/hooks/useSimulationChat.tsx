import { useCallback, useState } from "react";

import { buildChatPrompt } from "../data/chatPrompt";
import type { ChatMessage, SimulationRecord } from "../data/simulation";
import { getChatAnswer } from "../services/aiService";
import { useSimulationStorage } from "./useSimulationStorage";

export function useSimulationChat(simulationId: string) {
  const { getFormData, updateSimulation } = useSimulationStorage();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return getFormData(simulationId)?.chatMessages ?? [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendQuestion = useCallback(
    async (question: string) => {
      const simulation = getFormData(simulationId);
      const trimmedQuestion = question.trim();

      if (!simulation || !trimmedQuestion || isLoading) {
        return;
      }

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmedQuestion,
        createdAt: new Date().toISOString(),
      };

      const nextMessages = [...messages, userMessage];

      setMessages(nextMessages);
      setIsLoading(true);
      setError(null);

      try {
        const prompt = buildChatPrompt(simulation, messages, trimmedQuestion);
        const answer = await getChatAnswer(prompt);
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: answer,
          createdAt: new Date().toISOString(),
        };
        const updatedMessages = [...nextMessages, assistantMessage];

        setMessages(updatedMessages);
        updateSimulation(simulationId, {
          ...simulation,
          chatMessages: updatedMessages,
        } as SimulationRecord);
      } catch {
        setMessages(messages);
        setError("Não foi possível responder agora. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    },
    [getFormData, isLoading, messages, simulationId, updateSimulation],
  );

  return {
    messages,
    isLoading,
    error,
    sendQuestion,
  };
}
