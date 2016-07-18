import React from 'react'
import { Link } from 'react-router'

class DetailPage extends React.Component {
  componentWillMount () {
    this.setState({
      item: decodeURIComponent(this.props.item)
    })
  }
  render () {
    return (
      <div>
        <Link to={this.props.directoryLink}>Back</Link>
        <div>{this.props.item}</div>
      </div>
    )
  }
}

DetailPage.propTypes = {
  title: React.PropTypes.string.isRequired,
  directoryLink: React.PropTypes.string.isRequired,
  item: React.PropTypes.any.isRequired
}

export default DetailPage
