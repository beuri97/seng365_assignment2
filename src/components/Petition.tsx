import React from "react";
import axios from "axios";
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    Container, FormGroup, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, Typography
} from "@mui/material";
import {card, title} from "../style/cssStyle";
import {ArrowDownward, ArrowDropDown, Search} from "@mui/icons-material";

interface HeadCell {
    id: string,
    label: string;
}

const headCells: readonly HeadCell[]  = [

    {id: 'img', label: 'Img'},
    {id: 'title', label: 'Title'},
    {id: 'creationDate', label: 'Creation Date'},
    {id: 'category', label: 'Category'},
    {id: 'supportingCost', label: 'Minimum Cost'},
    {id: 'owner', label: 'Owner'}
]



const Petition = () => {

    const [petitions, setPetitions] = React.useState<Array<Petition>>([]);
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");

    const getPetitions = () => {
        axios.get("http://localhost:4941/api/v1/petitions")
            .then(res => {
                setErrorFlag(false);
                setErrorMsg("");
                setPetitions(res.data);
            }, err => {
                setErrorFlag(true);
                setErrorMsg(err.toString());
            })
    }


    React.useEffect(() => {
        getPetitions();
    },[])


    const listPetition = () => {
        petitions.map((row: User))
    }

    return (
        <Container maxWidth="lg" style={card}>
            <h1 style={title}>Petition List</h1>
            <Card variant="outlined" style={{borderRadius: '25px'}}>
                <Box display="flex" justifyContent={"center"} alignItems="center" marginBlock={'2rem'}>
                    <TextField size={"small"} id="search"
                               variant="outlined" label={"Search"}
                               style={{width: "40rem", marginRight: '1rem'}}/>
                    <Button size={'large'} variant="contained" color={'primary'}><Search/></Button>
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
                                <TableCell key={headCell.id} padding={'normal'} style={{fontWeight: 'bold'}}>
                                    {headCell.label}
                                </TableCell>
                            ))}</TableRow>
                    </TableHead>
                    <TableBody>

                    </TableBody>
                </Table>
            </TableContainer>

        </Container>


    );
}

export default Petition;