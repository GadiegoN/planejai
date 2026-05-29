const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function formatDate(value?: string): string {
  if (!value) {
    return "Data não registrada";
  }

  return dateFormatter.format(new Date(value));
}
