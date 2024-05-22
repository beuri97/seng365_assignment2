import React from 'react'
import {
    Box, Button,
    CardMedia,
    Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputAdornment,
    NativeSelect,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from "@mui/material";
import {card, title} from "../style/cssStyle";
import {headCellTiers} from "./Petition";
import {ImageSearch} from "@mui/icons-material";
import {loginState, petitionStore} from "../store";
import {useNavigate} from "react-router-dom";

const CreatePetition = () => {

    const auth = loginState(state => state.token);
    const nav = useNavigate();
    if (auth === "") nav('/login');

    const categories : Category[] = petitionStore(state => state.categories);

    const [petitionImage, setPetitionImage] = React.useState<File | null>(null);
    const [categoryId, setCategoryId] = React.useState(-1);
    const [petitionTitle, setPetitionTitle] = React.useState("");
    const [petitionDescription, setPetitionDescription] = React.useState("");
    const [openDialog, setOpenDialog] = React.useState(false);
    const [supportTiers, setSupportTiers] = React.useState<Array<SupportTierPost>>([]);
    const [tierTitle, setTierTitle] = React.useState("");
    const [tierDescription, setTierDescription] = React.useState("");
    const [tierMinimumCost, setTierMinimumCost] = React.useState("");

    const handleDialogClose = () => {

        setOpenDialog(false);
        setTierTitle("");
        setTierDescription("");
        setTierMinimumCost("");

    }

    const addTierDialog = () => {

        return (
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}>
                <DialogTitle>
                    {"ADD SUPPORT TIER"}
                </DialogTitle>
                <DialogContent>
                    <Box id={'description-box'} textAlign={'left'}>
                        <Typography id={'tier-title'} variant={'h6'} fontWeight={'bold'}>TITLE</Typography>
                        <TextField size={'small'} sx={{width: '20rem'}} value={tierTitle}
                                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setTierTitle(event.target.value);
                        }}></TextField>
                        <Typography id={'tier-description'} marginTop={'1rem'} variant={'h6'} fontWeight={'bold'}>DESCRIPTION</Typography>
                        <TextField InputProps={{sx: {width: '20rem', minHeight: '10rem'}}} value={tierDescription}
                                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                       setTierDescription(event.target.value);
                                   }}
                                   multiline={true}></TextField>
                        <Typography id={'tier-cost'} marginTop={'1rem'} variant={'h6'} fontWeight={'bold'}>COST</Typography>
                        <TextField size={"small"} id={"minimumCostField"}
                                   style={{width: "20rem"}}
                                   value={tierMinimumCost}
                                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                       setTierMinimumCost(event.target.value);
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
                    <Button onClick={handleDialogClose}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            )

    }

    const getSupportTier = () => {

        return supportTiers.map(supportTier => (
            <TableRow>
                <TableCell id={'tier-description'} align={'left'} width={'900'}>
                    <Typography id={'tier-title'} variant={'h6'} fontWeight={'bold'}>{supportTier.title}</Typography>
                    <Typography color={'light-grey'}>{supportTier.description}</Typography>
                </TableCell>
                <TableCell id={'tier-cost-cell'}>
                    <Typography id={'tier-cost'} variant={'h6'} fontWeight={'bold'}>$ {supportTier.cost}</Typography>
                </TableCell>
                <TableCell id={'support-button'}>
                    <Button variant={'contained'}>Remove</Button>
                </TableCell>
            </TableRow>
        ))
    }

    const handleCategoryChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryId(Number(event.target.value));
    }

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
                            <Typography component={'p'} paddingRight={'54px'} color={'gray'}>Click to add image</Typography>
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
                                    backgroundColor: '#f0f0f0',
                                }}
                            >
                                <ImageSearch sx={{ fontSize: '10rem', color: '#aaa' }} />
                            </Box>
                        </>
                    )}
                </label>
                <Box id={'information-box'} display={'block'} alignContent={'top'} marginY={'1rem'}>
                    <Box id={'description-box'} textAlign={'left'}>
                        <Typography id={'description-title'} variant={'h6'} fontWeight={'bold'}>TITLE</Typography>
                        <TextField size={'small'} sx={{width: '20rem'}}/>
                        <Typography id={'description-title'} marginTop={'1rem'} variant={'h6'} fontWeight={'bold'}>DESCRIPTION</Typography>
                        <TextField InputProps={{sx: {width: '20rem', minHeight: '10rem'}}} multiline={true}/>
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
                <Button variant={'contained'} sx={{marginY: '1rem'}} onClick={() => {setOpenDialog(!openDialog)}}>Add</Button>
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
        </Container>
    )
}

export default CreatePetition;