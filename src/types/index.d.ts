// Tipos globales del proyecto

export interface Alert {
  id: string;
  symbol: string;
  threshold: number;
  type: 'above' | 'below';
}

export interface AssetPrice {
  symbol: string;
  price: number;
  timestamp: string; // ISO format
}
