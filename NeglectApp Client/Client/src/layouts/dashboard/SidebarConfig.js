import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import patients from '@iconify/icons-eva/heart-outline';
import reviews from '@iconify/icons-eva/star-outline';
import user from '@iconify/icons-ant-design/profile'
import doctor from '@iconify/icons-ant-design/plus-circle-outline'
import bellFill from '@iconify/icons-eva/bell-fill';
import appointments from '@iconify/icons-ant-design/clock-circle-outline'
import report from '@iconify/icons-ant-design/file-done'
import detector from '@iconify/icons-ic/outline-draw'
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'patients',
    path: '/dashboard/patient',
    icon: getIcon(patients)
  },

  
  {
    title: 'reviews',
    path: '/dashboard/review',
    icon: getIcon(reviews)
  },

  {
    title: 'profile',
    path: '/dashboard/profile',
    icon: getIcon(user)
  }



  ,{
    title:"detector",
    path:'/detector',
    icon: getIcon(detector)
  }
,
{
  title: 'Doctors',
  path: '/dashboard/doctors',
  icon: getIcon(doctor)


},
{
  title: 'Requests',
  path: '/dashboard/docrequest',
  icon: getIcon(bellFill)
},

{
    title: "Appointment",
    path: '/dashboard/appointment',
    icon: getIcon(appointments)
  },
  
  {
    title:"Reports",
    path:'/dashboard/reportgenerator',
    icon: getIcon(report)
  }
];

export default sidebarConfig;
