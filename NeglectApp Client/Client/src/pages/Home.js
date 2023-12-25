import React,{useState, useEffect} from "react";
import bgimage from '../Images/showcase.svg'
import neglectimage from '../Images/Visual-neglect-015.jpg'
//import communitypic from "../Images/community_small.jpg"
import { Link } from "react-router-dom";
import Navbar from './NavTest';
// import Homestyle from './Homepage.module.css'
// import Nav from '../Navbar/Nav'
import './homestyle.css'
import { Container,Typography,Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'
function Home(){
  const [faq, setfaq]= useState([])
  const [expanded, setExpanded] =useState(false);
  


  useEffect(()=>{
    axios.get('/doctor/faq').then((response)=>{
      setfaq(response.data)
      console.log(response.data)
    })
  }, [])

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

 

    return(
    <div >
<Navbar />


<Box sx={{p:5}}>
      <Container>
        <Grid container 
      sx={{ display: 'flex',justifyContent:'space-between',alignItems:'center' }}
>
          <Grid item sx={{p:5}}
          xs={12}
          sm={12}
          md={6}
          
          >
            <h2>Platform for <span style={{color:"#00AB55",fontWeight:"bold"}}>Spatial Neglect</span> </h2>
            <Typography>
            We provide a Platform for Spatial Neglect Patient and Doctor to detect and rehabilitate disorder in efficient way without too much effort.         </Typography>
            <Typography sx={{mt:3}}>
            Meet the expert Doctors and get rehabilitated, Dont lose hope. We welcome you to first digital Platform for Spatial Neglect.
            </Typography>
            <Link to='/register'>
            <Button variant="contained"
            sx={{mt:4}}
            >
            lets start
            </Button></Link>
          </Grid>
          <Grid item xs={12} sm={12} md={6} 
          sx={{p:4}}
          
          >
            <img src={bgimage} 
            
            alt="sf" />
          </Grid>
        </Grid>
      </Container>
    </Box>



<section className="featurehead" style={{  padding: '3rem',textAlign:"center"}}>
  <h1 style={{  fontSize: '3rem',
  fontWeight: '700',
  lineHeight: '4rem'}}>Great platform. Great features.</h1>
  <p className="lead"
  style={{  maxWidth: '32rem',
    margin: 'auto',
    lineHeight: '1.7rem',
    fontWeight: '300'}}
  
  >We have an efficient platform for spaital neglect. Below are only our favorite features, but it can do much, much more!
  </p>
</section>
<section>

<div 
style={{

  width: '100%',
  margin: '4rem auto',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '5.6rem',
  justifyContent:' center'


}}


>
    <div 
    style={{

      position: 'relative',
      width: '18rem',
      padding: '2.3rem',
      backgroundColor: 'rgb(240, 242, 244)', 
      borderRadius: '2.3rem'

    }}
    >
      <h3 
      
      style={{
        position: 'relative',
        top: '-17%',
        left: '50%',
        transform: 'translate(-50%)',
        fontWeight: '700',
        color: 'rgb(255, 255, 255)',
        padding: '0.625rem 2.75rem',
        borderRadius: '3.125rem',

        backgroundColor: 'rgb(235, 143, 96)',
        boxShadow: '0 .25em 1.3125em 0 rgb(235, 143, 96)',textAlign:"center"



      }}
      
      
      >Detector</h3>
      <p>            Neglect Detector is Free tool for Spatial neglect detection. Guardians need to let patient to perform detection activity.
      </p>
    </div>
    <div
    
    style={{

      position: 'relative',
      width: '18rem',
      padding: '2.3rem',
      backgroundColor: 'rgb(240, 242, 244)', 
      borderRadius: '2.3rem'

    }}
    
    >
      <h3  
      style={{
        position: 'relative',
        top: '-17%',
        left: '50%',
        transform: 'translate(-50%)',
        fontWeight: '700',
        color: 'rgb(255, 255, 255)',
        padding: '0.625rem 2.75rem',
        borderRadius: '3.125rem',

        backgroundColor: 'rgb(235, 143, 96)',
        boxShadow: '0 .25em 1.3125em 0 rgb(235, 143, 96)'
        ,textAlign:"center"


      }}
      
      >Rehabilitator</h3>
      <p>Neglect Rehabilitator is rehabilitation platform where performance and improvement of Patient will be measured
      </p>
    </div>
    <div 
    style={{

      position: 'relative',
      width: '18rem',
      padding: '2.3rem',
      backgroundColor: 'rgb(240, 242, 244)', 
      borderRadius: '2.3rem'

    }}
    
    
    
    >
      <h3 
      
      style={{
        position: 'relative',
        top: '-17%',
        left: '50%',
        transform: 'translate(-50%)',
        fontWeight: '700',
        color: 'rgb(255, 255, 255)',
        padding: '0.625rem 2.75rem',
        borderRadius: '3.125rem',

        backgroundColor: 'rgb(235, 143, 96)',
        boxShadow: '0 .25em 1.3125em 0 rgb(235, 143, 96)'
        ,textAlign:"center"


      }}
      
      >Analysis</h3>
      <p>Graphical analysis allows doctor to easily keep track of patient improvement and helps in Decision making.
      </p>
    </div>



    <div 
    style={{

      position: 'relative',
      width: '18rem',
      padding: '2.3rem',
      backgroundColor: 'rgb(240, 242, 244)', 
      borderRadius: '2.3rem'

    }}
    
    
    
    >
      <h3 
      
      style={{
        position: 'relative',
        top: '-17%',
        left: '50%',
        transform: 'translate(-50%)',
        fontWeight: '700',
        color: 'rgb(255, 255, 255)',
        padding: '0.625rem 2.75rem',
        borderRadius: '3.125rem',

        backgroundColor: 'rgb(235, 143, 96)',
        boxShadow: '0 .25em 1.3125em 0 rgb(235, 143, 96)'
        ,textAlign:"center"


      }}
      
      >Community</h3>
      <p>We are building Neglect Community where doctors, patients and Guardians can work efficiently.
      </p>
    </div>
    <div 
    style={{

      position: 'relative',
      width: '18rem',
      padding: '2.3rem',
      backgroundColor: 'rgb(240, 242, 244)', 
      borderRadius: '2.3rem'

    }}
    
    
    
    >
      <h3 
      
      style={{
        position: 'relative',
        top: '-17%',
        left: '50%',
        transform: 'translate(-50%)',
        fontWeight: '700',
        color: 'rgb(255, 255, 255)',
        padding: '0.625rem 2.75rem',
        borderRadius: '3.125rem',

        backgroundColor: 'rgb(235, 143, 96)',
        boxShadow: '0 .25em 1.3125em 0 rgb(235, 143, 96)'
        ,textAlign:"center"


      }}
      
      >Simple</h3>
      <p>Neglect App is simple with alot of guidance available for every step. Just you need to focus on goal.
      </p>
    </div>

    <div 
    style={{

      position: 'relative',
      width: '18rem',
      padding: '2.3rem',
      backgroundColor: 'rgb(240, 242, 244)', 
      borderRadius: '2.3rem'

    }}
    
    
    
    >
      <h3 
      
      style={{
        position: 'relative',
        top: '-17%',
        left: '50%',
        transform: 'translate(-50%)',
        fontWeight: '700',
        color: 'rgb(255, 255, 255)',
        padding: '0.625rem 2.75rem',
        borderRadius: '3.125rem',

        backgroundColor: 'rgb(235, 143, 96)',
        boxShadow: '0 .25em 1.3125em 0 rgb(235, 143, 96)'
        ,textAlign:"center"


      }}
      
      >Affordable</h3>
      <p>Doctor charges for using Neglect app are minimal and we provide a secure way to pay for services.
      </p>
    </div>    
  </div>
</section>


<Box sx={{p:5}}>
      <Container>
        <Grid container 
      sx={{ display: 'flex',justifyContent:'space-between',alignItems:'center' }}
>
          
          <Grid item xs={12} sm={12} md={6} 
          sx={{p:4}}
          
          >
            <img src={neglectimage} 
            
            alt="sf" />
          </Grid>

          <Grid item sx={{p:5}}
          xs={12}
          sm={12}
          md={6}
          >
            <h2>What is Spatial Neglect</h2>
            <Typography>
            Spatial neglect is a behavioral syndrome occurring after brain injury. Spatial neglect is defined as pathologically asymmetric spatial behavior, caused by a brain lesion and resulting in disability
            </Typography>
            <Typography sx={{mt:3}}>
            Spatial neglect is defined as a failure to report, respond, or orient to stimuli in contralesional space after brain injury that is not explained by primary sensory or motor deficits 
            </Typography>
            <Button variant="contained"
            sx={{mt:4}}
            >
            Read More
            </Button>
          </Grid>

        </Grid>
      </Container>
    </Box> 
    <section className="featurehead" style={{  padding: '3rem',textAlign:"center"}}>
  <h1 style={{  fontSize: '3rem',
  fontWeight: '700',
  lineHeight: '4rem'}}>Frequently Asked Questions</h1>
  <p className="lead"
  style={{  maxWidth: '32rem',
    margin: 'auto',
    lineHeight: '1.7rem',
    fontWeight: '300'}}
  
  >These are some popular Questions and Information you need to know about us. We are here to listen you.
  </p>
</section>



    <Box sx={{p:5}}>
      <Container>
        <Grid container 
      sx={{ display: 'flex',justifyContent:'space-between',alignItems:'center' }}
>
          
          <Grid item xs={12} 
          sx={{p:4}}
          
          >
 <div>
   {faq.map((fq, keys) => (
     <Accordion 
     
     key={keys}
     
     expanded={expanded == keys} onChange={handleChange(keys) 
     }>
     <AccordionSummary
       expandIcon={<ExpandMoreIcon />}
       aria-controls="panel1bh-content"
       id="panel1bh-header"
     >
       <Typography sx={{ width: '33%', flexShrink: 0 }}>
       {fq.question}
       </Typography>
       <Typography sx={{ color: 'text.secondary' }}></Typography>
     </AccordionSummary>
     <AccordionDetails>
       <Typography>
         {fq.answer}
       </Typography>
     </AccordionDetails>
   </Accordion>
   ))
   }
      
   
    </div>
            
          </Grid>

        </Grid>
      </Container>
    </Box> 










    </div>);
  }
  export default Home