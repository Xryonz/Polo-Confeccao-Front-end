import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// defineConfig é uma função do Vite que recebe as configurações do projeto.
// Ela dá autocomplete e tipagem no editor — é uma boa prática sempre usar.
export default defineConfig({
  plugins: [react()], // Ativa o plugin React: transforma JSX/TSX e habilita Fast Refresh
})
