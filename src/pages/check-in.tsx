import { styled } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";

import { Check, ChevronLeft, Trash } from "lucide-react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

import Container from "@/components/layouts/Container";
import Title from "@/components/atoms/text/Title";
import IconButton from "@/components/atoms/buttons/IconButton";
import TextInput from "@/components/atoms/TextInput";
import Button from "@/components/atoms/buttons/Button";
import { useState } from "react";
import { StyledLayoutContainer } from "@/components/layouts/Layout";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

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
    clearErrors,
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

  const handleAddEmotionToState = () => {
    const isAlreadyExist = fields?.find(
      ({ name }) => name.toLowerCase() === emotionValues?.name,
    );
    if (isAlreadyExist) return alert("Tokia emocija jau esate prideja");

    if (!!emotionValues.intensity || !!emotionValues.name) {
      return setError("emotion", {
        type: "manual",
        message: "Privaloma užpildyti",
      });
    }

    append(emotionValues);
    clearErrors("emotion");
    setEmotionValues({ name: "", intensity: 0 });
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("!data?.emotion?.length", data);

    if (!fields?.length)
      return setError("emotion", {
        type: "manual",
        message: "Privaloma užpildyti",
      });
    console.log(data);
  };

  return (
    <StyledLayoutContainer>
      <Container>
        <StyledHeader>
          <StyledIconButton
            icon={<ChevronLeft color="#fff" />}
            onClick={() => navigate(-1)}
          />

          <StyledTitle>Registruoti mintis</StyledTitle>
        </StyledHeader>

        <Typography variant="body2" color="neutral">
          Užrašykite savo mintis čia. Tai padeda jas racionalizuoti, suprasti,
          kaip jos veikia jūsų nuotaiką, ir lengviau analizuoti vėliau. Net
          paprastas užrašymas jau suteikia naudą - mintys tampa aiškesnės ir
          lengviau valdomos. Jas galėsite peržiūrėti savo asmeniniame žurnale.
        </Typography>

        <Divider />

        <StyledFormContainer onSubmit={handleSubmit(onSubmit)}>
          <StyledFieldWrapper>
            <Stack>
              <StyledLabel id="situation">Situacija</StyledLabel>
              <Typography variant="body2" color="neutral">
                Su kuo buvai? Ka darei? Kada tai buvo? Kur buvai?
              </Typography>
            </Stack>

            <StyledTextArea
              id="situation"
              cols={33}
              rows={5}
              {...register("situation", { required: true })}
              placeholder="šiandien apie 10 valandą ryto, buvau darbe su kolegomis. Vykdžiau užduotis, ir jaučiau stresą..."
            />

            {/* errors will return when field validation fails  */}
            {errors?.situation && <StyledErrors>Privaloma</StyledErrors>}
          </StyledFieldWrapper>

          <StyledFieldWrapper>
            <StyledRowWrapp>
              <StyledFieldWrapper>
                <StyledLabel id="emotion.name">Emocija/jausmas</StyledLabel>

                <StyledInput
                  id={`emotion.name`}
                  value={emotionValues.name}
                  placeholder="Nerimas"
                  // {...register(`emotion.${newIndex}.name`, {
                  //   required: "Name is required",
                  // })}
                  onChange={(e) => {
                    setEmotionValues((prev) => {
                      return { ...prev, name: e.target.value };
                    });
                  }}
                />
              </StyledFieldWrapper>

              <StyledFieldWrapper>
                <StyledLabel id={`emotion.intensity`}>Intensyvumas</StyledLabel>
                <StyledSelect
                  id={`emotion.intensity`}
                  value={emotionValues.intensity}
                  // {...register(`emotion.${newIndex}.intensity`, {
                  //   required: "Intensity is required",
                  //   min: { value: 1, message: "Intensity must be at least 1" },
                  // })}
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
                onClick={() => handleAddEmotionToState()}
                disabled={!emotionValues?.intensity || !emotionValues?.name}
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
            <Stack>
              <StyledLabel id="autoThoughts">
                Automatines mintys (vaizdiniai)
              </StyledLabel>
              <Typography variant="body2" color="neutral">
                Apie ka galvojate pries uzplustant jausmams? Kokia is to galima
                daryti isvada apie mane?
              </Typography>
            </Stack>
            <StyledTextArea
              id="autoThoughts"
              cols={33}
              rows={5}
              {...register("autoThoughts", { required: true })}
              placeholder="'Man nieko nereikia', 'Jis neturi taip elgtis', 'Man niekada nepavyks'"
            />

            {/* errors will return when field validation fails  */}
            {errors?.autoThoughts && (
              <StyledErrors>This field is required</StyledErrors>
            )}
          </StyledFieldWrapper>
          <StyledFieldWrapper>
            <Stack>
              <StyledLabel id="choiceAction">Elgesys/veiksmas.</StyledLabel>
              <Typography variant="body2" color="neutral">
                Ka paskui darei, norejai padaryti/nedaryti?
              </Typography>
            </Stack>

            <StyledTextArea
              id="choiceAction"
              cols={33}
              rows={5}
              {...register("choiceAction", { required: true })}
              placeholder="Fiksuok savo veiksmus ir pasirinkimus - ką padarei, ko vengiai, ką norėjai pakeisti ar sustabdyti."
            />

            {/* errors will return when field validation fails  */}
            {errors?.autoThoughts && <StyledErrors>Privaloma</StyledErrors>}
          </StyledFieldWrapper>

          <StyledSubmitBtn type="submit">Išsaugoti</StyledSubmitBtn>
        </StyledFormContainer>
      </Container>
    </StyledLayoutContainer>
  );
};

// TODO
// textare in full screen. Since when you have only 5 rows you dont see the whole text that you wrote

export default CheckIn;

const StyledHeader = styled("header")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px 45px;
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledTitle = styled(Title)`
  font-size: 1.5rem;
  font-weight: 500;
`;

const StyledFormContainer = styled("form")`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 80px;
`;

const StyledSubmitBtn = styled(Button)`
  margin-top: auto;
  width: 100%;
`;
const StyledFieldWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
