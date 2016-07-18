import React from 'react'
import { Link } from 'react-router'
import './FooterNav.styl'

class FooterNav extends React.Component {
  render () {
    return (
      <div className="FooterNav">
        <Link to="/"
          className="FooterNav__Link"
          activeClassName="FooterNav__Link--active">
          Directory
        </Link>
        <Link to="/appointment"
          className="FooterNav__Link"
          activeClassName="FooterNav__Link--active">
          Appointments
        </Link>
      </div>
    )
  }
}

export default FooterNav
