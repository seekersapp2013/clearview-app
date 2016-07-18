import React from 'react'
import HomeLink from '../../components/HomeLink'
import FooterNav from '../../components/FooterNav'

class AppointmentPage extends React.Component {
  render () {
    return (
      <div className="AppContainer">
        <HomeLink />
        <main className="AppointmentPage">
          <div>
            <h1>Appointments</h1>
          </div>
        </main>
        <FooterNav />
      </div>
    )
  }
}

export default AppointmentPage
