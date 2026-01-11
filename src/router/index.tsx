import { Route, Routes } from "react-router-dom";

import Layout from "@/components/layouts/Layout";
import Home from "@/pages/home";
import Login from "@/pages/login";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default Router;
