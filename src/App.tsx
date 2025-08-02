import React from 'react'
import { useTranslation } from 'react-i18next'
import Home from './pages/Home' // ✅ correcto si el archivo se llama Home.tsx

function App() {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lang: 'en' | 'es') => i18n.changeLanguage(lang)

  return (
    <div className="p-4">
      <h1>{t('welcome')}</h1>
      <p>{t('alert_threshold')}</p>
      <div className="space-x-2 mb-4">
        <button onClick={() => changeLanguage('en')}>EN</button>
        <button onClick={() => changeLanguage('es')}>ES</button>
      </div>

      {/* ⬇️ Muestra la página principal */}
      <Home />
    </div>
  )
}

export default App
