import React from 'react'
import HomeLink from '../../components/HomeLink'
import axios from 'axios'
import SearchableList from '../../components/SearchableList'

require('es6-promise').polyfill()

const HospitalListUrl = 'http://clearviewcancer.com:3000/hospitals'

class HospitalSearchPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      hospitals: props.hospitals
    }
  }

  componentDidMount () {
    let getHospitals = new Promise((resolve, reject) => {
      axios.get(HospitalListUrl)
        .then(function (response) {
          resolve(response.data.message)
        })
        .catch(function (error) {
          console.log(error)
          reject()
        })
    })
    Promise.all([getHospitals]).then(hospitalLists => {
      console.log(hospitalLists[0])
      this.setState({
        hospitals: hospitalLists[0]
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
        No Hospitals match your search criteria.
      </div>
    )
  }

  render () {
    return (
      <div>
        <HomeLink />
        <SearchableList
          items={this.state.hospitals}
          itemRenderer={::this.renderListItem}
          emptyListRenderer={::this.renderEmptyList}
          itemHeight={20}
          title="Hospitals"
          placeholder="Search By Name or Location"
          initialCount={this.state.hospitals.length}
        />
      </div>
    )
  }
}

HospitalSearchPage.propTypes = {
  hospitals: React.PropTypes.array.isRequired
}

HospitalSearchPage.defaultProps = {
  hospitals: []
}

export default HospitalSearchPage

