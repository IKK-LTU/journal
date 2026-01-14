import { styled } from "styled-components";

import { useNavigate } from "react-router-dom";

import { Flame, GraduationCap, LogIn, Notebook, User } from "lucide-react";

import Container from "@/components/layouts/Container";
import Title from "@/components/atoms/text/Title";
import IconButton from "@/components/atoms/buttons/IconButton";
import DaysHeader from "@/components/page-elements/home/DaysHeader";
import TaskCard from "@/components/cards/TaskCard";
import useCurrentUser from "@/hooks/useCurrentUser";

const myTasks = [
  {
    id: 1,
    imageSrc: "https://picsum.photos/seed/picsum/200/300",
    title: "Good afternoon",
    subtitle: "Capture your thoughts and tasks for the day.",
    buttonText: "Check In",
    onClick: () => console.log("Check In clicked"),
  },
  {
    id: 2,
    imageSrc: "https://picsum.photos/seed/picsum/200/300",
    title: "Analyze Thoughts",
    featureTypeDescription: (
      <>
        <Notebook /> Guided Journal
      </>
    ),
    buttonText: "Reflect",
  },
  {
    id: 3,
    imageSrc: "https://picsum.photos/seed/picsum/200/300",
    title: "Mind and Mood",
    featureTypeDescription: (
      <>
        <GraduationCap /> Crash Course
      </>
    ),
  },
];

const Home = () => {
  const navigate = useNavigate();

  const { currentUser } = useCurrentUser();

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

        {currentUser ? (
          <User onClick={() => navigate("/login")} />
        ) : (
          <LogIn onClick={() => navigate("/login")} />
        )}
      </StyledHeader>

      <DaysHeader onClick={handleDayClick} />

      <StyledPlanContainer>
        {myTasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            subtitle={task.subtitle}
            featureTypeDescription={task.featureTypeDescription}
            buttonText={task.buttonText}
            onButtonClick={task.onClick}
            imageSrc={task.imageSrc}
          />
        ))}
      </StyledPlanContainer>
    </Container>
  );
};

export default Home;

const StyledHeader = styled("header")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledTitle = styled(Title)`
  font-size: 1.25rem;
  font-weight: 500;
`;

const StyledPlanContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
