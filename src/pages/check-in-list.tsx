import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux'
import { checkinsSelectors } from '@/store/features/checkins'
import { RootState } from "@/store/store";

import { Button, Chip, Divider, IconButton, Stack, styled, Typography } from '@mui/material';
import { theme } from '../../theme'
import { Plus } from 'lucide-react';

import Container from '@/components/layouts/Container'

import { ROUTES } from '@/router/routes';

const CheckinListPage = () => {
    const navigate = useNavigate();

    const checkinsList = useSelector((state: RootState) =>
        checkinsSelectors.selectCheckinsList(state)
    ) || []

    const handleAddnewThought = () => {
        navigate(ROUTES.CHECKIN_FORM.path, { state: { date: new Date().toISOString().slice(0, 10) } })
    }

    return (
        <Container>
            <Stack
                sx={{ width: "100%" }}
            >
                <Typography variant="h1">Minčių sąrašas</Typography>
            </Stack>
            <Divider sx={{ width: "100%" }} />
            <Stack width="100%">
                <IconButton aria-label="add new thougth" sx={{ ml: "auto" }} onClick={handleAddnewThought}>
                    <Plus />
                </IconButton>
            </Stack>

            <Stack width="100%" gap={2}>
                {checkinsList?.length ? checkinsList?.map(({ id, situation, date, emotion }) => (
                    <StyledCard key={id}>
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
                        </Stack>
                    </StyledCard>
                )) :
                    <Container>
                        <StyledImage src='/public/assets/images/empty-minds-list.png' alt="list is empty" />
                        <Typography variant="h5">Jūsų minčių žurnalas dar tuščias</Typography>
                        <Typography variant="body1">Net trumpas minčių užrašymas gali padėti sumažinti emocinę įtampą ir geriau suprasti, kas su jumis vyksta.
                            Rašykite tiek, kiek norisi.</Typography>
                        <Button variant='outlined' color='primary'>Sukurti pirmą įrašą</Button>
                    </Container>
                }
            </Stack>
        </Container>
    )
}

export default CheckinListPage


const StyledImage = styled("img")`
    height: 200px;
    width: 200px;
`


const StyledCard = styled(Stack)`    
    cursor: pointer;    

    gap: 12px;
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