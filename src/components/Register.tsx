import React, {ChangeEvent} from 'react';
import {card} from "../style/cssStyle";
import {Avatar, Box, Button, Card, Container, TextField, Typography} from "@mui/material";

const Register = () => {

    const [image, setImage] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");


    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    }
    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }


    return (
        <Container style={card}>
            <Typography variant={'h2'} fontWeight={'bold'} marginY={'3rem'}>Register</Typography>
            <Box display={'inline-block'} justifyContent={'center'} component={Card}
                 elevation={3} sx={{paddingX: '3rem'}}>

                <Avatar src={image}
                        sx={{width: '15rem', height: '15rem', marginY: '2rem'}}/>

                <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    style={{display: 'none'}}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                        const files = event.target.files as FileList;
                        setImage(URL.createObjectURL(files[0]));
                    }}
                />
                <label htmlFor="avatar-upload">
                    <Button variant="contained" component="span">
                        Upload Image
                    </Button>
                </label>
                <br/>
                <TextField size={'small'} label={'First Name'} required
                           value={firstName} sx={{marginTop: '2rem', width: '15rem'}}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               handleFirstNameChange(event);
                           }}/>
                <br/>
                <TextField size={'small'} label={'Last Name'} required
                           value={lastName} sx={{marginTop: '2rem', width: '15rem'}}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               handleLastNameChange(event);
                           }}/>
                <br/>
                <TextField size={'small'} label={'email'} required
                           value={email} sx={{marginTop: '2rem', width: '15rem'}}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               handleLastNameChange(event);
                           }}/>
                <br/>
                <TextField size={'small'} label={'Password'} required type={'password'}
                           value={password} sx={{marginTop: '2rem', width: '15rem'}}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               handlePasswordChange(event);
                           }}/>
                <br/>
                <TextField size={'small'} label={'Confirm Password'} required
                           value={confirmPassword} sx={{marginTop: '2rem', width: '15rem'}}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               handleConfirmPasswordChange(event)
                           }}/>
                <br/>
                <Button variant={'contained'} sx={{marginY: '2rem', width: '10rem'}}>Register</Button>
            </Box>

        </Container>
    );
}


export default Register;