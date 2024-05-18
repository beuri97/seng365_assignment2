import React from 'react';
import {Avatar, Box, CardMedia, TableCell, TableRow, Typography} from "@mui/material";
import {Link} from "react-router-dom";

interface PetitionProp {
    petition: Petition,
    categories: Category[]
}


const PetitionTableRow = (prop: PetitionProp) => {

    const [petition, setPetition] = React.useState<Petition>(prop.petition);
    const [categories, setCategories] = React.useState<Category[]>(prop.categories);

    return(
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
    )
}


export {PetitionTableRow};


