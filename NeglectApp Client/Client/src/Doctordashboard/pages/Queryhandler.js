import React,{useEffect,useState} from 'react';
import { Link} from 'react-router-dom';
// material
import { Container, Stack, Typography,Box } from '@mui/material';
// components
import Page from '../components/Page';
import axios from 'axios';
import {useSelector} from 'react-redux';
import BrushIcon from '@mui/icons-material/Brush';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

// ----------------------------------------------------------------------

export default function Queryhandler() {

  const [querylist,setquerylist]=useState([]);
  //const auth=useSelector(state=>state.auth)
  const token=useSelector(state=>state.token) 
  //const {user}=auth;
  useEffect(()=>{
    axios.get('/doctor/queries',{
      headers:{Authorization:token}
  }).then((response) => {
    console.log(response.data.Queries);
    setquerylist(response.data.Queries);
  })
  .catch(err=>console.log(err))
    
    },[token]);









  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Queries
          </Typography>
          
        </Stack>

        
    <Box sx={{ maxWidth: 220, mt:5,ml:2 }}>
      
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
  
        {querylist.map((pat,keyi)=>{
  
          return(
  <ListItem key={keyi}>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={pat.guardianid.name} secondary={pat.comment} />
          <Link to={  `/docdashboard/queryreply/${pat._id}`} >
          < BrushIcon          />
          </Link>
          
        </ListItem>
  
          )
        })}
        
  </List>      
      </Box>
  
  
      </Container>
    </Page>
  );
}
