import React,{useEffect,useState} from 'react';
import { Container, Typography, Grid,TextField } from '@mui/material';
import {useSelector} from 'react-redux';


import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
// components
import Page from '../components/Page';
import Axios from 'axios'
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';


import { red } from '@mui/material/colors';

import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


















const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
})); 







function Review() {

 




    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };







    const auth=useSelector(state=>state.auth);
    const token=useSelector(state=>state.token)
    const {user}=auth;

    const [subject,setsubject]=useState('');
    const [comment,setcomment]=useState('')

    const [message,setmessage]=useState('')
    const [reviews,setreviews]=useState([]);
    const [reply,setreply]=useState('');
const [addmess,setaddmess]=useState('');
    useEffect(()=>{
        var route=''
        if(user.role===1){
        route='/guardian/review'
        
        }   
        else if(user.role===2){
            route='/doctor/review'
        }
        Axios.get(route,{
                    headers:{Authorization:token}
                }).then((response) => {
                  setreviews(response.data.reviews);
                  //console.log(response.data.reviews[0]);
                  console.log(response.data.reviews)
        
                });
                },
                // eslint-disable-next-line 
                [token,user.role]);
        

        const handleReview=()=>{
            if(!user.role){
                setmessage('Login first');
                return
            }
            if(subject !=='' && comment!==''){
            //console.log('hello')
            var obj={}
            obj.userid=user._id;
            obj.usertype='';
            if(user.role===1){
            obj.usertype='guardian';
            }
            else{
                obj.usertype='doctor'
            }
            obj.name=user.name;
            obj.subject=subject;
            obj.comment=comment;
            //console.log(obj)
            
            
            
            var route='';
            if(user.role===1){
                route='/guardian/review'
            }
            else if(user.role===2){
                route='/doctor/review';
            }
            Axios.post(route,obj,{
                headers:{Authorization:token}
            }).then((response) => {
              //console.log(response.data);
              //console.log(response.data)
              setmessage('Review added')
              getAllreview();
              alert('Review Posted')
            });
            
            }
            else{
                setmessage('fill all fields plz');
            }
            
            }
            




            const getAllreview=()=>{
                var route=''
            if(user.role===1){
            route='/guardian/review'
            
            }   
            else if(user.role===2){
                route='/doctor/review'
            }
            Axios.get(route,{
                        headers:{Authorization:token}
                    }).then((response) => {
                      setreviews(response.data.reviews);
                      //console.log(response.data.reviews[0]);
                      //console.log(response.data)
            
                    });
            
            }
            



            const handleReply=(...args)=>{
                console.log(args[0])
                    if(!user.role){
                        setmessage('Login first');
                        return
                    }
                    var obj={};
                    obj.reply=reply;
                    obj.usertype='';
                    if(user.role===1){
                        obj.usertype='guardian';
                    }
                    else if(user.role===2){
                        obj.usertype='doctor'
                    }
                    
                    
                var route='';
                
                if(user.role===1){
                route='/guardian/'+user._id+'/review/'+args[0]
                }
                else if(user.role===2){
                    route='/doctor/'+user._id+'/review/'+args[0]
                }
                
                
                Axios.patch(route,obj,{
                    headers:{Authorization:token}
                }).then((response) => {
                  //console.log(response.data);
                  //console.log(response.data)
                  //console.log(response.data)
                  setaddmess('Reply added')
                  getAllreview();
                  alert(addmess+"Reply added")
                });
                
                }
                
const handleDeleteReply=(...args)=>{
    //console.log(args[0])
    console.log(message)
    
    var route='';
    if(user.role===1){
        route='/guardian/review/'+args[0]+'/reply/'+args[1];
    }
    else if(user.role===2){
        route='/doctor/review/'+args[0]+'/reply/'+args[1];
    }
    Axios.delete(route,{
        headers:{Authorization:token}
    }).then((response) => {
      //console.log(response.data);
      //console.log(response.data)
      //console.log(response.data)
      
      getAllreview();
    });
    }
    

    const handleDeleteReview=(...args)=>{
      //console.log(args[0])
      
      
      var route='';
      if(user.role===1){
          route='/guardian/'+user._id+'/review/'+args[0];
      }
      else if(user.role===2){
          route='/doctor/'+user._id+'/review/'+args[0];
      }
      Axios.delete(route,{
          headers:{Authorization:token}
      }).then((response) => {
        //console.log(response.data);
        //console.log(response.data)
        
        getAllreview();
      });
      }
      






    return (
        <Page title="Dashboard: Review | Minimal-UI">
            
        <Container >
          <Typography variant="h4" sx={{ mb: 5 }}>
            Welcome! {user.name}
          </Typography>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>


<TextField
          id="standard-password-input"
          label="Enter Subject"
          type="text"
          autoComplete="current-password"
          variant="standard"
          onChange= {(event) => {setsubject(event.target.value)}} 
        />

              </Grid>

              <Grid item xs={12} sm={12}>

<TextField
          id="standard-password-input"
          label="Enter Comment"
          type="text"
          autoComplete="current-password"
          variant="standard"
          onChange= {(event) => {setcomment(event.target.value)}}
style={{width:'100%'}}        
        />

              </Grid>







<Grid item xs={12} style={{textAlign:'right'}} sx={{py:4}}>
<Button variant="contained"

onClick={handleReview}
                

>
    Post Review
</Button>
      </Grid>



      
      {reviews.map((review,keyi)=>{
return(


  <Grid item xs={12} key={keyi}>

<Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={review.name}
        subheader={

          (moment(review.createdAt).format('dddd'))+"-"+
          (moment(review.createdAt).format('D'))+"-"+
          (new Date(review.createdAt)).toLocaleString('en-us', { month: 'long' })+"-"+
          (moment(review.createdAt).format('Y'))

        }
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {review.comment}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
{review.userid===user._id?<IconButton aria-label="delete"

onClick={()=>handleDeleteReview(review._id)}
>
        <DeleteIcon />
        </IconButton> :''}
        



        <IconButton aria-label="delete"
        
        
        >
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          
          
            <TextField id="standard-basic" label="Your Reply" variant="standard"
            style={{width:'100%'}}   
            onChange= {(event) => {setreply(event.target.value)}} 
            >

            </TextField>
          <Button
          variant="contained"
          sx={{mt:1}}
          
          onClick={()=>handleReply(review._id)}

          >Post Reply</Button>

{review.replies.map((ans,ansk)=>{


return (
          <Typography paragraph key={ansk} sx={{mt:4}}>

{ans.usertype==='guardian'?'Reply From Guardian':'Reply from Doctor'}-
&nbsp; &nbsp; &nbsp;
{ans.reply} {ans.userid===user._id?<button
style={{padding:'5px', backgroundColor:'red', color:'white', outline:'none', outlineColor:'none',
border:'none'}}


onClick={()=> handleDeleteReply(review._id, ans._id)}

>Delete</button>:''}
          </Typography>
        
          
          
          )})}
        </CardContent>
      </Collapse>
    </Card>


</Grid>

)})} 
  
    

    </Grid>









</Container>
</Page>

    );
}

export default Review;