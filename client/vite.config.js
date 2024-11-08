import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    esbuild: {
      jsxInject: `import React from 'react'`,
    },
  };
});
