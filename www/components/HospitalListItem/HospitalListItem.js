import React from 'react'
import getRowColor from '../../helpers/getRowColor'
import './HospitalListItem.styl'

class HospitalListItem extends React.Component {
  render () {
    const {hospital, index} = this.props
    let itemLink = '#/hospitals/' + encodeURIComponent(JSON.stringify(hospital))
    let rowColor = getRowColor(index)
    return (
      <div className="HospitalListItem__Container" style={{backgroundColor: rowColor}}>
        <div className="HospitalListItem">
          <div className="HospitalListItem__Name">{hospital.Name}</div>
          <div className="HospitalListItem__Address">
            <div>{hospital.Address}</div>
            <div>{hospital.City} , {hospital.State}</div>
            <div>Main Office: {hospital.PhoneNumber}</div>
          </div>
          <div className="HospitalListItem__Links">
            <div className="HospitalListItem__PhoneNumber">
              <a
                className="Button Button--Call"
                style={{textDecoration: 'none'}}
                href={'telprompt://' + hospital.PhoneNumber}>
                Call
              </a>
            </div>
            <div className="HospitalListItem__PhoneNumber">
              <a
                className="Button Button--Directory"
                style={{textDecoration: 'none'}}
                href={itemLink}>
                View Directory
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

HospitalListItem.propTypes = {
  hospital: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired
}

export default HospitalListItem
