import { Link, useLocation } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { House, LogIn, List } from "lucide-react";
import { ROUTES } from "@/router/routes";

const navigationItems = [
  {
    name: ROUTES.HOME.label,
    src: ROUTES.HOME.path,
    icon: <House color="rgb(255, 255, 255)" size={20} />,
  },
  {
    name: ROUTES.LOGIN.label,
    src: ROUTES.LOGIN.path,
    icon: <LogIn color="rgb(255, 255, 255)" size={20} />,
  },
  {
    name: ROUTES.CHECKIN_LIST.label,
    src: ROUTES.CHECKIN_LIST.path,
    icon: <List color="rgb(255, 255, 255)" size={20} />,
  },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <StyledNavbar>
      <StyledNavList>
        {navigationItems.map((item) => (
          <StyledListItem
            key={item.src}
            to={item.src}
            $selected={location.pathname === item.src}
          >
            {item.icon}
            <span>{item.name}</span>
          </StyledListItem>
        ))}
      </StyledNavList>
    </StyledNavbar>
  );
};

export default Navbar;

const MARGIN_X = 16;

const StyledNavbar = styled("nav")`
  box-sizing: border-box;

  z-index: 2;
  position: fixed;
  bottom: 12px;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;

  height: 52px;
  width: calc(100% - ${MARGIN_X * 2}px);

  padding: 1rem 1.5rem;
  margin: 0 ${MARGIN_X}px;

  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);

  border-radius: 20px;

  box-shadow:
    0 8px 30px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  color: red;
  border: 1px solid rgba(255, 255, 255, 0.35);
`;

const StyledNavList = styled("ol")`
  list-style: none;

  display: flex;
  justify-content: center;
  gap: 0.5rem;

  width: 100%;

  margin: 0;
  padding: 0;

  color: white;
`;

const StyledListItem = styled(Link) <{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.25rem 0.5rem;
  transition: background-color 0.3s, border-radius 0.3s;

  color:rgb(255, 255, 255);

  font-size: 0.75rem;

  border-radius: 8px;
  background-color: ${(props) =>
    props.$selected ? "rgba(109, 109, 109, 0.1)" : "transparent"};
  
  &:hover {
    background-color: rgba(109, 109, 109, 0.1);
  }
  }
`;
