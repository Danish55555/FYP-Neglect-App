import React,{useEffect,useState} from 'react';

import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography, Box} from '@mui/material';
// components
import Page from '../components/Page';

import {useSelector} from 'react-redux';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function DoctorPage() {


    
    const token=useSelector(state=>state.token) 
    const [doctors,setdoctors]=useState([])
    
useEffect(()=>{
    axios.get('/guardian/doctors',{
      headers:{Authorization:token}
  }).then((response) => {
    setdoctors(response.data.doctorlist);
    console.log(response.data.doctorlist);
  
  })
  .catch(err=>console.log(err))
    
    },[token]);
  

 




  return (
    <Page title="Dashboard: Doctor | Contact">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Doctors
          </Typography>
         






        </Stack>


        <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
{
      doctors.map((pat,ansk)=>{
    return(
      <Grid item xs={12} md={6} sm={6} key={ansk} >
      <Card sx={{ pb: 4 }}>
    <CardMedia
      component="img"
      height="140"
      image={"https://res.cloudinary.com/drimnkool/image/upload/v1644341187/istockphoto-1130260217-612x612_rfznlz.jpg"}
      alt="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {pat.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {pat.name} from {pat.city}, {pat.country}<span
        style={{fontWeight:'bold'}}
        > {pat.qualification}</span>
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">&nbsp;&nbsp; {pat.phonenumber}</Button>
      <RouterLink to={{ 
 pathname: `/dashboard/doctors/${pat._id}`, 
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
