import React, {useState, useRef, useEffect} from 'react'
import Page from '../components/Page';
import {Container, Box, Typography, Stack, IconButton, TextField } from '@mui/material';
import CanvasDraw from '../Canvas/index'
import html2canvas from 'html2canvas'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Undo from '@mui/icons-material/UndoOutlined';
import Delete from '@mui/icons-material/DeleteOutlineOutlined';
import Download from '@mui/icons-material/DownloadOutlined'
import Upload from '@mui/icons-material/UploadFileOutlined'
import {useLocation, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios'
export default function Rehabilitator (){
  const location = useLocation();
  const { round } = location.state;
  const inputEl = useRef(null);
  const [open, setopen] = useState(true);
  const [uploadopen, setuploadopen] = useState(false)
  const [rimage, setrimage] = useState();
  const [openroundresults, setopenroundresults]= useState(false);

  const [originalcirclecount, setoriginalcirclecount] = useState(0);
  const [circlesunscratchedcount, setcirclesunscratchedcount] = useState(0);
  const [score1, setscore1] = useState(0);
  const [score2, setscore2] = useState(0);
  const [score3, setscore3] = useState(0);
  const [roundstatsdialog, setroundstatsdialog]=useState(false);
  const [observation, setobservation] = useState("")
  const [patientinfo, setpatientinfo] = useState(0)


  const usertoken=useSelector(state=>state.token)
  const auth = useSelector(state => state.auth)  
  const {user} = auth;
  const appointmentDetail=useSelector(state=>state.apptReducer)

  var height = 519;
  var width = 807;
  // var width = 1100;
  var lazyRadius= 5;
  var borderRadius = 5;
  var imgurl="";
  var imagename = "";
  if(round === 1){
    imgurl = "https://res.cloudinary.com/drimnkool/image/upload/v1652248543/Untitled_fpwnry.png";
    imagename = "round1org.png"
  }
  else if(round ===2){
    imgurl = "https://res.cloudinary.com/drimnkool/image/upload/v1652778943/r2test_z6cr4s.png";
    imagename = "r2org.png"
  }
  else{
    imgurl = "https://res.cloudinary.com/drimnkool/image/upload/v1652779663/r3org_s6sidu.png";
    imagename = "r3org.png"
  }
  useEffect(async()=>{
    //console.log(round)
    await axios.get('/doctor/patient/'+appointmentDetail.value.patid, {headers: {Authorization: usertoken}})
    .then((response) =>{
      console.log(response.data.patient)
      setpatientinfo(response.data.patient)
    })
  }, [])
  
  const circlecount =()=>{
    
  const data=new FormData();
  data.append("file", rimage)
  fetch(`http://localhost:8000/circlecounter?imgname=${imagename}&round=${round}`, {
    method: 'POST',
    body: data,
  }).then((response)=>{
    response.json().then((body) => {
      //console.log(body)
      setoriginalcirclecount(body.originalcount)
      setcirclesunscratchedcount(body.scratchcount)
      var score = Math.floor(((body.originalcount-body.scratchcount)/body.originalcount)*10)
     // console.log(score)
      if(round===1){
        setscore1(score)
      }
      else if(round===2){
        setscore2(score)
      }
      else{
        setscore3(score)
      }
    })
  })
  .then(()=>{
    setuploadopen(false);
    setopenroundresults(true); 
    
  })


  }

  const screenshot = async () => {
    var el = document.querySelector("#capture")
    const canvas = await html2canvas(el);
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(image, (Math.random() + 1).toString(36).substring(7));
    };

  const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;
    
    fakeLink.href = blob;
    
    //document.body.appendChild(fakeLink);
    fakeLink.click();
    //document.body.removeChild(fakeLink);
    
    fakeLink.remove();
    };

    return(
    <Page>
        <Container>
          {/* dialogue for round message */}
        <Dialog
        open={open}
        onClose={() => setopen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { `Ready for round ${round}` }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This is round {round}. Scratch all the circles you can see on the image. When you are ready click on 
            "I'm ready!"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setopen(false)}> I'm Ready!</Button>
        </DialogActions>
      </Dialog>








      <Box textAlign="center" >
        <Typography variant="h3" sx={{marginTop: '2%'}}> Rehabilitator </Typography>
        <Box sx={{padding: '3% 0% 3% 0%', borderRadius:  '15px'}}>
        <p>
        Round {round} <br />
         Scratch all the circles in the picture below!
        </p>
</Box>












        <Stack direction="row" spacing={1} sx={{backgroundColor:"whitesmoke", marginBottom: '3%'}}>
      <IconButton onClick={() => inputEl.current.undo()} color="primary">
        <Undo />
      </IconButton>
      <IconButton color="primary" onClick={() => inputEl.current.eraseAll()}>
        <Delete />
      </IconButton>
      <IconButton color="primary" onClick={() => screenshot()}>
        <Download />
      </IconButton>
      <IconButton color="primary" onClick={()=> setuploadopen(true)}>
        <Upload />
      </IconButton>

      {/* dialogue for sending picture to model */}
      <Dialog open={uploadopen} onClose ={()=> setuploadopen(false)}>
        <DialogTitle>Submit Image</DialogTitle>
        <DialogContent>
          <DialogContentText> Submit the image you just downloaded to get results for this round. </DialogContentText>
          
          <TextField
            autoFocus
            margin="dense"
            id="image"
            type="file"
            fullWidth
            onChange={event =>{
              const file=event.target.files[0];
              setrimage(file);
          }}
            //value={fileinput}
          />
          <Button onClick= {()=> circlecount()}> Upload </Button>
          
        </DialogContent>
        <DialogActions>
        <Button onClick={()=> setuploadopen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

          {/* dialogue for showing round results */}


            <Dialog
        open={openroundresults}
        onClose={() => setopenroundresults(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { `Round ${round} Results!` }
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
            Total Circles: {originalcirclecount}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Circles scratched: {originalcirclecount - circlesunscratchedcount}
          </DialogContentText>
          <DialogContentText> 
            Circes unscratched: {circlesunscratchedcount}
            </DialogContentText>

            {round===1?
            
          <DialogContentText>
          Score: {score1}</DialogContentText>:
          <></>
            }

            {round===2? 
            
          <DialogContentText>
          Score: {score2}</DialogContentText>: <></>
          }

          {round===3? 
            
          <DialogContentText>
          Score: {score3}</DialogContentText>: <></>
          }
        </DialogContent>
        <DialogActions>


          {round!==3 ?
        <Link to="/rehabilitator" state={{ round: round+1 }}>
            <Button variant='contained' sx={{marginBottom: '5%'}} onClick={()=> {
              setopenroundresults(false)
              setopen(true)
              inputEl.current.eraseAll();
            }} > Next Round  </Button>
        </Link> :
        <Button onClick={()=> setroundstatsdialog(true)}> Finish! </Button>
        }
        </DialogActions>
      </Dialog>

      <Dialog
        open={roundstatsdialog}
        onClose={() => setroundstatsdialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { `Appointment Finished` }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have successfully completed all rounds and finished the appointment. See how you performed below! 
          </DialogContentText>

          <DialogContentText id="alert-dialog-description">
          Round 1 score: {score1}
          </DialogContentText>

          <DialogContentText id="alert-dialog-description">
          Round 2 score: {score2}
          </DialogContentText>

          <DialogContentText id="alert-dialog-description">
          Round 3 score: {score3}
          </DialogContentText>

          <DialogContentText>
            Overall Score:  {Math.ceil((score1+score2+score3)/3)}
          </DialogContentText>

          <DialogContentText>
            Overall Accuray:  {Math.ceil((score1+score2+score3)/3)*10}%
          </DialogContentText>

{patientinfo.milestone < Math.ceil((score1+score2+score3)/3)? 
          <DialogContentText> 
            Milestone Achieved!!! Your milestone was {patientinfo.milestone}!
            New milestone set to {Math.ceil((score1+score2+score3)/3)}
          </DialogContentText>:

          <DialogContentText> 
          Couldn't achieve milestone. Better luck next time! Your milestone was {patientinfo.milestone}
          </DialogContentText>

} 
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="standard"
            placeholder = "Enter observation (Optional)"
            onChange= {(event) => {setobservation(event.target.value)}}
            value={observation}
          />
          <DialogContentText>{observation}</DialogContentText> 
        </DialogContent>
       
       <DialogActions>
        
        <Button onClick = {async() => {
          try{
            await axios.post('/doctor/postobservation', {patientid: appointmentDetail.value.patid, 
              appointmentId: appointmentDetail.value.aptid, 
              comment: observation
            }, {headers:{Authorization:usertoken}}).then(()=> {
                setobservation("")
            })
          }catch(error){
            console.log(error)
          }
          
        }}> Add Observation </Button> 
        <Link to="/docdashboard/appointments">
          <Button variant='contained' sx={{marginBottom: '5%'}} onClick={async()=>{
           try{
            await axios.post('/doctor/postscore', {
              guardianid: appointmentDetail.value.guardianid, 
              doctorid: user._id,
              patientid: appointmentDetail.value.patid,
              appointmentId: appointmentDetail.value.aptid,
              r1score:score1,
              r2score:score2,
              r3score:score3
            },{
              headers:{Authorization:usertoken}
          }).then(async()=>{
            if(patientinfo.milestone < Math.ceil((score1+score2+score3)/3)){
              await axios.patch('/doctor/setmilestone/'+ appointmentDetail.value.patid, 
              {milestone: Math.ceil((score1+score2+score3)/3)}, 
              {headers: {Authorization: usertoken}}
              )
            }
          })
          
           }catch(err){
             console.log(err.message)
           }
         }}> All done  </Button>
        </Link>
       </DialogActions>

      </Dialog>

    </Stack>




          <div id="capture">
        <CanvasDraw
          ref = {inputEl}
          enablePanAndZoom
          clampLinesToDocument
          gridColor="#ccc"
          //imgSrc="https://res.cloudinary.com/drimnkool/image/upload/v1652248543/Untitled_fpwnry.png" //round 1
          //imgSrc="https://res.cloudinary.com/drimnkool/image/upload/v1652248543/Untitled_fpwnry.png" //round 2
         //imgSrc="https://res.cloudinary.com/drimnkool/image/upload/v1652779663/r3org_s6sidu.png" //round 3
          imgSrc= {imgurl}
          canvasWidth={width}
          canvasHeight={height}
          //style={{border: '1px solid black'}}
          lazyRadius={lazyRadius}
          brushRadius = {borderRadius}
        />
        </div>



        </Box>
        </Container>
    </Page>        
    );
}