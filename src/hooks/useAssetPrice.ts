import { useEffect, useState } from 'react'
import { getPrice } from '../services/priceService'

export function useAssetPrice(symbol: string) {
  const [data, setData] = useState<{ price: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getPrice(symbol)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [symbol])

  return { data, loading, error }
}
