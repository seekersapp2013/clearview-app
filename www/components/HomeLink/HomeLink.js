import React from 'react'
import { Link } from 'react-router'

class HomeLink extends React.Component {
  render () {
    return (
      <Link className="HomeLink" to="/">Home</Link>
    )
  }
}

export default HomeLink
