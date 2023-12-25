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
export default function ReportandMilestone() {
    const token = useSelector(state=> state.token)
    const auth=useSelector(state=>state.auth);
    const {user}=auth;



const [allstats,setallStats]=useState([]);
const [scorearr,setscorearr]=useState([]);
const [options,setoptions]=useState({})
const [series,setseries]=useState([]);




useEffect(()=>{
    axios.get('/admin/getstatistics',{
        headers: {Authorization: token}
    }).then((response) => {
        setallStats(response.data.allStats);
        console.log(response.data.allStats)
     
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

      })
},[token])


  return (
    <Page title="Report and Milestone | Neglect App">
      <Container>
<Typography variant="h5">Patients Report and Milestone</Typography>


<div id="chart">
  <ReactApexChart options={options} series={series} type="line" height={350} />
</div>


      </Container>
    </Page>
  );
}