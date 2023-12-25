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

export default function Announcement() {
    const [announcement, setannouncement] = useState([]);
    const [newnotice, setnewnotice] = useState("")

    const [upnotice, setupnotice] = useState("")
    const [oldnotice, setoldnotice] = useState("");
  
    const [oldid, setoldid] = useState()

  const [open, setOpen] = React.useState(false);
  const [openupannouncement, setopenupannouncement] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleclickopenup = (oi, nt) => {
    setoldid(oi)
    setoldnotice(nt)
    setopenupannouncement(true);
  };

  const handlecloseup = () => {
    setopenupannouncement(false);
  };

  const token = useSelector(state=> state.token)
  useEffect(()=>{
    axios.get('http://localhost:5000/admin/getannouncement').then((response) => {
      setannouncement(response.data);

    });
    },[]);

    const addannouncement = () =>{
      try{
       axios.post('http://localhost:5000/admin/addannouncement', {notice: newnotice}, {
         headers: {Authorization: token}
     }).then(()=>{
      axios.get('http://localhost:5000/admin/getannouncement').then((response) => {
        setannouncement(response.data);
      });
      setOpen(false);
      setnewnotice('');
     })
      }catch(err){ 
        console.log(err);
      }
     }

     const deleteannouncement = async(id) =>{
      try{
        await axios.delete(`/admin/deleteannouncement/${id}`, {
          headers: {Authorization: token}
      }).then(()=>{
        axios.get('http://localhost:5000/admin/getannouncement').then((response) => {
          setannouncement(response.data);
        });
       })
      }catch(err){
        console.log(err)
      }
    }


    const updateAnnouncement = async() =>{
      var obj = {}; 
      if(upnotice !== ""){
          obj.notice = upnotice;   
          setupnotice("");
      }
       await axios.patch("http://localhost:5000/admin/updateannouncement/"+oldid, obj,{
          headers:{Authorization:token}
      }).then(()=>{
        handlecloseup()
        axios.get('http://localhost:5000/admin/getannouncement').then((response) => {
          setannouncement(response.data);
        });
       })
  }







  return (
    <Page title="User | Minimal-UI">

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Announcements
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
        <DialogTitle>Add new Announcement</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="notice"
            label="Notice"
            type="text"
            fullWidth
            variant="standard"
            onChange= {(event) => {setnewnotice(event.target.value)}}
            value={newnotice}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addannouncement}> Add </Button>
        </DialogActions>
      </Dialog>
        </Stack>

        {announcement.map((ann) => (

<Grid container spacing ={3}>
<Grid item xs={10} 
sm={10} 
md={11}>

<List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' , boxShadow: 3, marginBottom: 5, padding: 3 }}>
<ListItem alignItems="flex-start">
  <ListItemText
    primary={ann.notice}
  />
</ListItem>
</List>
</Grid>

  <Grid item xs={2} sm={2} md={1} justifyContent='center' align='center'>
    <Button onClick={()=>deleteannouncement(ann._id)} sx ={{boxShadow: 3}}>
    {getIcon(DeleteIcon)}
    </Button>
    
    <Button onClick={()=>handleclickopenup(ann._id, ann.notice)}  sx ={{boxShadow: 3}}>
    {getIcon(EditIcon)}
    </Button>

    <Dialog open={openupannouncement} onClose={handlecloseup}>
        <DialogTitle>Update Announcement</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="question"
            label="Question"
            type="text"
            fullWidth
            variant="standard"
            placeholder = {oldnotice}
            onChange= {(event) => {setupnotice(event.target.value)}}
            value={upnotice}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlecloseup}>Cancel</Button>
          <Button onClick={updateAnnouncement}> Update </Button>
        </DialogActions>
      </Dialog>







    </Grid>

</Grid>

        ))}

      </Container>
    </Page>
  );
}