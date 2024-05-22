import React from 'react'
import {Box, CardMedia, Container, Paper, TextField, Typography} from "@mui/material";
import {card, title} from "../style/cssStyle";
import petition from "./Petition";

const CreatePetition = () => {

    return(
        <Container style={card}>
            <Typography style={title} fontWeight={'bold'}>Create Petition</Typography>
            <Container id={'petition-description-container'} sx={{marginY: '2rem',  display: 'flex', justifyContent: 'center'}}>
                <CardMedia component={Paper}
                    sx={{height: '24rem', marginLeft: '1rem',
                        width: '24rem', borderRadius: '25px', marginRight: '70px'}}/>
                <Box id={'information-box'} display={'block'} alignContent={'top'} marginY={'1rem'}>
                    <Box id={'description-box'} textAlign={'left'}>
                        <Typography id={'description-title'} variant={'h6'} fontWeight={'bold'}>TITLE</Typography>
                        <TextField size={'small'} sx={{width: '20rem'}}></TextField>
                        <Typography id={'description-title'} marginTop={'1rem'} variant={'h6'} fontWeight={'bold'}>DESCRIPTION</Typography>
                        <TextField InputProps={{sx: {width: '20rem', minHeight: '10rem'}}} multiline={true}></TextField>
                        <Typography id={'description-title'} marginTop={'1rem'} variant={'h6'} fontWeight={'bold'}>CATEGORY</Typography>
                    </Box>
                </Box>
            </Container>
            <Box id={'support-information'} textAlign={'left'} marginTop={'1rem'}>

            </Box>
        </Container>
    )
}

export default CreatePetition;