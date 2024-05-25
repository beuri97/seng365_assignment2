import React from "react";
import {Box, Button, Card, Container, TextField, Typography} from "@mui/material";
import {card} from "../style/cssStyle";
import {loginState} from "../store";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const setAuthentication = loginState(state => state.setAuthorization);
    const setUser = loginState(state => state.setUser);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorFlags, setErrorFlags] = React.useState(false);
    const navigate = useNavigate();

    const loginProcess = () => {
        axios.post(`http://localhost:4941/api/v1/users/login`, {email: email, password: password})
            .then(res => {
                console.log(res.data.token);
                console.log(res.data.userId);
                setAuthentication(res.data.token);
                getLoginDetail(res.data.userId);
            }, err => {
                setErrorFlags(true);
            })
    }

    const getLoginDetail = (id: number) => {
        axios.get(`http://localhost:4941/api/v1/users/${id}`)
            .then(res => {
                setUser({userId: id, firstName: res.data.firstName, lastName: res.data.lastName})
                navigate('/petitions');
            })
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <Container style={card}>
            <Typography variant={'h2'} fontWeight={'bold'} marginBottom={'2rem'}>Login</Typography>
            <Box display={'inline-block'} justifyContent={'center'} component={Card}
                 elevation={3} sx={{paddingX: '3rem'}}>
                <TextField size={'small'} label={'email'} required
                           value={email} sx={{marginTop: '2rem', width: '15rem'}}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               handleEmailChange(event);
                           }}/>
                <br/>
                <TextField size={'small'} label={'Password'} required type={'password'}
                           value={password} sx={{marginTop: '2rem', width: '15rem'}}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               handlePasswordChange(event);
                           }}/>
                <br/>
                {errorFlags && (<Typography color={'red'}>Invalid email or password</Typography>)}

                <br/>
                <Button variant={'contained'} sx={{marginY: '2rem', width: '10rem'}} onClick={loginProcess}>Login</Button>
            </Box>
        </Container>
    )
}

export default Login;