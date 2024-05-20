import React from 'react';
import {
    Avatar,
    Box,
    CardMedia,
    Container, Pagination, Paper, Stack,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {card, title} from "../style/cssStyle";
import {useParams} from "react-router-dom";
import petitionStore from "../store";
import axios from "axios";

interface headCellTier {
    id: string,
    label: string,

}

const headCellTiers: readonly headCellTier[]  = [

    {id: 'tier', label: 'Tier'},
    {id: 'cost', label: 'Cost'},
    {id: 'support', label: ''}
]

interface headCellSupporter {
    id: string,
    label: string,
}

const headCellSupporters: readonly headCellSupporter[]  = [
    {id: 'tierTitle', label: 'Title'},
    {id: 'message' , label: 'Message'},
    {id: 'timeStamp', label: 'Date Supported'},
    {id: 'supporter'  , label: 'Supporter'}
]

interface petitionsHeadCell {
    id: string,
    label: string,
    toRight: boolean;
}

const petitionsHeadCells: readonly petitionsHeadCell[]  = [

    {id: 'petition', label: 'Petition', toRight: false},
    {id: 'supportingCost', label: 'Minimum Cost', toRight: true},
    {id: 'owner', label: 'Owner', toRight: false}
]


const Petition = () => {
    const {petitionId} = useParams();
    const [petition, setPetition] = React.useState<Petition>();
    const petitions = petitionStore(state => state.petitionsList);
    const setPetitions = petitionStore(state => state.setPetitions);
    const errorFlag = petitionStore(state => state.errorFlag);
    const setErrorFlag = petitionStore(state => state.setErrorFlag);
    const errorMsg = petitionStore(state => state.errorMsg);
    const setErrorMsg = petitionStore(state => state.setErrorMsg);



    React.useEffect(() => {
        axios.get(`http://localhost:4941/api/v1/petitions/${petitionId}`)
            .then(res => {
                setErrorFlag(false);
                setErrorMsg("");
                setPetition(res.data);

            })
    }, [])

    return (
        <Container maxWidth={'lg'} sx={card}>


            <Container id={'petition-title-container'}
                       sx={{display: 'flex' , alignContent: 'center',
                           justifyContent: 'space-between', marginBottom: '1rem'}}>
                <Box id={'title'}>
                    <Typography variant={'h1'} sx={title} fontWeight={'bold'}>To Be Continue</Typography>
                    <Typography marginLeft={'1rem'} display={'flex'} marginY={'1rem'}
                                alignItems={'start'} color={'gray'}>CREATION DATE: </Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'}>
                    <Typography marginRight={'2rem'} fontWeight={'bold'}>Owner:</Typography>
                    <Avatar src={`http://localhost:4941/api/v1/users/${petition.ownerId}/image`}
                            alt={"Hello"}
                            sx={{marginInline: '0.5rem',
                                width:  '55px',
                                height: '55px'}}/>
                    <Typography alignContent={'center'}>
                        Morgan English
                    </Typography>
                </Box>
            </Container>

            <Container id={'petition-description-container'} sx={{marginY: '2rem',  display: 'flex'}}>
                <CardMedia
                    component="img"
                    src={`http://localhost:4941/api/v1/petitions/1/image`}
                    alt={"Petition Image"}
                    sx={{height: '32rem', marginLeft: '1rem',
                          width: '32rem', borderRadius: '25px', marginRight: '70px'}}/>
                <Box id={'information-box'} display={'block'} alignContent={'top'} marginY={'1rem'}>
                    <Box id={'description-box'} textAlign={'left'} height={"24rem"}>
                        <Typography id={'description-title'} variant={'h6'} fontWeight={'bold'} marginTop={'2rem'}>DESCRIPTION</Typography>
                        <Typography id={"deiscription"} marginY={'1rem'}>This is going to be petition description</Typography>
                    </Box>
                    <Box id={'support-information'} textAlign={'left'} marginTop={'1rem'}>
                        <Typography id={'num-of-supporter'} variant={'h5'} fontWeight={'bold'}>Number of Supporters: 500</Typography>
                        <Typography id={'total-raised'} variant={'h5'} fontWeight={'bold'}>Total Raised: $5000</Typography>
                    </Box>
                </Box>
            </Container>

            <Typography variant={'h6'} fontWeight={'bold'}
                        textAlign={'left'} marginTop={"4rem"} marginBottom={'1rem'}>Available Support Tier</Typography>
            <TableContainer id={'table-container'} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headCellTiers.map((headCell) => (
                                <TableCell key={headCell.id} padding={'normal'} sx={{fontWeight: 'bold'}} align={'left'}>
                                    {headCell.label}
                                </TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer id={'table-container'} component={Paper}>

            </TableContainer>

            <Typography variant={'h6'} fontWeight={'bold'}
                        marginTop={'4rem'} marginBottom={'1rem'} textAlign={'left'}>Supporters</Typography>

            <TableContainer id={'table-container'} component={Paper}>
                <TableHead>
                    <TableRow>
                        {headCellSupporters.map(headCell => (
                            <TableCell key={headCell.id} padding={'normal'} sx={{fontWeight: 'bold'}} align={'left'}>
                                {headCell.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
            </TableContainer>


            <Typography variant={'h6'} fontWeight={'bold'}
                        marginTop={'4rem'} marginBottom={'1rem'} textAlign={'left'}>Similar Petitions</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {petitionsHeadCells.map((headCell) => (
                                <TableCell key={headCell.id} padding={'normal'}
                                           style={{fontWeight: 'bold'}} align={headCell.toRight ? 'right' : 'left'}>
                                    {headCell.label}
                                </TableCell>
                            ))}</TableRow>
                    </TableHead>
                    <TableBody>
                        {/*{listPetition()}*/}
                    </TableBody>
                </Table>
            {/*    <Stack  display={'flex'} justifyContent={'center'}>*/}
            {/*        <Typography marginTop={'1rem'}>*/}
            {/*            Petition: {1+(10*(pageNum -1))} - {(count < (10 * pageNum) )? count : (10 * pageNum)}*/}
            {/*        </Typography>*/}
            {/*        <Pagination count={page} page={pageNum} sx={{display: 'flex', justifyContent: 'center', marginY: '1rem'}}*/}
            {/*                    showFirstButton showLastButton onChange={pageChange}/>*/}
            {/*    </Stack>*/}

            </TableContainer>
        </Container>
    )
}


export default Petition;