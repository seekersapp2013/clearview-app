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
  itemRenderer (doctor, index) {
    const itemLink = '#/doctors/' + encodeURIComponent(JSON.stringify(doctor))
    const doctorName = doctor.LastName + ', ' + doctor.FirstName

    return (
      <div className="DirectoryList__Item">
        <div className="DirectoryList__Item--Name">{doctorName}</div>
        <div className="DirectoryList__Item--Specialty">{doctor.Specialty}</div>
        <div className="DirectoryList__Item--PracticeName">{doctor.PracticeName}</div>
        <div className="DirectoryList__Item--PhoneNumber">{doctor.PhoneNumber}</div>
        <div>
          <ul className="DirectoryList__Item__Links">
            <li>
              <div>
                <a
                  className="DirectoryList__Item__Button DirectoryList__Item__Button--Call"
                  href={'telprompt://' + doctor.PhoneNumber}>
                  Call
                </a>
              </div>
            </li>
            <li>
              <div>
                <a
                  className="DirectoryList__Item__Button DirectoryList__Item__Button--MoreInfo"
                  href={itemLink}>
                  More Info
                </a>
              </div>
            </li>
          </ul>
        </div>
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
        itemHeight={150}
        rowHeight={150}
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
        className="DirectoryList__Item DirectoryList__Item--hospital"
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
        itemHeight={150}
        rowHeight={150}
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
      <div className="DirectoryList__Item DirectoryList__Item--hospital">
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
        itemHeight={150}
        rowHeight={150}
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
        className="DirectoryList__Item DirectoryList__Item--pharmacy"
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
        itemHeight={150}
        rowHeight={150}
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
