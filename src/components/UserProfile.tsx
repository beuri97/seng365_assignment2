import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Card, CardMedia,
    Container, Pagination,
    Paper, Stack,
    Table, TableBody, TableCell, TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {card, title} from "../style/cssStyle";
import {Link, useParams} from "react-router-dom";
import {loginState, petitionStore} from "../store";
import axios from "axios";
import Petitions, {headCells} from "./Petitions";
import petitions from "./Petitions";

const UserProfile = () => {
    const {id} = useParams();
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const isEdit = window.location.pathname.includes("edit");
    const [pageNum, setPageNum] = React.useState(1);
    const [count, setCount] = React.useState(0);
    const page = petitionStore(state => state.count);
    const setPage = petitionStore(state => state.setPage)
    const auth = loginState(state => state.token);
    const user = loginState(state => state.user);
    const categories = petitionStore(state => state.categories);
    const [petitionByOwner, setPetitionByOwner] = React.useState([]);
    const [petitionBySupporter, setPetitionBySupporter] = React.useState([]);

    React.useEffect(() => {
        axios.get(`http://localhost:4941/api/v1/users/${id}`,{headers:{'X-Authorization': auth}})
            .then(res => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setEmail(res.data.email);
                axios.get(`http://localhost:4941/api/v1/petitions?ownerId=${id}`)
                    .then(res => {
                        setPetitionByOwner(res.data['petitions']);
                        setPage(res.data['count']);
                        setCount(res.data['count']);
                    })

            })
    }, [id]);

    React.useEffect(() => {
        axios.get(`http://localhost:4941/api/v1/petitions?supporterId=${id}`)
            .then(response => {
                setPage(page + response.data['count']);
                setCount(count + response.data['count']);
                setPetitionBySupporter(response.data['petitions']);
            })
    },[petitionByOwner])

    const pageChange = (event: React.ChangeEvent<unknown>, change: number) => {
        setPageNum(change);
    };

    const listPetition = (petitions:Petitions[]) => {
        return petitions.map((petition: Petitions) => (
            <TableRow hover tabIndex={-1} key={petition.petitionId}>
                <TableCell align={'left'} width={'80rem'}>

                    <Link to={`/petitions/${petition.petitionId}`} style={{textDecoration: 'none', display: 'flex'}} reloadDocument={true} >

                        <CardMedia
                            component="img"
                            src={`http://localhost:4941/api/v1/petitions/${petition.petitionId}/image`}
                            alt={"Petition Image"}
                            sx={{height: '100px', width: '100px', borderRadius: '25px', marginRight: '70px'}}/>

                        <Box display={'table-row'} alignContent={'center'}>
                            <Box display={'flex'}>
                                <Typography component={'p'} color={'lightgrey'}>Category:&nbsp;</Typography>
                                <Typography component={'p'} color={'lightgrey'} fontStyle={'italic'}>
                                    {categories.find(category => category.categoryId === petition.categoryId)?.name}
                                </Typography>
                            </Box>

                            <br/>

                            <Typography variant={'h6'}
                                        sx={{ fontSize: '1rem', '&:hover':{textDecoration: 'underline'}}}
                                        fontWeight={'bold'} color={'black'}>
                                Title:&nbsp;{petition.title}
                            </Typography>

                            <br/>

                            <Box display={'inline-flex'}>
                                <Typography component={'p'} color={'gray'}>Created:&nbsp;</Typography>
                                <Typography component={'p'} color={'gray'} fontStyle={'italic'}>
                                    {petition.creationDate.split("T")[0]}
                                </Typography>

                            </Box>
                        </Box>
                    </Link>

                </TableCell>

                <TableCell align={'right'} width={'200'}>
                    <Typography component={"p"} sx={{fontWeight: 'bold'}}>${petition.supportingCost}</Typography>
                </TableCell>

                <TableCell>
                    <Box display={'flex'} alignContent={'center'}
                         sx={{textDecoration: 'none', '&:hover':{textDecoration: 'underline'}, color: 'black'}}
                         component={'a'} href={`/users/${petition.ownerId}`}>
                        <Avatar src={`http://localhost:4941/api/v1/users/${petition.ownerId}/image`}
                                alt={petition.ownerLastName}
                                sx={{marginInline: '2rem',
                                    width: '72px',
                                    height: '72px'}}/>
                        <Typography alignContent={'center'}>
                            {petition.ownerFirstName + " " + petition.ownerLastName}
                        </Typography>
                    </Box>
                </TableCell>

            </TableRow>
        ))
    }


    return(
        <Container style={card} sx={{maxWidth: '120rem'}}>
            <Typography style={title}>User Profile</Typography>
            <Box display={'inline-block'} justifyContent={'center'}>
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
                <Box display={'inline-block'} justifyItems={'top'} component={Card}
                     maxHeight={'35rem'}
                     elevation={3} sx={{paddingX: '3rem'}}
                     marginY={'2rem'}>
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
                            {(user.userId === Number(id) && auth !== "") &&
                                (<Button variant={'contained'} sx={{marginY: '2rem', width: '10rem'}}>Edit</Button>)}

                        </>
                    )}
                </Box>
                {(!isEdit && auth !== "" && user.userId === Number(id)) && (
                    <Box component={Card}
                         width={'70rem'}
                         elevation={3} sx={{paddingX: '3rem'}}>
                        <Typography variant="h6" fontWeight={'bold'} marginTop={'2rem'}>My Petition</Typography>
                        <TableContainer component={Paper}
                                        style={{marginBlock: '1rem', borderRadius: '25px'}}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {headCells.map((headCell) => (
                                            <TableCell key={headCell.id} padding={'normal'}
                                                       style={{fontWeight: 'bold'}} align={headCell.toRight ? 'right' : 'left'}>
                                                {headCell.label}
                                            </TableCell>
                                        ))}</TableRow>
                                </TableHead>
                                <TableBody>
                                    {listPetition(petitionByOwner)}
                                    {listPetition(petitionBySupporter)}
                                </TableBody>
                            </Table>
                            <Stack  display={'flex'} justifyContent={'center'}>
                                <Typography marginTop={'1rem'}>
                                    Petition: {1+(10*(pageNum -1))} - {(count < (10 * pageNum) )? count : (10 * pageNum)}
                                </Typography>
                                <Pagination count={page} page={pageNum} sx={{display: 'flex', justifyContent: 'center', marginY: '1rem'}}
                                            showFirstButton showLastButton onChange={pageChange}/>
                            </Stack>

                        </TableContainer>

                    </Box>
                )}

            </Box>


        </Container>

    )
}


export default UserProfile;