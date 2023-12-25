import React, {useState, useEffect} from 'react';
// material
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------
import { Link as RouterLink } from 'react-router-dom';

import {fetchAdmin, dispatchGetAdmin} from '../redux/actions/authAction'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'

import { Box, TextField, Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid} from '@mui/material';  
import LoadingButton from '@mui/lab/LoadingButton';

export default function Profile() {
    const token=useSelector(state=>state.token)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const {admin} = auth
    
    const [pimage,setpimage]=useState('');

    useEffect(()=> {
        if(admin){
            fetchAdmin(token).then(res=> {
              dispatch(dispatchGetAdmin(res))
            })
        }
      },[])

        const [name, setname] =useState("");
        const [number, setnumber] =useState("");
        const [age, setage] =useState("");
        const [gender, setgender] =useState("");

        const [apassword, setaPassword] = useState("");
        const [newpassword, setnewPassword] = useState("");
        const [passupdmsg, setpassupdmsg] = useState(false);


        const [message, setmessage] = useState("Password Updated.");



        const [open, setOpen] = useState(false);
        const [isload, setisload] = useState(false);
        const [previewsource, setpreviewsource] = useState('');

        const closepasswordupdate = () =>{
          setpassupdmsg(false);
        }
        const handleClickOpen = () => {
          setOpen(true);
        };
        
        const handleClose = () => {
          setOpen(false);
        };

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
          await axios.post('/admin/uploadprofilepic', {data: base64EncodedImage}).then(async(res)=>{
            try {
              console.log(res.data.msg)
              setOpen(false)
              setisload(false);
              await axios.patch("http://localhost:5000/admin/update", {profilePic: res.data.msg},{
                headers:{Authorization:token}
            }).then( 
                fetchAdmin(token).then(res=> {
                dispatch(dispatchGetAdmin(res))
              }))
          } catch (err) {
              console.error(err);
          }
          })
        } catch (error) {
          console.log(error);
        }
        }

        
        const updateAdmin = async() =>{
            var obj = {}; 
            obj.id = admin._id;
            if(name !== ""){
                obj.name = name;   
                setname("");
            }
            if(number !== ""){
                obj.phoneNumber = number;
                setnumber("");
            }
            
            if(gender !== ""){
                obj.gender = gender; 
                setgender("");
            }
            if(age !== ""){
                obj.age = age;
                setage("");
            }
             await axios.patch("http://localhost:5000/admin/update", obj,{
                headers:{Authorization:token}
            }).then( 
                fetchAdmin(token).then(res=> {
                dispatch(dispatchGetAdmin(res))
              }))
        }

        

        const updatePassword = () =>{       
            if(apassword!=='' && newpassword!==''){
            var obj = {}; 
            obj.id = admin._id;
            obj.password = newpassword;
            obj.oldpassword=apassword;
            axios.post("/admin/reset",obj,  {
                headers:{Authorization:token}
            }).then((response) => {
                setpassupdmsg(true);
                setaPassword('')
                setnewPassword('')
                console.log(response.data)
                //console.log(response.data)
            }
            );
    }
    else{
        setmessage("Incorrect old password")
        setaPassword("");
        setnewPassword("");
        setpassupdmsg(true)
    }
    }



  return (
    <Page title="Dashboard: Profile | Minimal-UI">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Welcome {admin.name}!
        </Typography>

        <Grid container columns={{ xs: 4, sm: 2, md: 12 }}>
    
    <Grid item xs={12} sm={2} 
    md={4} sx={{marginBottom: 5}}
    >
    <Avatar alt={admin.name} src={admin.profilePic} sx={{ width: 200, height: 200, marginBottom: 3}}/>  
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
          <LoadingButton loading={isload} type="submit" loadingPosition="end"> Upload </LoadingButton>
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
        placeholder={admin.name}
        onChange= {(event) => {setname(event.target.value)}}
        value={name} 
      />
      <TextField
        focused
        id="outlined-uncontrolled"
        label="Age"
        placeholder={admin.age}
        onChange= {(event) => {setage(event.target.value)}}
        value={age} 
      />
      <TextField
        focused
        id="outlined-uncontrolled"
        label="Gender"
        placeholder={admin.gender}
        onChange= {(event) => {setgender(event.target.value)}}
        value={gender} 
      />
      <TextField
        focused
        id="outlined-uncontrolled"
        label="Phone number"
        placeholder={admin.phoneNumber}
        onChange= {(event) => {setnumber(event.target.value)}}
        value={number} 
      />
      <Button variant="contained" onClick={updateAdmin}>Update Profile </Button>
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
        onChange= {(event) => {setaPassword(event.target.value)}}
        value={apassword} 
      />
      <TextField
        focused
        id="outlined-uncontrolled"
        label="New password"
        defaultValue="foo"
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
