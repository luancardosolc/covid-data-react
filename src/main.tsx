import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ColorModeProvider } from './contexts/ColorModeContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ColorModeProvider>
    <App />
  </ColorModeProvider>,
)
