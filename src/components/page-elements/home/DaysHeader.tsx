import { useState } from "react";

import { styled, keyframes } from "@mui/material/styles";
import { CirclePlus } from "lucide-react";

import ClickAwayListener from "@/wrapper/ClickAwayListener";
import Title from "@/components/atoms/text/Title";

import { WEEK_DAYS } from "@/constants/weekdays";
import { checkinsSelectors } from "@/store/features/checkins";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/router/routes";



const currentDate = new Date()
const weekday = currentDate.getDay()

const DaysHeader = () => {
  const navigate = useNavigate();

  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const checkinsList = useSelector((state: RootState) =>
    checkinsSelectors.selectCheckinsList(state)
  ) || []


  const handleDayClick = (day?: number) => {
    if (day && day !== selectedDay) {
      setSelectedDay(day);
      return;
    }
    setSelectedDay(null);
  };

  const formatWeekdaysList = WEEK_DAYS.map(day => {
    const daysDifferenceFromToday = day.dayNumber - weekday

    // create a new date based on currentDate
    const itemDate = new Date(currentDate)
    itemDate.setDate(itemDate.getDate() + daysDifferenceFromToday)

    // format to YYYY-MM-DD
    const formattedDate = itemDate.toISOString().slice(0, 10)

    return {
      ...day,
      date: formattedDate
    }
  })


  const handleCheckinClick = (date: string) => {
    navigate(ROUTES.CHECKIN_FORM.path, { state: { date } });
  };

  return (
    <ClickAwayListener onClickAway={() => handleDayClick()}>
      <StyledItemsContainer>
        {formatWeekdaysList.map(({ dayNumber, title, date }) => {
          const isChecked = checkinsList?.find((checkin) => checkin.date === date)

          return (
            <StyledItem
              key={title}
              onClick={(e) => {
                if (isChecked) return
                e.stopPropagation();
                handleDayClick(dayNumber);
              }}
              $selected={selectedDay === dayNumber}
            >
              <StyledSelectedItemPopup
                $itemIndex={dayNumber}
                onClick={() => handleCheckinClick(date)}
                $isVisible={selectedDay === dayNumber}
              >
                <CirclePlus size={16} color="rgba(0,145,255)" />
                <span>Registruoti mintis</span>
              </StyledSelectedItemPopup>

              <StyledWeekTitle
                component="p"
                $selected={selectedDay === dayNumber}
              >
                {title.slice(0, 1)}
              </StyledWeekTitle>

              {selectedDay !== dayNumber && (
                <StyledMoodCircle $selected={!!isChecked} />
              )}
            </StyledItem>
          );
        })}
      </StyledItemsContainer>
    </ClickAwayListener>
  );
};

export default DaysHeader;

const StyledItemsContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  @media (max-width: 600px) {
    gap: 0.25rem;s
  }
    background: transparent;
`;

const StyledWeekTitle = styled(Title) <{ $selected?: boolean }>`
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
`;

const StyledItem = styled("div") <{ $selected: boolean }>`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 4px;

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

const StyledMoodCircle = styled("div") <{ $selected?: boolean }>`
  width: 100%;
  min-width: 100%;
  height: auto;

  aspect-ratio: 1 / 1;

  border-radius: 50%;
  background-color: #363636ff;
  background: ${({ $selected }) => $selected ? "rgb(78, 236, 53)" : "#363636ff"};
  &:hover {
    border: 1px solid rgb(79, 79, 79);
  }
`;

const zoomOut = keyframes`
    from {
        scale:0;
    }
    to {
        scale:1;
    }
  `;

const StyledSelectedItemPopup = styled("button") <{
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

  transform: translate(-50%, -30%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;

  height: 60px;
  width: 120px;
  background-color: #ffffff97;
  border: none;

  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(16, 11, 11, 0.1);

  ${(props) => props.$isVisible && `visibility: visible;`}
  animation: ${(props) =>
    props.$isVisible && zoomOut} 0.3s forwards ease-in-out;

  transition: background-color 0.3s;

  font-size: 0.75rem;

  &:hover {
    cursor: pointer;
    background-color: #e1e1e1b0;
  }
`;
