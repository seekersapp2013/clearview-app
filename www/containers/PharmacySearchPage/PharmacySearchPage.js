import React from 'react'
import HomeLink from '../../components/HomeLink'
import axios from 'axios'
import SearchableList from '../../components/SearchableList'

require('es6-promise').polyfill()

const PharmacyListUrl = 'http://clearviewcancer.com:3000/pharmacies'

class PharmacySearchPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pharmacies: props.pharmacies
    }
  }

  componentDidMount () {
    let getPharmacies = new Promise((resolve, reject) => {
      axios.get(PharmacyListUrl)
        .then(function (response) {
          resolve(response.data.message)
        })
        .catch(function (error) {
          console.log(error)
          reject()
        })
    })
    Promise.all([getPharmacies]).then(pharmacyLists => {
      console.log(pharmacyLists[0])
      this.setState({
        pharmacies: pharmacyLists[0]
      })
    })
  }

  renderListItem (item) {
    return (
      <div className="listItem" key={item._id}>
        {item.Name} -- {item.City}, {item.State}
      </div>
    )
  }

  renderEmptyList () {
    return (
      <div>
        No Pharmacies match your search criteria.
      </div>
    )
  }

  render () {
    return (
      <div>
        <HomeLink />
        <SearchableList
          items={this.state.pharmacies}
          itemRenderer={::this.renderListItem}
          emptyListRenderer={::this.renderEmptyList}
          itemHeight={20}
          title="Pharmacies"
          placeholder="Search By Name or Location"
          initialCount={this.state.pharmacies.length}
        />
      </div>
    )
  }
}

PharmacySearchPage.propTypes = {
  pharmacies: React.PropTypes.array.isRequired
}

PharmacySearchPage.defaultProps = {
  pharmacies: []
}

export default PharmacySearchPage

