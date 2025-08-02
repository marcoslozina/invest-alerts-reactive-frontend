import React from 'react'
import { useAssetPrice } from '../hooks/useAssetPrice'

export default function PriceViewer() {
  const { data, loading, error } = useAssetPrice('BTC')

  console.log('Estado:', { data, loading, error })

  if (loading) return <p className="text-yellow-500">Cargando...</p>
  if (error) return <p className="text-red-500">Error: {error}</p>
  if (!data) return <p className="text-gray-500">Sin datos</p>

  return (
    <div className="border rounded p-4 bg-gray-100 dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-2">BTC</h2>
      <p className="text-xl">Precio: ${data.price}</p>
    </div>
  )
}
