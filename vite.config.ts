import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/task-tracker/', 
    server: {
        port: 3000,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/test/setupTests.ts", // her er test filerne
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
    }
});
