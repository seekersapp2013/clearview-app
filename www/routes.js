import App from './containers/App'
import HomePage from './containers/HomePage'
import AppointmentPage from './containers/AppointmentPage'
import ErrorReportPage from './containers/ErrorReportPage'
import DoctorDetailPage from './containers/DoctorDetailPage'
import {
  DoctorDirectoryPage,
  HospitalDirectoryPage,
  IndividualHospitalDirectoryPage,
  PharmacyDirectoryPage
} from './containers/DirectoryPages'

export default([
  {
    path: '/',
    component: App,
    indexRoute: {component: HomePage},
    childRoutes: [
      {path: '/doctors', component: DoctorDirectoryPage},
      {path: '/doctors/:item', component: DoctorDetailPage},
      {path: '/hospitals', component: HospitalDirectoryPage},
      {path: '/hospitals/:item', component: IndividualHospitalDirectoryPage},
      {path: '/pharmacies', component: PharmacyDirectoryPage}
    ]
  },
  {
    path: '/appointment',
    component: AppointmentPage
  },
  {
    path: '/error/:item',
    component: ErrorReportPage
  }
])
