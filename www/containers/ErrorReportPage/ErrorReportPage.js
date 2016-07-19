import React from 'react'
import BackLink from '../../components/BackLink'
import FooterNav from '../../components/FooterNav'
import './ErrorReportPage.styl'

class ErrorReportPage extends React.Component {
  render () {
    return (
      <div className="Page ErrorReportPage">
        <header>
          <BackLink to="/" text="Back" />
          <div className="ErrorReportPage__Icon"></div>
          <div className="ErrorReportPage__Instructions">
            Do we have information that is out of date? <br /> <br />
            Leave your name, email address, and phone number and a representative will be in touch.
          </div>
        </header>
        <main>
          <div className="ErrorReportPage__InputGroup">
            <label htmlFor="name">My name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required="required" />
          </div>
          <div className="ErrorReportPage__InputGroup">
            <label htmlFor="phone">My phone number</label>
            <input type="tel" id="phone" name="phone" placeholder="(555) 555-5555" />
          </div>
          <div className="ErrorReportPage__InputGroup">
            <label htmlFor="phone">My email address</label>
            <input type="email" id="email" name="email" placeholder="Enter your email address" />
          </div>
          <button>Submit</button>
        </main>
        <FooterNav />
      </div>
    )
  }
}

ErrorReportPage.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default ErrorReportPage
