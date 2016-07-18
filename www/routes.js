import App from './containers/App'
import AppointmentPage from './containers/AppointmentPage'
import {
  HomePage,
  DoctorDirectoryPage,
  HospitalDirectoryPage,
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
      {path: '/doctors/:id', component: DoctorDetailPage},
      {path: '/hospitals', component: HospitalDirectoryPage},
      {path: '/hospitals/:id', component: HospitalDetailPage},
      {path: '/pharmacies', component: PharmacyDirectoryPage},
      {path: '/pharmacies/:id', component: PharmacyDetailPage}
    ]
  },
  {
    path: '/appointment',
    component: AppointmentPage
  }
])
