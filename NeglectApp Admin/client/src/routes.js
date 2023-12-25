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
import Doctor from './pages/Doctor';
import Guardian from './pages/Guardian';
import Faq from './pages/Faq';
import Announcements from './pages/Announcement';
import DetectorImages from './pages/DetectorImgs'; 
import PaymentPlans from './pages/PaymentPlans'
import Profile from './pages/Profile'
import NotFound from './pages/Page404';
import RehabilitatorImgs from './pages/RehabilitatorImgs';
import Payments from './pages/Payments'
import Report from './pages/Report'


// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'doctor', element: <Doctor /> },
        { path: 'guardian', element: <Guardian />},
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'faq', element: <Faq /> },
        { path: 'announcements', element: <Announcements /> },
        { path: 'detectorimages', element: <DetectorImages /> },
        { path: 'paymentplans', element: <PaymentPlans /> },
        { path: 'profile', element: <Profile /> },
        { path: 'rehabimgs', element: <RehabilitatorImgs /> },
        { path: 'paymentsverification', element: <Payments /> },
        { path: 'report', element: <Report /> }
        
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { element: <Navigate to="/login" replace /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
