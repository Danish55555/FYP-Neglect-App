import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import faq from '@iconify/icons-eva/question-mark-circle-outline'
import announce from '@iconify/icons-eva/mic-outline';
import gallery from '@iconify/icons-eva/camera-outline'
import money from '@iconify/icons-eva/credit-card-outline'
import account from '@iconify/icons-ant-design/profile'

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'doctors',
    path: '/dashboard/doctor',
    icon: getIcon(peopleFill)
  },
  {
    title: 'guardians',
    path: '/dashboard/guardian',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Detector Images', 
    path: '/dashboard/detectorimages',
    icon: getIcon(gallery)
  },
  {
    title: 'Rehabilitator Images', 
    path: '/dashboard/rehabimgs',
    icon: getIcon(gallery)
  },
  {
    title: 'profile',
    path: '/dashboard/profile',
    icon: getIcon(account)
  },
  {
    title: 'FAQ', 
    path: '/dashboard/faq',
    icon: getIcon(faq)
  },
  {
    title: 'Announcements', 
    path: '/dashboard/announcements',
    icon: getIcon(announce)
  },
  {
    title: 'Payment Plans', 
    path: '/dashboard/paymentplans',
    icon: getIcon(money)
  },
  {
    title: 'Payments Verification', 
    path: '/dashboard/paymentsverification',
    icon: getIcon(money)
  },
  {
    title: 'Report',
    path: '/dashboard/report',
    icon: getIcon(money)
  },
  
];

export default sidebarConfig;
