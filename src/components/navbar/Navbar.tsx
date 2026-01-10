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
  position: fixed;
  bottom: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;

  height: 52px;
  width: 100%;
  max-width: 450px;

  padding: 1rem 1.5rem;

  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);

  border-radius: 20px;

  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  color: red;
  border: 1px solid rgba(255, 255, 255, 0.35);
`;

const StyledNavList = styled.ol`
  list-style: none;

  display: flex;
  justify-content: center;
  gap: 0.5rem;

  width: 100%;

  margin: 0;
  padding: 0;

  color: white;
`;

const StyledListNavItemAnch = styled.a`
  color: black;
  font-weight: bold;
`;
