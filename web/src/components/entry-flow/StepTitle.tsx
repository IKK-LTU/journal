import { Typography } from "@mui/material";

type Props = {
  title: string;
  hint?: string;
};

const StepTitle = ({ title, hint }: Props) => {
  return (
    <>
      <Typography variant="display" sx={{ fontSize: 34, mb: hint ? 1 : 4 }}>
        {title}
      </Typography>
      {hint && <Typography sx={{ mb: 3, fontSize: 15, color: "text.secondary" }}>{hint}</Typography>}
    </>
  );
};

export default StepTitle;
