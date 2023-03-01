// Write your JS code here

import {Component} from 'react'

import './index.css'

class RegistrationForm extends Component {
  state = {
    firstNameInput: '',
    lastNameInput: '',
    showFirstNameError: false,
    showLastNameError: false,
    isFormSubmitted: false,
  }

  onBlurLastName = () => {
    const isValidLastName = this.validateLastName()

    this.setState({showLastNameError: !isValidLastName})
  }

  onChangeLastName = event => {
    const {target} = event
    const {value} = target

    this.setState({
      lastNameInput: value,
    })
  }

  renderLastNameField = () => {
    const {lastNameInput, showLastNameError} = this.state
    const className = showLastNameError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="lastName">
          LAST NAME
        </label>
        <input
          type="text"
          id="lastName"
          className={className}
          value={lastNameInput}
          placeholder="Last name"
          onChange={this.onChangeLastName}
          onBlur={this.onBlurLastName}
        />
      </div>
    )
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validateFirstName()

    this.setState({showFirstNameError: !isValidFirstName})
  }

  onChangeFirstName = event => {
    const {target} = event
    const {value} = target

    this.setState({
      firstNameInput: value,
    })
  }

  renderFirstNameField = () => {
    const {firstNameInput, showFirstNameError} = this.state
    const className = showFirstNameError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="firstName">
          FIRST NAME
        </label>
        <input
          type="text"
          id="firstName"
          className={className}
          value={firstNameInput}
          placeholder="First name"
          onChange={this.onChangeFirstName}
          onBlur={this.onBlurFirstName}
        />
      </div>
    )
  }

  validateLastName = () => {
    const {lastNameInput} = this.state

    return lastNameInput !== ''
  }

  validateFirstName = () => {
    const {firstNameInput} = this.state

    return firstNameInput !== ''
  }

  onSubmitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.validateFirstName()
    const isValidLastName = this.validateLastName()

    if (isValidFirstName && isValidLastName) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showFirstNameError: !isValidFirstName,
        showLastNameError: !isValidLastName,
        isFormSubmitted: false,
      })
    }
  }

  renderRegistrationForm = () => {
    const {showFirstNameError, showLastNameError} = this.state

    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        {this.renderFirstNameField()}
        {showFirstNameError && <p className="error-message">Required</p>}
        {this.renderLastNameField()}
        {showLastNameError && <p className="error-message">Required</p>}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    )
  }

  onClickSubmitAnotherResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      firstNameInput: '',
      lastNameInput: '',
    }))
  }

  renderSubmissionSuccessView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-image"
      />
      <p>Submitted Successfully</p>
      <button
        type="button"
        className="submit-button"
        onClick={this.onClickSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </>
  )

  render() {
    const {isFormSubmitted} = this.state

    return (
      <div className="registration-form-container">
        <h1 className="form-title">Registration</h1>
        <div className="view-container">
          {isFormSubmitted
            ? this.renderSubmissionSuccessView()
            : this.renderRegistrationForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm

/*
import {Component} from 'react'

import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    showFirstNameError: false,
    showLastNameError: false,
    isSubmitSuccess: false,
  }

  onEnterFirstName = () => {
    const isValidFirstName = this.validFirstName()

    this.setState({showFirstNameError: !isValidFirstName})
  }

  onChangeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  validFirstName = () => {
    const {firstName} = this.state

    return firstName !== ''
  }

  validLastName = () => {
    const {lastName} = this.state

    return lastName !== ''
  }

  onEnterLastName = () => {
    const isValidLastName = this.validLastName()

    this.setState({showLastNameError: !isValidLastName})
  }

  onChangeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.validFirstName()
    const isValidLastName = this.validLastName()

    if (isValidFirstName && isValidLastName) {
      this.setState({isSubmitSuccess: true})
    } else {
      this.setState({
        isSubmitSuccess: false,
        showFirstNameError: !isValidFirstName,
        showLastNameError: !isValidLastName,
      })
    }
  }

  onChangeStatus = () => {
    this.setState({isSubmitSuccess: false, firstName: '', lastName: ''})
  }

  render() {
    const {
      firstName,
      lastName,
      showFirstNameError,
      showLastNameError,
      isSubmitSuccess,
    } = this.state
    console.log(firstName, lastName)
    const className1 = showFirstNameError && 'error'
    const className2 = showLastNameError && 'error'
    return (
      <div className="bg-container">
        <h1 className="main-heading">Registration</h1>
        {!isSubmitSuccess ? (
          <>
            <form className="login-container" onSubmit={this.onSubmitForm}>
              <label className="label" htmlFor="firstName">
                FIRST NAME
              </label>
              <br />
              <input
                className={`input-element ${className1}`}
                id="firstName"
                placeholder="First Name"
                onBlur={this.isValidFirstName}
                onChange={this.onChangeFirstName}
                value={firstName}
              />
              <br />
              {showFirstNameError && <p className="error-msg">Required</p>}
              <br />
              <label className="label" htmlFor="lastName">
                LAST NAME
              </label>
              <br />
              <input
                className={`input-element ${className2}`}
                id="lastName"
                placeholder="Last Name"
                value={lastName}
                onBlur={this.isValidLastName}
                onChange={this.onChangeLastName}
              />
              <br />
              {showLastNameError && <p className="error-msg">Required</p>}
              <button className="submit-btn" type="submit">
                Submit
              </button>
            </form>
          </>
        ) : (
          <div className="login-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
              alt="success"
              className="success-logo"
            />
            <p className="success">Submitted Successfully</p>
            <button
              type="button"
              className="submit-btn center"
              onClick={this.onChangeStatus}
            >
              Submit Another Response
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default RegistrationForm
*/
