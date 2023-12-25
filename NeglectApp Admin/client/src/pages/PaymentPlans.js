import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Grid } from '@mui/material';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import StarIcon from '@iconify/icons-eva/people-fill';

//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// material
import {
  Stack,
  Button,
  Container,
  Typography
} from '@mui/material';
// components
import Page from '../components/Page';
//

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

export default function PaymentPlans() {
    const [plans, setplans] = useState([]);
    const [newname, setnewname]= useState("");
    const [newdesc, setnewdesc]= useState("");
    const [newprice, setnewprice]= useState();
    const [newduration, setnewduration]= useState();
    
    const [oldid, setoldid]= useState();
    const [oldname, setoldname]= useState("");
    const [olddesc, setolddesc]= useState("");
    const [oldprice, setoldprice]= useState();
    const [oldduration, setoldduration]= useState();

    const [updname, setupdname]= useState("");
    const [upddesc, setupddesc]= useState("");
    const [updprice, setupdprice]= useState();
    const [updduration, setupdduration]= useState();


    const [open, setOpen] = React.useState(false);
    const [openupdate, setOpenUpdate] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenUpdate = (id, name, price, duration, descript) => {
    setoldid(id)
    setoldname(name)
    setoldprice(price)
    setolddesc(descript)
    setoldduration(duration)
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const token = useSelector(state=> state.token)
  useEffect(()=>{
    axios.get('http://localhost:5000/admin/getplan').then((response) => {
      setplans(response.data);
    });
    }, []);

    const addplan = () =>{
      try{
       axios.post('http://localhost:5000/admin/addplan', {name: newname, description: newdesc, price: newprice, duration: newduration}, {
         headers: {Authorization: token}
     }).then(()=>{
      setOpen(false);
      setnewname('');
      setnewprice();
      setnewdesc('');
      setnewduration();
      axios.get('http://localhost:5000/admin/getplan').then((response) => {
      setplans(response.data);

    });
     })
      }catch(err){ 
        console.log(err);
      }
     }

     const deleteplan = async(id) =>{
      try{
        await axios.delete(`/admin/deleteplan/${id}`, {
          headers: {Authorization: token}
      }).then(()=>{
        axios.get('http://localhost:5000/admin/getplan').then((response) => {
      setplans(response.data);

    });
      })
      }catch(err){
        console.log(err)
      }
    }

    const updateplan = async() =>{
      var obj = {}; 
            if(updname !== ""){
                obj.name = updname;   
                setupdname("");
            }
            if(upddesc !== ""){
                obj.description = upddesc;
                setupddesc("");
            }
            
            if(updprice !== ""){
                obj.price = updprice; 
                setupdprice("");
            }
            if(updduration !== ""){
                obj.duration = updduration;
                setupdduration("");
            }
             await axios.patch("http://localhost:5000/admin/updateplan/"+ oldid, obj,{
                headers:{Authorization:token}
            }).then(()=>{
              setOpenUpdate(false);
              setoldname('');
              setoldprice();
              setolddesc('');
              setoldduration();
              axios.get('http://localhost:5000/admin/getplan').then((response) => {
              setplans(response.data);
        
            });
             })
    }

  return (
    <Page title="User | Minimal-UI">

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Payment Plans
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
            onClick={handleClickOpen}
          >
            Add new Plan
          </Button>

          <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new Plan</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange= {(event) => {setnewname(event.target.value)}}
            value={newname}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange= {(event) => {setnewdesc(event.target.value)}}
            value={newdesc}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            onChange= {(event) => {setnewprice(event.target.value)}}
            value={newprice}
          />
          <TextField
            margin="dense"
            id="duration"
            label="Duration"
            type="number"
            fullWidth
            variant="standard"
            onChange= {(event) => {setnewduration(event.target.value)}}
            value={newduration}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addplan}> Add </Button>
        </DialogActions>
      </Dialog>
        </Stack>

<Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {plans.map((pl) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={pl._id}
              xs={12}
              sm={6}    /**/
              md={4}   /*for normal screen*/
            >
              <Card>
                <CardHeader
                  title={pl.name}
                  subheader= {"For " + pl.duration + " Months"}
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
                <CardActions>

                <ButtonGroup fullWidth variant="outlined" aria-label="outlined button group">
                  <Button variant='contained' onClick={()=>deleteplan(pl._id)}>DELETE</Button>
                  <Button onClick={() => handleClickOpenUpdate(pl._id, pl.name, pl.price, pl.duration, pl.description)}>UPDATE</Button>
                </ButtonGroup>

      <Dialog open={openupdate} onClose={handleCloseUpdate}>
        <DialogTitle>Update Plan</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            placeholder={oldname}
            variant="standard"
            onChange= {(event) => {setupdname(event.target.value)}}
            value={updname}
          />
          <TextField
            margin="dense"
            id="desc"
            label="Description"
            type="text"
            fullWidth
            placeholder={olddesc}
            variant="standard"
            onChange= {(event) => {setupddesc(event.target.value)}}
            value={upddesc}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="Number"
            fullWidth
            placeholder={oldprice}
            variant="standard"
            onChange= {(event) => {setupdprice(event.target.value)}}
            value={updprice}
          />
          <TextField
            margin="dense"
            id="duration"
            label="Duration"
            type="Number"
            fullWidth
            placeholder={oldduration}
            variant="standard"
            onChange= {(event) => {setupdduration(event.target.value)}}
            value={updduration}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Cancel</Button>
          <Button onClick={updateplan}> Update </Button>
        </DialogActions>
      </Dialog>



                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      </Container>
    </Page>
  );
}