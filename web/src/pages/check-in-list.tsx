import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux'
import { checkinsSelectors } from '@/store/features/checkins'
import { RootState } from "@/store/store";

import { Button, Divider, IconButton, Stack, styled, Typography } from '@mui/material';
import { Plus } from 'lucide-react';

import Container from '@/components/layouts/Container'

import { ROUTES } from '@/router/routes';
import CheckinCard from '@/components/cards/CheckinCard';
import { getTodayDateString } from '@/utils/date';
import Header from '@/components/layouts/Header';

const CheckinListPage = () => {
    const navigate = useNavigate();

    const checkinsList = useSelector((state: RootState) =>
        checkinsSelectors.selectCheckinsList(state)
    )

    const handleAddNewThought = () => {
        navigate(ROUTES.CHECKIN_FORM.path, { state: { date: getTodayDateString() } })
    }

    return (
        <Container>
            <Header title='Minčių sąrašas'
                rightIcon={
                    <IconButton aria-label="add new thought" sx={{ ml: "auto" }} onClick={handleAddNewThought}>
                        <Plus />
                    </IconButton>
                }
            />

            <Divider sx={{ width: "100%" }} />
            <Stack width="100%" gap={2}>
                {checkinsList.length ? checkinsList.map(({ id, situation, date, emotion }) => (
                    <CheckinCard key={id} date={date} situation={situation} emotion={emotion} />
                )) :
                    <Stack alignItems="center" gap={2} textAlign="center">
                        <StyledImage src='/assets/images/empty-minds-list.png' alt="" />
                        <Typography variant="h5">Jūsų minčių žurnalas dar tuščias</Typography>
                        <Typography variant="body1">Net trumpas minčių užrašymas gali padėti sumažinti emocinę įtampą ir geriau suprasti, kas su jumis vyksta.
                            Rašykite tiek, kiek norisi.</Typography>
                        <Button variant='outlined' color='primary' onClick={handleAddNewThought}>Sukurti pirmą įrašą</Button>
                    </Stack>
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