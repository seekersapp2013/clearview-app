import React from 'react'
import getRowColor from '../../helpers/getRowColor'
import './HospitalDirectoryListItem.styl'

class HospitalDirectoryListItem extends React.Component {

  componentWillMount () {
    const {contact, index} = this.props
    const rowColor = getRowColor(index)
    this.setState({
      rowColor: rowColor,
      contactNumbers: [contact.PhoneNumber, contact.PhoneNumber2, contact.PhoneNumber3]
    })
  }

  render () {
    const contactNumbers = this.state.contactNumbers.filter((number) => {
      return number !== ''
    })
    const phoneNumbers = contactNumbers.map((number, index) => {
      const lineNum = index + 1
      let lineNumText = ''
      if (contactNumbers.length > 1) {
        lineNumText = 'Line ' + lineNum + ': '
      }
      return (
        <div className="HospitalDirectoryListItem__PhoneNumber">{lineNumText}{number}</div>
      )
    })
    const callLinks = contactNumbers.map((number, index) => {
      const lineNum = index + 1
      let buttonText = 'Call'
      if (contactNumbers.length > 1) {
        buttonText = 'Line ' + lineNum
      }
      return (
        <div>
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
        className="HospitalDirectoryListItem__Container"
        style={{backgroundColor: this.state.rowColor}}>
        <div className="HospitalDirectoryListItem__Name">{this.props.contact.Name}</div>
        <div className="HospitalDirectoryListItem__PhoneNumber__Container">
          {phoneNumbers}
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
  index: React.PropTypes.number.isRequired
}

export default HospitalDirectoryListItem
