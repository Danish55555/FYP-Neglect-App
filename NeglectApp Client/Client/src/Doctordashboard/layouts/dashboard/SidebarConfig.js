import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
// import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
// import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import rounds from '@iconify/icons-ant-design/play-circle-outline'
import appointments from '@iconify/icons-ant-design/clock-circle-outline'
import payments from '@iconify/icons-eva/credit-card-outline'
import report from '@iconify/icons-ant-design/file-done'
import bellFill from '@iconify/icons-eva/bell-fill';
import queries from '@iconify/icons-ant-design/question-circle-outline'
import reviews from '@iconify/icons-eva/star-outline';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/docdashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  
  {
    title: 'profile',
    path: '/docdashboard/profile',
    icon: getIcon(fileTextFill)
  },


  {
    title: 'review',
    path:  '/docdashboard/review',
    icon: getIcon(reviews)
  },

{
  title:'Requests',
  path:'/docdashboard/request',
  icon: getIcon(bellFill)

}
,
{
  title:'Queries',
  path:'/docdashboard/query',
  icon: getIcon(queries)

}
,{
  title:'Payments',
  path:'/docdashboard/payments',
  icon: getIcon(payments)

}



,{
  title:'Reports',
  path:'/docdashboard/reports',
  icon: getIcon(report)

}
  ,
  {
    title:'Appointments',
    path:'/docdashboard/appointments',
    icon: getIcon(appointments)
  

  }
,
{
  title:'Rounds',
  path:'/docdashboard/rounds',
  icon: getIcon(rounds)

}




 
];

export default sidebarConfig;
