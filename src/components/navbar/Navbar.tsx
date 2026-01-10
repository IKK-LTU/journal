import styled from "styled-components";

const navigationItems = [
  {
    name: "Home",
    src: "/",
  },
  {
    name: "Login",
    src: "/login",
  },
];

const Navbar = () => {
  return (
    <StyledNavbar>
      <StyledNavList>
        {navigationItems.map((item) => (
          <li key={item.src}>
            <StyledListNavItemAnch href={item.src}>
              {item.name}
            </StyledListNavItemAnch>
          </li>
        ))}
      </StyledNavList>
    </StyledNavbar>
  );
};

export default Navbar;

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;

  height: 52px;
  width: 100%;

  padding: 1rem 1.5rem;

  background-color: #1f2937;
`;

const StyledNavList = styled.ol`
  list-style: none;

  display: flex;
  justify-content: center;
  gap: 0.5rem;

  width: 100%;

  margin: 0;

  color: white;
`;

const StyledListNavItemAnch = styled.a`
  color: white;
  font-weight: bold;
`;
