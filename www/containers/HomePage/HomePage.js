import React from 'react'
import { Link } from 'react-router'

class HomePage extends React.Component {
  render () {
    return (
      <div className="Page HomePage">
        <nav>
          <Link to="/doctors">Doctors</Link>
          <Link to="/hospitals">Hospitals</Link>
          <Link to="/pharmacies">Pharmacies</Link>
        </nav>
      </div>
    )
  }
}

export default HomePage
