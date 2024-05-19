import React from "react";
import axios from "axios";
import {
    Accordion, AccordionDetails, AccordionSummary, Avatar,
    Box,
    Button,
    Card, CardMedia,
    Checkbox,
    Container, FormControl,
    FormControlLabel,
    Grid, InputAdornment, InputLabel, NativeSelect, Pagination,
    Paper, Stack,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from "@mui/material";
import {card, title} from "../style/cssStyle";
import {ArrowDownward, Search} from "@mui/icons-material";
import petitionStore from "../store";
import {Link} from "react-router-dom";

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

const Petitions = () => {

    const petitions = petitionStore(state => state.petitionsList);
    const page = petitionStore(state => state.count);
    const categories = petitionStore(state => state.categories);
    const searchTerm = petitionStore(state => state.searchTerm);
    const minimumCost = petitionStore(state => state.minimumCost);
    const sort = petitionStore(state => state.sort);
    const errorFlag = petitionStore(state => state.errorFlag);
    const errorMsg = petitionStore(state => state.errorMsg);
    const setPetitions = petitionStore(state => state.setPetitions);
    const setPage = petitionStore(state => state.setPage);
    const setCategories = petitionStore(state => state.setCategories);
    const setSearchTerm = petitionStore(state => state.setSearchTerm);
    const setMinimumCost = petitionStore(state => state.setMinimumCost);
    const setSort = petitionStore(state => state.setSort);
    const setErrorFlag = petitionStore(state => state.setErrorFlag);
    const setErrorMsg = petitionStore(state => state.setErrorMsg);
    const [pageNum, setPageNum] = React.useState(1);
    const [count, setCount] = React.useState(0);
    const handleSortEvent = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(event.target.value);
    }

    const handleMinimumCost = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinimumCost(!isNaN(Number(event.target.value)) ? event.target.value : "");
    }

    const handleCategoryBoxes = (categoryId: number) => {

        setCategories(categories.map(category => category.categoryId === categoryId ? ({...category, checked: !category.checked}) : category));

    }


    const startSearch = (query: string) => {
        axios.get(`http://localhost:4941/api/v1/petitions?count=10&startIndex=${10*(pageNum-1)}${query}`)
            .then(res => {
                setErrorFlag(false);
                setErrorMsg("");
                setPetitions(res.data['petitions']);
                setPage(res.data['count']);
            }, err => {
                setErrorFlag(true);
                setErrorMsg(err.toString());
            })
    }

    const queryExecution = () => {

        let query = "";
        query += searchTerm !== "" ? ("&q=" + searchTerm) : "";
        categories.forEach(category => {category.checked && (query += `&categoryIds=${category.categoryId}`)});
        query += minimumCost !== "" ? `&supportingCost=${minimumCost}` : "";
        query += `&sortBy=${sort}`;

        console.log(query);

        startSearch(query === "&" ? "" : query);
    }

    const pageChange = (event: React.ChangeEvent<unknown>, change: number) => {
        setPageNum(change);
    };

    const getPetitions = () => {
        axios.get("http://localhost:4941/api/v1/petitions?count=10&startIndex=0")
            .then(res => {
                setErrorFlag(false);
                setErrorMsg("");
                const result = res.data['petitions'];
                setPetitions(result);
                setPage(res.data['count']);
                setCount(res.data['count']);
            }, err => {
                setErrorFlag(true);
                setErrorMsg(err.toString());
            })
        axios.get("http://localhost:4941/api/v1/petitions/categories")
            .then(res => {
                setCategories(res.data);
        })
    }

    React.useEffect(() => {
        getPetitions();
        },[]);

    React.useEffect(() => {
        queryExecution();
    }, [pageNum, categories, sort, minimumCost])


    const listPetition = () => {
        return petitions.map((petition: Petition) => (
            <TableRow hover tabIndex={-1} key={petition.petitionId}>
                <TableCell align={'left'} width={'500'}>

                    <Link to={`/petitions/${petition.petitionId}`} style={{textDecoration: 'none', display: 'flex'}} >

                        <CardMedia
                            component="img"
                            src={`http://localhost:4941/api/v1/petitions/${petition.petitionId}/image`}
                            alt={"Petition Image"}
                            sx={{height: '150px', width: '150px', borderRadius: '25px', marginRight: '70px'}}/>

                        <Box display={'table-row'} alignContent={'center'} width={'35rem'}>
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
                    <Box display={'flex'} alignContent={'center'}>
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


    // -----------------------------------Main Container--------------------------------------------


    if (!errorFlag)
        return (
            <Container maxWidth="xl" style={card}>
                <h1 style={title}>Petition List</h1>
                <Card id={'filter-card'} variant="outlined" style={{borderRadius: '25px'}}>

                    <Box id={'search-bar'} display="flex" justifyContent={"center"} alignItems="center"
                         marginBlock={'2rem'}>
                        <TextField size={"small"} id="search"
                                   label={"Search"}
                                   variant={'standard'}
                                   style={{width: "40rem", marginRight: '1rem'}} value={searchTerm}
                                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                       setSearchTerm(event.target.value);
                                   }}/>
                        <Button size={'large'} variant="contained"
                                color={'primary'} onClick={queryExecution}><Search/></Button>
                    </Box>

                    <Accordion id={"Filter Accordion"}>
                        <AccordionSummary expandIcon={<ArrowDownward/>}>
                            <Typography variant={'h6'} component={'h6'} marginLeft={'1rem'}
                                        sx={{marginRight: '16%'}}>Filter</Typography>
                        </AccordionSummary>

                        <AccordionDetails style={{marginBottom: '2vw'}}>
                            <Box id={'filter top'} borderTop='lightgrey solid 1px' paddingBlock='1.5rem'>

                                <TextField size={"small"} id={"minimumCostField"} variant={'standard'}
                                           label={"Minimum Cost"}
                                           style={{width: "25rem", marginRight: '15rem'}}
                                           value={minimumCost}
                                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                               handleMinimumCost(event)
                                           }}
                                           InputProps={{
                                               startAdornment: <InputAdornment position="start">$</InputAdornment>
                                           }}/>

                                <FormControl>
                                    <InputLabel id={'sorting-label'}>Sort</InputLabel>
                                    <NativeSelect value={sort} variant={'outlined'}
                                                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                                      handleSortEvent(event)
                                                  }}
                                    >
                                        <option value={'ALPHABETICAL_ASC'}>Ascending Alphabetically</option>
                                        <option value={'ALPHABETICAL_DESC'}>Descending Alphabetically</option>
                                        <option value={'COST_ASC'}>Ascending by supporting cost</option>
                                        <option value={'COST_DESC'}>Descending by supporting cost</option>
                                        <option value={'CREATED_ASC'}>Ascending by creation date</option>
                                        <option value={'CREATED_DESC'}>Descending creation date</option>
                                    </NativeSelect>
                                </FormControl>
                            </Box>

                            <Box id={'filter-categories'} borderTop='lightgrey solid 1px' paddingTop='1.5rem'>
                                <Typography color={'gray'} fontWeight={'bold'}
                                            fontSize={'1.2rem'} marginLeft={'1rem'}
                                            textAlign={'start'}>Category</Typography>
                                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}
                                      paddingLeft={'2rem'} paddingTop={'1.5rem'}>
                                    {categories.map(category => (
                                        <Grid item xs={2} sm={4} md={4} key={category.categoryId}
                                              textAlign={'start'}>
                                            <FormControlLabel
                                                key={category.categoryId}
                                                control={<Checkbox checked={category.checked}
                                                                   onChange={() => {
                                                                       handleCategoryBoxes(category.categoryId);
                                                                   }}/>}
                                                label={category.name}/>
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
                    <Stack  display={'flex'} justifyContent={'center'}>
                        <Typography marginTop={'1rem'}>
                            Petition: {1+(10*(pageNum -1))} - {(count < (10 * pageNum) )? count : (10 * pageNum)}
                        </Typography>
                        <Pagination count={page} page={pageNum} sx={{display: 'flex', justifyContent: 'center', marginY: '1rem'}}
                                    showFirstButton showLastButton onChange={pageChange}/>
                    </Stack>

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

export default Petitions;