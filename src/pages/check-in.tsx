import { styled } from "styled-components";

import { useNavigate } from "react-router-dom";

import { Flame, LogIn, User } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";

import Container from "@/components/layouts/Container";
import Title from "@/components/atoms/text/Title";
import IconButton from "@/components/atoms/buttons/IconButton";
import DaysHeader from "@/components/page-elements/home/DaysHeader";
import useCurrentUser from "@/hooks/useCurrentUser";
import TextInput from "@/components/atoms/TextInput";
import Button from "@/components/atoms/buttons/Button";

//TODO

// Create form with default values =>
// [ ] userID: number
// [ ] createdAt
// [ ] situation: string. Situacija (Su kuo buvai? Ka darei? Kada tai buvo? Kur buvai?)
// [ ] emotion: {name: string, intensity: number 1-10 }  Emocija/jausmas. (Kiekviena emocija/jausma apibudinkite vienu zodziu. Ivertinti intensyvuma nuo 1 iki 10)
// [ ] autoThoughts: Array<string> automatines mintys (vaizdiniai).  Apie ka galvojate pries uzplustant jausmams? Kokia is to galima daryti isvada apie mane? pvz: "Man nieko nereikia", "Jis neturi taip elgtis", "Man niekada nepavyks"
// [ ] choiceAction: string  Elgesys/veiksmas. Ka paskui darei, norejai padaryti/nedaryti?

// Create Input/selectors for those values
// [ ] createdAt => autoset
// [ ] situation => textarea
// [ ] emotion => auto select and intensity pick
// [ ] autoThoughts => textArea
// [ ] choiceAction => textarea

// UX
// [ ] Add descriptions
// [ ] Add labels

// Errors
// [ ] empty fields
// [ ] on response 404
// [ ] success screen

type Inputs = {
  createdAt: null | string;
  situation: string;
  emotion: Array<{
    name: string;
    intensity: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  }>;
  autoThoughts: Array<string>;
  choiceAction: string;
};

const CheckIn = () => {
  const navigate = useNavigate();

  const { currentUser } = useCurrentUser();

  const handleDayClick = (index?: number) => {
    console.log("Clicked day index:", index);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      createdAt: null,
      situation: "",
      emotion: [],
      autoThoughts: [],
      choiceAction: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Container>
      <StyledHeader>
        <IconButton
          icon={<Flame fill="#ffc917ff" color="rgba(249, 151, 13, 1)" />}
        />

        <StyledTitle>CheckIn</StyledTitle>

        {currentUser ? (
          <User onClick={() => navigate("/login")} />
        ) : (
          <LogIn onClick={() => navigate("/login")} />
        )}
      </StyledHeader>

      <DaysHeader onClick={handleDayClick} />

      <StyledFormContainer onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <TextInput
          id={"situation"}
          {...register("situation", { required: true })}
        />

        {/* errors will return when field validation fails  */}
        {errors && <span>This field is required</span>}

        <StyledSubmitBtn type="submit">Išsaugoti</StyledSubmitBtn>
      </StyledFormContainer>
    </Container>
  );
};

export default CheckIn;

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

const StyledFormContainer = styled("form")`
  display: flex;
  flex-direction: column;
`;
const StyledSubmitBtn = styled(Button)`
  margin-top: auto;
  width: 100%;
`;
