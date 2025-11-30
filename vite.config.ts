import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Get repository name for GitHub Pages base path
// Format: owner/repo-name -> /repo-name/
const getBasePath = () => {
  const repo = process.env.GITHUB_REPOSITORY;
  if (repo) {
    const repoName = repo.split("/")[1];
    return `/${repoName}/`;
  }
  // Default to "/" for local development
  return "/";
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: getBasePath(),
});
