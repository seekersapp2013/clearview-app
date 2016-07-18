import React from 'react'
import DetailPage from '../DetailPage'

class DoctorDetailPage extends React.Component {
  renderItem (item) {
    return (
      <div key={item._id} className="DetailItem DetailItem--doctor">
        <div className="DetailItem__Specialty">
          <h3>Specialties</h3>
          <div>{item.Specialty}</div>
        </div>
        <div className="DetailItem__Address">
          <h3>Address</h3>
          <div>{item.PracticeName}</div>
          <div>{item.Address}</div>
          <div>{item.City}, {item.State} {item.Zip}</div>
          <div>
            <button>Map</button>
          </div>
        </div>
        <div className="DetailItem__PhoneNumbers">
          <div className="DetailItem__PhoneNumber--main">
            <h3>Phone</h3>
            {item.PhoneNumber}
            <div>
              <button>Call</button>
            </div>
          </div>
          <div className="DetailItem__PhoneNumber--fax">
            <h3>Fax</h3>
            {item.FaxNumber}
          </div>
        </div>
      </div>
    )
  }
  renderTitle (item) {
    const title = item.FirstName + ' ' + item.LastName
    return (title)
  }
  // "_id": "5785328e238e242e723bb0f1",
  // "LastName": "Aaron",
  // "FirstName": "Ryan C.",
  // "PhoneNumber": "256-533-1600",
  // "FaxNumber": "256-534-8870",
  // "PracticeName": "Spine & Neuro Center",
  // "Specialty": "Physical Medicine & Rehabilitation",
  // "Address": "201 Governors Drive 1st Floor",
  // "City": "Huntsville",
  // "State": "AL",
  // "Zip": "35801",
  // "County": "Madison"

  render () {
    const decodedItem = JSON.parse(decodeURIComponent(this.props.params.item))
    const item = this.renderItem(decodedItem)
    const title = this.renderTitle(decodedItem)
    return (
      <DetailPage
        title={title}
        directoryLink="/doctors"
        item={item}
        iconClassName="DetailItem__Icon--doctors"
      />
    )
  }
}

class HospitalDetailPage extends React.Component {
  renderItem (item) {
    return (
      <div>
        <div>{item.PhoneNumber}</div>
        <div>{item.PhoneNumber2}</div>
        <div>{item.PhoneNumber3}</div>
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
