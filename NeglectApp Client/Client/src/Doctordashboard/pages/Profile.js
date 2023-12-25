import React, {useState, useEffect} from 'react';
// material
import {Box, Container, TextField, Typography, Grid, Button ,Avatar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
// components
import Page from '../components/Page';
import Axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { fetchUser, dispatchGetUser } from "src/redux/actions/authAction";
import {useSelector, useDispatch} from 'react-redux';


export default function Profile() {
   
    
  const usertoken=useSelector(state=>state.token)
  const auth = useSelector(state => state.auth)  
  const {user} = auth;
  const dispatch = useDispatch()

    useEffect(()=>{
      if(user){
        fetchUser(usertoken).then(res=> {
          dispatch(dispatchGetUser(res))
        })
    }
        },[]);

        
        const [gname, setgName] = useState("");
        const [gnumber, setgNumber] = useState("");
        const [gaddress, setgAddress] = useState("");
        const [ggender, setGGender] = useState("");
        const [gage, setGAge] = useState("");
        const [gcountry, setgCountry] = useState("");
        const [gqualification, setGqualification] = useState("");
        const [gcity, setgCity] = useState("");
        //const [profilepic, setprofilepic] = useState();

        const [gpassword, setgPassword] = useState("");
        const [newpassword, setnewPassword] = useState("");

        const [passupdmsg, setpassupdmsg] = useState(false);

        const [message, setmessage] = useState("");
        

        const [open, setOpen] = useState(false);
        const [isload, setisload] = useState(false);
        const [previewsource, setpreviewsource] = useState('');


        const handleClickOpen = () => {
          setOpen(true);
        };
        
        const handleClose = () => {
          setOpen(false);
        };

        const closepasswordupdate = () =>{
          setpassupdmsg(false);
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
          await Axios.post('/doctor/uploadprofilepic', {data: base64EncodedImage}).then(async(res)=>{
            try {
              console.log(res.data.msg)
              setOpen(false)
              setisload(false);
              await Axios.patch("http://localhost:5000/doctor/updateDoctor", {profilepic: res.data.msg},{
                headers:{Authorization:usertoken}
            }).then( 
                fetchUser(usertoken).then(res=> {
                dispatch(dispatchGetUser(res))
              }))
          } catch (err) {
              console.error(err);
          }
          })
        } catch (error) {
          console.log(error);
        }
        }





        const updateDoctor = () =>{
            var obj = {}; 
            obj.id = user._id;
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

            if(gqualification !== ""){
                obj.qualification = gqualification;
                setGqualification("");
            }



            Axios.patch("/doctor/updateDoctor", obj, {
                headers:{Authorization:usertoken}
            }).then( 
              fetchUser(usertoken).then(res=> {
              dispatch(dispatchGetUser(res))
            }))
        };


        const updatePassword = () =>{
            
            
                if(gpassword!=='' && newpassword!==''){
                var obj = {}; 
                obj.id = user._id;
                obj.password = newpassword;
                obj.oldpassword=gpassword;
                Axios.post("/doctor/reset",obj,  {
                    headers:{Authorization:usertoken}
                }).then((response) => {
                    setpassupdmsg(true)
                    setmessage(response.data.msg)
                    setnewPassword("")
                    setgPassword("")
                    fetchUser(usertoken).then(res=> {
                      dispatch(dispatchGetUser(res))
                    })
                    //console.log(response.data)
                }
                
                
                );

            
        }
        else{
          setpassupdmsg(true)
          setmessage("Please enter in the fields")          
        }
        }


        
  return (
    <Page title="Dashboard: Profile | Minimal-UI">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Welcome {user.name}!
        </Typography>

        <Grid container columns={{ xs: 4, sm: 2, md: 12 }}>
    
    <Grid item xs={12} sm={2} 
    md={4} sx={{marginBottom: 5}}
    >
    <Avatar alt={user.name} src={user.profilepic} sx={{ width: 200, height: 200, marginBottom: 3}}/>  
    <Button

            variant="outlined"
            component={RouterLink}
            to="#"
            onClick={handleClickOpen}
          >
            Update profile picture
          </Button>

    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Profile Picture </DialogTitle>
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
          <LoadingButton loading={isload} type="submit"> Upload </LoadingButton>
          </form>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

    </Grid>

    <Grid item xs={12} sm={3} md={4} sx={{}}>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        focused
        id="outlined-uncontrolled"
        label="Name"
        placeholder={user.name}
        onChange= {(event) => {setgName(event.target.value)}}
        value={gname} 
      />
      <TextField
        focused
        id="outlined-uncontrolled"
        label="Age"
        placeholder={user.age+""}
        onChange= {(event) => {setGAge(event.target.value)}}
        value={gage} 
      />
      <TextField
        focused
        id="outlined-uncontrolled"
        label="Gender"
        placeholder={user.gender}
        onChange= {(event) => {setGGender(event.target.value)}}
        value={ggender} 
      />
      <TextField
        focused
        id="outlined-uncontrolled"
        label="Phone number"
        placeholder={user.phonenumber}
        onChange= {(event) => {setgNumber(event.target.value)}}
        value={gnumber} 
      />
      <TextField
        focused
        id="outlined-uncontrolled"
        label="Address"
        placeholder={user.address}
        onChange= {(event) => {setgAddress(event.target.value)}}
        value={gaddress} 
      />
      <TextField
        focused
        id="outlined-uncontrolled"
        label="Qualification"
        placeholder={user.qualification}
        onChange= {(event) => {setGqualification(event.target.value)}}
        value={gqualification} 
      />
      <TextField
        focused
        id="outlined-uncontrolled"
        label="Country"
        placeholder={user.country}
        onChange= {(event) => {setgCountry(event.target.value)}}
        value={gcountry} 
      />
      <TextField
        focused
        id="outlined-uncontrolled"
        label="City"
        placeholder={user.city}
        onChange= {(event) => {setgCity(event.target.value)}}
        value={gcity} 
      />
      <Button variant="contained" onClick={updateDoctor}>Update Profile </Button>
    </Box>
    </Grid>




{/* update password */}

    <Grid item xs={12} sm={3} md={4}>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        focused
        id="outlined-uncontrolled"
        label="Old password"
        onChange= {(event) => {setgPassword(event.target.value)}}
        value={gpassword} 
      />
      <TextField
        focused
        id="outlined-uncontrolled"
        label="New password"
        onChange= {(event) => {setnewPassword(event.target.value)}}
        value={newpassword} 
      />
      
      <Button variant="contained" onClick={updatePassword}>Update password </Button>

      
      <Dialog open={passupdmsg} onClose={closepasswordupdate}>
        <DialogContent>
          <Typography> {message} </Typography>
        </DialogContent>
        <DialogActions>
        <Button onClick={closepasswordupdate}> Okay! </Button>
        </DialogActions>
      </Dialog>

    </Box>
    </Grid>


        </Grid>

        </Container>
    </Page>
  );
}