import App from './containers/App'
import HomePage from './containers/HomePage'
import AppointmentPage from './containers/AppointmentPage'
import {
  DoctorDirectoryPage,
  HospitalDirectoryPage,
  IndividualHospitalDirectoryPage,
  PharmacyDirectoryPage
} from './containers/DirectoryPages'
import {
  DoctorDetailPage,
  HospitalDetailPage,
  PharmacyDetailPage
} from './containers/DetailPages'

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
      {path: '/hospitals/detail/:item', component: HospitalDetailPage},
      {path: '/pharmacies', component: PharmacyDirectoryPage},
      {path: '/pharmacies/:item', component: PharmacyDetailPage}
    ]
  },
  {
    path: '/appointment',
    component: AppointmentPage
  }
])
