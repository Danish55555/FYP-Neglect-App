import React,{useState,useEffect} from 'react';
import DrawingBoard from "react-drawing-board";
import { Link} from 'react-router-dom';
import Page from '../components/Page';
import { Container,Typography,Button, Grid } from "@mui/material";
import { Box } from '@mui/material';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useSelector } from 'react-redux';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));



const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));


export default function Detector() {
  //const auth=useSelector(state=>state.auth);
  const token=useSelector(state=>state.token) 
  const [getminute,setminute]=useState(0);
  const [getsecond,setsecond]=useState(0);
  const [active,setactive]=useState(false);
  const [patients,setpatients]=useState([]);
  const [currentpatient,setcurrentpatient]=useState({_id:0,name:'none'});
  const [pimage,setpimage]=useState('');
  const [getneglect,setneglect]=useState('')
// eslint-disable-next-line 
 var timer=""; 




 useEffect(()=>{
  axios.get('/guardian/patient',{
    headers:{Authorization:token}
}).then((response) => {
  setpatients(response.data.patients.filter(function(item){
    return item.neglecttype==="none"
  }));
  //console.log(response.data.patients);

})
.catch(err=>console.log(err))
  
  },[token]);






useEffect(()=>{
  if(active){
timer=setInterval(()=>{
setsecond(getsecond+1);
if(getsecond===50){
  setminute(getminute+1);
  setsecond(0);
}
},1000)
return()=>clearInterval(timer)

}})

const restartTimer=()=>{
  setsecond(0);
  setminute(0);

}
const stopTimer=()=>{
  clearInterval(timer);
}








const sendImage=(event)=>{
  if(currentpatient.name==='none'){
    alert('Select patient firstly plz')
    return
  }    
  if(getsecond===0&&getminute===0){
    alert('Start Timer firstly')
    return
  }
  const data=new FormData();
  data.append("file",pimage)

  fetch('http://localhost:8000/saveimage', {
    method: 'POST',
    body: data,
  }).then((response) => {
    response.json().then((body) => {
    console.log(body)
    if(body.hello===0){
      setneglect('left');
      var obj = {}; 
      obj.neglecttype='left';
axios.patch(`/guardian/patient/${currentpatient._id}/setneglect`,obj,{
  headers:{Authorization:token}
})
.then((response)=>{
console.log('Neglect Updated');
})
.catch((err)=>{
  console.log(err.message)
})



    }
    else{
      setneglect('right');
    }
    });
  });       
    }













  return (


<Page title="Detector: Patient | Profile">
<Grid container spacing={2}>
  <Grid item xs={12} style={{textAlign:"right", marginTop:'10px', marginRight:'5px'}}>
  <Button variant="contained"> 
<Link to='/dashboard' style={{textAlign:"center", color:'#fff'}}> Return to Dashboard</Link>
</Button>
  </Grid>
<Grid item xs={12} style={{backgroundColor:"#FEF8DD"}} sx={{mt:1}} >
<Typography variant='h4' align="center">
  Welcome to Detector 
</Typography>
<Typography
  align="center"
  sx={{px:3,py:2 }}
  >Timer:{getminute<10?"0"+getminute:getminute}:{getsecond<10?"0"+getsecond:getsecond}</Typography>
</Grid>
<Grid item xs={12} style={{backgroundColor:"#FEF8DD"}}  >
<Typography  align="center">
  Current Patient:{currentpatient.name} 
</Typography>
</Grid>
<Grid item xs={12} style={{backgroundColor:"#FEF8DD", textAlign:'center',
paddingBottom:'10px'}}>

<Button variant="contained" 

onClick={()=>{setactive(true)}}

>Start</Button>
<Button variant="contained" sx={{ml:1}}
onClick={()=>{stopTimer()

setactive(false)
}}
>Stop</Button>

<Button variant='contained'
onClick={()=>{restartTimer()}}
sx={{ml:1}}
>Reset</Button>
</Grid>
</Grid>
<Box sx={{px:2,mt:2}}>
<TableContainer component={Paper}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="left">ID</StyledTableCell>
            <StyledTableCell align="left">Age</StyledTableCell>
            <StyledTableCell align="left">City</StyledTableCell>
            <StyledTableCell align="left">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((row,ansk) => (
            <StyledTableRow key={ansk}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">{ansk}</StyledTableCell>
              <StyledTableCell align="left">{row.age}</StyledTableCell>
              <StyledTableCell align="left">{row.city}</StyledTableCell>
              <StyledTableCell align="left"><Button variant="contained"
              onClick={()=>{setcurrentpatient({
                _id:row._id, name:row.name})
              
              
              }}
              
              >Select</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
</Table>
</TableContainer>
</Box>
      <Container maxWidth="xl">
    <div>

      <div style={{width:'100%', padding:'20px'}}>

        <img src="https://res.cloudinary.com/dxstfvaxv/image/upload/v1647171560/Detector/fcmvuixykoyjvzjpf4tp.png" alt="hehe"
        style={{width:'100%', height:'280px'}}
        />
      </div>
<h4>Copy Image Below</h4>
      <div style={{width:'100%',padding:'10px'}}>

      <DrawingBoard
      
      style={{border:'1px solid black',
    
    height:'280px',
    width:'100%',
    // backgroundImage:'https://res.cloudinary.com/drimnkool/image/upload/v1644341187/istockphoto-1130260217-612x612_rfznlz.jpg',
    // backgroundColor:'green'
    }}
      


      />
      </div>
      <div id="output"></div>
    </div>
    <div className="testfile"
    style={{textAlign:'center'}}
    >
      <input type="file" name="upfile" id="testfile"
      
      onChange={event =>{
        const file=event.target.files[0];
        setpimage(file);
    }}
      
      
      />

      <Button
      onClick={()=>{sendImage()}}
      variant='contained'
      >Send for prediction</Button>
    </div>

    <Div
    style={{textAlign:'center', backgroundColor:'#eee'}}
    sx={{py:2, mt:2}}
    >{getneglect===''?'':getneglect+" Neglect Detected"}</Div>

    </Container>
    </Page>
  );
}