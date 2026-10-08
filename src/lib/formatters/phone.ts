export const BRAZILIAN_PHONE_MAX_DIGITS = 11;

export function extractDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/** Formata progressivamente enquanto o usuário digita: (51) 99999-9999 */
export function formatBrazilianPhone(value: string): string {
  const digits = extractDigits(value).slice(0, BRAZILIAN_PHONE_MAX_DIGITS);

  if (digits.length <= 2) return digits.length ? `(${digits}` : "";

  const areaCode = digits.slice(0, 2);
  const subscriber = digits.slice(2);
  const prefixLength = subscriber.length > 8 ? 5 : 4;

  if (subscriber.length <= prefixLength) return `(${areaCode}) ${subscriber}`;

  return `(${areaCode}) ${subscriber.slice(0, prefixLength)}-${subscriber.slice(prefixLength)}`;
}
