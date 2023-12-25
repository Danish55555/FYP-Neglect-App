import React, { useState, useEffect } from "react"
import Page from '../components/Page';
import { Container, Stack, Typography } from '@mui/material';
import StripeCheckout from 'react-stripe-checkout'
import { Button } from '@mui/material';
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { fetchUser, dispatchGetUser } from "src/redux/actions/authAction";
import Scrollbar from '../components/Scrollbar';
import { UserListHead } from '../components/_dashboard/user';
import { Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import StarIcon from '@iconify/icons-eva/people-fill';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import CommentIcon from '@mui/icons-material/Comment';
// import IconButton from '@mui/material/IconButton';

import {
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableContainer
} from '@mui/material';
// import { getDateRangePickerDayUtilityClass, getMonthPickerUtilityClass } from "@mui/lab";
const getIcon = (name) => <Icon icon={name} width={22} height={22} />;
export default function Payments() {

  
const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'paydate', label: 'Pay date', alignRight: false }
];

  // const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  // const [filterName, setFilterName] = useState('');
  // const [rowsPerPage, setRowsPerPage] = useState(5);

  const [paymentHistory, setpaymentHistory] = useState([])
  const [plans, setplans] = useState([])
  const usertoken=useSelector(state=>state.token)
  const auth = useSelector(state => state.auth)  
  const {user} = auth;
  const dispatch = useDispatch()
  const [planid, setplanid] = useState();
  const [product, setproduct] = useState({
    name: "Basic",
    price: 100,
  }); 

  const [open, setOpen] = React.useState(false);
  const [openpay, setopenpay] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async() => {
    await axios.get('/doctor/paymenthistory/'+ user._id)
    .then((response) => {
      console.log(response)
    console.log(response.data)
  })
    setOpen(false);
  };

  const handleclickopenpay = (id) => {
    setplanid(id)
    setopenpay(true);
  };

  const handleclosepay = async() => {  
    setopenpay(false);
  };

  useEffect(()=> {
    if(user){
        fetchUser(usertoken).then(res=> {
          dispatch(dispatchGetUser(res))
        })
        axios.get('/doctor/paymenthistory/'+ user._id)
        .then((response) => {
        setpaymentHistory(response.data)
      
      })
      axios.get('/doctor/plans') 
    .then((response)=>{  
      setplans(response.data)
    })

    }

  }, [])

  const makePayment = async(token) =>{
    const body = {
          token,
          product
        }
    return await axios.post("/doctor/"+user._id+"/plan/"+planid, body,
    {header: {Authorization: usertoken}}).then((response)=>{
        console.log("RESPONSE: ", response)
    }).then(async()=>{
      await axios.get('/doctor/paymenthistory/'+ user._id)
        .then((response) => {
          setOpen(false)
          setopenpay(false)
        setpaymentHistory(response.data);
      })
    })
    .catch((error)=>console.log(error)) 
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = paymentHistory.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  return (
    <Page>
      <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
            Payments 
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
            onClick={handleClickOpen}
          >
            Buy Plan 
          </Button>













          <Dialog open={open} onClose={handleClose} fullWidth= {true}>
        <DialogTitle>Buy a plan</DialogTitle>
        <DialogContent>
          <DialogContentText
          sx={{
            marginBottom: 5
          }}
          >
            To rehabilitate patients through this website, please buy a plan that suits your requirements. 
          </DialogContentText>
          

          <Grid container spacing={1} alignItems="flex-end">
          {plans.map((pl) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={pl._id}
              xs={12}
              sm={4}    /**/
              md={4}   /*for normal screen*/
            >
              <Card>
                <CardHeader
                  title={pl.name}
                  subheader= 'uewhifh'
                  titleTypographyProps={{ align: 'center' }}
                  action={pl.title === "Premium" ? getIcon(StarIcon) : console.log("NOT PREMIUM")}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: '#F4F6F8',
                    paddingBottom: 2
                  }}
                />
                <CardContent>
                  <Box
                    sx={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      {pl.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <Typography  component="p"
                        align="center"
                        >
                      {pl.description}
                  </Typography>
                </CardContent>
                <CardActions  sx={{
                  paddingBottom: 2
                }}>
                <Button 
                fullWidth 
                variant='contained'
                onClick={()=>handleclickopenpay(pl._id)}>
                  BUY
                  </Button>


      <Dialog
        open={openpay}
        onClose={handleclosepay}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to proceed?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Click "Pay with Card" to proceed your payement and start rehabilitating patients
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleclosepay}>Cancel</Button>
          <StripeCheckout 
                name="Buy Plan" 
                token={makePayment}
                //amount ={pl.price * 100} 
                stripeKey="pk_test_51KYVHgEqKv9XyXpoFbyHg7I5F64QvTQQAyubh1nmgHnOMMJqCHqASrF1PcjPjCdVo4TC42fnL4jxYEfcsXPrsZfd00Mmi2hYdS" /> 
  
        </DialogActions>
      </Dialog>




                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>














        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

























        </Stack>

        
      <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  //rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                />

          <TableBody>
                  {paymentHistory.length>0 ? paymentHistory.map((ph) => {
                      
                      const isItemSelected = selected.indexOf(user.name) !== -1;
                      
                      return (
                     
                        <TableRow
                          hover
                          key={ph._id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >                    
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, user.name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {ph.planId.name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left"> {ph.planId.price} </TableCell>
                          <TableCell align="left">{ph.paydate}</TableCell>
                        </TableRow> 
                      );
                    }):
                    
                    
                    
                    <TableRow
                    hover
                    
                    tabIndex={-1}
                    role="checkbox"
                    // selected={isItemSelected}
                    // aria-checked={isItemSelected}
                  >                    
                    <TableCell padding="checkbox">
                      <Checkbox
                        // checked={isItemSelected}
                        onChange={(event) => handleClick(event, user.name)}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" noWrap>
                          
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                    
                    
                    }
                </TableBody>
                </Table>
            </TableContainer>
          </Scrollbar>



{/* {paymentHistory?.map((ph)=>(
    <ListItem alignItems="flex-start">
    <ListItemText
      primary="Summer BBQ"
      secondary={
        <React.Fragment>
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
             PAY DATE: {ph.paydate}
          </Typography>
          
        </React.Fragment>
      }
    />
  </ListItem>
))
} */}

          






        

      </Container>
    </Page>
  );
}

