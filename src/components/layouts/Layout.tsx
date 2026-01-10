import { Outlet } from "react-router-dom";

import styled from "styled-components";

import Navbar from "../navbar/Navbar";

const Layout = () => {
  return (
    <StyledLayout>
      <Navbar />
      <Outlet />
    </StyledLayout>
  );
};

export default Layout;

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  width: 100%;
  height: 100vh;
  max-width: 600px;

  padding: 1rem;
  margin: 0 auto;
`;
