import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/blog';

import POSTS from '../_mocks_/blog';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
// ----------------------------------------------------------------------


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
};




const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function PatientInfo() {


  const auth=useSelector(state=>state.auth);
  const token=useSelector(state=>state.token) 
  const {user}=auth;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const [name,setname]=useState('');
const [age,setage]=useState('');
const [gender,setgender]=useState('');
const [phonenumber,setphone]=useState('');
const [address,setaddress]=useState('');

const [city,setcity]=useState('');
const [country,setcountry]=useState('');

const [patients,setpatients]=useState([]);

useEffect(()=>{
  axios.get('/guardian/patient',{
    headers:{Authorization:token}
}).then((response) => {
  setpatients(response.data.patients);
  //console.log(response.data.patients);

})
.catch(err=>console.log(err))
  
  },[token]);



const getAllPatients=()=>{
  axios.get('/guardian/patient',{
    headers:{Authorization:token}
}).then((response) => {
  setpatients(response.data.patients);
  //console.log(response.data.patients);

})
.catch(err=>console.log(err))
}


const isEmpty=(a)=>{
if(a===''){
  return true;
}
else {return false};
}


const Postpatient=()=>{
  if(isEmpty(name) || isEmpty(age) || isEmpty(gender) || isEmpty(phonenumber) || isEmpty(address)
  ||isEmpty(city) || isEmpty(country)
  )
  {
    console.log('Kindly fill all fields');
    return;
  }
  else{
    const obj={};
    obj.name=name;
    obj.country=country;
    obj.phonenumber=phonenumber;
    obj.address=address;
    obj.country=country;
    obj.city=city;
    obj.age=age;
    obj.guardianId=user._id;
    console.log(obj.guardianId)
axios.post('/guardian/patient',obj,{
  headers:{Authorization:token}
})
.then(res=>{console.log(res.data)
getAllPatients();
handleClose();
alert('Patient Added')
})
.catch(err=>console.log(err.message))
  }  
  }
  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Patients
          </Typography>
          <Button
          onClick={handleOpen}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Patient
          </Button>


          <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}  component="form" noValidate
      autoComplete="off">
           <Container>


           <Grid container spacing={2}>

<Grid item  xs={12} sm={6} md={6} sx={{px:4,fontWeight: 'bold'}}>

<TextField id="standard-basic" label="Name" variant="standard" 

onChange={(event)=>{setname(event.target.value)}}
/>

</Grid>

    

<Grid item  xs={12} sm={6} md={6} sx={{px:4,fontWeight: 'bold'}}>

<TextField id="standard-basic" label="Phone Number" variant="standard" 

onChange={(event)=>{setphone(event.target.value)}}
/>

</Grid>



<Grid item  xs={12} sm={6} md={6} sx={{px:4,fontWeight: 'bold'}}>

<TextField id="standard-basic" label="Gender" variant="standard" 

onChange={(event)=>{setgender(event.target.value)}}
                                
/>

</Grid>


<Grid item  xs={12} sm={6} md={6} sx={{px:4,fontWeight: 'bold'}}>

<TextField id="standard-basic" label="Address" variant="standard" 

onChange={(event)=>{setaddress(event.target.value)}}

                                
/>

</Grid>

<Grid item  xs={12} sm={6} md={6} sx={{px:4,fontWeight: 'bold'}}>

<TextField id="standard-basic" label="Country" variant="standard" 

onChange={(event)=>{
  setcountry(event.target.value)
}}            
/>

</Grid>


<Grid item  xs={12} sm={6} md={6} sx={{px:4,fontWeight: 'bold'}}>

<TextField id="standard-basic" label="City" variant="standard" 

onChange={(event)=>{
  setcity(event.target.value)
}}            
/>

</Grid>


<Grid item  xs={12} sm={6} md={6} sx={{px:4,fontWeight: 'bold'}}>

<TextField id="standard-basic" label="Age" variant="standard" 

onChange={(event)=>{
  setage(event.target.value)
}}            
/>

</Grid>

<Grid item xs={12} style={{textAlign:'right'}} sx={{py:4}}>
<Button variant="contained"

onClick={()=>{
  Postpatient()
}}

                

>
    Post Patient
</Button>
      </Grid>



             </Grid>









           </Container>

        </Box>
      </Modal>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
{
      patients.map((pat,ansk)=>{
    return(
      <Grid item xs={12} md={6} sm={6} key={ansk} >
      <Card sx={{ pb: 4 }}>
    <CardMedia
      component="img"
      height="140"
      image={pat.profilepic}
      alt="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {pat.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {pat.name} from {pat.city}, {pat.country}<span
        style={{fontWeight:'bold'}}
        > DoctorAlloted:{pat.doctorAlloted?'Yes':'No'}</span>
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">&nbsp;&nbsp; Neglect:{pat.neglecttype==='none'?'Not Tested':pat.neglecttype}</Button>
      <RouterLink to={{ 
 pathname: `/dashboard/patientprofile/${pat._id}`, 
 state: "iam id"
}} style={{textDecoration:"none"}}>
      <Button size="small">View Details</Button></RouterLink>
    </CardActions>
  </Card>
      </Grid>
    )})
    }

      </Grid>
    </Box>  
      
    
      </Container>
    </Page>
  );
}
