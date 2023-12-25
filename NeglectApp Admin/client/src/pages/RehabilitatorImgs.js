import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/material';

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


export default function RehabilitatorImgs() {
const [previewsource, setpreviewsource] = useState('');
const [open, setopen] = useState(false)
const [round, setround] = useState(""); //which round image is uploading for 
const [isload, setisload] = useState(false);
const [imageurl, setimageurl] = useState("");
const [filename, setfilename] = useState("")
const [value, setValue] = React.useState('one');

const handleChange = (event, newValue) => {
  setValue(newValue);
};
useEffect(() => {
    try {
        axios.get('/admin/cloudrehabimage/'+ 1).then((res)=>{
        var randomnumber = Math.floor(Math.random() * res.data.length) 
        setimageurl(res.data[randomnumber])
        console.log(res.data[randomnumber])
        var i = res.data[randomnumber].lastIndexOf('/')
        console.log(res.data[randomnumber].substring(i+1, res.data[randomnumber].length))
        setfilename(res.data[randomnumber].substring(i+1, res.data[randomnumber].length))
        })

        // console.log(data)
        // console.log(data.length)
        
        
    } catch (err) {
        console.error(err);
    }
}, []);


const handleClose = () =>{
    setopen(false);
}
const handleOpen = (roundno) =>{
    setopen(true)
    setround(roundno)
    
}

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
    await axios.post('/admin/uploadrehabimg', {data: base64EncodedImage, roundnumber: round}).then(()=>{
        setisload(false)
        setopen(false)
    })
  } 
  catch (error) {
    console.log(error);
  }
  }

  
  return (
    <Page title="Admin | Rehabilitator Images">

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Rehabilitator Images
          </Typography>
        </Stack>
<Stack direction="row" alignItems="center" justifyContent="space-between">  
        <Button variant="contained" onClick={() => handleOpen("rnd1")}>
            Round 1 upload
        </Button>

        <Button variant="contained" onClick={() => handleOpen("rnd2")}>
            Round 2 upload
        </Button>

        <Button variant="contained" onClick={() => handleOpen("rnd3")}>
            Round 3 upload
        </Button>



        <Dialog open={open} onClose ={handleClose}>
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

        <Box
        component="img"
        src={imageurl}
      />
      <Typography> {imageurl} </Typography>
      <Typography> {filename} </Typography>


    
      </Container>
    </Page>
  );
}