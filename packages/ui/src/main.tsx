import React from 'react'
import App from './App'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import 'tippy.js/dist/tippy.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-tabs/style/react-tabs.css'

const container = document.getElementById('root')

if(!container) throw new Error('Missing `#root`.')

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)