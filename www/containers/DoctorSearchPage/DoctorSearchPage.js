import React from 'react'
import HomeLink from '../../components/HomeLink'
import axios from 'axios'
import { VirtualScroll } from 'react-virtualized'
import 'react-virtualized/styles.css'
import './DoctorSearchPage.styl'

require('es6-promise').polyfill()

class DoctorSearchPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      doctors: props.doctors
    }
  }

  componentDidMount () {
    let getDoctors = new Promise((resolve, reject) => {
      axios.get('http://clearviewcancer.com:3000/doctors')
        .then(function (response) {
          resolve(response.data.message)
        })
        .catch(function (error) {
          console.log(error)
          reject()
        })
    })
    Promise.all([getDoctors]).then(doctorLists => {
      this.setState({
        doctors: doctorLists[0]
      })
    })
  }

  renderItem ({index, isScrolling}) {
    return (<div className="listItem" key={this.state.doctors[index]._id}>{this.state.doctors[index].LastName}, {this.state.doctors[index].FirstName}</div>)
  }

  render () {
    return (
      <div>
        <HomeLink />
        {Doctor} Search Page
        <VirtualScroll
          className="doctor-list-scroll-container"
          width={document.documentElement.clientWidth}
          height={document.documentElement.clientHeight - 100}
          rowCount={this.state.doctors.length}
          rowHeight={20}
          rowRenderer={::this.renderItem}
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
