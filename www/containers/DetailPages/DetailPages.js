import React from 'react'
import DetailPage from '../DetailPage'

class DoctorDetailPage extends React.Component {
  renderItem (item) {
    <div>
      {item.LastName}, {item.FirstName}
      {item.PracticeName}
    </div>
  }

  render () {
    return (
      <DetailPage
        title="Doctor Detail Page"
        itemRenderer={::this.renderItem}
      />
    )
  }
}

class HospitalDetailPage extends React.Component {
  renderItem (item) {
    <div>
      {item.Name}
      {item.City}
      {item.State}
    </div>
  }

  render () {
    return (
      <DetailPage
        title="Hospital Detail Page"
        itemRenderer={::this.renderItem}
      />
    )
  }
}

class PharmacyDetailPage extends React.Component {
  renderItem (item) {
    <div>
      {item.Name}
      {item.City}
      {item.State}
    </div>
  }

  render () {
    return (
      <DetailPage
        title="Pharmacy Detail Page"
        itemRenderer={::this.renderItem}
      />
    )
  }
}

export {
  DoctorDetailPage,
  HospitalDetailPage,
  PharmacyDetailPage
}
