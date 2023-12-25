import React from 'react';
import { useState, useEffect} from 'react';
// material
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { Grid } from '@mui/material';
import {useParams} from 'react-router-dom';
import { Card } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardContent } from '@mui/material';
import {useSelector} from 'react-redux';
import axios from 'axios';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
function Patientprofile(props) {
const {id}=useParams();
//const auth=useSelector(state=>state.auth);
  const token=useSelector(state=>state.token) 
  //const {user}=auth;



  const [patient,setpatient]=useState([]);

  const [gname, setgName] = useState("");
  const [gnumber, setgNumber] = useState("");
  const [gaddress, setgAddress] = useState("");
  const [ggender, setGGender] = useState("");
  const [gage, setGAge] = useState("");
  const [gcountry, setgCountry] = useState("");
  const [gcity, setgCity] = useState("");
  









  useEffect(()=>{
    getPatients();
    // eslint-disable-next-line
    },[]);
  
  const getPatients=()=>{
    axios.get(`/guardian/patient/${id}`,{
      headers:{Authorization:token}
  }).then((response) => {
    setpatient(response.data.patient);
   //console.log(response.data.patient);
  
  })
  .catch(err=>console.log(err))
  }
  
  




  const updateGuardian = () =>{
    var obj = {}; 
    obj.id = patient._id;
    if(gname !== ""){
        obj.name = gname;   
        setgName("");
    }
    if(gnumber !== ""){
        obj.phonenumber = gnumber;
        setgNumber("");
    }
    if(gaddress !== ""){
        obj.address = gaddress;
        setgAddress("");
    }
    if(ggender !== ""){
        obj.gender = ggender; 
        setGGender("");
    }
    
    if(gcountry !== ""){
        obj.country = gcountry;
        setgCountry("");
    }
    if(gage !== ""){
        obj.age = gage;
        setGAge("");
    }
    if(gcity !== ""){
        obj.city = gcity;
        setgCity("");
    }
    axios.patch(`/guardian/patient/${patient._id}`, obj, {
        headers:{Authorization:token}
    }).then((response) => {
      getPatients();
        
    });
};















    return (
        <Page title="Dashboard: Patient | Profile">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Patient profile for {patient.name}
        </Typography>
        <Grid container spacing={2}>
  <Grid item xs={12} sm={12}>
  <Card sx={{ maxWidth: 300, mx: "auto" }}>
      <CardMedia
        component="img"
        
        image={patient.profilepic}
        alt="green iguana"
        style={{borderRadius:'50%'}}
      />
      <CardContent style={{display:"flex", justifyContent:"space-between"}}>
        <Typography gutterBottom variant="h5" component="div">

        <Button variant="contained">
            
        <input
    type="file" id="img" style={{display:'none'}}
  />
            <label htmlFor="img">Select image</label>
        
    
        </Button>
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
        <Button variant="contained">Update</Button>
        </Typography>
        </CardContent>
        </Card>
  </Grid>
  

  <Grid item xs={12} sm={6} md={6} sx={{px:4}}>
<FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Name: {patient.name}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Name"
            placeholder={patient.name}

            onChange= {(event) => {setgName(event.target.value)}}
            value={gname}



          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={6} sx={{px:4}}>
<FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Age: {patient.age}</InputLabel>
          <OutlinedInput
            id="outlined-number"
            type="number"
            label="Age"
            onChange= {(event) => {setGAge(event.target.value)}}
            value={gage} 


          />
        </FormControl>
      </Grid>




      <Grid item xs={12} sm={6} md={6} sx={{px:4}}>
<FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Gender: {patient.gender}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Gender"
                            onChange= {(event) => {setGGender(event.target.value)}} 
            value={ggender} 

          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={6} sx={{px:4}}>
<FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Phone number: {patient.phonenumber}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
             type="number"           
            label="Phone"

            value={gnumber}
                
            onChange= {(event) => {setgNumber(event.target.value)}}


          />
        </FormControl>
      </Grid>


      <Grid item xs={12} sm={6} md={6} sx={{px:4}}>
<FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Address: {patient.address}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Address"
            onChange= {(event) => {setgAddress(event.target.value)}}
             value={gaddress}



          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={6} sx={{px:4}}>
<FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Country: {patient.country}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"            
            label="Country"

            onChange= {(event) => {setgCountry(event.target.value)}}
            value={gcountry}

          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={6} sx={{px:4}}>
<FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">City: {patient.city}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="City"
            onChange= {(event) => {setgCity(event.target.value)}}
           value={gcity}


          />
        </FormControl>
      </Grid>

      <Grid item xs={12} style={{textAlign:'right'}} sx={{px:4}}>
<Button variant="contained"

onClick={() => updateGuardian()} 
                

>
    Update Profile
</Button>
      </Grid>



</Grid>
      </Container>
    </Page>

    );
}

export default Patientprofile;