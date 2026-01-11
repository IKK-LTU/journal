import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { Flame } from "lucide-react";

import Container from "@/components/layouts/Container";
import Button from "@/components/atoms/buttons/Button";
import Title from "@/components/atoms/text/Title";
import IconButton from "@/components/atoms/buttons/IconButton";
import DaysHeader from "@/components/page-elements/home/DaysHeader";

const Home = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/login");
  };

  const handleDayClick = (index?: number) => {
    console.log("Clicked day index:", index);
  };

  return (
    <Container>
      <StyledHeader>
        <IconButton
          icon={<Flame fill="#ffc917ff" color="rgba(249, 151, 13, 1)" />}
        />

        <StyledTitle>Home</StyledTitle>

        <IconButton
          icon={<Flame fill="#ffc917ff" color="rgba(249, 151, 13, 1)" />}
        />
      </StyledHeader>

      <DaysHeader onClick={handleDayClick} />

      <Button onClick={onClick}>Prisijungti</Button>
    </Container>
  );
};

export default Home;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledTitle = styled(Title)`
  font-size: 1.25rem;
  font-weight: 500;
`;
