import { Navigate, Route, Routes, useParams } from "react-router-dom";

import Home from "@/pages/home";
import Login from "@/pages/login";
import NewEntry from "@/pages/new-entry";
import EntryDetail from "@/pages/entry-detail";
import EntryDeeper from "@/pages/entry-deeper";
import Settings from "@/pages/settings";
import Insights from "@/pages/insights";
import Welcome from "@/pages/welcome";
import { getEntryDeeperPath, ROUTES } from "./routes";

// The deeper flow used to live at /entry/:id/reframe.
const RedirectToDeeper = () => {
  const { id = "" } = useParams();
  return <Navigate to={getEntryDeeperPath(id)} replace />;
};

const Router = () => {
  return (
    <Routes>
      <Route index path={ROUTES.WELCOME.path} element={<Welcome />} />
      <Route path={ROUTES.LOGIN.path} element={<Login />} />
      <Route path={ROUTES.HOME.path} element={<Home />} />
      <Route path={ROUTES.NEW_ENTRY.path} element={<NewEntry />} />
      <Route path={ROUTES.ENTRY.path} element={<EntryDetail />} />
      <Route path={ROUTES.ENTRY_DEEPER.path} element={<EntryDeeper />} />
      <Route path={ROUTES.SETTINGS.path} element={<Settings />} />
      <Route path={ROUTES.INSIGHTS.path} element={<Insights />} />

      {/* Old URLs people may have bookmarked */}
      <Route path="/check-in-form" element={<Navigate to={ROUTES.NEW_ENTRY.path} replace />} />
      <Route path="/check-in-list" element={<Navigate to={ROUTES.HOME.path} replace />} />
      <Route path="/entry/:id/reframe" element={<RedirectToDeeper />} />

      <Route path="*" element={<Navigate to={ROUTES.HOME.path} replace />} />
    </Routes>
  );
};

export default Router;
