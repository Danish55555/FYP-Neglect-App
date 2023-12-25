import React, { useEffect, useState } from 'react';

// material
import { Grid, Button, Container, Stack, Typography,Box } from '@mui/material';
// components
import Page from '../components/Page';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import axios from 'axios';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


// ----------------------------------------------------------------------







// ----------------------------------------------------------------------

export default function ReportGenerator() {
    const token=useSelector(state=>state.token)
    const auth = useSelector(state => state.auth)  
    const {user} = auth;
    

const [statList,setstatList]=useState([]);
const [scorearr,setscorearr]=useState([]);
const [apptlabel,setapptlabel]=useState([]);
const [options,setoptions]=useState({})
const [series,setseries]=useState([]);
const [mypatients,setmypatients]=useState([]);
const [selectedpatstat,setselectedtpatstat]=useState([]);
const [selectedoption,setselectedoption]=useState({})
const [selectedseries,setselectedseries]=useState([]);
const [selectedname,setselctedname]=useState('');

    useEffect(()=>{
        
        axios.get("/guardian/getstats",{
          headers:{Authorization:token}
      }).then((response) => {
        setstatList(response.data.allStats)
       console.log(response.data.allStats);
      





       var arr=[];
       var arr2=[]
       response.data.allStats.map((obj,index)=>{

           arr.push(parseFloat(((obj.r1score+obj.r2score+obj.r3score)/3).toFixed(2)));
           arr2.push('appt'+(index+1))

       })

       setscorearr(arr);



       
setseries([{name:"Score",
data: arr

}])



setoptions( {
chart: {
height: 350,
type: 'line',
zoom: {
enabled: false
}
},
dataLabels: {
enabled: false
},
stroke: {
curve: 'straight'
},
title: {
text: 'Generic Trend of Scores by appointment',
align: 'left'
},
grid: {
row: {
colors: ['#FFC0CB', 'transparent'], // takes an array which will be repeated on columns
opacity: 0.5
},
},
xaxis: {
categories: arr2,
}
})

getPatients()


      })
      .catch(err=>console.log(err))
      },[token])
      
const getPatients=()=>{
axios.get('/guardian/myrehabpatients/'+user._id,{
    headers:{Authorization:token}
}).then((response) => {
 setmypatients(response.data);



})

}

function getPatientStats(id,patname){
    const specificpatstats=statList.filter(obj=> {return obj.patientid._id==id});
    if(specificpatstats.length<1){alert('No Stats record for this patient')
    return;}
    setselctedname(specificpatstats[0].patientid.name)
    var arr=[];
    var arr2=[]
specificpatstats.map((obj,index)=>{

    arr.push(parseFloat(((obj.r1score+obj.r2score+obj.r3score)/3).toFixed(2)));
    arr2.push('appt'+(index+1))

})
setselectedseries([{name:"Score",
data: arr

}]
)
setselectedoption( {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: `Generic Trend of Patient`,
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#FFC0CB', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: arr2,
    }
  })
  



}

  return (
    <Page title="Dashboard: Report | Neglect App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Rehabilitation Report
          </Typography>
         

        </Stack>
{statList.length>0? <div id="chart">
  <ReactApexChart options={options} series={series} type="line" height={350} />
{ statList.length>0 && mypatients.length>0?


<div className="helo">
<Box sx={{ mt:5,ml:2 }}>
    <Typography>Select Patient to show report</Typography>
      
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
  
        {mypatients.map((pat,keyi)=>{
  
          return(
  <ListItem key={keyi}>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={pat.patientid.name} secondary={pat.patientid.address} />
          <AddCircleOutlineIcon 
          onClick={()=>{
        getPatientStats(pat.patientid._id,pat.patientid.name)
        }}
          />
        </ListItem>
  
          )
        })}
        
  </List>      

  
 
  {/* <Typography variant="h4">Current Milestone: {selectedpat.patientid.milestone}</Typography> */}
  
      </Box>
      
      </div>

:<Typography>Not find</Typography>}







</div>:<Typography>No record Exist</Typography>}




{selectedname==''?"":

<div>
<Typography>Report for {selectedname}</Typography>
<ReactApexChart options={selectedoption} series={selectedseries} type="line" height={350} />

</div>
}
    








      </Container>
    </Page>
  );
}
