import { Route, Routes } from "react-router-dom";

import Layout from "@/components/layouts/Layout";
import Home from "@/pages/home";
import Login from "@/pages/login";
import CheckIn from "@/pages/check-in";
import Welcome from "@/pages/welcome";
import { ROUTES } from "./routes";

const Router = () => {
  return (
    <Routes>
      <Route index path={ROUTES.WELCOME.path} element={<Welcome />} />
      <Route path={ROUTES.LOGIN.path} element={<Login />} />
      <Route path={ROUTES.CHECKIN.path} element={<CheckIn />} />
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME.path} element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Router;
