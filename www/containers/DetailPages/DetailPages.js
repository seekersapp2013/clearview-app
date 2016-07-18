import React from 'react'
import DetailPage from '../DetailPage'

class DoctorDetailPage extends React.Component {
  renderItem (item) {
    return (
      <div>
        {item.LastName}, {item.FirstName}
        {item.PracticeName}
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
    const item = this.renderItem(JSON.parse(decodeURIComponent(this.props.params.item)))
    return (
      <DetailPage
        title="Hospital Detail Page"
        directoryLink="/hospitals"
        item={item}
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
