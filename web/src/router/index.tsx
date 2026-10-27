import { Navigate, Route, Routes } from "react-router-dom";

import Home from "@/pages/home";
import Login from "@/pages/login";
import NewEntry from "@/pages/new-entry";
import EntryDetail from "@/pages/entry-detail";
import Settings from "@/pages/settings";
import Insights from "@/pages/insights";
import Welcome from "@/pages/welcome";
import { ROUTES } from "./routes";

const Router = () => {
  return (
    <Routes>
      <Route index path={ROUTES.WELCOME.path} element={<Welcome />} />
      <Route path={ROUTES.LOGIN.path} element={<Login />} />
      <Route path={ROUTES.HOME.path} element={<Home />} />
      <Route path={ROUTES.NEW_ENTRY.path} element={<NewEntry />} />
      <Route path={ROUTES.ENTRY.path} element={<EntryDetail />} />
      <Route path={ROUTES.SETTINGS.path} element={<Settings />} />
      <Route path={ROUTES.INSIGHTS.path} element={<Insights />} />

      {/* Old URLs people may have bookmarked */}
      <Route path="/check-in-form" element={<Navigate to={ROUTES.NEW_ENTRY.path} replace />} />
      <Route path="/check-in-list" element={<Navigate to={ROUTES.HOME.path} replace />} />

      <Route path="*" element={<Navigate to={ROUTES.HOME.path} replace />} />
    </Routes>
  );
};

export default Router;
