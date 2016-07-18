import React from 'react'
import HomeLink from '../../components/HomeLink'
import axios from 'axios'
import DebouncedInput from 'react-debounce-input'
import ResultsList from '../../components/ResultsList'

require('es6-promise').polyfill()
const browserStorage = (typeof window.localStorage === 'undefined') ? null : window.localStorage

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
    let getItems = new Promise((resolve, reject) => {
      axios.get(page.props.getAllItemsUrl)
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
          itemsShown: items
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

  componentDidMount () {
    this.getAllItems()
    this.setState({
      itemsShown: this.state.items
    })
  }

  filterItemsWithAPI (searchString) {
    let searchUrl = this.props.searchItemsUrl + searchString
    let getItems = new Promise((resolve, reject) => {
      axios.get(searchUrl)
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

  doesMatch (str) {
    return (key) => (key + '').toLowerCase().indexOf(str) !== -1
  }

  filterItemsFromLocalStorage (searchString) {
    const {items} = this.state
    const str = searchString.toLowerCase()
    let itemsShown = (str !== '')
      ? items.filter((r) => Object.values(r).some(this.doesMatch(str)))
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

  renderItem ({index, isScrolling}) {
    let item = this.state.items[index]
    return (
      this.props.itemRenderer(item)
    )
  }

  render () {
    return (
      <div className="SearchPage">
        <HomeLink />
        <div>
          <DebouncedInput
            debounceTimeout={300}
            onChange={::this.handleSearchStringChange}
            type="text"
            placeholder={this.props.searchInstructions}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>
        <div>{this.props.title}</div>
        <div className="Results__container">
          <ResultsList
            items={this.state.itemsShown}
            itemHeight={20}
            width={document.documentElement.clientWidth}
            height={document.documentElement.clientHeight - 100}
            rowCount={this.state.items.length}
            rowHeight={20}
            itemRenderer={this.props.itemRenderer}
            title={this.props.title}
            initialCount={this.state.itemsShown.length}
          />
        </div>
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
  getAllItemsUrl: React.PropTypes.string.isRequired,
  searchItemsUrl: React.PropTypes.string.isRequired,
  localStorageKey: React.PropTypes.string.isRequired
}

DirectoryPage.defaultProps = {
  title: '',
  icon: '',
  searchInstructions: '',
  itemType: '',
  itemTypePlural: '',
  itemRenderer: null,
  getAllItemsUrl: '',
  searchItemsUrl: '',
  localStorageKey: ''
}

export default DirectoryPage
