import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
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
import DoctorProfile from './Doctordashboard/pages/Profile';
import DocReview from './Doctordashboard/pages/Review';
import NavTest from './pages/NavTest';
import RehabRequest from './Doctordashboard/pages/Requesthandler';
import Queryhandler from './Doctordashboard/pages/Queryhandler';
import Queryreply from './Doctordashboard/pages/queryReply';
import PaymentHistory from './Doctordashboard/pages/Payments'
import Appointments from './Doctordashboard/pages/Appointments'
import ReportandMilestone from './Doctordashboard/pages/ReportandMilestone';
import Rounds from './Doctordashboard/pages/Rounds';
import Rehabilitator from './Doctordashboard/pages/Rehabilitator';
// ----------------------------------------------------------------------

export default function Router() {


  return useRoutes([

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
        { path: 'review', element: <DocReview />},{
          path:'request',element:<RehabRequest />
        },
        { path: 'payments', element: <PaymentHistory /> },
        {path:'query',element:<Queryhandler/>},
        {path:'queryreply/:id',element:<Queryreply/>},
        { path: 'appointments', element: <Appointments />},
        { path: 'reports', element: <ReportandMilestone />},
        { path: 'rounds', element: <Rounds />},
        
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
        {path: 'rehabilitator', element: <Rehabilitator /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/home" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },










    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
