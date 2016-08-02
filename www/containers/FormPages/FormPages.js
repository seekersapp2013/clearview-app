import React from 'react'
import FormPage from '../../containers/FormPage'

class ErrorReportForm extends React.Component {
  render () {
    const headerBody = (
      <div>
        <p>Do we have information that is out of date?</p>
        <p>Leave your name, email address, and phone number and a representative will be in touch.</p>
      </div>
    )

    return (
      <FormPage
        backLinkLocation="/doctors"
        iconClassName="ErrorReport"
        headerBody={headerBody}
        emailSubject="Error Reported via CCI Directory App"
        emailHeader="Error Report Submited" />
    )
  }
}

class AppointmentForm extends React.Component {
  render () {
    const headerBody = (
      <div>
        <p>Need to make an appointment with Clearview?</p>
        <p>Input your information below and a representative will be in touch.</p>
      </div>
    )

    return (
      <FormPage
        backLinkLocation="/"
        iconClassName="Appointment"
        headerBody={headerBody}
        emailSubject="Appointment Request via Directory App"
        emailHeader="Appointment Request" />
    )
  }
}

export {
  ErrorReportForm,
  AppointmentForm
}
