import React from "react";
import axios from "axios";
import {
    Accordion, AccordionDetails, AccordionSummary,
    Box,
    Button,
    Card,
    Checkbox,
    Container, FormControl,
    FormControlLabel,
    Grid, InputAdornment, InputLabel, MenuItem, NativeSelect,
    Paper, Select,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from "@mui/material";
import {card, title} from "../style/cssStyle";
import {ArrowDownward, Search} from "@mui/icons-material";
import {PetitionTableRow} from "./PetitionObject";
import petitionStore from "../store";

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

    const petitions = petitionStore(state => state.petitionsList);
    const categories = petitionStore(state => state.categories);
    const searchTerm = petitionStore(state => state.searchTerm);
    const noFilterBox = petitionStore(state => state.noFilterBox);
    const minimumCost = petitionStore(state => state.minimumCost);
    const sort = petitionStore(state => state.sort);
    const errorFlag = petitionStore(state => state.errorFlag);
    const errorMsg = petitionStore(state => state.errorMsg);
    const setPetitions = petitionStore(state => state.setPetitions);
    const setCategories = petitionStore(state => state.setCategories);
    const setSearchTerm = petitionStore(state => state.setSearchTerm);
    const setNoFilterBox = petitionStore(state => state.setNoFilterBox);
    const setMinimumCost = petitionStore(state => state.setMinimumCost);
    const setSort = petitionStore(state => state.setSort);
    const setErrorFlag = petitionStore(state => state.setErrorFlag);
    const setErrorMsg = petitionStore(state => state.setErrorMsg);

    const handleSortEvent = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(event.target.value);
    }

    const checkNoFilter = () => {
        if(categories.every(category => !category.checked) && minimumCost === "") {
            setNoFilterBox(true);
        }
    }
    const handleNoFilterBox = () => {
        setMinimumCost("");
        setCategories(categories.map(category => ({...category, checked: false})));
        setNoFilterBox(true);
    }

    const handleMinimumCost = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinimumCost(event.target.value);
        setNoFilterBox(false);
    }

    const handleCategoryBoxes = (categoryId: number) => {

        setCategories(categories.map(category => category.categoryId === categoryId ? ({...category, checked: !category.checked}) : category));
        setNoFilterBox(false);

    }


    const startSearch = (query: string) => {
        axios.get(`http://localhost:4941/api/v1/petitions${query}`)
            .then(res => {
                setErrorFlag(false);
                setErrorMsg("");
                setPetitions(res.data['petitions']);
                // setTotalPetitions(res.data['count']);
            }, err => {
                setErrorFlag(true);
                setErrorMsg(err.toString());
            })
    }

    const queryExecution = () => {

        let query = "?";
        query += searchTerm !== "" ? ("q=" + searchTerm) : "";
        categories.forEach(category => {category.checked && (query += `&categoryIds=${category.categoryId}`);});
        query += minimumCost !== "" ? `&supportingCost=${minimumCost}` : "";
        query === "?" ? query += `sortBy=${sort}` : query += `&sortBy=${sort}`

        console.log(query);
        startSearch(query);
    }


    const getPetitions = () => {
        axios.get("http://localhost:4941/api/v1/petitions")
            .then(res => {
                setErrorFlag(false);
                setErrorMsg("");
                const result = res.data['petitions'];
                setPetitions(result);
                // setTotalPetitions(res.data['count']);
            }, err => {
                setErrorFlag(true);
                setErrorMsg(err.toString());
            })
        axios.get("http://localhost:4941/api/v1/petitions/categories")
            .then(res => {
                setCategories(res.data.map((category: Category) => ({categoryId: category.categoryId, name: category.name, checked: false})))

            })
    }

    React.useEffect(() => {
        getPetitions();
        },[]);


    const listPetition = () => {
        return petitions.map((row: Petition) => (
            <PetitionTableRow key={row.petitionId} petition={row} categories={categories}/>))
    }


    // -----------------------------------Main Container--------------------------------------------


    if (!errorFlag)
        return (
            <Container maxWidth="xl" style={card}>
                <h1 style={title}>Petition List</h1>
                <Card id={'filter-card'} variant="outlined" style={{borderRadius: '25px'}}>

                    <Box id={'search-bar'} display="flex" justifyContent={"center"} alignItems="center" marginBlock={'2rem'}>
                        <TextField size={"small"} id="search"
                                   label={"Search"}
                                   variant={'standard'}
                                   style={{width: "40rem", marginRight: '1rem'}} value={searchTerm}
                                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                       setSearchTerm(event.target.value);}}/>
                        <Button size={'large'} variant="contained"
                                color={'primary'} onClick={queryExecution} ><Search/></Button>
                    </Box>

                    <Accordion id={"Filter Accordion"} onChange={() => checkNoFilter()}>
                        <AccordionSummary expandIcon={<ArrowDownward/>}>
                            <Typography variant={'h6'} component={'h6'} marginLeft={'1rem'}
                                        sx={{marginRight: '16%'}}>Filter</Typography>
                            <Typography sx={{color: 'text.secondary', display: 'flex', alignItems: 'center'}}>
                                {noFilterBox ? "Off" : "On"}
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails style={{marginBottom: '2vw'}}>
                            <Box id={'filter top'} borderTop='lightgrey solid 1px' paddingBlock='1.5rem'>
                                <FormControlLabel id={"No Filter CheckBox"}
                                                  control={<Checkbox checked={noFilterBox} disabled={noFilterBox}
                                                                     onChange={() => handleNoFilterBox()}/>}
                                                  label={"No Filter"}/>

                                <TextField size={"small"} id={"minimumCostField"} variant={'standard'}
                                           label={"Minimum Cost"}
                                           style={{width: "25rem", marginLeft: '15rem', marginRight: '15rem'}}
                                           value={minimumCost}
                                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {handleMinimumCost(event)}}
                                           InputProps={{
                                               startAdornment: <InputAdornment position="start">$</InputAdornment>
                                           }}/>

                                <FormControl>
                                    <InputLabel id={'sorting-label'}>Sort</InputLabel>
                                    <NativeSelect value={sort} variant={'outlined'}
                                                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {handleSortEvent(event)}}
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
                                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}} paddingLeft={'2rem'} paddingTop={'1.5rem'}>
                                    {categories.map(category => (
                                        <Grid item xs={2} sm={4} md={4} key={category.categoryId}
                                              textAlign={'start'}>
                                            <FormControlLabel
                                                key={category.categoryId}
                                                control={<Checkbox checked={category.checked}
                                                                   onChange={() => {
                                                                       handleCategoryBoxes(category.categoryId);}}/>}
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