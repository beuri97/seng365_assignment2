import React from "react";
import {AppBar, Avatar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import {BarChart} from "@mui/icons-material";
import {loginState} from "../store";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const NavBar = () => {

    const authorization = loginState(state => state.token);
    const setAuthentication = loginState(state => state.setAuthorization);
    const user = loginState(state => state.user);
    const setUser = loginState(state => state.setUser);

    const logoutProcess = () => {

        const headers = {
            'X-Authorization': authorization,
        };

        axios.post('http://localhost:4941/api/v1/users/logout', {},{headers});
    }

    return (
        <AppBar position="static" >
            <Container  style={{marginRight: '10vw', marginLeft: '10vw', display: 'contents', justifyContent: 'center'}} disableGutters>
                <Toolbar disableGutters>
                    <BarChart sx={{display: 'flex', ml: '11vw'}}/>
                    <Typography variant="h6" component="a" href={"/petitions"}
                                sx={{mr: 'flex', fontFamily: 'monospace', fontWeight: 700,
                                    letterSpacing: '0.1rem', textDecoration: 'none', color: "inherit"}}>
                        PETITION
                    </Typography>
                    <Box sx={{flexGrow: 1}}></Box>
                    {authorization === "" && (
                        <Box marginRight={'11vw'}>
                            <Button variant={'text'} color={'inherit'} component={'a'} href={'/register'}>Register</Button>
                            <Button variant={'text'} color={'inherit'} component={'a'} href={'/login'}>Login</Button>
                        </Box>
                    )}
                    {authorization !== "" && (
                        <Box marginRight={'11vw'} display={'inline-flex'}>
                            <Box display={'flex'} alignItems={'center'}
                                 component={'a'} href={`/users/${user.userId}`}
                                 sx={{textDecoration: 'none', display: 'flex', color: 'inherit'}}>
                                <Avatar src={`http://localhost:4941/api/v1/users/${user.userId}/image`}
                                        sx={{marginInline: '0.5rem',
                                            width:  '40px',
                                            height: '40px'}}/>
                                <Typography alignContent={'center'}>
                                    {user.firstName + ' ' + user.lastName}
                                </Typography>

                            </Box>

                            <Button variant={'text'} color={'inherit'} href={'/petitions'}
                                    component={'a'} sx={{marginLeft: '1rem'}}
                                    onClick={() => {
                                        setAuthentication("");
                                        setUser({userId: -1, firstName: '', lastName: ''})
                                        logoutProcess();
                                    }}>Logout</Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>

        </AppBar>
    )
}

export default NavBar;