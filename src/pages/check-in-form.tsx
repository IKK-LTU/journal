import { useState } from "react";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, ChevronLeft, Trash } from "lucide-react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Button, Divider, IconButton, Stack, Typography, Slider, Box } from "@mui/material"; // Added Slider and Box
import { useDispatch } from "react-redux";

import Container from "@/components/layouts/Container";
import Title from "@/components/atoms/text/Title";
import TextInput from "@/components/atoms/TextInput";
import { addCheckinItem } from "@/store/features/checkins";
import { ROUTES } from "@/router/routes";

type Inputs = {
  situation: string;
  emotion: {
    name: string;
    intensity: number;
  }[];
  autoThoughts: Array<string>;
  behavior: string;
};

const CheckIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

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
      situation: "",
      emotion: [],
      autoThoughts: [],
      behavior: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emotion",
  });

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    setEmotionValues((prev) => ({
      ...prev,
      intensity: newValue as number,
    }));
  };

  const handleAddEmotionToState = () => {
    const isAlreadyExist = fields?.find(
      ({ name }) => name.toLowerCase() === emotionValues?.name.toLowerCase()
    );
    if (isAlreadyExist) return alert("Tokia emocija jau esate pridėję");

    if (!emotionValues?.intensity || !emotionValues?.name) {
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
    if (!fields?.length)
      return setError("emotion", {
        type: "manual",
        message: "Privaloma užpildyti",
      });

    const fakeId = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    dispatch(addCheckinItem({ id: fakeId, ...data, date: location.state.date }));

    navigate(ROUTES.HOME.path);
  };

  return (
    <Container>
      <StyledHeader>
        <StyledIconButton onClick={() => navigate(-1)}>
          <ChevronLeft color="#fff" />
        </StyledIconButton>
        <StyledTitle>Registruoti mintis</StyledTitle>
      </StyledHeader>

      <Typography variant="body1"> {location.state.date}</Typography>
      <Typography variant="body2" color="neutral">
        Užrašykite savo mintis čia. Tai padeda jas racionalizuoti, suprasti, kaip jos veikia jūsų nuotaiką, ir lengviau analizuoti vėliau.
      </Typography>

      <Divider sx={{ my: 2 }} />

      <StyledFormContainer onSubmit={handleSubmit(onSubmit)}>
        <StyledFieldWrapper>
          <Stack>
            <StyledLabel id="situation">Situacija</StyledLabel>
            <Typography variant="body2" color="neutral">
              Su kuo buvai? Ką darei? Kada tai buvo? Kur buvai?
            </Typography>
          </Stack>
          <StyledTextArea
            id="situation"
            rows={5}
            {...register("situation", { required: true })}
            placeholder="šiandien apie 10 valandą ryto..."
          />
          {errors?.situation && <StyledErrors>Privaloma</StyledErrors>}
        </StyledFieldWrapper>

        <StyledFieldWrapper>
          <StyledRowWrapp>
            <Box sx={{ flex: 2 }}>
              <StyledLabel id="emotion.name">Emocija/jausmas</StyledLabel>
              <StyledInput
                id={`emotion.name`}
                value={emotionValues.name}
                placeholder="Nerimas"
                onChange={(e) => setEmotionValues(prev => ({ ...prev, name: e.target.value }))}
              />
            </Box>

            <Box sx={{ flex: 3 }}>
              <StyledLabel>Intensyvumas</StyledLabel>
              <Stack direction="row" gap={2} alignItems="center" sx={{ height: '56px' }}>
                <StyledSlider
                  value={emotionValues.intensity}
                  onChange={handleSliderChange}
                  step={1}
                  marks
                  min={0}
                  max={10}
                  valueLabelDisplay="auto"
                />
                <IconButton
                  aria-label="add new thought"
                  onClick={handleAddEmotionToState}
                  disabled={!emotionValues?.intensity || !emotionValues?.name}
                  sx={{ color: '#fff' }}
                >
                  <Check />
                </IconButton>
              </Stack>
            </Box>
          </StyledRowWrapp>

          <Stack gap={1} sx={{ mt: 1 }}>
            {fields.map((field, index) => (
              <Stack
                key={field.id}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ background: 'rgba(255,255,255,0.1)', p: 1, borderRadius: '8px' }}
              >
                <Typography variant="body2">
                  <strong>{field.name}</strong> — {field.intensity}/10
                </Typography>
                <IconButton size="small" onClick={() => remove(index)}>
                  <Trash size={18} color="#ff3333" />
                </IconButton>
              </Stack>
            ))}
          </Stack>

          {errors?.emotion && <StyledErrors>Privaloma užpildyti bent vieną emociją</StyledErrors>}
        </StyledFieldWrapper>

        <StyledFieldWrapper>
          <Stack>
            <StyledLabel id="autoThoughts">Automatinės mintys</StyledLabel>
            <Typography variant="body2" color="neutral">Apie ką galvojate prieš užplūstant jausmams?</Typography>
          </Stack>
          <StyledTextArea
            id="autoThoughts"
            rows={5}
            {...register("autoThoughts", { required: true })}
            placeholder="'Man niekada nepavyks'..."
          />
          {errors?.autoThoughts && <StyledErrors>Privaloma</StyledErrors>}
        </StyledFieldWrapper>

        <StyledFieldWrapper>
          <Stack>
            <StyledLabel id="behavior">Elgesys/veiksmas</StyledLabel>
            <Typography variant="body2" color="neutral">Ką paskui darei?</Typography>
          </Stack>
          <StyledTextArea
            id="behavior"
            rows={5}
            {...register("behavior", { required: true })}
          />
        </StyledFieldWrapper>

        <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5, fontSize: '1.1rem' }}>
          Išsaugoti
        </Button>
      </StyledFormContainer>
    </Container>
  );
};

export default CheckIn;


const StyledSlider = styled(Slider)({
  color: "#5f9ea0",
  height: 6,
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
  },
  '& .MuiSlider-track': {
    height: 6,
  },
  '& .MuiSlider-rail': {
    height: 6,
    opacity: 0.3,
    backgroundColor: '#bfbfbf',
  },
  '& .MuiSlider-markLabel': {
    color: 'rgba(255, 255, 255, 0.7)', // Makes numbers below the slider visible
    fontSize: '0.85rem',
    top: '30px',
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#fff',
    height: 8,
    width: 1,
    marginTop: -1,
  },
  '& .MuiSlider-valueLabel': {
    backgroundColor: '#5f9ea0',
    borderRadius: '4px',
  }
});



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

const StyledFieldWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledLabel = styled("label")`
  font-size: 16px;
  font-weight: 600;
`;

const StyledInput = styled(TextInput)`
  font-size: 16px;
  font-weight: 500;
  outline: none;
  background: rgba(255, 255, 255, 0.05); /* Adjusted for dark theme */
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 100%;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
`;

const StyledRowWrapp = styled("div")`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
  align-items: flex-start;
`;

const StyledErrors = styled("span")`
  font-size: 0.75rem;
  color: #ff3333;
`;

const StyledTextArea = styled("textarea")`
  padding: 1rem;
  outline: none;
  background: rgba(255, 255, 255, 0.05); /* Adjusted for dark theme */
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 100%;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;

  &:focus {
    border-color: #5f9ea0;
    outline: none;
  }
`;