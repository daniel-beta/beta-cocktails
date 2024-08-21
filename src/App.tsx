import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CocktailSearchPage from './pages/CocktailSearchPage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CocktailSearchPage />
  </StrictMode>,
)
