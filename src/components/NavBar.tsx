import React from "react";
import {AppBar, Container, Toolbar, Typography} from "@mui/material";
import {BarChart} from "@mui/icons-material";

const NavBar = () => {
    return (
        <AppBar position="static">
            <Container component="nav" style={{marginRight: '10vw', marginLeft: '10vw'}} disableGutters>
                <Toolbar disableGutters>
                    <BarChart sx={{display: 'flex', mr: 1}}/>
                    <Typography variant="h6" component="a" href={"/petition"}
                                sx={{mr: 'flex', fontFamily: 'monospace', fontWeight: 700,
                                    letterSpacing: '0.1rem', textDecoration: 'none', color: "inherit"}}>
                        PETITION
                    </Typography>
                </Toolbar>
            </Container>

        </AppBar>
    )
}

export default NavBar;