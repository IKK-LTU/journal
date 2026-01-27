import { styled } from "@mui/material/styles";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;

const StyledContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 100%;
`;
