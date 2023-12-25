import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import { List, Grid } from '@mui/material';
//import DeleteIcon from '@iconify/icons-eva/minus-circle-outline'
import DeleteIcon from '@iconify/icons-ic/outline-delete'
import EditIcon from '@iconify/icons-ic/outline-edit'

import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

export default function Faq() {
    const [faq, setfaq] = useState([]);
    const [newques, setnewques] = useState("")
    const [newans, setnewans] = useState("")
    
    const [upques, setupques] = useState("")
    const [upans, setupans] = useState("")
    const [oldques, setoldques] = useState("");
    const [oldans, setoldans] = useState("");
    const [oldid, setoldid] = useState()

  const [open, setOpen] = React.useState(false);
  const [openupfaq, setopenupfaq] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleclickopenup = (oi, oq, oa) => {
    setoldid(oi)
    setoldans(oa)
    setoldques(oq)
    setopenupfaq(true);
  };

  const handlecloseup = () => {
    setopenupfaq(false);
  };

  const token = useSelector(state=> state.token)
  useEffect(()=>{
    axios.get('http://localhost:5000/admin/getfaq').then((response) => {
      setfaq(response.data);

    });
    }, []);

    const addfaq = () =>{
      try{
       axios.post('http://localhost:5000/admin/addfaq', {question: newques, answer: newans}, {
         headers: {Authorization: token}
     }).then(()=>{
      axios.get('http://localhost:5000/admin/getfaq').then((response) => {
        setfaq(response.data);

      });
      setOpen(false);
      setnewques('');
      setnewans('');
     })
      }catch(err){ 
        console.log(err);
      }
     }

     const deletefaq = async(id) =>{
      try{
        await axios.delete(`/admin/deletefaq/${id}`, {
          headers: {Authorization: token}
      }).then(()=>{
        axios.get('http://localhost:5000/admin/getfaq').then((response) => {
          setfaq(response.data);
        });
       })


      }catch(err){
        console.log(err)
      }
    }

    const updateFaq = async() =>{
      var obj = {}; 
      if(upques !== ""){
          obj.question = upques;   
          setupques("");
      }
      if(upans !== ""){
          obj.answer = upans;
          setupans("");
      }
       await axios.patch("http://localhost:5000/admin/updatefaq/"+oldid, obj,{
          headers:{Authorization:token}
      }).then(()=>{
        handlecloseup()
        axios.get('http://localhost:5000/admin/getfaq').then((response) => {
          setfaq(response.data);
        });
       })
  }



  return (
    <Page title="User | Minimal-UI">

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
            onClick={handleClickOpen}
          >
            Add new
          </Button>

          <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new FAQ</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="question"
            label="Question"
            type="text"
            fullWidth
            variant="standard"
            onChange= {(event) => {setnewques(event.target.value)}}
            value={newques}
          />
          <TextField
            margin="dense"
            id="answer"
            label="Answer"
            type="text"
            fullWidth
            variant="standard"
            onChange= {(event) => {setnewans(event.target.value)}}
            value={newans}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addfaq}> Add </Button>
        </DialogActions>
      </Dialog>
        </Stack>

        {faq.map((fq) => (

<Grid container spacing ={3}>
<Grid item 
xs={10} 
sm={10} 
md={11}> 

<List sx={{ 
  width: '100%', 
  maxWidth: '100%', 
  bgcolor: 'background.paper',
  //border: '2px solid black',
  boxShadow: 3,
  marginBottom: 2,
  padding: 1}}>

<ListItem alignItems="flex-start">
  <ListItemText
    primary={fq.question}
    secondary={
      <React.Fragment>
        {fq.answer} 
      </React.Fragment>
    }
  />
</ListItem>
</List>
</Grid>

  <Grid item xs={2} sm={2} md={1} justifyContent='center' align='center'>
    <Button onClick={()=>deletefaq(fq._id)}  sx ={{boxShadow: 3}} >
    {getIcon(DeleteIcon)}
    </Button>
    <Button onClick={()=>handleclickopenup(fq._id, fq.question, fq.answer)}  sx ={{boxShadow: 3}}>
    {getIcon(EditIcon)}
    </Button>

    <Dialog open={openupfaq} onClose={handlecloseup}>
        <DialogTitle>Update FAQ</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="question"
            label="Question"
            type="text"
            fullWidth
            variant="standard"
            placeholder = {oldques}
            onChange= {(event) => {setupques(event.target.value)}}
            value={upques}
          />
          <TextField
            margin="dense"
            id="answer"
            label="Answer"
            type="text"
            fullWidth
            variant="standard"
            placeholder={oldans} 
            onChange= {(event) => {setupans(event.target.value)}}
            value={upans}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlecloseup}>Cancel</Button>
          <Button onClick={updateFaq}> Update </Button>
        </DialogActions>
      </Dialog>




    </Grid>
  </Grid>

        ))}

      </Container>
    </Page>
  );
}