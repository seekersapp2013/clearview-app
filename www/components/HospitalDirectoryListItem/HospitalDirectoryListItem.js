import React from 'react'
import getRowColor from '../../helpers/getRowColor'
import './HospitalDirectoryListItem.styl'

class HospitalDirectoryListItem extends React.Component {
  filterEmptyItems (items) {
    let filtered = []
    items.map((item) => {
      if (item !== '' && item !== 'undefined') {
        filtered.push(item)
      }
    })
    return filtered
  }

  render () {
    const {contact, index} = this.props
    const rowColor = getRowColor(index)
    const phoneNumbers = this.filterEmptyItems([contact.PhoneNumber, contact.PhoneNumber2, contact.PhoneNumber3])
    const phoneNumberElements = phoneNumbers.map((number, index) => {
      const lineNumText = (phoneNumbers.length > 1)
        ? 'Line ' + (index + 1) + ': '
        : ''
      return (
        <div key={'number' + index} className="HospitalDirectoryListItem__PhoneNumber">
          {lineNumText} {number}
        </div>
      )
    })
    const callLinks = phoneNumbers.map((number, index) => {
      let buttonText = (phoneNumbers.length > 1)
        ? 'Line ' + (index + 1)
        : 'Call'
      return (
        <div key={'button' + index}>
          <a
            className="Button Button--Call"
            href={'telprompt://' + number}>
            {buttonText}
          </a>
        </div>
      )
    })

    return (
      <div
        key={this.props.contact._id}
        className="HospitalDirectoryListItem__Container"
        style={{backgroundColor: rowColor}}>
        <div className="HospitalDirectoryListItem__Name">{this.props.contact.Name}</div>
        <div className="HospitalDirectoryListItem__PhoneNumber__Container">
          {phoneNumberElements}
        </div>
        <div className="HospitalDirectoryListItem__Links__Container">
          {callLinks}
        </div>
      </div>
    )
  }
}

HospitalDirectoryListItem.propTypes = {
  contact: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  isAndroid: React.PropTypes.bool.isRequired
}

export default HospitalDirectoryListItem
