import React from 'react'
import BackLink from '../../components/BackLink'
import FooterNav from '../../components/FooterNav'
// import Axios from 'axios'
import 'react-fastclick'
import './FormPage.styl'

class FormPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messageSent: false,
      error: null
    }
  }

  validateForm () {
    const formInputs = [
      document.querySelector('.FormPage__Form__InputGroup--Name'),
      document.querySelector('.FormPage__Form__InputGroup--Phone'),
      document.querySelector('.FormPage__Form__InputGroup--Email')
    ]

    formInputs.map((derp) => {
      console.log(derp)
      const input = derp.querySelector('input')
      const errorMessage = derp.querySelector('.errorMessage')
      const hasInput = (input.value.trim() !== '')
      if (!hasInput) {
        input.classList.add('error')
        errorMessage.innerHtml = 'This field is required.'
      }
    })
  }

  onSubmit () {
    // const formStatus = this.validateForm()
    this.validateForm()
    // const userName = document.getElementById('name').value
    // const userPhone = document.getElementById('phone').value
    // const userEmail = document.getElementById('email').value

    // let page = this
    // let message = {
    //   text: '',
    //   from: 'CCI Directory App <clearviewcancerinstitute@gmail.com>',
    //   to: 'CCI <clearviewcancerinstitute@gmail.com>',
    //   subject: this.props.emailSubject
    // }
    //
    // let emailBody = [this.props.emailHeader]
    // emailBody.push('------------------')
    // emailBody.push('')
    // emailBody.push('Name: ' + userName)
    // emailBody.push('Email: ' + userPhone)
    // emailBody.push('Phone: ' + userEmail)
    // emailBody.push('')
    // message.text = emailBody.join('\n')
    //
    // Axios.post('http://clearviewcancer.com:3000/sendmail/' + encodeURIComponent(JSON.stringify(message)))
    //   .then(function (response) {
    //     page.setState({
    //       messageSent: true
    //     })
    //   })
    //   .catch(function (error) {
    //     page.setState({
    //       messageSent: false,
    //       error: error
    //     })
    //   })
  }

  render () {
    const renderForm = function (onSubmit) {
      return (
        <div className="FormPage__Form">
          <div className="FormPage__Form__InputGroup FormPage__Form__InputGroup--Name">
            <label htmlFor="name">My name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required="required" />
            <div className="errorMessage"></div>
          </div>
          <div className="FormPage__Form__InputGroup FormPage__Form__InputGroup--Phone">
            <label htmlFor="phone">My phone number</label>
            <input type="text" id="phone" name="phone" placeholder="(555) 555-5555" />
            <div className="errorMessage"></div>
          </div>
          <div className="FormPage__Form__InputGroup FormPage__Form__InputGroup--Email">
            <label htmlFor="email">My email address</label>
            <input type="email" id="email" name="email" placeholder="Enter your email address" />
            <div className="errorMessage"></div>
          </div>
          <div className="Button" onClick={onSubmit}>Submit</div>
        </div>
      )
    }

    const renderSuccessMessage = function () {
      return (
        <div className="FormPage__Message">
          <p>Thank you.</p>
          <p>Your information has been logged by our system and you should hear from a representative shortly.</p>
        </div>
      )
    }

    const renderError = function (err) {
      return (
        <div className="FormPage__Message FormPage__Message--Error">
          <p>There was an error submitting the form. Please try again later.</p>
          <p>Error: {err.message}</p>
        </div>
      )
    }

    const backLinkText = (this.props.backLinkLocation === '/')
      ? 'Home'
      : 'Back'

    let main = (!this.state.messageSent)
      ? renderForm(::this.onSubmit)
      : renderSuccessMessage()

    main = (!this.state.error)
      ? main
      : renderError(this.state.error)

    return (
      <div className="Page FormPage ErrorReportPage">
        <BackLink to={this.props.backLinkLocation} text={backLinkText} />
        <div>
          <header>
            <div className={'FormPage__Icon FormPage__Icon--' + this.props.iconClassName}></div>
            <div className="FormPage__Instructions">
              {this.props.headerBody}
            </div>
          </header>
          <main>{main}</main>
        </div>
        <FooterNav />
      </div>
    )
  }
}

FormPage.propTypes = {
  params: React.PropTypes.object,
  error: React.PropTypes.any,
  formSubmitted: React.PropTypes.bool,
  backLinkLocation: React.PropTypes.string.isRequired,
  iconClassName: React.PropTypes.string.isRequired,
  headerBody: React.PropTypes.object.isRequired,
  emailSubject: React.PropTypes.string,
  emailHeader: React.PropTypes.string
}

FormPage.defaultProps = {
  params: {},
  error: null,
  formSubmitted: false,
  iconClassName: null,
  headerText: '',
  emailSubject: '',
  emailHeader: ''
}

export default FormPage
