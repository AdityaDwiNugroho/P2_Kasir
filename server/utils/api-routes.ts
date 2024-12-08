import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
export function getApiRoutes() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const apiDir = path.resolve(process.cwd(), 'server/api'); 
  const files = fs.readdirSync(apiDir);
  const endpoints = files
    .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))
    .map((file) => {
      const routePath = `/api/${file.replace(/\.(ts|js)$/, '')}`;
      return {
        path: routePath,
        description: `Endpoint for ${file.replace(/\.(ts|js)$/, '')}`,
      };
    });
  return endpoints;
}