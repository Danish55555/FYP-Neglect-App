import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Home from './pages/Home';
import ForgetPassword from './components/authentication/login/forgetPassword';
import ResetPassword from './components/authentication/login/Resetpassword';
import GuardianActivation from './components/authentication/register/GuardianActivation';
import DoctorActivation from './components/authentication/register/DoctorActivation';
import Profile from './pages/Profile';
import Review from './pages/Review';
import PatientInfo from './pages/PatientInfo';
import Patientprofile from './pages/patientprofile';
import Detector from './pages/Detector';
import NavTest from './pages/NavTest';
import DoctorPage from './pages/Doctor';
import Doctordetail from './pages/Doctordetail';
import DoctorRequest from './pages/Rehabrequest';
import Appointments from './pages/Appointments'
import ReportGenerator from './pages/ReportGenerator';
// ----------------------------------------------------------------------

export default function Router() {


  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        {path:'patient',element:<PatientInfo/>},
        { path: 'profile', element: <Profile />},
        {path: 'review', element: <Review />},
        {path:'patientprofile/:id',element:<Patientprofile />},{
          path:'doctors',element:<DoctorPage />
        },
        {
          path:'doctors/:id',element:<Doctordetail />
        }
        ,{
          path:'docrequest',element:<DoctorRequest/>
        },

        {
          path:'appointment',element:<Appointments/>
        },{
          path:'reportgenerator', element:<ReportGenerator/>
        }
      ]
    },


    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [

        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        {path: 'home', element: <Home />},
        {path: 'forgetpassword', element: <ForgetPassword />}, 
        {path:'user/reset/:id',element:< ResetPassword  />},  
        {path:'guardian/activate/:activation_token',element:< GuardianActivation  />},  
        {path:'doctor/activate/:activation_token',element:< DoctorActivation  />},    
        {path:'testnav',element:<NavTest />},
        {
          path:'detector',element:<Detector />
        },   
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/home" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
