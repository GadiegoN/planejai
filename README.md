# Planej.ai

Planej.ai é uma aplicação React para simulação de metas financeiras pessoais com geração de insights por IA. O usuário informa renda, custos, dívidas, valor da meta e prazo desejado; a aplicação calcula a capacidade mensal disponível, gera um diagnóstico financeiro e permite continuar uma conversa com um educador financeiro virtual sobre a simulação.

## Funcionalidades

- Formulário guiado em etapas para criação de simulações financeiras.
- Cálculo de sobra mensal com base em renda, custos fixos e dívidas.
- Página de resultado com resumo da meta, prazo, renda, custos e parcelas.
- Geração de insight financeiro personalizado com Gemini.
- Chat com educador financeiro dentro do resultado da simulação.
- Histórico completo de perguntas e respostas por simulação.
- Página de histórico com resumo de todas as simulações salvas.
- Abertura de detalhes de uma simulação salva mantendo insights e conversas já gerados.
- Exclusão de simulações do histórico.
- Persistência local via `localStorage`.
- Tema claro/escuro.
- Layout responsivo.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Lucide React
- React Loading Skeleton
- Gemini API
- pnpm

## Requisitos

- Node.js compatível com Vite 8
- pnpm instalado
- Chave de API do Gemini

## Configuração

Instale as dependências:

```bash
pnpm install
```

Crie o arquivo `.env` na raiz do projeto usando o `.env.example` como base:

```bash
VITE_GEMINI_API_KEY=sua_chave_aqui
```

Sem essa variável, as telas continuam funcionando, mas a geração de insights e respostas do chat falhará ao chamar a API.

## Scripts

Executar em desenvolvimento:

```bash
pnpm dev
```

Gerar build de produção:

```bash
pnpm build
```

Executar lint:

```bash
pnpm lint
```

Pré-visualizar build:

```bash
pnpm preview
```

## Rotas

- `/` - criação de nova simulação.
- `/resultado/:id` - resultado da simulação, insight financeiro e conversa com o educador financeiro.
- `/historico` - lista de simulações salvas.

## Persistência

Os dados são salvos no `localStorage` usando a chave `simulation-data`.

Cada registro de simulação contém:

- dados preenchidos no formulário;
- `id` único;
- data de criação;
- insight gerado pela IA;
- histórico de mensagens do chat.

Isso permite consultar novamente resultados e conversas sem uma nova chamada à IA, desde que os dados continuem no navegador.

## Integração com IA

A integração fica centralizada em `src/services/aiService.ts`.

Existem dois fluxos:

- `getInsight`: gera o diagnóstico inicial em JSON estruturado.
- `getChatAnswer`: retorna texto natural para perguntas feitas no chat.

Os prompts ficam separados em:

- `src/data/aiPrompt.ts` para o insight inicial.
- `src/data/chatPrompt.ts` para a conversa com o educador financeiro.

As instruções dos prompts evitam recomendações de alto risco, como apostas, day trade, criptomoedas especulativas, promessas de retorno e empréstimos.

## Estrutura Principal

```text
src/
  components/
    features/
      Insights/              # insight, chat, mensagens e feedbacks
      Simulation/            # formulário guiado de simulação
      SimulationHistory/     # cards e estado vazio do histórico
      SimulationResults/     # cards e container do resultado
    layout/                  # layout raiz
    shared/                  # componentes reutilizáveis
  context/                   # tema
  data/                      # prompts, steps e tipos da simulação
  hooks/                     # storage, insight, chat e tema
  pages/                     # páginas roteadas
  services/                  # chamadas externas
  styles/                    # tokens de tema
  utils/                     # moeda, data e cálculos
```

## Fluxo de Uso

1. O usuário cria uma simulação em `/`.
2. A aplicação salva os dados no `localStorage`.
3. O usuário é redirecionado para `/resultado/:id`.
4. O insight inicial é gerado e salvo no registro da simulação.
5. O usuário pode fazer perguntas no chat da própria simulação.
6. Cada pergunta e resposta é salva no mesmo registro.
7. A página `/historico` permite reabrir ou excluir simulações.

## Padrões do Projeto

- Componentes de feature ficam dentro de `src/components/features`.
- Lógica compartilhada deve ficar em `hooks`, `utils`, `services` ou `data`.
- Páginas devem orquestrar estado e navegação, evitando concentrar UI complexa.
- Formatação de moeda deve usar `src/utils/currency.ts`.
- Formatação de data deve usar `src/utils/date.ts`.
- Persistência de simulações deve passar por `useSimulationStorage`.

## Observações

Este projeto usa armazenamento local no navegador, sem backend. Limpar os dados do navegador remove simulações, insights e conversas salvas.

As respostas da IA são orientativas e não substituem aconselhamento financeiro profissional.
