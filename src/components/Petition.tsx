import React from "react";
import axios from "axios";
import {
    Accordion,
    AccordionSummary,
    Box,
    Button,
    Card,
    Container,
    TextField, Typography
} from "@mui/material";
import {card, title} from "../style/cssStyle";
import {ArrowDownward, ArrowDropDown, Search} from "@mui/icons-material";

const Petition = () => {

    const [petitions, setPetitions] = React.useState([]);
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
                        <AccordionSummary expandIcon={<ArrowDownward/>} >
                            <Typography variant={'h6'} component={'h6'} marginLeft={'1rem'}>Filter</Typography>
                        </AccordionSummary>
                    </Accordion>
                </Card>
        </Container>



    )
}

export default Petition;