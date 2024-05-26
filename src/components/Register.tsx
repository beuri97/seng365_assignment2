import React from 'react';
import {card} from "../style/cssStyle";
import {Avatar, Box, Button, Card, Container, TextField, Typography} from "@mui/material";
import axios from "axios";
import {loginState} from "../store";
import {useNavigate} from "react-router-dom";
import emailRegex from "email-regex";

const Register = () => {

    const setAuthentication = loginState(state => state.setAuthorization);

    const [image, setImage] = React.useState<File | null>(null);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [firstNameErrorFlag, setFirstNameErrorFlag] = React.useState(false);
    const [firstNameError, setFirstNameError] = React.useState("");
    const [lastNameErrorFlag, setLastNameErrorFlag] = React.useState(false);
    const [lastNameError, setLastNameError] = React.useState("");
    const [emailErrorFlag, setEmailErrorFlag] = React.useState(false);
    const [emailError, setEmailError] = React.useState("");
    const [passwordErrorFlag, setPasswordErrorFlag] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState("");
    const setUser = loginState(state => state.setUser);
    const navigate = useNavigate();


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

    const registerUser = () => {
        setFirstNameErrorFlag(false);
        setFirstNameError("");
        setLastNameErrorFlag(false);
        setLastNameError("");
        setEmailErrorFlag(false);
        setEmailError("");
        setPasswordErrorFlag(false);
        setPasswordError("");

        axios.post(`http://localhost:4941/api/v1/users/register`,
            {firstName: firstName, lastName: lastName, email: email, password: password})
            .then(r => {
                console.log(r.data.userId);
                axios.post(`http://localhost:4941/api/v1/users/login`, {email: email, password: password})
                    .then(async res => {
                        console.log(res.data.token);
                        console.log(res.data.userId);
                        setAuthentication(res.data.token);
                        if (image) {
                            const headers = {
                                "Content-Type": image.type,
                                'X-Authorization': res.data.token,
                            };
                            console.log(r.data.userId);
                            axios.put(`http://localhost:4941/api/v1/users/${r.data.userId}/image`, image, {headers})
                                .then(res => {
                                    console.log(res.data.token)
                                    setUser({userId: r.data.userId, firstName: firstName, lastName: lastName})
                                    navigate('/petitions')
                                })
                        } else {
                            setUser({userId: r.data.userId, firstName: firstName, lastName: lastName})
                            navigate('/petitions');
                        }
                    }, err => {
                        console.log(err.toString());
                    })
            }, err => {
                console.log(err);
                if (firstName.length < 1 || firstName.length > 64) {
                    setFirstNameErrorFlag(true);
                    setFirstNameError("First name must be at least 1 character and not exceed 64 characters");

                }
                if (lastName.length < 1 || lastName.length > 64) {
                    setLastNameErrorFlag(true);
                    setLastNameError("Last name must be at least 1 character and not exceed 64 characters");
                }
                if (err.response.status === 403) {
                    setEmailErrorFlag(true);
                    setEmailError("email is already in use");
                }
                if(!email.match(emailRegex())){
                    setEmailErrorFlag(true);
                    setEmailError("email must be in right format such as x@y.z");
                }
                if(password.length < 6) {
                    setPasswordErrorFlag(true);
                    setPasswordError("Password must be at least 6 characters long");
                }

                console.log(err.toString());
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
                        console.log (URL.createObjectURL(files[0]));
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
                           }} error={firstNameErrorFlag} helperText={firstNameError}/>
                <br/>
                <TextField size={'small'} label={'Last Name'} required
                           value={lastName} sx={{marginTop: '2rem', width: '15rem'}}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               handleLastNameChange(event);
                           }} error={lastNameErrorFlag} helperText={lastNameError}/>
                <br/>
                <TextField size={'small'} label={'email'} required
                           value={email} sx={{marginTop: '2rem', width: '15rem'}}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               handleEmailChange(event);
                           }} error={emailErrorFlag} helperText={emailError}/>
                <br/>
                <TextField size={'small'} label={'Password'} required type={'password'}
                           value={password} sx={{marginTop: '2rem', width: '15rem'}}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               handlePasswordChange(event);
                           }} error={passwordErrorFlag} helperText={passwordError}/>
                <br/>
                <Button variant={'contained'} sx={{marginY: '2rem', width: '10rem'}} onClick={registerUser}>Register</Button>
            </Box>

        </Container>
    );
}


export default Register;