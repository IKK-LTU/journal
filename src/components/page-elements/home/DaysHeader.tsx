import styled, { keyframes } from "styled-components";

import { CirclePlus } from "lucide-react";

import Title from "@/components/atoms/text/Title";
import { useState } from "react";
import ClickAwayListener from "@/wrapper/ClickAwayListener";

const weekDays = [
  { index: 0, title: "Monday" },
  { index: 1, title: "Tuesday" },
  { index: 2, title: "Wednesday" },
  { index: 3, title: "Thursday" },
  { index: 4, title: "Friday" },
  { index: 5, title: "Saturday" },
  { index: 6, title: "Sunday" },
];

type DaysHeaderProps = {
  onClick: (index: number) => void;
};

const DaysHeader = ({ onClick }: DaysHeaderProps) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const handleDayClick = (day?: string) => {
    if (day === selectedDay) {
      setSelectedDay(null);
      return;
    }
    if (day) {
      setSelectedDay(day);
      return;
    }
    setSelectedDay(null);
  };

  return (
    <ClickAwayListener onClickAway={() => handleDayClick()}>
      <StyledItemsContainer>
        {weekDays.map((day, index) => {
          console.log("selectedDay", selectedDay);
          return (
            <StyledItem
              key={day.title}
              onClick={(e) => {
                e.stopPropagation();
                handleDayClick(day.title);
              }}
              $selected={selectedDay === day.title}
            >
              <StyledSelectedItemPopup
                $itemIndex={index}
                onClick={() => onClick(index)}
                $isVisible={selectedDay === day.title}
              >
                <CirclePlus size={16} color="rgba(0,145,255)" />
                <span>Check In</span>
              </StyledSelectedItemPopup>

              <StyledWeekTitle
                component="h6"
                $selected={selectedDay === day.title}
              >
                {day.title.slice(0, 3)}
              </StyledWeekTitle>
              {selectedDay !== day.title && (
                <>
                  <StyledMoodCircle $selected={selectedDay === day.title} />
                </>
              )}
            </StyledItem>
          );
        })}
      </StyledItemsContainer>
    </ClickAwayListener>
  );
};

export default DaysHeader;

const StyledItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  @media (max-width: 600px) {
    gap: 0.25rem;s
  }
    background: transparent;
`;

const StyledWeekTitle = styled(Title)<{ $selected?: boolean }>`
  margin: 0;
  font-weight: 500;
`;

const StyledItem = styled.div<{ $selected: boolean }>`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: calc(100% / 7 - 1rem);
  min-width: calc(100% / 7 - 1rem);

  text-transform: uppercase;
  font-weight: 500;
  transition: all 1s ease-in-out;

  &:hover {
    cursor: pointer;
  }
  @media (max-width: 600px) {
    max-width: calc(100% / 7 - 0.25rem);
    min-width: calc(100% / 7 - 0.25rem);
  }

  &:active {
    transform: scale(1.4);
  }
`;

const StyledMoodCircle = styled.div<{ $selected?: boolean }>`
  width: 100%;
  min-width: 100%;
  height: auto;

  aspect-ratio: 1 / 1;

  border-radius: 50%;
  background-color: #afafaf;
`;

const zoomOut = keyframes`
    from {
        scale:0;
    }
    to {
        scale:1;
    }
  `;

const StyledSelectedItemPopup = styled.button<{
  $itemIndex?: number;
  $isVisible?: boolean;
}>`
  visibility: hidden;
  z-index: 10;
  position: absolute;
  top: 50%;

  left: ${(props) => {
    if (props.$itemIndex === 0) return "100%";
    if (props.$itemIndex === 6) return "0";
    return "50%";
  }};

  transform: translate(-50%, -40%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  width: 120px;
  height: 0;
  height: 60px;
  width: 120px;
  background-color: #ffffff97;
  border: 1px solid #ccc;

  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(16, 11, 11, 0.1);

  ${(props) => props.$isVisible && `visibility: visible;`}
  animation: ${(props) =>
    props.$isVisible && zoomOut} 0.3s forwards ease-in-out;

  transition: background-color 0.3s;

  &:hover {
    cursor: pointer;
    background-color: #e1e1e1b0;
  }
`;
