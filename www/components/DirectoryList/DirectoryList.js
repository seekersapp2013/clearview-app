import React from 'react'
import { VirtualScroll } from 'react-virtualized'
import 'react-virtualized/styles.css'

class DirectoryList extends React.Component {

  renderItem ({index, isScrolling}) {
    let item = this.props.items[index]
    return (
      this.props.itemRenderer(item, index)
    )
  }

  render () {
    return (
      <div className="DirectoryList DirectoryList__container">
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

DirectoryList.propTypes = {
  items: React.PropTypes.array,
  itemRenderer: React.PropTypes.func.isRequired,
  itemHeight: React.PropTypes.number.isRequired
}

export default DirectoryList
