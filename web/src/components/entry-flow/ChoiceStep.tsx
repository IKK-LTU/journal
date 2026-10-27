import { useState, type FormEvent, type ReactNode } from "react";
import { Box, Button, ButtonBase, InputBase } from "@mui/material";
import { Check } from "lucide-react";

type Props = {
  /** Already ordered: the user's most used first. */
  options: string[];
  selected: string[];
  isMultiple: boolean;
  onChange: (selected: string[]) => void;
  /** An option that can't be combined with others (e.g. "Niekas" = alone). */
  exclusiveOption?: string;
  customLabel: string;
  /** Extra content under the choices, e.g. a free-text field. */
  children?: ReactNode;
};

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** One-tap answers as calm words. Picked ones turn ink + ✓. "kita…" lets the user type their own. */
const ChoiceStep = ({ options, selected, isMultiple, onChange, exclusiveOption, customLabel, children }: Props) => {
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");

  // A custom answer typed in this session isn't in `options` yet — show it too.
  const allOptions = [...new Set([...options, ...selected])];

  const toggle = (option: string) => {
    const isSelected = selected.includes(option);

    if (!isMultiple) {
      onChange(isSelected ? [] : [option]);
      return;
    }
    if (isSelected) {
      onChange(selected.filter((item) => item !== option));
      return;
    }
    if (option === exclusiveOption) {
      onChange([option]);
      return;
    }
    onChange([...selected.filter((item) => item !== exclusiveOption), option]);
  };

  const submitCustom = (event: FormEvent) => {
    event.preventDefault();
    const value = capitalize(customValue.trim());
    if (value.length < 2) return;
    if (!selected.includes(value)) toggle(value);
    setCustomValue("");
    setIsAddingCustom(false);
  };

  return (
    <>
      <Box role="group" sx={{ display: "flex", flexWrap: "wrap", columnGap: 2.75 }}>
        {allOptions.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <ButtonBase
              key={option}
              aria-pressed={isSelected}
              onClick={() => toggle(option)}
              sx={{
                minHeight: 44,
                gap: 0.75,
                fontFamily: "inherit",
                fontSize: 19,
                fontWeight: isSelected ? 600 : 400,
                color: isSelected ? "text.primary" : "text.secondary",
                transition: "color .15s ease-out",
              }}
            >
              {isSelected && <Check size={18} strokeWidth={2.6} aria-hidden />}
              {option}
            </ButtonBase>
          );
        })}
        {!isAddingCustom && (
          <ButtonBase onClick={() => setIsAddingCustom(true)} sx={{ minHeight: 44, fontFamily: "inherit", fontSize: 19, fontStyle: "italic", color: "text.secondary" }}>
            kita…
          </ButtonBase>
        )}
      </Box>

      {isAddingCustom && (
        <Box component="form" onSubmit={submitCustom} sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1 }}>
          <InputBase
            autoFocus
            value={customValue}
            onChange={(event) => setCustomValue(event.target.value)}
            placeholder="Įrašyk savo"
            inputProps={{ "aria-label": customLabel, maxLength: 40 }}
            sx={{ flex: 1, minHeight: 48, px: 2, borderRadius: "12px", bgcolor: "background.paper", fontSize: 18 }}
          />
          <Button type="submit" variant="text" sx={{ minHeight: 48, color: "text.primary" }}>
            Pridėti
          </Button>
        </Box>
      )}

      {children}
    </>
  );
};

export default ChoiceStep;
