import React from 'react'
import DetailPage from '../DetailPage'
import DirectoryPage from '../DirectoryPage'

class DoctorDetailPage extends React.Component {
  renderItem (item) {
    return (
      <div>
        <div>{item.LastName}, {item.FirstName}</div>
        <div>{item.PracticeName}</div>
      </div>
    )
  }

  render () {
    const item = this.renderItem(JSON.parse(decodeURIComponent(this.props.params.item)))
    return (
      <DetailPage
        title="Doctor Detail Page"
        directoryLink="/doctors"
        item={item}
      />
    )
  }
}

class HospitalDetailPage extends React.Component {
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
    return (
      <DirectoryPage
        title="{item.Name} Phone Directory"
        icon="a"
        searchInstructions="Search By Name or Room Name"
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

class PharmacyDetailPage extends React.Component {
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
    const item = this.renderItem(JSON.parse(decodeURIComponent(this.props.params.item)))
    return (
      <DetailPage
        title="Pharmacy Detail Page"
        directoryLink="/pharmacies"
        item={item}
      />
    )
  }
}

DoctorDetailPage.propTypes =
HospitalDetailPage.propTypes =
PharmacyDetailPage.propTypes = {
  params: React.PropTypes.object.isRequired
}

export {
  DoctorDetailPage,
  HospitalDetailPage,
  PharmacyDetailPage
}
