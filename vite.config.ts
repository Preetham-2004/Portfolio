import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import process from "node:process";

// https://vitejs.dev/config/
const publicVariables = [
  "VITE_EMAILJS_SERVICE_ID",
  "VITE_EMAILJS_TEMPLATE_ID",
  "VITE_EMAILJS_PUBLIC_KEY",
  "VITE_RECAPTCHA_SITE_KEY",
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    // Expose exact names only; hosting metadata and other variables stay private.
    envPrefix: [],
    define: Object.fromEntries(
      publicVariables.map((name) => [
        `import.meta.env.${name}`,
        JSON.stringify(env[name] ?? ""),
      ]),
    ),
    plugins: [react()],
    optimizeDeps: {
      exclude: ["lucide-react"],
    },
  };
});
