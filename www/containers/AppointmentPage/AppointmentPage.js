import React from 'react'
import BackLink from '../../components/BackLink'
import FooterNav from '../../components/FooterNav'
import './AppointmentPage.styl'
import '../App/App.styl'

class AppointmentPage extends React.Component {
  render () {
    const footerHeight = 50
    const mainHeight = document.documentElement.clientHeight - (footerHeight)

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
          <main>
            <div className="AppointmentPage__InputGroup">
              <label htmlFor="name">My name</label>
              <input type="text" id="name" name="name" placeholder="Enter your name" required="required" />
            </div>
            <div className="AppointmentPage__InputGroup">
              <label htmlFor="phone">My phone number</label>
              <input type="number" id="phone" name="phone" placeholder="(555) 555-5555" />
            </div>
            <div className="AppointmentPage__InputGroup">
              <label htmlFor="email">My email address</label>
              <input type="email" id="email" name="email" placeholder="Enter your email address" />
            </div>
            <button>Submit</button>
          </main>
        </div>
        <FooterNav />
      </div>
    )
  }
}

export default AppointmentPage
