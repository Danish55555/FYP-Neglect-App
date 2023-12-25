import React,{useState,useEffect} from 'react';
// material
import {

  Container,
Typography, Box
} from '@mui/material';

import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

import Page from '../components/Page';
import axios from 'axios';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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
export default function ReportandMilestone() {
    const token = useSelector(state=> state.token)
    const auth=useSelector(state=>state.auth);
    const {user}=auth;



const [allstats,setallStats]=useState([]);
const [scorearr,setscorearr]=useState([]);
const [apptlabel,setapptlabel]=useState([]);
const [options,setoptions]=useState({})
const [series,setseries]=useState([]);
const [selectedpatientStats,setselectedSpatienttats]=useState([]);
const [message,setmessage]=useState('Select Patient Firstly');
const [doctorspatients,setdoctorpatients]=useState([])
const [selectedoption,setselectedoption]=useState({});
const [selectedseries,setselectedseries]=useState([]);
const [selectedname,setselectedname]=useState('hehe');
const [selectedpat,setselectedpat]=useState('');




useEffect(()=>{
    axios.get('/doctor/getstatistics',{
        headers: {Authorization: token}
    }).then((response) => {
        setallStats(response.data.allStats);
     
        var arr=[];
        var arr2=[]
        response.data.allStats.map((obj,index)=>{

            arr.push(parseFloat(((obj.r1score+obj.r2score+obj.r3score)/3).toFixed(2)));
            arr2.push('appt'+(index+1))

        })

        setscorearr(arr);
       



//         setoptions( {
//             chart: {
//               id: "basic-bar"
//             },
//             xaxis: {
//               categories: arr2
//             }
//           })


// setseries( [
//     {
//       name: "series-1",
//       data: arr
//     }
//   ])




//   series: [{
//     name: "Desktops",
//     data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
// }],
// setoptions: {
//   chart: {
//     height: 350,
//     type: 'line',
//     zoom: {
//       enabled: false
//     }
//   },
//   dataLabels: {
//     enabled: false
//   },
//   stroke: {
//     curve: 'straight'
//   },
//   title: {
//     text: 'Product Trends by Month',
//     align: 'left'
//   },
//   grid: {
//     row: {
//       colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
//       opacity: 0.5
//     },
//   },
//   xaxis: {
//     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
//   }
// },


// };
// }


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








  axios.get(`/doctor/myrehabpatients/${user._id}`,{
    headers: {Authorization: token}
}).then((response) => {
setdoctorpatients(response.data)

})



// const arrnew=(response.data.allStats.filter(obj=>{return obj.doctorid._id==user._id}));
// console.log(arrnew)

      })
},[token])


const getselectedstats=(id,name)=>{


const specificpatstats=allstats.filter(obj=> {return obj.patientid._id==id});
if(specificpatstats.length<1){alert('No Stats record for this patient')
return;}
setselectedpat(specificpatstats[0]);
console.log(specificpatstats)
setselectedSpatienttats(specificpatstats);
var arr=[];
var arr2=[]
specificpatstats.map((obj,index)=>{

    arr.push(parseFloat(((obj.r1score+obj.r2score+obj.r3score)/3).toFixed(2)));
    arr2.push('appt'+(index+1))

})

setselectedseries([{name:"Score",
                data: arr

}])





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




setselectedname(name)




}





  return (
    <Page title="Report and Milestone | Neglect App">
      <Container>
<Typography variant="h5">Patients Report and Milestone</Typography>


<div id="chart">
  <ReactApexChart options={options} series={series} type="line" height={350} />
</div>
<Typography variant="h5">Patient Report and Trend Panel- Select Patient</Typography>



<Box sx={{ maxWidth: 220, mt:5,ml:2 }}>
      
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

      {doctorspatients.map((pat,keyi)=>{

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
          
          
          getselectedstats(pat.patientid._id,pat.patientid.name)}}
        
        />
      </ListItem>

        )
      })}
      
</List>      
    </Box>


    {selectedpatientStats.length>0 ? <div id="chart">
     <Typography sx={{ml:2}}>Report of {selectedname}</Typography> 
  <ReactApexChart options={selectedoption} series={selectedseries} type="line" height={350} />
  <Typography variant="h4">Current Milestone: {selectedpat.patientid.milestone}</Typography>
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Appt</StyledTableCell>
            <StyledTableCell align="right">Score out of 10</StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedpatientStats.map((row,index) => (
            <StyledTableRow key={index} >
              <StyledTableCell component="th" scope="row">
                {"Appointment"}{index+1}
              </StyledTableCell>
              <StyledTableCell align="right">{parseFloat((row.r1score+row.r2score+row.r3score)/3).toFixed(2)+""}</StyledTableCell>
        
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>



  
</div>
:<Typography>{message}</Typography>

}
  



 









      </Container>
    </Page>
  );
}