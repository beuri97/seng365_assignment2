import React from "react";
import axios from "axios";
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card, CardMedia,
    Container, FormGroup, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, Typography
} from "@mui/material";
import {card, title} from "../style/cssStyle";
import {ArrowDownward, Search} from "@mui/icons-material";

interface HeadCell {
    id: string,
    label: string,
    toRight: boolean;
}

const headCells: readonly HeadCell[]  = [

    {id: 'petition', label: 'Petition', toRight: false},
    {id: 'supportingCost', label: 'Minimum Cost', toRight: true},
    {id: 'owner', label: 'Owner', toRight: false}
]



const Petition = () => {

    const [petitions ,setPetitions] = React.useState<Array<Petition>>([]);
    const [totalPetitions, setTotalPetitions] = React.useState(0);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [categories, setCategories] = React.useState<Array<Category>>([]);


    const getCategories = () => {
        axios.get("http://localhost:4941/api/v1/petitions/categories")
            .then(res => {
                setCategories(res.data);
            })
    }



    const getPetitions = () => {
        axios.get("http://localhost:4941/api/v1/petitions")
            .then(res => {
                setErrorFlag(false);
                setErrorMsg("");
                setPetitions(res.data['petitions']);
                setTotalPetitions(res.data['count']);
            }, err => {
                setErrorFlag(true);
                setErrorMsg(err.toString());
            })
    }

    React.useEffect(() => {
        getPetitions();
        },[]);

    React.useEffect(() => {
        getCategories();
    }, []);


    const listPetition = () => {
        return petitions.map((row: Petition) => (
                <TableRow hover tabIndex={-1} key={row.petitionId}>
                    <TableCell align={'left'} width={'500'}>
                        <Box display={'flex'}>
                            <CardMedia
                                component="img"
                                src={`http://localhost:4941/api/v1/petitions/${row.petitionId}/image`}
                                alt={"Petition Image"}
                                sx={{height: '150px', width: '150px', borderRadius: '25px', marginRight: '70px'}}/>
                            <Box display={'table-row'} alignContent={'center'} width={'35rem'}>
                                <Box display={'flex'}>
                                    <Typography component={'p'} color={'lightgrey'}>Category:&nbsp;</Typography>
                                    <Typography component={'p'} color={'lightgrey'} fontStyle={'italic'}>
                                        {categories.find(category => category.categoryId === row.categoryId)?.name}
                                    </Typography>
                                </Box>
                                <br/>

                                <Typography variant={'h6'} sx={{ fontSize: '1rem'}}>
                                    Title:&nbsp;{row.title}
                                </Typography>
                                <br/>
                                <Box display={'inline-flex'}>
                                    <Typography component={'p'} color={'gray'}>Created:&nbsp;</Typography>
                                    <Typography component={'p'} color={'gray'} fontStyle={'italic'}>
                                        {row.creationDate.split("T")[0]}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </TableCell>
                    <TableCell align={'right'}>
                        <Typography component={"p"} sx={{fontWeight: 'bold'}}>${row.supportingCost}</Typography>
                    </TableCell>
                    <TableCell>
                        {row.ownerFirstName + " " + row.ownerLastName}
                    </TableCell>
                </TableRow>
            ))
    }

    if (!errorFlag)
        return (
            <Container maxWidth="xl" style={card}>
                <h1 style={title}>Petition List</h1>
                <Card variant="outlined" style={{borderRadius: '25px'}}>
                    <Box display="flex" justifyContent={"center"} alignItems="center" marginBlock={'2rem'}>
                        <TextField size={"small"} id="search"
                                   variant="outlined" label={"Search"}
                                   style={{width: "40rem", marginRight: '1rem'}} value={searchTerm}
                                   onChange={() => setSearchTerm(searchTerm)}/>
                        <Button size={'large'} variant="contained"
                                color={'primary'} ><Search/></Button>
                    </Box>
                    <Accordion>
                        <AccordionSummary expandIcon={<ArrowDownward/>}>
                            <Typography variant={'h6'} component={'h6'} marginLeft={'1rem'}
                                        sx={{marginRight: '16%'}}>Filter</Typography>
                            <Typography sx={{color: 'text.secondary', display: 'flex', alignItems: 'center'}}>
                                I am an accordion
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                                <FormGroup>
                                    <Grid item xs={2} sm={4} md={4}>
                                        {/*    TODO - Need to implement Filter Here    */}
                                    </Grid>
                                </FormGroup>

                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Card>
                <TableContainer component={Paper} style={{marginBlock: '3rem', borderRadius: '25px'}}>
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
                            {listPetition()}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>
        );

    else
        return (
            <>
                <h1>ERROR</h1>
                <h1>{errorMsg}</h1>
            </>
        );
}

export default Petition;