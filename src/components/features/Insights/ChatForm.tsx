import { Send } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

import { Button } from "../../shared/Button";

interface ChatFormProps {
  isLoading: boolean;
  onSubmit: (question: string) => void;
}

export function ChatForm({ isLoading, onSubmit }: ChatFormProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!question.trim() || isLoading) {
      return;
    }

    onSubmit(question);
    setQuestion("");
  };

  return (
    <form
      className="mt-4 flex flex-col gap-3 sm:flex-row"
      onSubmit={handleSubmit}
    >
      <input
        className="bg-input text-foreground placeholder:text-muted-foreground min-h-12 flex-1 rounded-2xl px-4 text-sm shadow-[4px_4px_18px_0px_rgba(0,0,0,0.12)] outline-none"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        placeholder="Pergunte sobre sua simulação"
        disabled={isLoading}
      />
      <Button
        className="min-h-12 shrink-0"
        icon={Send}
        type="submit"
        disabled={!question.trim() || isLoading}
      >
        Enviar
      </Button>
    </form>
  );
}
