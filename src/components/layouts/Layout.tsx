import { Outlet } from "react-router-dom";

import Navbar from "../navbar/Navbar";

const Layout = () => {
  return (
    <div className="px-3 py-4 w-7xl mx-auto gap-4 flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
