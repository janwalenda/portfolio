export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(value: string) {
  return new Date(value).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
