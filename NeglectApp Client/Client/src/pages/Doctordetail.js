import React,{useEffect,useState} from 'react';
// material
import { Grid, Button, Container, Stack, Typography,Box, TextField } from '@mui/material';
import Chip from '@mui/material/Chip';

// components
import Page from '../components/Page';
import './doctdetail.css'
//
import {useSelector} from 'react-redux';
import axios from 'axios';

import {useParams} from 'react-router-dom';
import Divider from '@mui/material/Divider';
// ----------------------------------------------------------------------


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// ----------------------------------------------------------------------

export default function Doctordetail() {
    const [doctor,setdoctor]=useState({});
    const token=useSelector(state=>state.token) 
    const auth=useSelector(state=>state.auth);
    const {id}=useParams();
    const {user}=auth;
    const [patients,setpatients]=useState([]);
    const [selectedpatient,setselectedpatient]=useState({_id:'none',name:'none'})
    const [rsubject,setrsubject]=useState('');
    const [rcomment,setrcomment]=useState('')
    const [com,setcom]=useState('rehab')
    const [querycomment,setquerycomment]=useState('');
    const [replylist,setreplylist]=useState([])
    
    useEffect(()=>{
      getDoctor();
      
      // eslint-disable-next-line
      },[]);
    
    const getDoctor=()=>{
      axios.get(`/guardian/doctor/${id}`,{
        headers:{Authorization:token}
    }).then((response) => {
      setdoctor(response.data.doctor);
     console.log(response.data.doctor);
    getReplies(); 
    })
    .catch(err=>console.log(err))
    }
  
 useEffect(()=>{
  axios.get('/guardian/patient',{
    headers:{Authorization:token}
}).then((response) => {
  setpatients(response.data.patients.filter(function(item){
    return item.neglecttype!=="none"&&item.doctorAlloted===false
  }));
  console.log(response.data.patients);

})
.catch(err=>console.log(err))
  
  },[token]);

  
  





const handlePatientChange=(pat)=>{

  setselectedpatient(pat)
  
}
const handleRequest=()=>{
  if(selectedpatient.name==='none'){
    alert('select Patient firstly');
    return;
  }
  if(rsubject===''){
    alert('Enter Subject firstly');
    return;
  }
  if(rcomment===''){
    alert('Enter Comment firstly');
    return;
  }
  var obj={}
  obj.guardianid=user._id;
  obj.guardianname=user.name;
  obj.subject=rsubject;
  obj.comment=rcomment;
  obj.patientid=selectedpatient._id;
  obj.doctorid=doctor._id;
  console.log(obj);

  axios.post('/guardian/rehabrequest',obj,{
    headers:{Authorization:token}
}).then((response) => {
alert(response.data.msg)

})
.catch(err=>console.log(err))


}

const sendQuery=()=>{
  if(querycomment===''){
    alert('Enter Query firstly');
    return;
  }
  var obj={};
  obj.guardianid=user._id;
  obj.doctorid=id;
  obj.name=user.name;
  obj.comment=querycomment;
  obj.usertype="guardian";
  obj.userid=user._id;
  console.log(obj);

  axios.post('/guardian/sendquery',obj,{
    headers:{Authorization:token}
}).then((response) => {
  getReplies();
alert(response.data.msg)

})
.catch(err=>console.log(err))

}    

const getReplies=()=>{
  
  axios.get(`/guardian/${user._id}/allreplies/${id}`,{
    headers:{Authorization:token}
}).then((response) => {
  console.log(response.data.replies)
  setreplylist(response.data.replies);
})
.catch(err=>console.log(err))

}

  return (
    <Page title="Dashboard: Doctor | Details">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Doctor Details
          </Typography>
          
        </Stack>

<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:1}}>
 <Grid item xs={12} sx={{mt:9}}>
  <main className='mainpro'>
    <div className="row">
      <div className="leftsidepro col-lg-4">
        <div className="photo-left">
          <img className="photopro" src="https://images.pexels.com/photos/1804796/pexels-photo-1804796.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"

          alt='hehe'
          
          
          />
          <div className="activepro" />
        </div>
        <h4 className="namepro">{doctor.name}</h4>
        <p className="infopro">{doctor.qualification}</p>
        <p className="infopro">{doctor.email}</p>
        
      </div>
      
    </div></main>
    </Grid>

<Grid item xs={12}>
<Box sx={{ width: '100%',  bgcolor: 'background.paper' }}>
      <Box sx={{ my: 3, mx: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4" component="div">
              {doctor.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div">
              $4.50
            </Typography>
          </Grid>
        </Grid>
        <Typography color="text.secondary" variant="body2">
          {doctor.address}, {doctor.city}, {doctor.country}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box sx={{ m: 2 }}>
        <Typography gutterBottom variant="body1">
          Select Option
        </Typography>
        <Stack direction="row" spacing={1}>
          
          <Chip color="primary" label="Send Rehabilitation Request"
          onClick={()=>{setcom('rehab')}}
          
          />
          <Chip label="Send Query" 
          
          onClick={()=>{setcom('query')}}
          />
          
        </Stack>

      </Box>
{com==='rehab'?
<div>
<Box>

      <Typography sx={{ml:2, mt:4,align:'center'}    }
    style={{textAlign:'center'}}
    variant="h4"
    >
        Rehabilitation Request
      </Typography>

      <TextField
          id="standard-password-input"
          label="Enter Subject"
          type="text"
        
          variant="standard"
          onChange= {(event) => {setrsubject(event.target.value)
          
          }} 
          style={{width:'100%'}}
sx={{ml:2}}          
       />
<TextField
          id="standard-password-input"
          label="Enter Comment"
          type="text"
          autoComplete="current-password"
          variant="standard"
          onChange= {(event) => {setrcomment(event.target.value)}} 
          style={{width:'100%'}}
sx={{ml:2,mt:4}}          
       />

<Typography variant="h4" style={{textAlign:'center'}} sx={{mt:4}}>
        Select Patient
      </Typography>
<Typography style={{textAlign:'right'}}>Current Patient:{selectedpatient.name}</Typography>
    </Box>

    <Box sx={{ maxWidth: 220, mt:5,ml:2 }}>
      
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

      {patients.map((pat,keyi)=>{

        return(
<ListItem key={keyi}>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={pat.name} secondary={pat.address} />
        <AddCircleOutlineIcon 
        onClick={()=>{handlePatientChange({_id:pat._id,name:pat.name})}}
        
        />
      </ListItem>

        )
      })}
      
</List>      
    </Box>



<div style={{display:'flex',justifyContent:'end'}}>
<Button variant="contained" sx={{ml:2, mt:4}}
style={{textAlign:'right'}}
onClick={()=>{handleRequest()}}
>Send Request</Button>
</div>
</div>
:




<div>
<Box>

      <Typography sx={{ml:2, mt:4,align:'center'}    }
    style={{textAlign:'center'}}
    variant="h4"
    >
        Send Query
      </Typography>

      
<TextField
          id="standard-password-input"
          label="Enter Comment"
          type="text"
          autoComplete="current-password"
          variant="standard"
          onChange= {(event) => {setquerycomment(event.target.value)}} 
          style={{width:'100%'}}
sx={{ml:2,mt:4}}          
       />
    </Box>
<div style={{textAlign:'right'}}>
    <Button variant="contained" sx={{ml:2, mt:4}}
style={{textAlign:'right'}}
onClick={()=>{sendQuery()}}
>Send Query</Button>
</div>



<Box sx={{ maxWidth: 220, mt:5,ml:2 }}>
      
<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

  {replylist.map((pat,keyi)=>{

    return(
<ListItem key={keyi}>
    <ListItemAvatar>
      <Avatar>
        <ImageIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={pat.usertype==='guardian'?'You':'Doctor'} secondary={pat.comment} />
    
  </ListItem>

    )
  })}
  
</List>      
</Box>





</div>













}
</Box>





</Grid>


</Grid>


      </Container>
    </Page>
  );
}
