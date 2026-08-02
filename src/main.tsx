import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import PressPage from './PressPage'
import './index.css'

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const pathname = window.location.pathname.startsWith(basePath)
  ? window.location.pathname.slice(basePath.length)
  : window.location.pathname
const normalizedPath = pathname.replace(/\/+$/, '') || '/'
const RootPage = normalizedPath === '/press' ? PressPage : App

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootPage />
  </React.StrictMode>,
)
