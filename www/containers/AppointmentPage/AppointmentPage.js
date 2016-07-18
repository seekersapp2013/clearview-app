import React from 'react'
import BackLink from '../../components/BackLink'
import FooterNav from '../../components/FooterNav'

class AppointmentPage extends React.Component {
  render () {
    return (
      <div className="Page AppointmentPage">
        <BackLink to="/" text="Home" />
        <main>
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
