import App from './components/App'
import HomePage from './containers/HomePage'
import DoctorSearchPage from './containers/DoctorSearchPage'
import HospitalSearchPage from './containers/HospitalSearchPage'
import PharmacySearchPage from './containers/PharmacySearchPage'

export default([
  {
    path: '/',
    component: App,
    indexRoute: {component: HomePage},
    childRoutes: [
      {path: '/doctors', component: DoctorSearchPage},
      {path: '/hospitals', component: HospitalSearchPage},
      {path: '/pharmacies', component: PharmacySearchPage}
    ]
  }
])
