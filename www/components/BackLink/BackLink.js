import React from 'react'
import { Link } from 'react-router'

class BackLink extends React.Component {
  render () {
    return (
      <div className="BackLink">
        <Link to={this.props.to}>{this.props.text}</Link>
      </div>
    )
  }
}

BackLink.propTypes = {
  text: React.PropTypes.string.isRequired,
  to: React.PropTypes.string.isRequired
}

export default BackLink
