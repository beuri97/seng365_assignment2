import React from 'react'
import {
    Box, Button,
    CardMedia,
    Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputAdornment,
    NativeSelect,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from "@mui/material";
import {card, title} from "../style/cssStyle";
import {headCellTiers} from "./Petition";
import {ImageSearch} from "@mui/icons-material";
import {loginState, petitionStore} from "../store";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const CreatePetition = () => {

    const categories : Category[] = petitionStore(state => state.categories);
    const auth = loginState(state => state.token);

    const [petitionImage, setPetitionImage] = React.useState<File | null>(null);
    const [imageErrorFlag, setImageFlag] = React.useState<boolean>(false);
    const [categoryId, setCategoryId] = React.useState(-1);
    const [petitionTitle, setPetitionTitle] = React.useState("");
    const [petitionTitleErrorFlag, setPetitionTitleErrorFlag] = React.useState(false);
    const [petitionTitleErrorMsg, setPetitionTitleErrorMsg] = React.useState("");
    const [petitionDescription, setPetitionDescription] = React.useState("");
    const [petitionDescriptionErrorFlag, setPetitionDescriptionErrorFlag] = React.useState(false);
    const [petitionDescriptionErrorMsg, setPetitionDescriptionErrorMsg] = React.useState("");
    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [openRemoveDialog, setOpenRemoveDialog] = React.useState(false);
    const [supportTiers, setSupportTiers] = React.useState<Array<SupportTierPost>>([]);
    const [supportTierErrorFlag, setSupportTierErrorFlag] = React.useState(false);
    const [tierTitle, setTierTitle] = React.useState("");
    const [tierTitleErrorFlag, setTierTitleErrorFlag] = React.useState(false);
    const [tierTitleErrorMsg, setTierTitleErrorMsg] = React.useState("");
    const [tierDescription, setTierDescription] = React.useState("");
    const [tierDescriptionErrorFlag, setTierDescriptionErrorFlag] = React.useState(false);
    const [tierDescriptionErrorMsg, setTierDescriptionErrorMsg] = React.useState("");
    const [tierMinimumCost, setTierMinimumCost] = React.useState(0);
    const [tierCostErrorFlag, setTierCostErrorFlag] = React.useState(false);
    const [tierCostErrorMsg, setTierCostErrorMsg] = React.useState("");
    const navigate = useNavigate();
    const {id} = useParams();


    React.useEffect(() => {
        if(id) {
            axios.get(`http://localhost:4941/api/v1/petitions/${id}`)
                .then(res => {
                    setPetitionTitle(res.data.title)

                })
        }
    }, [id, supportTiers]);

    const submission = () => {
        let error = false;

        if (petitionImage === null) {
            setImageFlag(true);
            error = true;
        }
        else {
            setImageFlag(false);
        }

        if (petitionDescription === "") {

            setPetitionDescriptionErrorFlag(true);
            setPetitionDescriptionErrorMsg("Must have a description");
            error = true;

        } else {
            setPetitionDescriptionErrorFlag(false);
        }

        if (supportTiers.length === 0) {
            setSupportTierErrorFlag(true);
            error = true
        }

        if (!error) {
            axios.post(`http://localhost:4941/api/v1/petitions`,
                {title: petitionTitle,
                    description: petitionDescription,
                    categoryId: categoryId,
                    supportTiers: supportTiers},
                {headers: {"X-Authorization" : auth}})
                .then(res => {
                    const id = res.data.petitionId;
                    axios.put(`http://localhost:4941/api/v1/petitions/${id}/image`, petitionImage, {headers :{
                        "Content-Type": petitionImage?.type, "X-Authorization" : auth}})
                    if (res.status === 403) {
                        setPetitionTitleErrorFlag(true);
                        setPetitionTitleErrorMsg("Title is already exist");
                    } else if (res.status === 401) {
                        navigate("/login");
                    } else if (res.status === 201) {
                        navigate("/petitions");
                    }
                });
        }
    }

    const handleDialogClose = () => {

        setTierTitleErrorFlag(false);
        setTierCostErrorFlag(false);
        setTierTitleErrorMsg("");
        setTierCostErrorMsg("");
        setOpenAddDialog(false);
        setTierTitle("");
        setTierDescription("");
        setTierMinimumCost(0);

    }

    const addTier = (error:boolean) => {
        if(!error){
            setTierTitleErrorFlag(false);
            setTierTitleErrorMsg("");
            setTierCostErrorFlag(false);
            setTierCostErrorMsg("");
            setTierTitleErrorFlag(true);
            setTierTitleErrorMsg("");
            setTierTitleErrorFlag(false);
            setTierCostErrorFlag(false);
            setOpenAddDialog(false);
            setTierTitle("");
            setTierDescription("");
            setTierMinimumCost(0);

            supportTiers.push({title: tierTitle, description: tierDescription, cost: tierMinimumCost});

            setOpenAddDialog(false);
        }
    }

    const checkTier = () => {
        const exist = supportTiers.find((tier) => tier.title === tierTitle);
        console.log(exist);
        let error = false

        if(tierTitle === "") {
            setTierTitleErrorFlag(true);
            setTierTitleErrorMsg("title cannot be empty");
            error =true;
        }

        if (exist !== undefined) {
            setTierTitleErrorFlag(true);
            setTierTitleErrorMsg("Title not unique within petition");
            error =true;
        }
        if(Number(tierMinimumCost) < 0) {
            setTierCostErrorFlag(true);
            setTierCostErrorMsg("Cost cannot be negative");
            error =true;
        }
        if (tierDescription === "") {
            setTierDescriptionErrorFlag(true);
            setTierDescriptionErrorMsg("description cannot be empty");

            error=true;
        }

        addTier(error);


    }

    const handleRemoveDialogClose = () => {
        setOpenRemoveDialog(false);
    }


    const removeTier = (title: string) => {
        console.log(title);
        const updatedTiers = supportTiers.filter(tier => tier.title !== title);
        setSupportTiers(updatedTiers);
        setOpenRemoveDialog(false);
    }

    const removeTierDialog = (tierTitle: string) => {
        return(
            <Dialog open={openRemoveDialog}
                    onClose={handleRemoveDialogClose}>
                <DialogTitle>
                    {"REMOVE SUPPORT TIER"}
                </DialogTitle>
                <DialogContent>
                    <Typography fontWeight={'bold'}>Are you sure you want to remove this tier?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {removeTier(tierTitle)}} color={'error'}>Remove</Button>
                    <Button onClick={handleRemoveDialogClose}>Cancel</Button>
                </DialogActions>

            </Dialog>
        )
    }

    const addTierDialog = () => {

        return (
            <Dialog
                open={openAddDialog}
                onClose={handleDialogClose}>
                <DialogTitle>
                    {"ADD SUPPORT TIER"}
                </DialogTitle>
                <DialogContent>
                    <Box id={'description-box'} textAlign={'left'}>
                        <Typography id={'tier-title'} variant={'h6'} fontWeight={'bold'}>TITLE</Typography>
                        <TextField size={'small'} sx={{width: '20rem'}} value={tierTitle}
                                   error={tierTitleErrorFlag}
                                   helperText={tierTitleErrorMsg}
                                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setTierTitle(event.target.value);
                        }}></TextField>
                        <Typography id={'tier-description'} marginTop={'1rem'} variant={'h6'} fontWeight={'bold'}>DESCRIPTION</Typography>
                        <TextField InputProps={{sx: {width: '20rem', minHeight: '10rem'}}} value={tierDescription}
                                   error={tierDescriptionErrorFlag}
                                   helperText={tierDescriptionErrorMsg}
                                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                       setTierDescription(event.target.value);
                                   }}
                                   multiline={true}/>
                        <Typography id={'tier-cost'} marginTop={'1rem'} variant={'h6'} fontWeight={'bold'}>COST</Typography>
                        <TextField size={"small"} id={"minimumCostField"}
                                   style={{width: "20rem"}}
                                   value={tierMinimumCost}
                                   error={tierCostErrorFlag}
                                   helperText={tierCostErrorMsg}
                                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                       setTierMinimumCost(!isNaN(Number(event.target.value)) ? Number(event.target.value) : 0);
                                   }}
                                   InputProps={{
                                       startAdornment: <InputAdornment position="start">$</InputAdornment>
                                   }}/>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="error">
                        Cancel
                    </Button>
                    <Button onClick={() => {checkTier();}}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            )

    }

    const getSupportTier = () => {

        return supportTiers.map(supportTier => (
            <TableRow key={supportTier.title}>
                <TableCell id={'tier-description'} align={'left'} width={'900'}>
                    <Typography id={'tier-title'} variant={'h6'} fontWeight={'bold'}>{supportTier.title}</Typography>
                    <Typography color={'light-grey'}>{supportTier.description}</Typography>
                </TableCell>
                <TableCell id={'tier-cost-cell'}>
                    <Typography id={'tier-cost'} variant={'h6'} fontWeight={'bold'}>$ {supportTier.cost}</Typography>
                </TableCell>
                <TableCell id={'support-button'}>
                    {removeTierDialog(supportTier.title)}
                    <Button variant={'contained'} onClick={() => {setOpenRemoveDialog(true)}}>Remove</Button>
                </TableCell>
            </TableRow>
        ))
    }

    const handleCategoryChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryId(Number(event.target.value));
    }

    console.log(window.location.pathname);
    return(
        <Container style={card}>
            <Typography style={title} fontWeight={'bold'}>Create Petition</Typography>
            <Container id={'petition-create-container'} sx={{marginY: '2rem',  display: 'flex', justifyContent: 'center'}}>
                <input id={'petition-image-upload'}
                       type={'file'}
                       accept={'image/*'}
                       style={{display: 'none'}}
                       onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                           const files = event.target.files as FileList;
                           console.log (URL.createObjectURL(files[0]));
                           setPetitionImage(files[0]);
                       }}
                />
                <label htmlFor={'petition-image-upload'}>
                    <Typography component={'p'} paddingRight={'54px'} color={'gray'}>Click to add image</Typography>
                    {petitionImage ? (
                        <CardMedia
                            component="img"
                            src={URL.createObjectURL(petitionImage)}
                            sx={{
                                height: '24rem',
                                marginLeft: '1rem',
                                border: '1px black solid',
                                width: '24rem',
                                borderRadius: '25px',
                                marginRight: '70px',
                            }}
                        />
                    ) : (
                        <>
                            {imageErrorFlag && (<Typography component={'p'} paddingRight={'54px'} color={'error'}>
                                Image Must Be added
                            </Typography>)}
                            <Box
                                sx={{
                                    height: '24rem',
                                    marginLeft: '1rem',
                                    border: '1px black solid',
                                    width: '24rem',
                                    borderRadius: '25px',
                                    marginRight: '70px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <ImageSearch sx={{ fontSize: '10rem'}} />
                            </Box>
                        </>
                    )}
                </label>
                <Box id={'information-box'} display={'block'} alignContent={'top'} marginY={'1rem'}>
                    <Box id={'description-box'} textAlign={'left'}>
                        <Typography id={'petition-title'} variant={'h6'} fontWeight={'bold'}>TITLE</Typography>
                        <TextField size={'small'} sx={{width: '20rem'}} value={petitionTitle}
                                   error={petitionTitleErrorFlag}
                                   helperText={petitionTitleErrorMsg}
                                   onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                                       setPetitionTitle(event.target.value);
                                   }}/>
                        <Typography id={'description-title'} marginTop={'1rem'} variant={'h6'} fontWeight={'bold'}>DESCRIPTION</Typography>
                        <TextField InputProps={{sx: {width: '20rem', minHeight: '10rem'}}} multiline={true}
                                   value={petitionDescription}
                                   error={petitionDescriptionErrorFlag}
                                   helperText={petitionDescriptionErrorMsg}
                                   onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                                       setPetitionDescription(event.target.value);
                                   }}/>
                        <FormControl variant="standard" sx={{display: 'flex', marginTop: '1rem'}}>
                            <Typography id={'description-title'} marginTop={'1rem'} variant={'h6'} fontWeight={'bold'}>CATEGORY</Typography>
                            <NativeSelect size={'small'}
                                    value={categoryId} onChange={(event:React.ChangeEvent<HTMLSelectElement>) => {
                                        handleCategoryChange(event)
                            }}>
                                <option value={-1} style={{display: 'none'}}>None</option>
                                {categories.map((category) => (
                                    <option value={category.categoryId}>
                                        {category.name}
                                    </option>
                                ))}
                            </NativeSelect>
                        </FormControl>
                    </Box>
                </Box>
            </Container>
            <Box id={'support-information'} textAlign={'left'} marginTop={'1rem'} marginLeft={'1rem'}>
                <Typography  variant={'h4'} fontWeight={'bold'}>Support Tier</Typography>
                {addTierDialog()}
                <Button variant={'contained'}
                        sx={{marginY: '1rem'}}
                        disabled={supportTiers.length >= 3}
                        onClick={() => {setOpenAddDialog(!openAddDialog)}}>Add</Button>
                {supportTierErrorFlag && (<Typography color={'error'}>Petition should have at least one tier.</Typography>)}
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
                    {supportTiers.length === 0 && (
                        <Typography fontStyle={'italic'} display={'flex'} justifyContent={'center'} marginTop={'1rem'}>
                            No Support Tier is Added
                        </Typography>)}
                </TableContainer>
            </Box>
            <Button variant={'contained'} sx={{marginY: '3rem'}} onClick={() => {submission()}}>Create</Button>
        </Container>
    )
}

export default CreatePetition;