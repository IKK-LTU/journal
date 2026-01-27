import { Route, Routes } from "react-router-dom";

import Layout from "@/components/layouts/Layout";
import Home from "@/pages/home";
import Login from "@/pages/login";
import CheckIn from "@/pages/check-in";
import { ROUTES } from "@/router/routes.ts";

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path={ROUTES.HOME.path} element={<Home />} />
        <Route path={ROUTES.LOGIN.path} element={<Login />} />
        <Route path={ROUTES.CHECKIN.path} element={<CheckIn />} />
      </Route>
    </Routes>
  );
};

export default Router;
