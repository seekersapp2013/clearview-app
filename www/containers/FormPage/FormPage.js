import React from 'react'
import BackLink from '../../components/BackLink'
import FooterNav from '../../components/FooterNav'
import Axios from 'axios'
import './FormPage.styl'

const FORM_SUBMISSION_URL = 'http://clearviewcancer.com:3000/sendmail/'

class FormPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messageSent: false,
      error: null,
      validationHelp: null,
      loading: false
    }
  }

  renderEmail () {
    const userName = document.getElementById('name').value
    const userPhone = document.getElementById('phone').value
    const userEmail = document.getElementById('email').value

    if (userName.length && userPhone.length && userEmail.length) {
      let emailBody = [this.props.emailHeader]
      emailBody.push('------------------')
      emailBody.push('')
      emailBody.push('Name: ' + userName)
      emailBody.push('Email: ' + userPhone)
      emailBody.push('Phone: ' + userEmail)
      emailBody.push('')
      return (emailBody.join('\n'))
    } else {
      return false
    }
  }

  validateForm () {
    const formInputs = [
      document.querySelector('.FormPage__Form__InputGroup--Name'),
      document.querySelector('.FormPage__Form__InputGroup--Phone'),
      document.querySelector('.FormPage__Form__InputGroup--Email')
    ]
    let errors = []
    formInputs.map((el) => {
      const input = el.querySelector('input')
      const hasInput = (input.value.trim() !== '')
      if (!hasInput) {
        input.classList.add('error')
        errors.push('error')
      } else {
        input.classList.remove('error')
      }
    })
    return (errors.length === 0)
  }

  submitForm (emailBody) {
    let message = {
      text: emailBody,
      from: 'CCI Directory App <clearviewcancerinstitute@gmail.com>',
      to: 'CCI <clearviewcancerinstitute@gmail.com>',
      subject: this.props.emailSubject
    }
    let _this = this
    Axios.post(FORM_SUBMISSION_URL + encodeURIComponent(JSON.stringify(message)))
      .then(function () {
        _this.setState({
          error: null,
          loading: false,
          messageSent: true
        })
      })
      .catch(function (error) {
        _this.setState({
          error: error,
          loading: false,
          messageSent: false
        })
      })
  }

  onSubmit () {
    const isValid = this.validateForm()
    if (isValid) {
      this.setState({
        validationHelp: null,
        loading: true
      })
      const emailBody = this.renderEmail()
      if (emailBody) {
        this.submitForm(emailBody)
      }
    } else {
      this.setState({
        validationHelp: 'Please complete all required fields.',
        loading: false,
        messageSent: false
      })
    }
  }

  render () {
    const renderForm = function (onSubmit) {
      return (
        <div className="FormPage__Form">
          <div className="FormPage__Form__InputGroup FormPage__Form__InputGroup--Name">
            <label htmlFor="name">My name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required="required" />
          </div>
          <div className="FormPage__Form__InputGroup FormPage__Form__InputGroup--Phone">
            <label htmlFor="phone">My phone number</label>
            <input type="number" id="phone" name="phone" placeholder="(555) 555-5555" />
          </div>
          <div className="FormPage__Form__InputGroup FormPage__Form__InputGroup--Email">
            <label htmlFor="email">My email address</label>
            <input type="email" id="email" name="email" placeholder="Enter your email address" />
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

    const loading = (this.state.loading)
      ? (<div className="FormPage__Form__LoadingIndicator">Submitting Form...</div>)
      : ''

    const smallPhone = (document.documentElement.clientHeight <= 480)

    const mainHeight = (smallPhone)
      ? document.documentElement.clientHeight - 200
      : document.documentElement.clientHeight - 252

    const pageClass = (smallPhone)
      ? 'FormPage FormPage--small'
      : 'FormPage'

    const message = (this.state.loading)
      ? loading
      : <div className="FormPage__Form__Error">{this.state.validationHelp}</div>

    return (
      <div className={'Page ErrorReportPage ' + pageClass}>
        <div>
          <header>
            <div className="FormPage__TopBar">
              <BackLink to={this.props.backLinkLocation} text={backLinkText} />
              <div className={'FormPage__Icon FormPage__Icon--' + this.props.iconClassName}></div>
            </div>
            <div className="FormPage__Instructions">
              {this.props.headerBody}
            </div>
          </header>
          <main style={{height: mainHeight}}>
            {message}
            {main}
          </main>
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
