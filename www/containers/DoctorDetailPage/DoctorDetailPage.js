import React from 'react'
import BackLink from '../../components/BackLink'
import './DoctorDetailPage.styl'

class DoctorDetailPage extends React.Component {

  renderTitle (item) {
    const title = item.FirstName + ' ' + item.LastName
    return (title)
  }

  render () {
    const item = JSON.parse(decodeURIComponent(this.props.params.item))
    const title = this.renderTitle(item)
    const errorReportLink = '#/error/' + encodeURIComponent(JSON.stringify(item))
    const addressString = item.Address + ' ' + item.City + ', ' + item.State + ' ' + item.Zip
    const googleMapsLink = 'http://maps.google.com/?q=' + encodeURIComponent(addressString) + 't'

    return (
      <div className="Page DoctorDetailPage">
        <header>
          <BackLink to="/doctors" text="Back" />
          <div className="DoctorDetailPage__Icon"></div>
          <h1>{title}</h1>
        </header>
        <div key={item._id}>
          <div className="DoctorDetailPage__Specialty">
            <h3>Specialties</h3>
            <div>{item.Specialty}</div>
          </div>
          <div className="DoctorDetailPage__Address">
            <h3>Address</h3>
            <div>{item.PracticeName}</div>
            <div>{item.Address}</div>
            <div>{item.City}, {item.State} {item.Zip}</div>
            <div>
              <a className="Button Button--Map" href={googleMapsLink} target="_blank">Map</a>
            </div>
          </div>
          <div>
            <div className="DoctorDetailPage__PhoneNumber">
              <h3>Phone</h3>
              {item.PhoneNumber}
              <div>
                <a className="Button Button--Call" href={'telprompt://' + item.PhoneNumber}>Call</a>
              </div>
            </div>
            <div className="DoctorDetailPage__FaxNumber">
              <h3>Fax</h3>
              {item.FaxNumber}
            </div>
          </div>
          <div className="DoctorDetailPage__UpdateRequestContainer">
            <span>Information out of date?</span>
            <a className="DoctorDetailPage__UpdateRequestLink" href={errorReportLink}>Request Update</a>
          </div>
        </div>
      </div>
    )
  }
}

DoctorDetailPage.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default DoctorDetailPage
