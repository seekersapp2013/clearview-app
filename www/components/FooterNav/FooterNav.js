import React from 'react'
import { Link } from 'react-router'
import './FooterNav.styl'

class FooterNav extends React.Component {
  render () {
    return (
      <footer>
        <div className="FooterNav">
          <Link to="/"
            className="FooterNav__Link"
            activeClassName="FooterNav__Link--Active">
            <div className="FooterNav__Link__Item FooterNav__Link__Item--Directory">
              <i className="fa fa-book" />
              Directory
            </div>
          </Link>
          <Link to="/appointment"
            className="FooterNav__Link"
            activeClassName="FooterNav__Link--Active">
            <div className="FooterNav__Link__Item FooterNav__Link__Item--Appointment">
              <i className="fa fa-calendar-plus-o" />
              Appointments
            </div>
          </Link>
        </div>
      </footer>
    )
  }
}

export default FooterNav
