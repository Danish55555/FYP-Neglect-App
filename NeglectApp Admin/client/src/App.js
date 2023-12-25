// routes
import Router from './routes';
import React, {useEffect} from 'react'
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import {dispatchLogin, fetchAdmin, dispatchGetAdmin} from './redux/actions/authAction'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)

  useEffect(()=>{
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async() =>{
        const res = await axios.post('/admin/refresh_token', null)
        console.log(res)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  }, [auth.isLogged, dispatch])

  useEffect(()=>{
    if(token){
      const getAdmin = () => {
        dispatch(dispatchLogin())

        return fetchAdmin(token).then(res=>{
          dispatch(dispatchGetAdmin(res))
        })
      }
      getAdmin()
    }
  }, [token, dispatch])

  useEffect(()=>{
    axios.get('/admin/totalusers').then((response) => {
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
      <Router />
    </ThemeConfig>
  );
}
