import React,{useEffect} from 'react';
// routes
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchLogin,fetchUser,dispatchGetUser } from './redux/actions/authAction';
import axios from 'axios';
import Guardianroutes from './guardianroutes';
import Doctorroutes from './doctorroutes';
// ----------------------------------------------------------------------
import Testroute from './testroute';
export default function App() {



  const dispatch=useDispatch();
  const token=useSelector(state=>state.token)
  const auth=useSelector(state=>state.auth)
  const {user}=auth;
  
  useEffect(
    ()=>{

      const firstLogin=localStorage.getItem('firstLogin');
      if(firstLogin){
        const getToken=async()=>{
          const res=await axios.post('/user/refresh_token',null)
          
          dispatch({type:'GET_TOKEN', payload:res.data.access_token})
        }
        getToken()
      }


    },[auth.isLogged, dispatch]
    )
useEffect(
  ()=>{
            if(token){
              const getUser=()=>{
                    dispatch(dispatchLogin())
                    return fetchUser(token).then(res =>{
                      dispatch(dispatchGetUser(res))
                    })
              }
              getUser()

            }
  },[token, dispatch]
)





useEffect(()=>{
  axios.get('/user/totalusers').then((response) => {
  // setTotalUsers(response.data.totalUsers.length)
  //console.log(response.data.patients);
  console.log(response.data.totalUsers.length)
  const countdoctors = (response.data.totalUsers.filter(obj => obj.role==2).length)
  const countpatients = (response.data.totalUsers.filter(obj => obj.role==1).length)
  
  dispatch({payLoad: {totalUsers:response.data.totalUsers.length, totalDoctors: countdoctors, totalPatients: countpatients
    },type:'STATS'})
})
.catch(err=>console.log(err))

  },[]);















  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      {auth.isLogged&& user.role===1 ? <Guardianroutes />:''}
      {auth.isLogged&& user.role===2 ? <Doctorroutes />:''}
      {!auth.isLogged? <Testroute />:''}

    </ThemeConfig>
  );
}
