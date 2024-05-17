import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Button,
    Card,
    CardMedia,
    Checkbox,
    Container,
    FormControlLabel,
    FormGroup,
    Grid, InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
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
    const [startIndex, setStartIndex] = React.useState("");
    const [count, setCount] = React.useState(0);
    const [minimumCost, setMinimumCost] = React.useState("");
    const [noFilterBox, setNoFilterBox] = React.useState(true);
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [categories, setCategories] = React.useState<Array<Category>>([]);


    const startSearch = (query: string) => {
        axios.get(`http://localhost:4941/api/v1/petitions${query}`)
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

    const queryExecution = () => {

        let query = "?";
        query += searchTerm !== "" ? ("q=" + searchTerm) : "";

        startSearch(query === "?" ? "" : query);
    }



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

                        <Link to={`/petitions/${row.petitionId}`} style={{textDecoration: 'none', display: 'flex'}} >

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

                                <Typography variant={'h6'}
                                            sx={{ fontSize: '1rem', '&:hover':{textDecoration: 'underline'}}}
                                            fontWeight={'bold'} color={'black'}>
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
                        </Link>

                    </TableCell>

                    <TableCell align={'right'} width={'200'}>
                        <Typography component={"p"} sx={{fontWeight: 'bold'}}>${row.supportingCost}</Typography>
                    </TableCell>

                    <TableCell>
                        <Box display={'flex'} alignContent={'center'}>
                            <Avatar src={`http://localhost:4941/api/v1/users/${row.ownerId}/image`}
                                    alt={row.ownerLastName}
                                    sx={{bgcolor: '#' + Math.floor(Math.random()*16777215).toString(16),
                                        marginInline: '2rem',
                                        width: '72px',
                                        height: '72px'}}/>
                            <Typography alignContent={'center'}>
                                {row.ownerFirstName + " " + row.ownerLastName}
                            </Typography>
                        </Box>
                    </TableCell>

                </TableRow>
            ))
    }

    // -----------------------------------Main Container--------------------------------------------

    if (!errorFlag)
        return (
            <Container maxWidth="xl" style={card}>
                <h1 style={title}>Petition List</h1>
                <Card id={'filter-card'} variant="outlined" style={{borderRadius: '25px'}}>

                    <Box id={'search-bar'} display="flex" justifyContent={"center"} alignItems="center" marginBlock={'2rem'}>
                        <TextField size={"small"} id="search"
                                   variant="outlined" label={"Search"}
                                   style={{width: "40rem", marginRight: '1rem'}} value={searchTerm}
                                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                       setSearchTerm(event.target.value);}}/>
                        <Button size={'large'} variant="contained"
                                color={'primary'} onClick={queryExecution} ><Search/></Button>
                    </Box>

                    <Accordion id={"Filter Accordion"}>
                        <AccordionSummary expandIcon={<ArrowDownward/>}>
                            <Typography variant={'h6'} component={'h6'} marginLeft={'1rem'}
                                        sx={{marginRight: '16%'}}>Filter</Typography>
                            <Typography sx={{color: 'text.secondary', display: 'flex', alignItems: 'center'}}>
                                {noFilterBox ? "Off" : "On"}
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails style={{marginBottom: '2vw', display: ''}}>
                            <Box id={'filter top'} borderTop='lightgrey solid 1px' paddingBlock='1.5rem'>
                                <FormControlLabel id={"No Filter CheckBox"}
                                                  control={<Checkbox checked={noFilterBox}
                                                                     onChange={() => setNoFilterBox(!noFilterBox)}/>}
                                                  label={"No Filter"}/>

                                <TextField size={"small"} id={"minimumCostField"} variant={"outlined"}
                                           label={"Minimum Cost"} style={{width: "25rem", marginLeft: '30rem'}}
                                           value={minimumCost} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setMinimumCost(event.target.value);}}
                                           InputProps={{
                                               startAdornment: <InputAdornment position="start">$</InputAdornment>
                                           }}/>
                            </Box>

                            <Box id={'filter-categories'} borderTop='lightgrey solid 1px' paddingTop='1.5rem'>
                                <Typography color={'gray'} fontWeight={'bold'}
                                            fontSize={'1.2rem'} marginLeft={'1rem'}
                                            textAlign={'start'}>Category</Typography>
                                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}} paddingLeft={'2rem'} paddingTop={'1.5rem'}>
                                    {categories.map(category => (
                                        <Grid item xs={2} sm={4} md={4} key={category.categoryId}
                                              textAlign={'start'}>
                                            <FormControlLabel control={<Checkbox/>} label={category.name}/>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>


                        </AccordionDetails>
                    </Accordion>

                </Card>
                <TableContainer component={Paper}
                                style={{marginBlock: '3rem', borderRadius: '25px'}}>
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