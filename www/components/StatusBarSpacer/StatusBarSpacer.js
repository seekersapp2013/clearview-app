import React from 'react'
import './StatusBarSpacer.styl'

class StatusBarSpacer extends React.Component {
  render () {
    return (
      <div className={'StatusBarSpacer StatusBarSpacer--' + this.props.variant}></div>
    )
  }
}

StatusBarSpacer.propTypes = {
  variant: React.PropTypes.string
}

export default StatusBarSpacer
