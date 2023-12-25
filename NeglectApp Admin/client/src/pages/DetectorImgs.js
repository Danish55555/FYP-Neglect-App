import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import {ImageListItem, ImageList} from '@mui/material';
import { Image } from 'cloudinary-react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';

// material
import {
  Stack,
  Button,
  Container,
  Typography
} from '@mui/material';
// components
import Page from '../components/Page';
//

// ----------------------------------------------------------------------


export default function DetectorImgs() {

  const token = useSelector(state=> state.token)
  //const [fileinput, setfileinput] = useState('');
  const [previewsource, setpreviewsource] = useState('');
  const [imageIds, setimageIds] = useState();
  const [open, setOpen] = useState(false);
  const [isload, setisload] = useState(false);
  useEffect(async() => {
    try {
        const res = await fetch('/admin/getimage');
        const data = await res.json();
        setimageIds(data);
    } catch (err) {
        console.error(err);
    }
}, []);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const handlefileinputchange = (e) =>{
  const file = e.target.files[0];
  previewFile(file);
}

const previewFile = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
      setpreviewsource(reader.result);
  };
};

const handlesubmitfile = (e) =>{
  setisload(true);
  e.preventDefault();
  if(!previewsource) return;
  uploadImage(previewsource);
}

const uploadImage = async(base64EncodedImage) =>{ 
console.log(base64EncodedImage);
try {
  await axios.post('/admin/upload', {data: base64EncodedImage}).then(async()=>{
    try {
      setOpen(false)
      const res = await fetch('/admin/getimage');
      const data = await res.json();
      setimageIds(data);
      setisload(false);
  } catch (err) {
      console.error(err);
  }
  })
} catch (error) {
  console.log(error);
}
}

  return (
    <Page title="User | Minimal-UI">

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Detector Images
          </Typography>

          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
            onClick={handleClickOpen}
          >
            Add new Image
          </Button>
          

          <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new Image</DialogTitle>
        <DialogContent>
          <form onSubmit={handlesubmitfile} >
          <TextField
            autoFocus
            margin="dense"
            id="image"
            type="file"
            fullWidth
            onChange={handlefileinputchange}
            //value={fileinput}
          />
          <LoadingButton loading={isload} type="submit" loadingPosition="end"> Upload </LoadingButton>
          </form>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

</Stack>

<ImageList sx={{ width: "100%"}} cols={2} rowHeight={164} noScroll>
  {imageIds &&
  imageIds.map((imageId, index) => (
    <ImageListItem key={imageId}>

      <Image
          key = {index}
          cloudName = 'dxstfvaxv'
          publicId = {imageId}
          width = '900'
          height= '300'
          crop = 'scale'
          >
</Image>
    </ImageListItem>
  ))}
</ImageList>



      </Container>
    </Page>
  );
}