import React from "react";
import { styled } from "styled-components";

type Props = {
  title: string;
  subtitle?: string;
  featureTypeDescription?: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  imageSrc: string;
};

const TaskCard = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  featureTypeDescription,
  imageSrc,
}: Props) => {
  return (
    <StyledContainer>
      <StyledInfoWrapper>
        <div>
          <StyledTitle>{title}</StyledTitle>
          {subtitle && <StyledDescription>{subtitle}</StyledDescription>}
          {featureTypeDescription && (
            <StyledFeatureDescription>
              {featureTypeDescription}
            </StyledFeatureDescription>
          )}
        </div>

        <StyledImage src={imageSrc} alt={title} />
      </StyledInfoWrapper>

      {onButtonClick && buttonText && (
        <StyledButton onClick={onButtonClick}>{buttonText}</StyledButton>
      )}
    </StyledContainer>
  );
};

export default TaskCard;

const StyledContainer = styled("div")`
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 12px;

  border: 1px solid #434343ff;
  border-radius: 8px;

  &:hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;
    border-color: #4e4e4eff;
  }
`;

const StyledInfoWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  gap: 12px;
`;

const StyledTitle = styled("h2")`
  font-size: 20px;
  font-weight: bold;
`;

const StyledDescription = styled("p")`
  font-size: 14px;
  font-weight: 400;
  color: #989898ff;
`;

const StyledImage = styled("img")`
  width: 120px;
  height: 80px;

  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;

  border-radius: 8px;
`;

const StyledButton = styled("button")`
  margin-top: 16px;
  padding: 16px;

  width: 100%;

  background-color: #1277e3ff;
  color: white;
  border: none;
  border-radius: 32px;

  font-size: 16px;
  font-weight: 600;
`;

const StyledFeatureDescription = styled("div")`
  margin-top: 8px;
  font-size: 14px;
  color: #1277e3ff;
  display: flex;
  align-items: center;
  gap: 4px;
`;
