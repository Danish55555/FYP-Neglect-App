import React, { useState, useEffect } from "react"
import Page from '../components/Page';
import { Container, Stack, Typography } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios'
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import { List, Grid } from '@mui/material';

import DeleteIcon from '@iconify/icons-eva/checkmark-circle-outline'

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;
export default function Payments() {

  const [paymentHistory, setpaymentHistory] = useState([])

  useEffect(async()=> {
        await axios.get('/admin/getpaymenthistory')
        .then((response) => {
        setpaymentHistory(response.data)
          console.log(response.data)
      })
  }, [])

  const verifyPayment = async(did) =>{
    await axios.patch('/admin/verifypayment/'+did).then(async()=>{
      await axios.get('/admin/getpaymenthistory')
        .then((response) => {
        setpaymentHistory(response.data)
          console.log(response.data)
      })
    })
  }

  return (
    <Page>
      <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
            Payments 
          </Typography>
    </Stack>




{paymentHistory.map((ph, index) => (

<Grid container spacing ={3}>
<Grid item 
xs={10} 
sm={10} 
md={11}> 

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
    primary={ph.doctorId.name}
    secondary={
      <React.Fragment>
        {ph.doctorId.age} 
      </React.Fragment>
    }
  />
<ListItemText
primary="Plan name:"
secondary={
  <React.Fragment>
    {ph.planId.name}
  </React.Fragment>
} />

<ListItemText
primary="Date:"
secondary={
  <React.Fragment>
    {ph.paydate}
  </React.Fragment>
} />

</ListItem>
</List>

</Grid>

  <Grid item xs={2} sm={2} md={1} justifyContent='center' align='center'>
  {ph.doctorId.paymentStatus === 0? <Button  sx ={{boxShadow: 3}}  variant="contained" onClick={()=> verifyPayment(ph.doctorId._id)}>
    {getIcon(DeleteIcon)}
    </Button> : <Button  sx ={{boxShadow: 3}} variant="contained" disabled >
    {getIcon(DeleteIcon)}
    </Button>}
    
</Grid>
</Grid>
))}
      </Container>
    </Page>
  );
}

