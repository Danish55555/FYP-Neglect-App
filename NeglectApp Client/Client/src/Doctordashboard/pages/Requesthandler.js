import React,{useEffect,useState} from 'react';

//import { Link } from 'react-router-dom';
// material
import {   Container, Stack, Typography, Box} from '@mui/material';
// components
import Page from '../components/Page';

import {useSelector} from 'react-redux';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// ----------------------------------------------------------------------


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


// ----------------------------------------------------------------------

export default function RehabRequest() {
    
    const token=useSelector(state=>state.token) 


    const [requestlist,setrequestlist]=useState([]);
    const auth=useSelector(state=>state.auth)
    const {user}=auth;
    useEffect(()=>{
      axios.get('/doctor/allrequest',{
        headers:{Authorization:token}
    }).then((response) => {
      console.log(response.data.requeslist);
      setrequestlist(response.data.requeslist);
    })
    .catch(err=>console.log(err))
      
      },[token]);
    const getrequestList=()=>{
      axios.get('/doctor/allrequest',{
        headers:{Authorization:token}
    }).then((response) => {
      console.log(response.data.requeslist);
      setrequestlist(response.data.requeslist);
    })
    .catch(err=>console.log(err))

    }
const handleRequest=(reqid,guardianid,patientid)=>{
  var obj={};
  obj.guardianid=guardianid;
  obj.patientid=patientid;
  obj.doctorid=user._id;
  console.log(obj);

  axios.patch(`/doctor/request/${reqid}`,obj,{
    headers:{Authorization:token}
}).then((response) => {
  
  console.log(response.data.msg);
  getrequestList();
})
.catch(err=>console.log(err))

}


  return (
    <Page title="Dashboard: Doctor | Request">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Doctors Request
          </Typography>
         






        </Stack>



        <Box sx={{px:2,mt:2}}>
<TableContainer component={Paper}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Guardian Name</StyledTableCell>
            <StyledTableCell align="left">Patient Name</StyledTableCell>
            <StyledTableCell align="left">Request Date</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="left">Action</StyledTableCell>
            
            
          </TableRow>
        </TableHead>
        <TableBody>
          {requestlist.length>0?
        requestlist.map((row,ansk) => (
            <StyledTableRow  key={ansk}>
             
              <StyledTableCell align="left">{row.guardianid.name}</StyledTableCell>
              <StyledTableCell align="left">{row.patientid.name}</StyledTableCell>
              <StyledTableCell align="left">{row.createdAt}</StyledTableCell>
              <StyledTableCell align="left">{row.status===false?'Pending':'Accepted'}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.status===false?
                
              <button
              style={{border:'none', padding:'4px',backgroundColor:'green', color:'white'}}
              onClick={()=>{
                console.log(row.doctorid._id)
handleRequest(row._id,row.guardianid._id,row.patientid._id)

              }}
              >Accept</button> 
              :''}
              </StyledTableCell>
            </StyledTableRow>
        )):
        
        
        <StyledTableRow  >
              
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="left">
              
              </StyledTableCell>
            </StyledTableRow>
        }
    
        </TableBody>
</Table>
</TableContainer>
</Box>













      </Container>
    </Page>
  );
}
