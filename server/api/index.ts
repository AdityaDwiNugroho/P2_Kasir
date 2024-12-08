import { defineEventHandler } from 'h3';
import { getApiRoutes } from '../utils/api-routes'; 
export default defineEventHandler(() => {
  return {
    message: 'Available API endpoints:',
    endpoints: getApiRoutes(),
  };
});