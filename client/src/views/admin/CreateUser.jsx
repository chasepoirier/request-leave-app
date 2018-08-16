import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { supervisorOperations } from 'modules/ducks/supervisor'
import { Checkbox, TextInput, Styled } from '../../components'
import { FormContainer, InputContainer, FormHeader } from './Styled'

class CreateUser extends React.Component {
  state = {
    user: {
      fname: '',
      lname: '',
      status: {
        admin: false,
        supervisor: false
      },
      email: ''
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { user } = this.state
    const { submitAddUser } = this.props

    submitAddUser(user)
  }

  handleTextChange = e => {
    const { user } = this.state
    this.setState({
      user: { ...user, [e.target.name]: e.target.value }
    })
  }

  handleCheckboxChange = e => {
    const { user } = this.state
    this.setState({
      user: {
        ...user,
        status: { ...user.status, [e.target.name]: e.target.checked }
      }
    })
  }

  render() {
    const { user } = this.state
    const { error } = this.props

    return (
      <FormContainer onSubmit={this.handleSubmit}>
        <FormHeader>Register a new User</FormHeader>
        <InputContainer>
          <TextInput
            placeholder="First Name"
            type="text"
            value={user.fname}
            onTextChange={this.handleTextChange}
            name="fname"
            required
            short
          />
          <TextInput
            placeholder="Last Name"
            type="text"
            value={user.lname}
            onTextChange={this.handleTextChange}
            name="lname"
            required
            short
          />
        </InputContainer>
        <InputContainer>
          <TextInput
            placeholder="Email"
            type="email"
            value={user.email}
            onTextChange={this.handleTextChange}
            name="email"
            required
          />
        </InputContainer>
        <InputContainer>
          <Checkbox
            value={user.status.admin}
            label="Admin"
            onInputChange={this.handleCheckboxChange}
            name="admin"
          />
          <Checkbox
            value={user.status.supervisor}
            label="Supervisor"
            onInputChange={this.handleCheckboxChange}
            name="supervisor"
          />
        </InputContainer>
        {error && <InputContainer>{error}</InputContainer>}
        <Styled.SubmitButton type="submit" value="Add User" />
      </FormContainer>
    )
  }
}

CreateUser.defaultProps = {
  error: null
}

CreateUser.propTypes = {
  submitAddUser: PropTypes.func.isRequired,
  error: PropTypes.string
}

const mapStateToProps = state => ({
  error: state.supervisor.addUser.errors
})

export default connect(
  mapStateToProps,
  { submitAddUser: supervisorOperations.submitAddUser }
)(CreateUser)
