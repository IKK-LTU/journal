import { ROUTES } from './src/router/routes.ts';

const routes = [
  { path: ROUTES.HOME.path, loader() { return { message: ROUTES.HOME.label }; }, Component: async () => (await import('./src/pages/home.tsx')).default,},
  { path: ROUTES.WELCOME.path, loader() { return { message: ROUTES.WELCOME.label }; }, Component: async () => (await import('./src/pages/welcome.tsx')).default,},
  { path: ROUTES.LOGIN.path, loader() { return { message: ROUTES.LOGIN.label }; }, Component: async () => (await import('./src/pages/login.tsx')).default},
  { path: ROUTES.CHECKIN_FORM.path, loader() { return { message: ROUTES.CHECKIN_FORM.label }; }, Component: async () => (await import('./src/pages/check-in-form.tsx')).default},
  { path: ROUTES.CHECKIN_LIST.path, loader() { return { message: ROUTES.CHECKIN_LIST.label }; }, Component: async () => (await import('./src/pages/check-in-list.tsx')).default},
];

export default routes;
