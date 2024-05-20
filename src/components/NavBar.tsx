import React from "react";
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import {BarChart} from "@mui/icons-material";
import {loginState} from "../store";

const NavBar = () => {

    const authorization = loginState(state => state.authorization);

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
                            <Button color={'inherit'}>Register</Button>
                            <Button color={'inherit'}>Login</Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>

        </AppBar>
    )
}

export default NavBar;