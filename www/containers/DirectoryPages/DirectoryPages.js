import React from 'react'
import DirectoryPage from '../../containers/DirectoryPage'
import DoctorListItem from '../../components/DoctorListItem'
import HospitalListItem from '../../components/HospitalListItem'
import PharmacyListItem from '../../components/PharmacyListItem'
import HospitalDirectoryListItem from '../../components/HospitalDirectoryListItem'

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
  itemRenderer (doctor, index) {
    return (
      <DoctorListItem doctor={doctor} index={index} />
    )
  }
  render () {
    return (
      <DirectoryPage
        title="Doctors"
        icon="a"
        searchInstructions="Search by Name, Specialty, or Practice"
        itemType="Doctor"
        itemTypePlural="Doctors"
        itemRenderer={::this.itemRenderer}
        itemHeight={165}
        rowHeight={165}
        getAllItemsUrl={API_URLS.doctors}
        searchItemsUrl={API_URLS.doctorsSearch}
        localStorageKey="doctors"
      />
    )
  }
}

class HospitalDirectoryPage extends React.Component {
  itemRenderer (hospital, index) {
    return (
      <HospitalListItem hospital={hospital} index={index} />
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
        itemHeight={165}
        rowHeight={165}
        getAllItemsUrl={API_URLS.hospitals}
        searchItemsUrl={API_URLS.hospitalsSearch}
        localStorageKey="hospitals"
      />
    )
  }
}

class PharmacyDirectoryPage extends React.Component {
  itemRenderer (pharmacy, index) {
    return (
      <PharmacyListItem pharmacy={pharmacy} index={index} />
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
        itemHeight={165}
        rowHeight={165}
        getAllItemsUrl={API_URLS.pharmacies}
        searchItemsUrl={API_URLS.pharmaciesSearch}
        localStorageKey="pharmacies"
      />
    )
  }
}

class IndividualHospitalDirectoryPage extends React.Component {
  itemRenderer (contact, index) {
    let contactNumbers = [contact.PhoneNumber, contact.PhoneNumber2, contact.PhoneNumber3]
    return (
      <HospitalDirectoryListItem contact={contact} index={index} numbers={contactNumbers} />
    )
  }

  render () {
    const item = JSON.parse(decodeURIComponent(this.props.params.item))
    let title = item.Name + ' Directory'
    return (
      <DirectoryPage
        title={title}
        icon="a"
        searchInstructions="Search By Department / Office Name"
        itemType="Contact"
        itemTypePlural="Contacts"
        itemRenderer={::this.itemRenderer}
        itemHeight={155}
        rowHeight={155}
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

export {
  DoctorDirectoryPage,
  HospitalDirectoryPage,
  IndividualHospitalDirectoryPage,
  PharmacyDirectoryPage
}
