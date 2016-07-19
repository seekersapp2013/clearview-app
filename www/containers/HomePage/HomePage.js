import React from 'react'
import { Link } from 'react-router'
import './HomePage.styl'

class HomePage extends React.Component {
  render () {
    return (
      <div className="Page HomePage">
        <h1>I want to find a</h1>
        <nav className="menu">
          <Link to="/doctors" className="menu__link" activeClassName="menu__link--active">
            <div className="menu__link__item menu__link__item--doctors">
              <div className="menu__link__item__container">
                <div className="menu__link__item__icon">a</div>
                <div className="menu__link__item__title">Doctor</div>
              </div>
            </div>
          </Link>

          <Link to="/hospitals" className="menu__link" activeClassName="menu__link--active">
            <div className="menu__link__item menu__link__item--hospitals">
              <div className="menu__link__item__container">
                <div className="menu__link__item__icon">b</div>
                <div className="menu__link__item__title">Hospital</div>
              </div>
            </div>
          </Link>

          <Link to="/pharmacies" className="menu__link" activeClassName="menu__link--active">
            <div className="menu__link__item menu__link__item--pharmacies">
              <div className="menu__link__item__container">
                <div className="menu__link__item__icon">c</div>
                <div className="menu__link__item__title">Pharmacy</div>
              </div>
            </div>
          </Link>
        </nav>
      </div>
    )
  }
}

export default HomePage
