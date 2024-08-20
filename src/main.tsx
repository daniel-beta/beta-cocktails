import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CocktailSearch from './components/CocktailSearch'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CocktailSearch />
  </StrictMode>,
)
