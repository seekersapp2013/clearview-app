import React from 'react'
import { Link } from 'react-router'
import FastClick from 'fastclick'
import Logo from '../../components/Logo'
import './HomePage.styl'

class HomePage extends React.Component {

  componentDidMount () {
    FastClick.attach(document.body)
  }

  renderLink (url, title) {
    return (
      <Link
        to={url}
        className="Menu__Link"
        activeClassName="Menu__Link--Active">
        <div className="Menu__LinkItem__Container">
          <div className="Menu__LinkItem">
            <div aria-hidden="true" className={'Menu__LinkItem__Icon Menu__LinkItem__Icon--' + title}></div>
            <div className="Menu__LinkItem__Title">{title}</div>
          </div>
        </div>
      </Link>
    )
  }
  render () {
    const doctorLink = this.renderLink('/doctors', 'Doctors')
    const hospitalLink = this.renderLink('/hospitals', 'Hospitals')
    const pharmacyLink = this.renderLink('/pharmacies', 'Pharmacies')
    return (
      <div className="HomePage">
        <Logo />
        <nav className="Menu">
          {doctorLink}
          {hospitalLink}
          {pharmacyLink}
        </nav>
      </div>
    )
  }
}

export default HomePage
