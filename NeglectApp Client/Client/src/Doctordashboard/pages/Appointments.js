import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import { List, Grid } from '@mui/material';

//import DeleteIcon from '@iconify/icons-eva/minus-circle-outline'
import DeleteIcon from '@iconify/icons-ic/outline-delete'
import EditIcon from '@iconify/icons-ic/outline-edit'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { fetchUser, dispatchGetUser } from "src/redux/actions/authAction";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


// material
import {
  Stack,
  Button,
  Container,
  Typography
} from '@mui/material';
// components
import Page from '../components/Page';
import set from 'date-fns/set';
//

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

export default function Faq() {

    const [showbtn,setshowbtn]=useState(true);
    const [showendbtn,setshowendbtn]=useState(false);
    const [appointments, setappointments] = useState([]);
    const [patients, setpatients] = useState([]);

    const [patientapp, setpatientapp] = useState();

    const [newdate, setnewdate] = useState("")
    const [newstarttime, setnewstarttime] = useState("")
    const [newendtime, setnewendtime] = useState("")
    
    const [update, setupdate] = useState()
    const [upstarttime, setupstarttime] = useState()
    const [upendtime, setupendtime] = useState()

    const [olddate, setolddate] = useState()
    const [oldstarttime, setoldstarttime] = useState()
    const [oldendtime, setoldendtime] = useState()
    const [oldid, setoldid] = useState()

  const [open, setOpen] = React.useState(false);
  const [openupappoint, setopenupappoint] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleclickopenup = (oi, d, st, et) => {
    setoldid(oi)
    setolddate(d)
    setoldstarttime(st)
    setoldendtime(et)
    setopenupappoint(true);
  };

  const handlecloseup = () => {
    setopenupappoint(false);
  };

  const token = useSelector(state=> state.token)
  const auth = useSelector(state => state.auth)  
  const {user} = auth;
  const dispatch = useDispatch()
  const appointmentDetail=useSelector(state=>state.apptReducer)
  useEffect(()=>{
    if(user){
      fetchUser(token).then(res=> {
        dispatch(dispatchGetUser(res))
      })
    }
    axios.get('/doctor/getappointments',{
      headers: {Authorization: token}
  }).then((response) => {
      setappointments(response.data);
      console.log(response.data);
    })

    axios.get('/doctor/myrehabpatients/'+user._id ,{
      headers: {Authorization: token}
  }).then((response) => {
      setpatients(response.data);
      
    })
    }, []);

    const addAppointment = () =>{
      try{
        var obj = {}
        obj.patientid = patientapp
        obj.doctorid = user._id
        obj.date = newdate
        obj.starttime= newstarttime
        obj.endtime = newendtime
    
       axios.post('/doctor/appointment', obj, {
         headers: {Authorization: token}
     }).then(()=>{
      axios.get('http://localhost:5000/doctor/getappointments',{
        headers: {Authorization: token}
    })
      .then((response) => {
        setappointments(response.data);

      });
      setOpen(false);
      setnewdate('')
      setnewstarttime('');
      setnewendtime('');
     })
      }catch(err){ 
        console.log(err);
      }
     }

     const deleteAppointment = async(id) =>{
      try{
        await axios.delete(`/doctor/deleteappointment/${id}`, {
          headers: {Authorization: token}
      }).then(()=>{
        axios.get('http://localhost:5000/doctor/getappointments',{
          headers: {Authorization: token}
      }).then((response) => {
          setappointments(response.data);
        });
       })


      }catch(err){
        console.log(err)
      }
    }

    const updateAppointment = async() =>{
      var obj = {}; 
      if(update !== ""){
          obj.date = update;   
          setupdate("");
      }
      if(upstarttime !== ""){
          obj.starttime = upstarttime;
          setupstarttime("");
      }
      if(upendtime !== ""){
        obj.endtime = upendtime;
        setupendtime("");
    }

       await axios.patch("http://localhost:5000/doctor/updateappointment/"+oldid, obj,{
          headers:{Authorization:token}
      }).then(()=>{
        handlecloseup()
        axios.get('http://localhost:5000/doctor/getappointments',{
          headers: {Authorization: token}
      }).then((response) => {
          setappointments(response.data);
        });
       })
  }



  return (
    <Page title="Appointments | NEGLECT-APP">

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Appointments
          </Typography>
          {appointmentDetail.hasOwnProperty('value')
          ?<Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
            onClick={()=>{
              dispatch({type:"ENDAPPT"})
          
            }}
          >
            End Ongoing Appointment
          </Button>:''}
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
            onClick={handleClickOpen}
          >
            Schedule Appointment
          </Button>

          <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Schedule Appointment </DialogTitle>
        <DialogContent>

        <Stack component="form" noValidate spacing={3}>
          <Typography>Patient name</Typography>
        <Select
          
          id="patient"
          label="Patient name"
          value = {patientapp} 
          onChange={(event) =>{
            setpatientapp(event.target.value)
            console.log(event.target.value)
          }}
  >
    
  {
    patients.map((pnt,keyi) =>{
    
      return <MenuItem 
      
      key={keyi}
      
    //   onClick={() => 
    // {
    //     setpatientapp(pnt.patientid._id)
    //     console.log(pnt.patientid._id)
    // }
    // }
    value = {pnt.patientid._id}
    > {pnt.patientid.name} 
    
    </MenuItem>
    
    })
  }  
    
  </Select>
  
  
      <TextField
        id="date"
        label="Date"
        type="date"
        //defaultValue="2017-05-24"
        onChange= {(event) => {setnewdate(event.target.value)}}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="starttime"
        label="Start time"
        type="time"
        defaultValue="07:30"
        onChange= {(event) => {setnewstarttime(event.target.value)}}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
      />
      <TextField
        id="endtime"
        label="End time"
        type="time"
        onChange= {(event) => {setnewendtime(event.target.value)}}
        defaultValue="07:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
      />
    </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addAppointment}> Add </Button>
        </DialogActions>
      </Dialog>
        </Stack>

        {appointments.map((apt,keya) => (

<Grid container spacing ={3}
key={keya}
>
<Grid item 
xs={10} 
sm={10} 
md={11}
sx={{mt:2}}

> 

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
    primary={apt.starttime}
    secondary={
      <React.Fragment>
        {apt.endtime} 
      </React.Fragment>
    }
  />
<ListItemText
primary="Patient name:"
secondary={
  <React.Fragment>
    {apt.patientid.name}
  </React.Fragment>
} />

<ListItemText
primary="Date:"
secondary={
  <React.Fragment>
    {apt.date}
  </React.Fragment>
} />

</ListItem>
</List>
</Grid>

  <Grid item xs={2} sm={2} md={1} justifyContent='center' align='center'>
    <Button onClick={()=>deleteAppointment(apt._id)}  sx ={{boxShadow: 3}} >
    {getIcon(DeleteIcon)}
    </Button>
    <Button onClick={()=>handleclickopenup(apt._id, apt.date, apt.starttime, apt.endtime)}  sx ={{boxShadow: 3}}>
    {getIcon(EditIcon)}
    </Button>
    {!appointmentDetail.hasOwnProperty('value')
    
    ?<Button onClick={()=>{dispatch({payLoad: {aptid:apt._id,starttime:new Date(), endstatus:false, patid:
    apt.patientid._id
    },type:'STARTAPPT'})
    

  }
  

  }  sx ={{boxShadow: 3}}>
    <PlayArrowIcon />
    </Button>

    :'' }
    
    <Dialog open={openupappoint} onClose={handlecloseup}>
        <DialogTitle>Update Appointment</DialogTitle>
        <DialogContent>

        <Stack component="form" noValidate spacing={3}>
      <TextField
        id="date"
        label="Date"
        type="date"
        //defaultValue="2017-05-24"
        onChange= {(event) => {setupdate(event.target.value)}}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="starttime"
        label="Start time"
        type="time"
        defaultValue="07:30"
        onChange= {(event) => {setupstarttime(event.target.value)}}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
      />
      <TextField
        id="endtime"
        label="End time"
        type="time"
        onChange= {(event) => {setupendtime(event.target.value)}}
        defaultValue="07:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
      />
    </Stack>  
        </DialogContent>
        <DialogActions>
          <Button onClick={handlecloseup}>Cancel</Button>
          <Button onClick={updateAppointment}> Update </Button>
        </DialogActions>
      </Dialog>




    </Grid>
  </Grid>

        ))}

      </Container>
    </Page>
  );
}
