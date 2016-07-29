import React from 'react'
import BackLink from '../../components/BackLink'
import FooterNav from '../../components/FooterNav'
import Axios from 'axios'
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
    let page = this
    const userName = document.getElementById('name').value
    const userPhone = document.getElementById('phone').value
    const userEmail = document.getElementById('email').value
    const message = {
      text: 'New Appointment Request',
      from: 'CCI Directory App <clearviewcancerinstitute@gmail.com>',
      to: 'CCI <clearviewcancerinstitute@gmail.com>, Wesley Hall <wesleyahall@gmail.com>',
      subject: 'New Appointment Request',
      phone: userPhone,
      email: userEmail,
      name: userName
    }
    const encodedMessage = encodeURIComponent(JSON.stringify(message))
    Axios.post('http://clearviewcancer.com:3000/appointment/' + encodedMessage)
      .then(function (response) {
        console.log(response)
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

    const mainSection = (!this.state.messageSent)
      ? renderForm(::this.sendMail)
      : renderSuccessMessage()

    const main = (!this.state.error)
      ? mainSection
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
  error: React.PropTypes.mixed
}

AppointmentPage.defaultProps = {
  messageSent: false,
  error: null
}

export default AppointmentPage
