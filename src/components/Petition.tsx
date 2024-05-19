import React from 'react';
import {Box, Container, Typography} from "@mui/material";
import {card, title} from "../style/cssStyle";


const Petition = () => {

    return (
        <Container maxWidth={'lg'} sx={card}>
            <Container>
                <Box id={'title'}>
                    <Typography variant={'h1'} sx={title} fontWeight={'bold'}>To Be Continue</Typography>
                    <Typography marginLeft={'1rem'} display={'flex'} marginY={'1rem'}
                                alignItems={'start'} color={'gray'}>CREATION DATE: </Typography>
                </Box>
                <Box id={'owner-avater'}>

                </Box>
            </Container>
        </Container>
    )
}


export default Petition;