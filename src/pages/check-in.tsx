import { styled } from "styled-components";

import { useNavigate } from "react-router-dom";

import { Check, Flame, LogIn, Trash, User } from "lucide-react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

import Container from "@/components/layouts/Container";
import Title from "@/components/atoms/text/Title";
import IconButton from "@/components/atoms/buttons/IconButton";
import DaysHeader from "@/components/page-elements/home/DaysHeader";
import useCurrentUser from "@/hooks/useCurrentUser";
import TextInput from "@/components/atoms/TextInput";
import Button from "@/components/atoms/buttons/Button";
import { useState } from "react";

//TODO

// Create form with default values =>
// [x] userID: number
// [x] createdAt
// [x] situation: string. Situacija (Su kuo buvai? Ka darei? Kada tai buvo? Kur buvai?)
// [x] emotion: {name: string, intensity: number 1-10 }  Emocija/jausmas. (Kiekviena emocija/jausma apibudinkite vienu zodziu. Ivertinti intensyvuma nuo 1 iki 10)
// [x] autoThoughts: Array<string> automatines mintys (vaizdiniai).  Apie ka galvojate pries uzplustant jausmams? Kokia is to galima daryti isvada apie mane? pvz: "Man nieko nereikia", "Jis neturi taip elgtis", "Man niekada nepavyks"
// [x] choiceAction: string  Elgesys/veiksmas. Ka paskui darei, norejai padaryti/nedaryti?

// Create Input/selectors for those values
// [x] createdAt => autoset
// [x] situation => textarea
// [x] emotion => auto select and intensity pick
// [x] autoThoughts => textArea
// [x] choiceAction => textarea

// Errors
// [x] empty fields
// [ ] on response 404
// [ ] success screen

// iki 15:00

// UX
// [ ] Add descriptions
// [ ] Add labels

type Inputs = {
  createdAt: null | string;
  situation: string;
  emotion: {
    name: string;
    intensity: number;
  }[];
  autoThoughts: Array<string>;
  choiceAction: string;
};

const CheckIn = () => {
  const navigate = useNavigate();

  const { currentUser } = useCurrentUser();

  const [newIndex, setNewIndex] = useState(0);
  const [emotionValues, setEmotionValues] = useState<{
    name: string;
    intensity: number;
  }>({
    name: "",
    intensity: 0,
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>({
    defaultValues: {
      createdAt: null,
      situation: "",
      emotion: [],
      autoThoughts: [],
      choiceAction: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emotion",
  });

  const onAdd = () => {
    // Append tempEmotion to the list
    console.log("appendappendappendappendappendappendappendappend");
    append(emotionValues);
    // Reset temp inputs
    setEmotionValues({ name: "", intensity: 0 });
  };

  const handleDayClick = (index?: number) => {
    console.log("Clicked day index:", index);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("!data?.emotion?.length", !data?.emotion?.length);
    if (!data?.emotion?.length)
      return setError("emotion", {
        type: "required",
        message: "This field is requried",
      });
    console.log(data);
  };
  console.log("fields", { fields, emotionValues });
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
        <TextWrapper>
          <StyledFormTitle>Check in your thoughts</StyledFormTitle>
          <StyledFormSubtitle component="p">
            Check in your thoughts
          </StyledFormSubtitle>
        </TextWrapper>

        <StyledFieldWrapper>
          <StyledLabel id="situation">Situacija</StyledLabel>
          <StyledFormSubtitle component="p">
            Su kuo buvai? Ka darei? Kada tai buvo? Kur buvai?
          </StyledFormSubtitle>
          <StyledTextArea
            id="situation"
            cols={33}
            rows={5}
            {...register("situation", { required: true })}
          />

          {/* errors will return when field validation fails  */}
          {errors?.situation && (
            <StyledErrors>This field is required</StyledErrors>
          )}
        </StyledFieldWrapper>

        <StyledFieldWrapper>
          <StyledLabel id="emotion">Emocija/jausmas</StyledLabel>

          <StyledRowWrapp>
            <StyledFieldWrapper>
              <StyledLabel id="emotion.name">Ka jauti?</StyledLabel>

              <StyledInput
                id={`emotion.${newIndex}.name`}
                // value={emotionValues.name}
                placeholder="Nerimas"
                {...register(`emotion.${newIndex}.name`, {
                  required: "Name is required",
                })}
                onChange={(e) => {
                  setEmotionValues((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                }}
              />
            </StyledFieldWrapper>

            <StyledFieldWrapper>
              <StyledLabel id={`emotion.${newIndex}.intensity`}>
                Kiek stipriai?
              </StyledLabel>
              <StyledSelect
                id={`emotion.${newIndex}.intensity`}
                // value={emotionValues.intensity}

                {...register(`emotion.${newIndex}.intensity`, {
                  required: "Intensity is required",
                  min: { value: 1, message: "Intensity must be at least 1" },
                })}
                onChange={(e) => {
                  setEmotionValues((prev) => {
                    return { ...prev, intensity: Number(e.target.value) };
                  });
                }}
              >
                <option value="" disabled>
                  1 - 10
                </option>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((intensityNumber) => (
                  <option value={intensityNumber}>{intensityNumber}</option>
                ))}
              </StyledSelect>
            </StyledFieldWrapper>

            <Button
              onClick={() => {
                if (emotionValues?.intensity && emotionValues?.name) {
                  const alreadyExist = fields?.find(
                    ({ name }) => name.toLowerCase() === emotionValues?.name
                  );

                  if (alreadyExist)
                    return alert("Tokia emocija jau esate prideja");

                  onAdd();
                }
              }}
            >
              <Check />
            </Button>
          </StyledRowWrapp>
          {fields.map((fields, index) => (
            <div key={fields.id}>
              {`Emocija: ${fields.name} |  Intensyvumas: ${fields.intensity}`}{" "}
              <Button variant="text" onClick={() => remove(index)}>
                <Trash />
              </Button>
            </div>
          ))}
          {errors?.emotion && (
            <StyledErrors>This field is required</StyledErrors>
          )}
        </StyledFieldWrapper>

        <StyledFieldWrapper>
          <StyledLabel id="autoThoughts">
            Automatines mintys (vaizdiniai)
          </StyledLabel>
          <StyledFormSubtitle component="p">
            Apie ka galvojate pries uzplustant jausmams? Kokia is to galima
            daryti isvada apie mane? pvz: "Man nieko nereikia", "Jis neturi taip
            elgtis", "Man niekada nepavyks"
          </StyledFormSubtitle>
          <StyledTextArea
            id="autoThoughts"
            cols={33}
            rows={5}
            {...register("autoThoughts", { required: true })}
          />

          {/* errors will return when field validation fails  */}
          {errors?.autoThoughts && (
            <StyledErrors>This field is required</StyledErrors>
          )}
        </StyledFieldWrapper>
        <StyledFieldWrapper>
          <StyledLabel id="choiceAction">Elgesys/veiksmas.</StyledLabel>
          <StyledFormSubtitle component="p">
            Ka paskui darei, norejai padaryti/nedaryti?
          </StyledFormSubtitle>

          <StyledTextArea
            id="choiceAction"
            cols={33}
            rows={5}
            {...register("choiceAction", { required: true })}
          />

          {/* errors will return when field validation fails  */}
          {errors?.autoThoughts && (
            <StyledErrors>This field is required</StyledErrors>
          )}
        </StyledFieldWrapper>

        <StyledSubmitBtn type="submit">Išsaugoti</StyledSubmitBtn>
      </StyledFormContainer>
    </Container>
  );
};

// TODO
// textare in full screen. Since when you have only 5 rows you dont see the whole text that you wrote

export default CheckIn;

const StyledHeader = styled("header")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledTitle = styled(Title)`
  font-size: 1.5rem;
  font-weight: 500;
`;
const StyledFormTitle = styled(Title)`
  font-size: 1.5rem;
  font-weight: 500;
`;
const StyledFormSubtitle = styled(Title)`
  font-size: 0.75rem;
  font-weight: 400;
  color: #818181;
`;

const StyledFormContainer = styled("form")`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 80px;
`;
const StyledSubmitBtn = styled(Button)`
  margin-top: auto;
  width: 100%;
`;
const StyledFieldWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 4px;

  // width: 100%;
`;

const TextWrapper = styled("div")`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled("label")`
  font-size: 16px;
  font-weight: 500;
`;
const StyledInput = styled(TextInput)`
  font-size: 16px;
  font-weight: 500;
`;
const StyledSelect = styled("select")`
  font-size: 14px;
  font-weight: 500;
  height: 100%;
  width: 60px;
`;
const StyledRowWrapp = styled("div")`
  display:flex;
  flex-direction row;
  gap: 8px;
  width: 100%;
`;
const StyledErrors = styled("span")`
  font-size: 0.75rem;
  color: #ff3333;
`;

const StyledTextArea = styled("textarea")`
  padding: 0.75rem;
  outline: none;

  background: rgba(255, 240, 240, 0.66);
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(83, 83, 83, 0.1);
  backdrop-filter: blur(4.9px);
  -webkit-backdrop-filter: blur(4.9px);
  border: 2px solid rgba(255, 255, 255, 0.89);
  width: 100%;
  min-width: 100%;
  max-width: 100%;

  &:focus {
    border-color: #264353;
    outline: none;
  }
`;
