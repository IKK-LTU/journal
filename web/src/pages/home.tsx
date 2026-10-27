import { styled } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";

import { Flame, GraduationCap, LogIn, Notebook, User } from "lucide-react";

import DaysHeader from "@/components/page-elements/home/DaysHeader";
import TaskCard from "@/components/cards/TaskCard";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ROUTES } from "@/router/routes";
import { Box, IconButton, Stack } from "@mui/material";
import Header from "@/components/layouts/Header";

const myTasks = [
  {
    id: 1,
    imageSrc: "https://picsum.photos/seed/picsum/200/300",
    title: "Laba diena",
    subtitle: "Užfiksuokite savo mintis ir užduotis dienai.",
    buttonText: "Registruoti mintis",
    path: ROUTES.CHECKIN_FORM.path,
  },
  {
    id: 2,
    imageSrc: "https://picsum.photos/seed/picsum/200/300",
    title: "Analizuoti mintis",
    featureTypeDescription: (
      <>
        <Notebook /> Dienoraštis su gairėmis
      </>
    ),
    buttonText: "Apmąstyti",
  },
  {
    id: 3,
    imageSrc: "https://picsum.photos/seed/picsum/200/300",
    title: "Protui ir nuotaikai",
    featureTypeDescription: (
      <>
        <GraduationCap /> Trumpas kursas
      </>
    ),
  },
];

const Home = () => {
  const navigate = useNavigate();

  const { currentUser } = useCurrentUser();

  const handleNavigationBtnClick = (path: string) => {
    navigate(path, { state: { date: new Date().toISOString().slice(0, 10) } })
  }

  return (
    <StyledContainer
    >
      <Header title="Namai"
        leftIcon={<IconButton>
          <Flame fill="#ffc917ff" color="rgba(249, 151, 13, 1)" />
        </IconButton>
        }
        rightIcon={<IconButton
          onClick={() => navigate(ROUTES.LOGIN.path)}
        >
          {currentUser ? <User color="#fff" /> : <LogIn color="#fff" />}
        </IconButton>
        }
      />
      <DaysHeader />

      <StyledPlanContainer>
        {myTasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            subtitle={task.subtitle}
            featureTypeDescription={task.featureTypeDescription}
            buttonText={task.buttonText}
            onButtonClick={task.path ? () => handleNavigationBtnClick(task?.path) : undefined}
            imageSrc={task.imageSrc}
          />
        ))}
      </StyledPlanContainer>

    </StyledContainer >
  );
};

export default Home;

const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`

const StyledPlanContainer = styled(Stack)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
