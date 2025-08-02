// Funciones utilitarias del proyecto

/**
 * Formatea un número como precio en USD.
 * Ejemplo: 1234.5 => "$1,234.50"
 */
export function formatPrice(value: number): string {
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Devuelve la hora local en formato legible.
 */
export function formatTimestamp(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleString();
}
