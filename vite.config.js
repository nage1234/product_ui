import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import lingui from "@lingui/vite-plugin";

export default defineConfig({
    plugins: [
        react(),
        // plugin-react v6 no longer takes a babel option, so the Lingui macro runs through rolldown's babel plugin
        babel({
            plugins: ["@lingui/babel-plugin-lingui-macro"],
        }),
        lingui(),
    ],
    server: {
        port: 3000,
        strictPort: true,
        // forward versioned API calls to the Spring Boot backend (avoids CORS in dev)
        proxy: {
            "/v1": "http://localhost:8080",
        },
    },
});
