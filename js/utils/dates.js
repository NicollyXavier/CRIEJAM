const MS_PER_DAY = 864e5;

/** Dias restantes até o fim do dia da data ISO informada (ex.: "2026-12-02"). */
export function daysUntil(isoDate) {
  return Math.ceil((new Date(`${isoDate}T23:59:00`) - new Date()) / MS_PER_DAY);
}

/** Texto amigável para o tempo restante de um prazo. */
export function formatRemaining(days) {
  if (days > 1) return `${days} dias`;
  if (days === 1) return '1 dia';
  if (days === 0) return 'Hoje';
  return 'Encerrado';
}
