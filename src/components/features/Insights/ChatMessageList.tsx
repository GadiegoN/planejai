import { useEffect, useRef } from "react";

import type { ChatMessage } from "../../../data/simulation";

interface ChatMessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export function ChatMessageList({ messages, isLoading }: ChatMessageListProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <p className="text-muted-foreground rounded-xl border border-border p-4 text-sm">
        Faça uma pergunta sobre sua meta, prazo, orçamento ou próximos passos.
      </p>
    );
  }

  return (
    <div className="max-h-80 space-y-3 overflow-y-auto pr-1 [scrollbar-color:var(--border)_transparent]">
      {messages.map((message) => (
        <div
          key={message.id}
          className={[
            "flex",
            message.role === "user" ? "justify-end" : "justify-start",
          ].join(" ")}
        >
          <p
            className={[
              "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary-button text-foreground",
            ].join(" ")}
          >
            {message.content}
          </p>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <p className="bg-secondary-button text-muted-foreground max-w-[85%] rounded-2xl px-4 py-3 text-sm">
            O educador financeiro está analisando sua pergunta...
          </p>
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}
