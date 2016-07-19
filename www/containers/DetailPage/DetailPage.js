import React from 'react'
import BackLink from '../../components/BackLink'

class DetailPage extends React.Component {
  render () {
    return (
      <div className="Page DetailPage">
        <header>
          <BackLink to={this.props.directoryLink} text="Back" />
          <div className={'DetailPage__Icon' + this.props.iconClassName}></div>
          <h1>{this.props.title}</h1>
        </header>
        {this.props.item}
      </div>
    )
  }
}

DetailPage.propTypes = {
  title: React.PropTypes.string.isRequired,
  directoryLink: React.PropTypes.string.isRequired,
  item: React.PropTypes.any.isRequired,
  iconClassName: React.PropTypes.string.isRequired
}

export default DetailPage
