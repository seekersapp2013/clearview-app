import React from 'react'
import getRowColor from '../../helpers/getRowColor'
import './PharmacyListItem.styl'

class PharmacyListItem extends React.Component {
  render () {
    const {pharmacy, index} = this.props
    const rowColor = getRowColor(index)
    const addressString = pharmacy.Address + ' ' + pharmacy.City + ', ' + pharmacy.State + ' ' + pharmacy.Zip
    const googleMapsLink = 'http://maps.google.com/?q=' + encodeURIComponent(addressString)
    const telephoneLink = (this.props.isAndroid)
      ? 'tel:' + pharmacy.PhoneNumber
      : 'telprompt:' + pharmacy.PhoneNumber
    return (
      <div className="PharmacyListItem__Container" style={{backgroundColor: rowColor}}>
        <div className="PharmacyListItem">
          <div className="PharmacyListItem__Name">{pharmacy.Name}</div>
          <div className="PharmacyListItem__Address">
            <div>{pharmacy.Address}</div>
            <div>{pharmacy.City} , {pharmacy.State}</div>
          </div>
          <div className="PharmacyListItem__PhoneNumbers">
            <div className="PharmacyListItem__PhoneNumber">
              {pharmacy.PhoneNumber}
            </div>
            <div className="PharmacyListItem__FaxNumber">
              {pharmacy.FaxNumber}
            </div>
          </div>
          <div className="PharmacyListItem__Links">
            <div>
              <a
                className="Button Button--Call"
                style={{textDecoration: 'none'}}
                href={telephoneLink}>
                Call
              </a>
            </div>
            <div>
              <a
                className="Button Button--Map"
                style={{textDecoration: 'none'}}
                href={googleMapsLink}
                target="_blank">
                Map
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PharmacyListItem.propTypes = {
  pharmacy: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  isAndroid: React.PropTypes.bool.isRequired
}

export default PharmacyListItem
