import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeChanger } from './components/ThemeChanger.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeChanger>
      <App />
    </ThemeChanger>
  </StrictMode>,
)
