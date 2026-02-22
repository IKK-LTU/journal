import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux'
import { checkinsSelectors } from '@/store/features/checkins'
import { RootState } from "@/store/store";

import { Button, Divider, IconButton, Stack, styled, Typography } from '@mui/material';
import { theme } from '../../theme'
import { Plus } from 'lucide-react';

import Container from '@/components/layouts/Container'

import { ROUTES } from '@/router/routes';
import CheckinCard from '@/components/cards/CheckinCard';
import Header from '@/components/layouts/Header';

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
            <Header title='Minčių sąrašas'
                rightIcon={
                    <IconButton aria-label="add new thougth" sx={{ ml: "auto" }} onClick={handleAddnewThought}>
                        <Plus />
                    </IconButton>
                }
            />

            <Divider sx={{ width: "100%" }} />
            <Stack width="100%">

            </Stack>

            <Stack width="100%" gap={2}>
                {checkinsList?.length ? checkinsList?.map(({ id, situation, date, emotion }) => (
                    <CheckinCard key={id} date={date} situation={situation} emotion={emotion} />
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