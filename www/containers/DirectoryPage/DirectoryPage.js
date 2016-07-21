import React from 'react'
import Axios from 'axios'
import DebouncedInput from 'react-debounce-input'
import BackLink from '../../components/BackLink'
import DirectoryList from '../../components/DirectoryList'
import './DirectoryPage.styl'

require('es6-promise').polyfill()

const browserStorage = (typeof window.localStorage === 'undefined')
  ? null
  : window.localStorage

class DirectoryPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      itemsStored: [],
      itemsShown: [],
      loading: true,
      loadedFromLocalStorage: false,
      error: ''
    }
  }

  getAllItems () {
    if (this.props.items && this.props.items.length) {
      this.setState({
        items: this.props.items,
        itemsShown: this.props.items,
        loadedFromLocalStorage: true,
        loading: false
      })
    } else {
      let page = this
      let getItems = new Promise((resolve, reject) => {
        Axios.get(page.props.getAllItemsUrl)
          .then(function (response) {
            resolve(response.data.message)
          })
          .catch(function (error) {
            let items = JSON.parse(browserStorage.getItem(page.props.localStorageKey))
            if (browserStorage !== null && items && items.length > 0) {
              page.setState({
                loadedFromLocalStorage: true
              }, resolve(items))
            } else {
              reject(error)
            }
          })
      })
      Promise.all([getItems])
        .then(function (returnedArrays) {
          let items = returnedArrays[0]
          let itemsString = JSON.stringify(items)
          let shouldSaveToStorage = !page.state.loadedFromLocalStorage
          page.setState({
            items: items,
            itemsShown: items,
            loading: false
          })
          if (shouldSaveToStorage) {
            browserStorage.setItem(page.props.localStorageKey, itemsString)
          }
        })
        .catch(function (error) {
          console.log('You must have an internet connection.')
          page.setState({
            error: error
          })
        })
    }
  }

  componentDidMount () {
    this.getAllItems()
    let itemsShown = this.state.items
    if (this.props.items && this.props.items.length > 0) {
      itemsShown = this.props.items
    }
    this.setState({
      itemsShown: itemsShown
    })
  }

  filterItemsWithAPI (searchString) {
    let searchUrl = this.props.searchItemsUrl + encodeURIComponent(searchString)
    let getItems = new Promise((resolve, reject) => {
      Axios.get(searchUrl)
        .then(response => {
          resolve(response.data.message)
        })
        .catch(error => {
          console.log(error)
        })
    })
    Promise.all([getItems]).then(itemArrays => {
      let itemsShown = (itemArrays[0].length > 0)
        ? itemArrays[0]
        : []
      this.setState({
        itemsShown: itemsShown,
        loading: false
      })
    })
  }

  filterItemsFromLocalStorage (searchString) {
    const {items} = this.state
    const str = searchString.toLowerCase()
    let doesMatch = function (str) {
      return (key) => (key + '').toLowerCase().indexOf(str) !== -1
    }
    let itemsShown = (str !== '')
      ? items.filter((r) => Object.values(r).some(doesMatch(str)))
      : []

    this.setState({
      itemsShown: itemsShown,
      loading: false
    })
  }

  handleSearchStringChange (e) {
    this.setState({isLoading: true})
    let searchString = e.target.value.trim()
    let hasValidInput = (typeof e === 'object' && searchString !== '')
    if (hasValidInput && !this.state.loadedFromLocalStorage) {
      this.filterItemsWithAPI(searchString)
    }
    if (hasValidInput && this.state.loadedFromLocalStorage) {
      this.filterItemsFromLocalStorage(searchString)
    }
    if (searchString === '') {
      this.setState({
        itemsShown: this.state.items
      })
    }
  }

  blurFocus () {
    document.activeElement.blur()
  }

  render () {
    const itemsShownCount = this.state.itemsShown.length
    let itemIdentifier = (itemsShownCount === 1)
      ? this.props.itemType.toLowerCase()
      : this.props.itemTypePlural.toLowerCase()
    let itemsCountText = itemsShownCount + ' ' + itemIdentifier + ' found.'
    if (this.state.loading) itemsCountText = 'Loading...'
    const backLinkHeight = 30
    const headerHeight = 140
    const footerHeight = 50
    const bottomPadding = 14
    const remainingPage = document.documentElement.clientHeight - (backLinkHeight + headerHeight + footerHeight + bottomPadding)
    let _BackLink = this.props.backLink
      ? this.props.backLink
      : <BackLink to="/" text="Home" />

    return (
      <div className={'Page DirectoryPage ' + this.props.itemType.toLowerCase()} onTouchStart={::this.blurFocus}>
        <header>
          {_BackLink}
          <h1>{this.props.title}</h1>
          <div>
            <DebouncedInput
              debounceTimeout={200}
              onChange={::this.handleSearchStringChange}
              type="text"
              placeholder={this.props.searchInstructions}
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              className="FilterInput"
            />
          </div>
          <div className="DirectoryPage__ItemCount">
            {itemsCountText}
          </div>
        </header>
        <DirectoryList
          items={this.state.itemsShown}
          itemHeight={this.props.itemHeight}
          width={document.documentElement.clientWidth - 20}
          height={remainingPage}
          rowCount={this.state.items.length}
          rowHeight={this.props.rowHeight}
          itemRenderer={this.props.itemRenderer}
          title={this.props.title}
          initialCount={this.state.itemsShown.length}
        />
      </div>
    )
  }
}

DirectoryPage.propTypes = {
  title: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
  searchInstructions: React.PropTypes.string.isRequired,
  itemType: React.PropTypes.string.isRequired,
  itemTypePlural: React.PropTypes.string.isRequired,
  itemRenderer: React.PropTypes.func.isRequired,
  itemHeight: React.PropTypes.number.isRequired,
  rowHeight: React.PropTypes.number.isRequired,
  getAllItemsUrl: React.PropTypes.string.isRequired,
  searchItemsUrl: React.PropTypes.string.isRequired,
  localStorageKey: React.PropTypes.string.isRequired,
  backLink: React.PropTypes.any,
  items: React.PropTypes.array
}

DirectoryPage.defaultProps = {
  title: '',
  icon: '',
  searchInstructions: '',
  itemType: '',
  itemTypePlural: '',
  itemRenderer: null,
  itemHeight: 0,
  rowHeight: 0,
  getAllItemsUrl: '',
  searchItemsUrl: '',
  localStorageKey: '',
  items: []
}

export default DirectoryPage
