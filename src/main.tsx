import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n'
import App from './App'
import { ColorModeProvider } from './contexts/ColorModeContext'
import { store } from './store'
import { Provider } from 'react-redux'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ColorModeProvider>
      <App />
    </ColorModeProvider>
  </Provider>,
)
