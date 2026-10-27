import { CheckInDto } from '@/api/services/types'
import { Chip, Stack, Typography } from '@mui/material'
import styled from '@mui/styled-engine'

import { theme } from '../../../theme'


interface CheckinCardProps {
    date: CheckInDto["date"];
    situation: CheckInDto["situation"];
    emotion: CheckInDto["emotion"];
}

const CheckinCard = ({
    date,
    situation,
    emotion
}: CheckinCardProps) => {


    return (
        <StyledContainer>
            <Stack
                component="img"
                src="public/assets/svg/undraw_books.svg"
                alt="nana"
                sx={{ width: 124, height: 124 }}
            />
            <Stack
                sx={{
                    gap: 2,
                    overflow: "hidden",
                }}
            >

                <Stack>
                    <Typography variant="caption" color='neutral'>
                        {date}
                    </Typography>
                    <Typography variant='h4'>
                        {situation}
                    </Typography>
                </Stack>

                <Stack
                    flexDirection="row"
                    gap={1}
                >
                    {emotion.map(({ name }) => <Chip key={name} label={name} variant="outlined" sx={{ width: "fit-content" }} />)}
                    {emotion.map(({ name }) => <Chip key={name} label={name} variant="outlined" sx={{ width: "fit-content" }} />)}
                    {emotion.map(({ name }) => <Chip key={name} label={name} variant="outlined" sx={{ width: "fit-content" }} />)}
                    {emotion.map(({ name }) => <Chip key={name} label={name} variant="outlined" sx={{ width: "fit-content" }} />)}
                    {emotion.map(({ name }) => <Chip key={name} label={name} variant="outlined" sx={{ width: "fit-content" }} />)}
                    {emotion.map(({ name }) => <Chip key={name} label={name} variant="outlined" sx={{ width: "fit-content" }} />)}
                </Stack>
            </Stack>
        </StyledContainer>
    )
}

export default CheckinCard


const StyledContainer = styled(Stack)`    
    cursor: pointer;    

    display: flex;
    flex-direction: row;
    gap: 24px;

    width: 100%;
    height: 150px;
    padding: 16px;
    margin: 12px auto;
    border-radius: 8px;
    border: 1px solid #3b3b3b91;
    box-shadow: ${theme.shadows[1]};
    background: #3b3b3b91;

    &:hover {
        border: 1px solid #a4a4a4;
        box-shadow: ${theme.shadows[2]}
    }
`