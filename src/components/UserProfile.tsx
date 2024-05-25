import React from 'react';
import {Avatar, Box, Button, Card, Container, TextField, Typography} from "@mui/material";
import {card, title} from "../style/cssStyle";
import {useParams} from "react-router-dom";
import {loginState} from "../store";
import axios from "axios";

const UserProfile = () => {
    const {id} = useParams();
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const isEdit = window.location.pathname.includes("edit");
    const auth = loginState(state => state.token);


    React.useEffect(() => {
        axios.get(`http://localhost:4941/api/v1/users/${id}`,{headers:{'X-Authorization': auth}})
            .then(res => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setEmail(res.data.email);
            })
    }, [id])


    return(
        <Container style={card}>
            <Typography style={title}>User Profile</Typography>
            <Box display={'flex'} alignContent={'center'}>
                <input id={'petition-image-upload'}
                       type={'file'}
                       accept={'image/*'}
                       style={{display: 'none'}}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                           const files = event.target.files as FileList;
                           console.log(URL.createObjectURL(files[0]));
                           // setPetitionImage(files[0]);
                       }}
                />
                <Box display={'inline-block'} alignContent={isEdit ? 'center' : 'left'} component={Card}
                     elevation={3} sx={{paddingX: '3rem'}}>
                    <Avatar src={`http://localhost:4941/api/v1/users/${id}/image`}
                            sx={{width: '15rem', height: '15rem', marginY: '2rem'}}/>
                    {isEdit && (
                        <label htmlFor="avatar-upload">
                        <Button variant="contained" component="span">
                            Upload Image
                        </Button>
                    </label>)}

                    <br/>
                    {isEdit ? (
                        <>
                            <TextField size={'small'} label={'First Name'} required
                                       value={firstName} sx={{marginTop: '2rem', width: '15rem'}}
                                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                           setFirstName(event.target.value);
                                       }}/>
                            <br/>
                            <TextField size={'small'} label={'Last Name'} required
                                       value={lastName} sx={{marginTop: '2rem', width: '15rem'}}
                                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                           setLastName(event.target.value);
                                       }}/>
                            <br/>
                            <TextField size={'small'} label={'email'} required
                                       value={email} sx={{marginTop: '2rem', width: '15rem'}}
                                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                           setEmail(event.target.value);
                                       }}/>
                            <br/>
                            <Button variant={'contained'} sx={{marginY: '2rem', width: '10rem'}}>Edit</Button>
                        </>
                    ) : (
                        <>
                            <Typography fontWeight={'bold'}>{firstName + " " + lastName}</Typography>
                            <br/>
                            <Typography>{email}</Typography>
                            <br/>
                            <Button variant={'contained'} sx={{marginY: '2rem', width: '10rem'}}>Edit</Button>
                        </>
                    )}
                </Box>
                {!isEdit && (
                    <Box display={'inline-block'} alignContent={isEdit ? 'center' : 'left'}
                         component={Card}
                         elevation={3} sx={{paddingX: '3rem'}}>

                    </Box>
                )}

            </Box>


        </Container>

    )
}


export default UserProfile;