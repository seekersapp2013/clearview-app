import React from 'react'
import BackLink from '../../components/BackLink'
import FooterNav from '../../components/FooterNav'
import Axios from 'axios'
import 'react-fastclick'
import './AppointmentPage.styl'
import '../App/App.styl'

class AppointmentPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messageSent: false,
      error: null
    }
  }

  sendMail () {
    const userName = document.getElementById('name').value
    const userPhone = document.getElementById('phone').value
    const userEmail = document.getElementById('email').value

    let page = this
    let message = {
      text: '',
      from: 'CCI Directory App <clearviewcancerinstitute@gmail.com>',
      to: 'CCI <clearviewcancerinstitute@gmail.com>, Wesley Hall <wesleyahall@gmail.com>',
      subject: 'New Appointment Request',
      email: userEmail
    }

    let emailBody = ['New Appointment Request']
    emailBody.push('------------------')
    emailBody.push('')
    emailBody.push('Name: ' + userName)
    emailBody.push('Email: ' + userPhone)
    emailBody.push('Phone: ' + userEmail)
    emailBody.push('')
    message.text = emailBody.join('\n')

    Axios.post('http://clearviewcancer.com:3000/sendmail/' + encodeURIComponent(JSON.stringify(message)))
      .then(function (response) {
        page.setState({
          messageSent: true
        })
      })
      .catch(function (error) {
        page.setState({
          messageSent: false,
          error: error
        })
      })
  }

  render () {
    const footerHeight = 50
    const mainHeight = document.documentElement.clientHeight - (footerHeight)

    const renderForm = function (onSubmit) {
      return (
        <div className="AppointmentPage__Form">
          <div className="AppointmentPage__InputGroup">
            <label htmlFor="name"><span>My name</span></label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required="required" />
          </div>
          <div className="AppointmentPage__InputGroup">
            <label htmlFor="phone">My phone number</label>
            <input type="text" id="phone" name="phone" placeholder="(555) 555-5555" />
          </div>
          <div className="AppointmentPage__InputGroup">
            <label htmlFor="email">My email address</label>
            <input type="email" id="email" name="email" placeholder="Enter your email address" />
          </div>
          <div className="Button" onClick={onSubmit}>Submit</div>
        </div>
      )
    }

    const renderSuccessMessage = function () {
      return (
        <div>
          <p className="AppointmentPage__Message">
            Thank you!
          </p>
          <p className="AppointmentPage__Message">
            Your information has been logged by our system and you should hear from a representative shortly!
          </p>
        </div>
      )
    }

    const renderError = function (err) {
      let className = 'AppointmentPage__Message AppointmentPage__Message--Error'
      return (
        <div>
          <p className={className}>
            There was an error submitting the form. Please try again later.
          </p>

          <p className={className}>
            Error: {err.message}
          </p>
        </div>
      )
    }

    let main = (!this.state.messageSent)
      ? renderForm(::this.sendMail)
      : renderSuccessMessage()

    main = (!this.state.error)
      ? main
      : renderError(this.state.error)

    return (
      <div className="Page AppointmentPage">
        <BackLink to="/" text="Home" />
        <div style={{height: mainHeight, overflow: 'scroll', paddingBottom: 30}}>
          <header>
            <div className="AppointmentPage__Icon"></div>
            <div className="AppointmentPage__Instructions">
              Need to make an appointment with Clearview?
              <br /> <br />
              Input your information below and a representative will be in touch.
            </div>
          </header>
          <main>{main}</main>
        </div>
        <FooterNav />
      </div>
    )
  }
}

AppointmentPage.propTypes = {
  messageSent: React.PropTypes.bool,
  error: React.PropTypes.any
}

AppointmentPage.defaultProps = {
  messageSent: false,
  error: null
}

export default AppointmentPage
