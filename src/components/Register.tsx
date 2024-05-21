import React, {ChangeEvent} from 'react';
import {card} from "../style/cssStyle";
import {Avatar, Box, Button, Card, Container, TextField, Typography} from "@mui/material";
import axios from "axios";
import {loginState} from "../store";

const Register = () => {

    const authentication = loginState(state => state.token);
    const setAuthentication = loginState(state => state.setAuthorization);

    const [image, setImage] = React.useState<File | null>(null);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorFlags, setErrorFlags] = React.useState([false,false,false,false]);
    const [errorMsgs, setErrorMsgs] = React.useState(["", "", "", ""]);


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
    const logInUser = (userId: number) => {

        if (isNaN(userId)) return
        axios.post(`http://localhost:4941/api/v1/users/login`, {email: email, password: password})
            .then(res => {
                console.log(res.data.token);
                setAuthentication(res.data.token);
                saveUserImage(res.data.userId);
            }, err => {
                console.log(err.toString());
            })


    }
    const saveUserImage = (userId: number) => {
        if (isNaN(userId)) return

        console.log(authentication);
        const headers = {
            'X-Authorization': authentication
        }
        axios.put(`http://localhost:4941/api/v1/users/${userId}/image`, {image: image}, {headers})

    }
    const registerUser = () => {

        // TODO - Check validity here

        axios.post(`http://localhost:4941/api/v1/users/register`,
            {firstName: firstName, lastName: lastName, email: email, password: password})
            .then(r => {
                console.log(r.data.userId);
                logInUser(r.data.userId);
            }, err => {
                console.log(err);
            } );
    }


    return (
        <Container style={card}>
            <Typography variant={'h2'} fontWeight={'bold'} marginY={'3rem'}>Register</Typography>
            <Box display={'inline-block'} justifyContent={'center'} component={Card}
                 elevation={3} sx={{paddingX: '3rem'}}>

                <Avatar src={(image !== null) ? URL.createObjectURL(image) : ""}
                        sx={{width: '15rem', height: '15rem', marginY: '2rem'}}/>

                <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    style={{display: 'none'}}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                        const files = event.target.files as FileList;
                        setImage(files[0]);
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
                           }} error={errorFlags[0]} helperText={errorMsgs[0]}/>
                <br/>
                <TextField size={'small'} label={'Last Name'} required
                           value={lastName} sx={{marginTop: '2rem', width: '15rem'}}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               handleLastNameChange(event);
                           }} error={errorFlags[1]} helperText={errorMsgs[1]}/>
                <br/>
                <TextField size={'small'} label={'email'} required
                           value={email} sx={{marginTop: '2rem', width: '15rem'}}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               handleEmailChange(event);
                           }} error={errorFlags[2]} helperText={errorMsgs[2]}/>
                <br/>
                <TextField size={'small'} label={'Password'} required type={'password'}
                           value={password} sx={{marginTop: '2rem', width: '15rem'}}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               handlePasswordChange(event);
                           }} error={errorFlags[3]} helperText={errorMsgs[3]}/>
                <br/>
                <Button variant={'contained'} sx={{marginY: '2rem', width: '10rem'}} onClick={registerUser}>Register</Button>
            </Box>

        </Container>
    );
}


export default Register;