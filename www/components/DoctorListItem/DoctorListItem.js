import React from 'react'
import getRowColor from '../../helpers/getRowColor'
import './DoctorListItem.styl'

class DoctorListItem extends React.Component {
  render () {
    const {doctor, index} = this.props
    const itemLink = '#/doctors/' + encodeURIComponent(JSON.stringify(doctor))
    const doctorName = doctor.LastName + ', ' + doctor.FirstName
    const backgroundColor = getRowColor(index)
    const telephoneLink = (this.props.isAndroid)
      ? 'tel:' + doctor.PhoneNumber
      : 'telprompt:' + doctor.PhoneNumber
    return (
      <div className="DoctorListItem__Container" style={{backgroundColor: backgroundColor}}>
        <div className="DoctorListItem">
          <div className="DoctorListItem--Name">{doctorName}</div>
          <div className="DoctorListItem--Specialty">{doctor.Specialty}</div>
          <div className="DoctorListItem--PracticeName">{doctor.PracticeName}</div>
          <div className="DoctorListItem--PhoneNumber">{doctor.PhoneNumber}</div>
          <div className="DoctorListItem__Links">
            <div>
              <a className="Button Button--Call" href={telephoneLink}>Call</a>
            </div>
            <div>
              <a
                className="Button Button--MoreInfo"
                href={itemLink}>
                More Info
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DoctorListItem.propTypes = {
  doctor: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  isAndroid: React.PropTypes.bool.isRequired
}

export default DoctorListItem
