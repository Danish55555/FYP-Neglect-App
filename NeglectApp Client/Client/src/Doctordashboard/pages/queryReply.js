
// material
import { Button, Container, Stack, Typography,Box,TextField } from '@mui/material';

// components
import Page from '../components/Page';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { red } from '@mui/material/colors';
// ----------------------------------------------------------------------

export default function Queryreply() {
  const {id}=useParams();
  const token=useSelector(state=>state.token) 
  const auth=useSelector(state=>state.auth);
  const {user}=auth;
  const [repArray,setrepArray]=useState([]);
  const [reply,setreply]=useState('');

  useEffect(()=>{
    getReplies();
    
    // eslint-disable-next-line
    },[]);
  const getReplies=()=>{
  
    axios.get(`/doctor/replies/${id}`,{
      headers:{Authorization:token}
  }).then((response) => {
    console.log(response.data.replies)
    setrepArray(response.data.replies);
  })
  .catch(err=>console.log(err))
  
  }
  const sendReply=()=>{
if(reply===''){
  alert('Enter reply firstly');
  return;
}
var obj={};
obj.usertype='doctor';
obj.comment=reply;
obj.userid=user._id;
console.log(obj);

axios.patch(`/doctor/replies/${id}`,obj,{
  headers:{Authorization:token}
}).then((response) => {
getReplies();
})
.catch(err=>console.log(err))










  }
  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Query Reply Panel
          </Typography>         
        </Stack>

        <TextField
          id="standard-password-input"
          label="Enter Reply"
          type="text"
          autoComplete="current-password"
          variant="standard"
          onChange= {(event) => {setreply(event.target.value)}} 
          style={{width:'100%'}}
sx={{ml:2,mt:2}}          
       />
<div style={{textAlign:'right'}}>
    <Button variant="contained" sx={{ml:2, mt:4}}
style={{textAlign:'right'}}
onClick={()=>{sendReply()}}
>Send Reply</Button>
</div>

<Box sx={{ mt:5,ml:2 }} >
      
<List sx={{ width: '100%', bgcolor: 'background.paper' }} >

  {repArray.length>0?  repArray.map((pat,keyi)=>{

    return(
<ListItem key={keyi}
>
    <ListItemAvatar>
      <Avatar>
        <ImageIcon sx={{ color: red[500] }} />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={pat.usertype==='guardian'?'Guardian':'You'} secondary={pat.comment} />
    
  </ListItem>

    )
  }):
<ListItem >
    <ListItemAvatar>
      <Avatar>
        <ImageIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={"No data"} secondary={"No Data"} />
    
  </ListItem>
  
  
  
  
  }
  
</List>      
</Box>

      </Container>
    </Page>
  );
}
