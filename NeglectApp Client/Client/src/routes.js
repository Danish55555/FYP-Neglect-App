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
import DoctorDashboardLayout from './Doctordashboard/layouts/dashboard';
import DoctorDashboardApp from './Doctordashboard/pages/DashboardApp';
import DoctorProducts from './Doctordashboard/pages/Products';
import DoctorBlog from './Doctordashboard/pages/Blog';
import DoctorUser from './Doctordashboard/pages/User';
import Profile from './pages/Profile';
import DoctorProfile from './Doctordashboard/pages/Profile';
// import Testimg from './pages/testimage';
import Review from './pages/Review';
import DocReview from './Doctordashboard/pages/Review';
import PatientInfo from './pages/PatientInfo';



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
        {path: 'review', element: <Review />}
      ]
    },


    {
      path: '/docdashboard',
      element: <DoctorDashboardLayout />,
      children: [
        { element: <Navigate to="/docdashboard/app" replace /> },
        { path: 'app', element: <DoctorDashboardApp /> },
        { path: 'user', element: <DoctorUser /> },
        { path: 'products', element: <DoctorProducts /> },
        { path: 'blog', element: <DoctorBlog /> },
        { path: 'profile', element: <DoctorProfile />},
        { path: 'review', element: <DocReview />}
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
           
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/home" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },










    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
