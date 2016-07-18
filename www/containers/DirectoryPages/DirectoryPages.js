import React from 'react'
import {Link} from 'react-router'
import DirectoryPage from '../../containers/DirectoryPage'

const API_ROOT = 'http://clearviewcancer.com:3000'
const API_URLS = {
  doctors: API_ROOT + '/doctors/',
  doctorsSearch: API_ROOT + '/doctors/search/',
  hospitals: API_ROOT + '/hospitals/',
  hospitalsSearch: API_ROOT + '/hospitals/search/',
  pharmacies: API_ROOT + '/pharmacies/',
  pharmaciesSearch: API_ROOT + '/pharmacies/search/'
}

class HomePage extends React.Component {
  render () {
    return (
      <div className="page HomePage">
        <nav>
          <Link to="/doctors">Doctors</Link>
          <Link to="/hospitals">Hospitals</Link>
          <Link to="/pharmacies">Pharmacies</Link>
        </nav>
      </div>
    )
  }
}

class DoctorDirectoryPage extends React.Component {
  itemRenderer (doctor) {
    return (
      <div
        className="Results__ListItem Results__ListItem--doctor"
        key={doctor._id}>
        {doctor.LastName}, {doctor.FirstName}
      </div>
    )
  }
  render () {
    return (
      <DirectoryPage
        title="Doctors"
        icon="a"
        searchInstructions="Search by Name or Specialty"
        itemType="Doctor"
        itemTypePlural="Doctors"
        itemRenderer={::this.itemRenderer}
        getAllItemsUrl={API_URLS.doctors}
        searchItemsUrl={API_URLS.doctorsSearch}
        localStorageKey="doctors"
      />
    )
  }
}

class HospitalDirectoryPage extends React.Component {
  itemRenderer (hospital) {
    return (
      <div
        className="Results__ListItem Results__ListItem--hospital"
        key={hospital._id}>
        {hospital.Name} {hospital.City}
      </div>
    )
  }
  render () {
    return (
      <DirectoryPage
        title="Hospitals"
        icon="b"
        searchInstructions="Search by Name or Location"
        itemType="Hospital"
        itemTypePlural="Hospitals"
        itemRenderer={::this.itemRenderer}
        getAllItemsUrl={API_URLS.hospitals}
        searchItemsUrl={API_URLS.hospitalsSearch}
        localStorageKey="hospitals"
      />
    )
  }
}

class PharmacyDirectoryPage extends React.Component {
  itemRenderer (pharmacy) {
    return (
      <div
        className="Results__ListItem Results__ListItem--hospital"
        key={pharmacy._id}>
        {pharmacy.Name} {pharmacy.City}
      </div>
    )
  }
  render () {
    return (
      <DirectoryPage
        title="Pharmacies"
        icon="c"
        searchInstructions="Search by Name or Location"
        itemType="Pharmacy"
        itemTypePlural="Pharmacies"
        itemRenderer={::this.itemRenderer}
        getAllItemsUrl={API_URLS.pharmacies}
        searchItemsUrl={API_URLS.pharmaciesSearch}
        localStorageKey="pharmacies"
      />
    )
  }
}

export {
  HomePage,
  DoctorDirectoryPage,
  HospitalDirectoryPage,
  PharmacyDirectoryPage
}
