import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CocktailsApp } from './CocktailsApp'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CocktailsApp />
  </StrictMode>,
)
