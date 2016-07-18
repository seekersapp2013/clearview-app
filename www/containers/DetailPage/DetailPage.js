import React from 'react'

class DetailPage extends React.Component {
  render () {
    <div>Detail Page!</div>
  }
}

DetailPage.propTypes = {
  title: React.PropTypes.string.isRequired,
  itemRenderer: React.PropTypes.func.isRequired
}

export default DetailPage
