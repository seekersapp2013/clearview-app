import React from 'react'
import { VirtualScroll } from 'react-virtualized'
import 'react-virtualized/styles.css'

class ResultsList extends React.Component {

  renderItem ({index, isScrolling}) {
    let item = this.props.items[index]
    return (
      this.props.itemRenderer(item)
    )
  }

  render () {
    return (
      <div>
        <VirtualScroll
          items={this.props.items}
          itemHeight={this.props.itemHeight}
          width={document.documentElement.clientWidth}
          height={document.documentElement.clientHeight - 100}
          rowCount={this.props.items.length}
          rowHeight={this.props.itemHeight}
          rowRenderer={::this.renderItem}
        />
      </div>
    )
  }
}

ResultsList.propTypes = {
  items: React.PropTypes.array,
  itemRenderer: React.PropTypes.func.isRequired,
  itemHeight: React.PropTypes.number.isRequired
}

export default ResultsList
