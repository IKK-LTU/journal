import { ROUTES } from '@/router/routes.ts';

const routes = [
  { path: ROUTES.HOME.path, loader() { return { message: ROUTES.HOME.label }; }, Component: async () => (await import('./src/pages/home.tsx')).default,},
  { path: ROUTES.LOGIN.path, loader() { return { message: ROUTES.LOGIN.label }; }, Component: async () => (await import('./src/pages/home.tsx')).default},
  { path: ROUTES.CHECKIN.path, loader() { return { message: ROUTES.CHECKIN.label }; }, Component: async () => (await import('./src/pages/check-in.tsx')).default},
];

export default routes;

