import React from 'react'
import axios from 'axios'
import DebouncedInput from 'react-debounce-input'
import BackLink from '../../components/BackLink'
import DirectoryList from '../../components/DirectoryList'
import './DirectoryPage.styl'

require('es6-promise').polyfill()

const browserStorage = (typeof window.localStorage === 'undefined')
  ? null
  : window.localStorage

const Axios = axios.create()
Axios.defaults.timeout = 8000

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
    let page = this
    if (this.props.items && this.props.items.length) {
      this.setState({
        items: this.props.items,
        itemsShown: this.props.items,
        loadedFromLocalStorage: true,
        loading: false
      })
    } else {
      let getItems = new Promise((resolve, reject) => {
        Axios.get(page.props.getAllItemsUrl)
          .then(function (response) {
            page.setState({
              loadedFromLocalStorage: false
            }, resolve(response.data.message))
          })
          .catch(function (error) {
            let items = JSON.parse(browserStorage.getItem(page.props.localStorageKey))
            if (browserStorage !== null && items && items.length > 0) {
              page.setState({
                items: items,
                itemsShown: items,
                loading: false,
                loadedFromLocalStorage: true
              })
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
          page.setState({
            error: 'Error. No connection to server. Try again later.'
          })
          console.log(error)
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
    const itemIdentifier = (itemsShownCount === 1)
      ? this.props.itemType.toLowerCase()
      : this.props.itemTypePlural.toLowerCase()
    const _BackLink = this.props.backLink
      ? this.props.backLink
      : <BackLink to="/" text="Home" />
    const userAgent = navigator.userAgent.toLowerCase()
    const isAndroid = (userAgent.indexOf('android') > -1)

    let itemsCountText = (this.state.loading)
      ? 'Loading...'
      : itemsShownCount + ' ' + itemIdentifier + ' found.'

    itemsCountText = (this.state.error)
      ? this.state.error
      : itemsCountText

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
          rowCount={this.state.items.length}
          rowHeight={this.props.rowHeight}
          itemRenderer={this.props.itemRenderer}
          title={this.props.title}
          initialCount={this.state.itemsShown.length}
          isAndroid={isAndroid}
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
