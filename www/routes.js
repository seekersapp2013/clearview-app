import App from './containers/App'
import {HomePage, DoctorPage, HospitalPage, PharmacyPage} from './containers/Pages'
export default([
  {
    path: '/',
    component: App,
    indexRoute: {component: HomePage},
    childRoutes: [
      {path: '/doctors', component: DoctorPage},
      {path: '/hospitals', component: HospitalPage},
      {path: '/pharmacies', component: PharmacyPage}
    ]
  }
])
