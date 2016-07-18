import React from 'react'
import BackLink from '../../components/BackLink'
import FooterNav from '../../components/FooterNav'

class ErrorReportPage extends React.Component {
  render () {
    return (
      <div className="Page ErrorReportPage">
        <BackLink to="/" text="Home" />
        <h1>Error Report Page</h1>
        <FooterNav />
      </div>
    )
  }
}

export default ErrorReportPage
