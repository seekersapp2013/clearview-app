import React from 'react'
import HomeLink from '../../components/HomeLink'
import axios from 'axios'
import SearchableList from '../../components/SearchableList'
import DebouncedInput from 'react-debounce-input'

require('es6-promise').polyfill()

const DoctorListUrl = 'http://clearviewcancer.com:3000/doctors'
const DoctorSearchUrl = 'http://clearviewcancer.com:3000/doctors/search/'

class DoctorSearchPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      doctors: props.doctors,
      doctorsShown: props.doctors
    }
  }

  componentDidMount () {
    let getDoctors = new Promise((resolve, reject) => {
      axios.get(DoctorListUrl)
        .then(function (response) {
          resolve(response.data.message)
        })
        .catch(function (error) {
          console.log(error)
          reject()
        })
    })
    Promise.all([getDoctors]).then(doctorLists => {
      console.log(doctorLists[0])
      this.setState({
        doctors: doctorLists[0]
      })
    })
  }

  renderListItem (item) {
    return (
      <div className="listItem" key={item._id}>
        {item.LastName}, {item.FirstName}
      </div>
    )
  }

  renderEmptyList () {
    return (
      <div>
        No Doctors match your search criteria.
      </div>
    )
  }

  handleFilterStringChange (e) {
    if (typeof e === 'object' && e.target.value.trim() !== '') {
      let getDoctors = new Promise((resolve, reject) => {
        axios.get(DoctorSearchUrl + e.target.value)
          .then(function (response) {
            resolve(response.data.message)
          })
          .catch(function (error) {
            console.log(error)
            reject()
          })
      })
      Promise.all([getDoctors]).then(doctorLists => {
        console.log(doctorLists[0])
        this.setState({
          doctorsShown: doctorLists[0]
        })
      })
    } else {
      this.setState({
        doctorsShown: this.state.doctors
      })
    }
  }

  render () {
    return (
      <div>
        <HomeLink />
        <div>
          <DebouncedInput
            className="doctor-list__header__filter-input"
            debounceTimeout={300}
            onChange={::this.handleFilterStringChange}
            type="text"
            placeholder="Search By Name or Specialty"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>
        <SearchableList
          items={this.state.doctorsShown}
          itemRenderer={::this.renderListItem}
          emptyListRenderer={::this.renderEmptyList}
          itemHeight={20}
          title="Doctors"
          placeholder="Search By Name or Specialty"
          initialCount={this.state.doctors.length}
        />
      </div>
    )
  }
}

DoctorSearchPage.propTypes = {
  doctors: React.PropTypes.array.isRequired
}

DoctorSearchPage.defaultProps = {
  doctors: []
}

export default DoctorSearchPage
