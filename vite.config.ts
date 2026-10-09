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
  if (Object.keys(env).some((name) => !publicVariables.includes(name))) {
    throw new Error(
      "Unapproved VITE_ variable: only the documented public contact configuration may be exposed to the browser.",
    );
  }
  return {
    envPrefix: publicVariables,
    plugins: [react()],
    optimizeDeps: {
      exclude: ["lucide-react"],
    },
  };
});
