import React from 'react';
import {
    Avatar,
    Box, Button,
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
import {Link, useParams} from "react-router-dom";
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
    const {id} = useParams();
    const [petition, setPetition] = React.useState<Petition>(
        {
            petitionId: 0,
            title: '',
            description: '',
            categoryId: 0,
            ownerId: 0,
            ownerFirstName: '',
            ownerLastName: '',
            creationDate: '',
            numberOfSupporters: 0,
            moneyRaised: 0,
            supportTiers: []
        }
    );
    const [supporters, setSupporters] = React.useState<Array<Supporter>>([]);

    const categories: Category[] = petitionStore(state => state.categories);
    const petitions = petitionStore(state => state.petitionsList);
    const setPetitions = petitionStore(state => state.setPetitions);
    const errorFlag = petitionStore(state => state.errorFlag);
    const setErrorFlag = petitionStore(state => state.setErrorFlag);
    const errorMsg = petitionStore(state => state.errorMsg);
    const setErrorMsg = petitionStore(state => state.setErrorMsg);



    React.useEffect(() => {
        axios.get(`http://localhost:4941/api/v1/petitions/${id}`)
            .then(res => {
                setErrorFlag(false);
                setErrorMsg("");
                setPetition(res.data);

            });

        axios.get(`http://localhost:4941/api/v1/petitions/${id}/supporters`)
            .then(res => {
                setErrorFlag(false);
                setErrorMsg("");
                setSupporters(res.data);
            });
    }, [id]);

    React.useEffect(() => {
        axios.get('http://localhost:4941/api/v1/petitions')
            .then(res => {
                setErrorFlag(false);
                setErrorMsg("");
                setPetitions(res.data['petitions']
                    .filter((temp: Petitions) => temp.petitionId !== petition.petitionId &&
                        (temp.ownerId === petition.ownerId || temp.categoryId === petition.categoryId)));
            })
    }, [petition]);


    const getSupportTier = () => {

        return petition.supportTiers.map(supportTier => (
            <TableRow>
                <TableCell id={'tier-description'} align={'left'} width={'900'}>
                    <Typography id={'tier-title'} variant={'h6'} fontWeight={'bold'}>{supportTier.title}</Typography>
                    <Typography color={'light-grey'}>{supportTier.description}</Typography>
                </TableCell>
                <TableCell id={'tier-cost-cell'}>
                    <Typography id={'tier-cost'} variant={'h6'} fontWeight={'bold'}>$ {supportTier.cost}</Typography>
                </TableCell>
                <TableCell id={'support-button'}>
                    <Button variant={'contained'}>Support</Button>
                </TableCell>
            </TableRow>
        ))
    }

    const getTierTitle  = (supporter: Supporter) => {
        const tier = petition.supportTiers.find(t => t.supportTierId === supporter.supportTierId);

        return tier?.title;
    }

    const getSupporter = () => {

        return supporters.map(supporter => (
            <TableRow>
                <TableCell id={'supporter-tier-title'} align={'left'} width={'300'}>
                    <Typography id={'tier-title'} variant={'h6'} fontWeight={'bold'}>
                        {getTierTitle(supporter)}
                    </Typography>
                </TableCell>
                <TableCell align={'left'} width={'450'}>
                    <Typography>{supporter.message !== null ? supporter.message : <i>No Message</i>}</Typography>
                </TableCell>
                <TableCell align={'center'}>
                    <Typography>{supporter.timestamp.split('T')[0]}</Typography>
                </TableCell>
                <TableCell>
                    <Box display={'flex'} alignItems={'center'}>
                        <Avatar src={`http://localhost:4941/api/v1/users/${supporter.supporterId}/image`}
                                alt={"Hello"}
                                sx={{marginInline: '0.5rem',
                                    width:  '55px',
                                    height: '55px'}}/>
                        <Typography alignContent={'center'}>
                            {supporter.supporterFirstName + ' ' + supporter.supporterLastName}
                        </Typography>
                    </Box>
                </TableCell>
            </TableRow>
        ))
    }

    const listPetition = () => {
        return petitions.map((petition: Petitions) => (
            <TableRow hover tabIndex={-1} key={petition.petitionId}>
                <TableCell align={'left'} width={'500'}>

                    <Box style={{textDecoration: 'none', display: 'flex'}} >

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
                                        sx={{ fontSize: '1rem'}}
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
                    </Box>
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

    return (
        <Container maxWidth={'lg'} style={card}>


            <Container id={'petition-title-container'}
                       sx={{display: 'flex' , alignContent: 'center',
                           justifyContent: 'space-between', marginBottom: '1rem'}}>
                <Box id={'title'}>
                    <Typography variant={'h1'} sx={title} fontWeight={'bold'}>{petition.title}</Typography>
                    <Typography marginLeft={'1rem'} display={'flex'} marginY={'1rem'}
                                alignItems={'start'} color={'gray'}>CREATION DATE: {petition.creationDate.split('T')[0]}</Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'}>
                    <Typography marginRight={'2rem'} fontWeight={'bold'}>Owner:</Typography>
                    <Avatar src={`http://localhost:4941/api/v1/users/${petition.ownerId}/image`}
                            alt={"Hello"}
                            sx={{marginInline: '0.5rem',
                                width:  '55px',
                                height: '55px'}}/>
                    <Typography alignContent={'center'}>
                        {petition.ownerFirstName + ' ' + petition.ownerLastName}
                    </Typography>
                </Box>
            </Container>

            <Container id={'petition-description-container'} sx={{marginY: '2rem',  display: 'flex'}}>
                <CardMedia
                    component="img"
                    src={`http://localhost:4941/api/v1/petitions/${petition.petitionId}/image`}
                    alt={"Petition Image"}
                    sx={{height: '32rem', marginLeft: '1rem',
                          width: '32rem', borderRadius: '25px', marginRight: '70px'}}/>
                <Box id={'information-box'} display={'block'} alignContent={'top'} marginY={'1rem'}>
                    <Box id={'description-box'} textAlign={'left'} height={"24rem"}>
                        <Typography id={'description-title'} variant={'h6'} fontWeight={'bold'} marginTop={'2rem'}>DESCRIPTION</Typography>
                        <Typography id={"description"} marginY={'1rem'}>{petition.description}</Typography>
                    </Box>
                    <Box id={'support-information'} textAlign={'left'} marginTop={'1rem'}>
                        <Typography id={'num-of-supporter'} variant={'h5'} fontWeight={'bold'}>Number of Supporters: {petition.numberOfSupporters}</Typography>
                        <Typography id={'total-raised'} variant={'h5'} fontWeight={'bold'}>Total Raised: ${petition.moneyRaised}</Typography>
                    </Box>
                </Box>
            </Container>

            <Typography variant={'h6'} fontWeight={'bold'}
                        textAlign={'left'} marginTop={"4rem"} marginBottom={'1rem'}>Available Support Tier</Typography>
            <TableContainer id={'tier-table-container'}>
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
                        {getSupportTier()}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant={'h6'} fontWeight={'bold'}
                        marginTop={'4rem'} marginBottom={'1rem'} textAlign={'left'}>Supporters</Typography>

            <TableContainer id={'table-container'}>
                <TableHead>
                    <TableRow>
                        {headCellSupporters.map(headCell => (
                            <TableCell key={headCell.id} padding={'normal'} sx={{fontWeight: 'bold'}} align={'left'}>
                                {headCell.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getSupporter()}
                </TableBody>
            </TableContainer>


            <Typography variant={'h6'} fontWeight={'bold'}
                        marginTop={'4rem'} marginBottom={'1rem'} textAlign={'left'}>Similar Petitions</Typography>

            <TableContainer>
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
                    {petitions.length !== 0 && (
                        <TableBody>
                            {listPetition()}
                        </TableBody>
                    )}
                </Table>
                {petitions.length === 0 && (
                    <Typography fontStyle={'italic'} display={'flex'} justifyContent={'center'} marginTop={'1rem'}>
                        No Similar Petitions Found
                    </Typography>
                )}
            </TableContainer>
        </Container>
    )
}


export default Petition;