import React from 'react'
import { Link } from 'react-router'
import './HomePage.styl'

class HomePage extends React.Component {
  renderLink (url, title) {
    // a bug in older versions of safari's web view makes viewport height change over time
    // so we need to set the menu links height with javascript here. :(
    const menuItemHeight = document.documentElement.clientHeight * 0.18
    const menuItemMarginBottom = document.documentElement.clientHeight * 0.02
    const menuItemStyles = {
      marginBottom: menuItemMarginBottom,
      height: menuItemHeight
    }
    return (
      <Link
        to={url}
        className="Menu__Link"
        activeClassName="Menu__Link--Active">
        <div className="Menu__LinkItem__Container" style={menuItemStyles}>
          <div className="Menu__LinkItem">
            <div className={'Menu__LinkItem__Icon Menu__LinkItem__Icon--' + title}></div>
            <div className="Menu__LinkItem__Title">{title}</div>
          </div>
        </div>
      </Link>
    )
  }
  render () {
    const pageHeight = document.documentElement.clientHeight - 50
    const doctorLink = this.renderLink('/doctors', 'Doctor')
    const hospitalLink = this.renderLink('/hospitals', 'Hospital')
    const pharmacyLink = this.renderLink('/pharmacies', 'Pharmacy')

    return (
      <div className="Page HomePage" style={{height: pageHeight}}>
        <nav className="Menu">
          <h1>I want to find a</h1>
          {doctorLink}
          {hospitalLink}
          {pharmacyLink}
        </nav>
      </div>
    )
  }
}

export default HomePage
