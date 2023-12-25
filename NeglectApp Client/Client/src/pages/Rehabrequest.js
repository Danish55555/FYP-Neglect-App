import React,{useEffect,useState} from 'react';


// material
import { Container, Stack, Typography, Box} from '@mui/material';
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

export default function DoctorRequest() {
    
    const token=useSelector(state=>state.token) 
    const [requestlist,setrequestlist]=useState([]);

 


    useEffect(()=>{
      axios.get('/guardian/allrequest',{
        headers:{Authorization:token}
    }).then((response) => {
      console.log(response.data.requeslist);
      setrequestlist(response.data.requeslist);
    })
    .catch(err=>console.log(err))
      
      },[token]);
    


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
            <StyledTableCell>Doctor Name</StyledTableCell>
            <StyledTableCell align="left">Patient Name</StyledTableCell>
            <StyledTableCell align="left">Request Date</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {requestlist.length>0?
        requestlist.map((row,ansk) => (
            <StyledTableRow key={ansk} >
              <StyledTableCell component="th" scope="row">
              {row.doctorid.name}
              </StyledTableCell>
              <StyledTableCell align="left">{row.patientid.name}</StyledTableCell>
              <StyledTableCell align="left">{row.createdAt}</StyledTableCell>
              <StyledTableCell align="left">{row.status===false?'Pending':'accepted'}</StyledTableCell>
            
            </StyledTableRow>
        )):
        
        <StyledTableRow >
              <StyledTableCell component="th" scope="row">
              
              </StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
            
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
