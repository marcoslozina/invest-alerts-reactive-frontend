import { api } from './api'

export async function getPrice(symbol: string): Promise<{ price: number }> {
  const response = await api.get(`/assets/price?symbol=${symbol}`)
  return response.data
}
