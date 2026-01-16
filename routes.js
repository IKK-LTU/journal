
const routes = [
  { path: "/", loader() { return { message: "Home" }; }, Component: async () => (await import('./src/pages/home.tsx')).default,},
  { path: "/login", loader() { return { message: "Login" }; }, Component: async () => (await import('./src/pages/home.tsx')).default},
  { path: "/check-in", loader() { return { message: "Check In" }; }, Component: async () => (await import('./src/pages/check-in.tsx')).default},
];

export default routes;