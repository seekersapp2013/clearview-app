import React from 'react'
import DetailPage from '../DetailPage'

class DoctorDetailPage extends React.Component {
  renderItem (item) {
    const errorReportLink = '#/error/' + encodeURIComponent(JSON.stringify(item))
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
        <div>
          <div className="DetailItem__PhoneNumber DetailItem__PhoneNumber--main">
            <h3>Phone</h3>
            {item.PhoneNumber}
            <div>
              <button>Call</button>
            </div>
          </div>
          <div className="DetailItem__PhoneNumber DetailItem__PhoneNumber--fax">
            <h3>Fax</h3>
            {item.FaxNumber}
          </div>
        </div>
        <div className="DetailPage__UpdateRequestContainer">
          <span>Information out of date?</span>
          <a href={errorReportLink}>Request Update</a>
        </div>
      </div>
    )
  }

  renderTitle (item) {
    const title = item.FirstName + ' ' + item.LastName
    return (title)
  }

  render () {
    const decodedItem = JSON.parse(decodeURIComponent(this.props.params.item))
    const item = this.renderItem(decodedItem)
    const title = this.renderTitle(decodedItem)
    return (
      <DetailPage
        title={title}
        directoryLink="/doctors"
        item={item}
        iconClassName="DetailItem__Icon--doctor"
      />
    )
  }
}

class HospitalDetailPage extends React.Component {
  renderItem (item) {
    return (
      <div key={item._id} className="DetailItem DetailItem--hospital">
        <div>{item.PhoneNumber}</div>
        <div>{item.PhoneNumber2}</div>
        <div>{item.PhoneNumber3}</div>
      </div>
    )
  }

  render () {
    const decodedItem = JSON.parse(decodeURIComponent(this.props.params.item))
    const item = this.renderItem(decodedItem)
    const title = decodedItem.Name
    return (
      <DetailPage
        item={item}
        title={title}
        directoryLink="/pharmacies"
        iconClassName="DetailItem__Icon--hospital"
      />
    )
  }
}

class PharmacyDetailPage extends React.Component {
  renderItem (item) {
    return (
      <div key={item._id} className="DetailItem DetailItem--pharmacy">
        <div className="DetailItem__Address">
          <div>{item.Address}</div>
          <div>{item.City}, {item.State} {item.Zip}</div>
          <button>Map</button>
        </div>
        <div>
          <div className="DetailItem__PhoneNumber DetailItem__PhoneNumber--main">
            <h3>Phone</h3>
            {item.PhoneNumber}
            <div>
              <button>Call</button>
            </div>
          </div>
          <div className="DetailItem__PhoneNumber DetailItem__PhoneNumber--fax">
            <h3>Fax</h3>
            {item.FaxNumber}
          </div>
        </div>
      </div>
    )
  }

  render () {
    const decodedItem = JSON.parse(decodeURIComponent(this.props.params.item))
    const item = this.renderItem(decodedItem)
    const title = decodedItem.Name
    return (
      <DetailPage
        item={item}
        title={title}
        directoryLink="/pharmacies"
        iconClassName="DetailItem__Icon--pharmacy"
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
