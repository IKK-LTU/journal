import { Outlet } from "react-router-dom";

import { styled } from "styled-components";

import Navbar from "../navbar/Navbar";

const Layout = () => {
  return (
    <StyledLayoutContainer>
      <Navbar />
      <Outlet />
    </StyledLayoutContainer>
  );
};

export default Layout;

export const StyledLayoutContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  width: 100%;
  max-width: 600px;

  padding: 1rem;
  margin: 0 auto;
`;
