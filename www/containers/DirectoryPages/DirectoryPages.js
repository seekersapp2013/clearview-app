import React from 'react'
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

class DoctorDirectoryPage extends React.Component {
  itemRenderer (doctor) {
    let itemLink = '#/doctors/' + encodeURIComponent(JSON.stringify(doctor))
    return (
      <div
        className="Results__ListItem Results__ListItem--doctor"
        key={doctor._id}>
        <a href={itemLink}>
          {doctor.LastName}, {doctor.FirstName}
        </a>
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
    let itemLink = '#/hospitals/' + encodeURIComponent(JSON.stringify(hospital))
    return (
      <div
        className="Results__ListItem Results__ListItem--hospital"
        key={hospital._id}>
        <a href={itemLink}>
          {hospital.Name} {hospital.City}
        </a>
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

class IndividualHospitalDirectoryPage extends React.Component {
  renderItem (item) {
    return (
      <div>
        {item.Name}
        {item.City}
        {item.State}
      </div>
    )
  }

  render () {
    const item = JSON.parse(decodeURIComponent(this.props.params.item))
    let title = item.Name + ' Phone Directory'
    return (
      <DirectoryPage
        title={title}
        icon="a"
        searchInstructions="Search By Room/Office Name"
        itemType="Contact"
        itemTypePlural="Contacts"
        itemRenderer={::this.renderItem}
        getAllItemsUrl="http://does.not.apply"
        searchItemsUrl="http://does.not.apply"
        localStorageKey="hospitals"
        items={item.Directory}
      />
    )
  }
}

IndividualHospitalDirectoryPage.propTypes = {
  params: React.PropTypes.object.isRequired
}

class PharmacyDirectoryPage extends React.Component {
  itemRenderer (pharmacy) {
    let itemLink = '#/pharmacies/' + encodeURIComponent(JSON.stringify(pharmacy))
    return (
      <div
        className="Results__ListItem Results__ListItem--hospital"
        key={pharmacy._id}>
        <a href={itemLink}>
          {pharmacy.Name} {pharmacy.City}
        </a>
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
  DoctorDirectoryPage,
  HospitalDirectoryPage,
  IndividualHospitalDirectoryPage,
  PharmacyDirectoryPage
}
