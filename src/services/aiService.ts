interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
  }[];
}

export interface InsightData {
  feasibility: {
    status: "viable" | "needs_adjustment" | "unfeasible";
    content: string;
  };

  diagnosis: {
    content: string;
  };

  suggestions: {
    items: string[];
  };

  extraIncome: {
    items: string[];
  };

  investment: {
    items: string[];
  };

  motivation: {
    content: string;
  };
}

const API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY);

const MODEL_NAME = "gemini-2.5-flash";

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

const callGeminiAPI = async (prompt: string): Promise<GeminiResponse> => {
  const response = await fetch(GEMINI_API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro na requisição Gemini: ${response.status}`);
  }

  return response.json();
};

const extractJSON = (text: string) => {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("JSON não encontrado na resposta");
  }

  return text.slice(start, end + 1);
};

export const getInsight = async (prompt: string): Promise<InsightData> => {
  const response = await callGeminiAPI(prompt);

  const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("Resposta vazia da IA");
  }

  try {
    const cleanJSON = extractJSON(rawText);
    const parsed = JSON.parse(cleanJSON) as InsightData;
    return parsed;
  } catch (error) {
    console.error("Erro ao converter JSON:", rawText);
    throw new Error("A IA retornou um JSON inválido", { cause: error });
  }
};

export const getChatAnswer = async (prompt: string): Promise<string> => {
  const response = await callGeminiAPI(prompt);
  const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("Resposta vazia da IA");
  }

  return rawText.trim();
};
