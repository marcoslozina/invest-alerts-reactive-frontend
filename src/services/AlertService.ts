import axios from 'axios';

export type AlertPayload = {
  symbol: 'BTC' | 'ETH' | 'SOL';
  threshold: number;
  type: 'ABOVE' | 'BELOW';
};

export type AlertDTO = AlertPayload & { id: string; createdAt: string };

/* 👇 NUEVO: forma paginada opcional que podría devolver el backend/mock */
type PaginatedAlerts = {
  items: AlertDTO[];
  total?: number;
  limit?: number | null;
  offset?: number;
  sort?: 'asc' | 'desc';
};

/* 👇 NUEVO: type guards sin any */
function isAlertArray(data: unknown): data is AlertDTO[] {
  return (
    Array.isArray(data) &&
    data.every(
      (it) =>
        it !== null &&
        typeof it === 'object' &&
        'id' in it &&
        'symbol' in it &&
        'threshold' in it &&
        'type' in it &&
        'createdAt' in it
    )
  );
}

function isPaginatedAlerts(data: unknown): data is PaginatedAlerts {
  return (
    typeof data === 'object' &&
    data !== null &&
    'items' in data &&
    Array.isArray((data as { items: unknown }).items)
  );
}

export async function createAlert(payload: AlertPayload) {
  const { data } = await axios.post<AlertDTO>('/alerts', payload);
  return data;
}

/* 👇 NUEVO: sin any, soporta array puro o objeto paginado */
export async function getAlerts(): Promise<AlertDTO[]> {
  const { data } = await axios.get<AlertDTO[] | PaginatedAlerts>('/alerts');

  if (isAlertArray(data)) return data;
  if (isPaginatedAlerts(data) && isAlertArray(data.items)) return data.items;

  console.warn('GET /alerts devolvió un formato inesperado:', data);
  return [];
}
