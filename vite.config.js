import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Cambia '/' si tu app estará en un subdirectorio, como '/mi-app/'
  plugins: [react()],
});
