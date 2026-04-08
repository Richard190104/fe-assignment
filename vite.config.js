import { defineConfig } from "vite";

export default defineConfig({
    server: {
        // Handle SPA routing - redirect all requests to index.html
        historyApiFallback: true,
    },
});
