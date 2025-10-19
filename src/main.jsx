import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/global.css'
import { useHealthStore } from './stores/healthStore.js'

const container = document.getElementById('root')
const root = createRoot(container)
// Initialize theme on first load
const theme = typeof window !== 'undefined' ? (localStorage.getItem('theme') || 'light') : 'light'
if (typeof document !== 'undefined') document.documentElement.dataset.theme = theme
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
