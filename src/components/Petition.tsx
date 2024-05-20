import React from 'react';
import {
    Avatar,
    Box,
    CardMedia,
    Container, Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {card, title} from "../style/cssStyle";

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


const Petition = () => {

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
                    <Avatar src={`http://localhost:4941/api/v1/users/20/image`}
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

            <TableContainer>

            </TableContainer>


        </Container>
    )
}


export default Petition;