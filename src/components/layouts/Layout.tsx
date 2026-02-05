import { Outlet } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import Container from "./Container";

const Layout = () => {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
};

export default Layout;

