import React from 'react'
import PriceViewer from '../components/PriceViewer'

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Cripto</h1>
      <PriceViewer />
    </div>
  )
}
