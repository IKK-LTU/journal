import React from 'react'

import { styled } from "@mui/material/styles";
import { IconButton, Stack, Typography } from '@mui/material';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


interface HeaderProps {

    leftIcon?: React.ReactNode;
    title: string;
    onLeftIconClick?: () => void;
    rightIcon?: React.ReactNode;
    onRightIconClick?: () => void;
    disableBackBtn?: boolean;
}

const Header = ({
    leftIcon,
    title,
    rightIcon,
    disableBackBtn
}: HeaderProps) => {
    const navigate = useNavigate();


    const renderLeftAction = () => {
        if (leftIcon) {
            return (
                <StyledIconPlacer>
                    {leftIcon}
                </StyledIconPlacer>
            )
        }

        if (!disableBackBtn) {
            return (
                <StyledIconPlacer>
                    <IconButton onClick={() => navigate(-1)}>
                        <ChevronLeft color="#fff" />
                    </IconButton>
                </StyledIconPlacer>)
        }

        return null;
    }


    return (
        <StyledContainer>

            {renderLeftAction()}

            <Typography variant="h6">{title}</Typography>

            {rightIcon && <StyledIconPlacer isRightBtn>{rightIcon}</StyledIconPlacer>}

        </StyledContainer>
    )
}

export default Header


const StyledContainer = styled(Stack)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px 45px;
`;

interface StyledIconButtonProps {
    isRightBtn?: boolean;
}

const StyledIconPlacer = styled(Stack, {
    shouldForwardProp: (prop) => prop !== 'isRightBtn',
})<StyledIconButtonProps>(({ isRightBtn }) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    ...(isRightBtn ? { right: 5 } : { left: 5 }),
}));