import React from "react";
import {AppBar, Avatar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import {BarChart} from "@mui/icons-material";
import {loginState} from "../store";
import axios from "axios";

const NavBar = () => {

    const authorization = loginState(state => state.token);
    const setAuthentication = loginState(state => state.setAuthorization);
    const user = loginState(state => state.user);
    const setUser = loginState(state => state.setUser);


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
                            <Box display={'flex'} alignItems={'center'} >
                                <Avatar src={`http://localhost:4941/api/v1/users/${user.userId}/image`}
                                        alt={"Hello"}
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
                                    }}>Logout</Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>

        </AppBar>
    )
}

export default NavBar;