import React from 'react'
import { VirtualScroll } from 'react-virtualized'
import 'react-virtualized/styles.css'

require('es6-promise').polyfill()

class SearchableList extends React.Component {

  renderItem ({index, isScrolling}) {
    let item = this.props.items[index]
    return (
      this.props.itemRenderer(item)
    )
  }

  render () {
    return (
      <div>
        <h1>{this.props.title}</h1>

        <div className="numFound">
          {this.props.items.length} items shown.
        </div>
        <VirtualScroll
          items={this.props.items}
          itemHeight={this.props.itemHeight}
          width={document.documentElement.clientWidth}
          height={document.documentElement.clientHeight - 100}
          rowCount={this.props.items.length}
          rowHeight={this.props.itemHeight}
          rowRenderer={::this.renderItem}
          noRowsRenderer={::this.props.emptyListRenderer}
        />
      </div>
    )
  }
}

SearchableList.propTypes = {
  items: React.PropTypes.array,
  itemRenderer: React.PropTypes.func.isRequired,
  emptyListRenderer: React.PropTypes.func.isRequired,
  itemHeight: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  initialCount: React.PropTypes.number.isRequired
}

export default SearchableList
