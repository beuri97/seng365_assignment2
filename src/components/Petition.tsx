import React from 'react';
import {Avatar, Box, CardMedia, Container, Typography} from "@mui/material";
import {card, title} from "../style/cssStyle";


const Petition = () => {

    return (
        <Container maxWidth={'lg'} sx={card}>


            <Container id={'petition-title-container'}
                       sx={{display: 'flex' , alignContent: 'center',
                           justifyContent: 'space-between', marginBottom: '1rem'}}>
                <Box id={'title'}>
                    <Typography variant={'h1'} sx={title} fontWeight={'bold'}>To Be Continue</Typography>
                    <Typography marginLeft={'1rem'} display={'flex'} marginY={'1rem'}
                                alignItems={'start'} color={'gray'}>CREATION DATE: </Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'}>
                    <Typography marginRight={'2rem'} fontWeight={'bold'}>Owner:</Typography>
                    <Avatar src={`http://localhost:4941/api/v1/users/20/image`}
                            alt={"Hello"}
                            sx={{marginInline: '0.5rem',
                                width:  '55px',
                                height: '55px'}}/>
                    <Typography alignContent={'center'}>
                        Morgan English
                    </Typography>
                </Box>
            </Container>

            <Container id={'petition-description-container'} sx={{marginY: '1.5rem'}}>
                <CardMedia
                    component="img"
                    src={`http://localhost:4941/api/v1/petitions/1/image`}
                    alt={"Petition Image"}
                    sx={{height: '32rem', marginLeft: '1rem',
                          width: '32rem', borderRadius: '25px', marginRight: '70px'}}/>
            </Container>


        </Container>
    )
}


export default Petition;