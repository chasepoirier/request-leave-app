import React from 'react'
import PropTypes from 'prop-types'
import { TeamPT } from 'customPTs'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { history as historyProps } from 'react-router-prop-types'
import { supervisorOperations } from 'modules/ducks/supervisor'
import { teamOperations } from 'modules/ducks/teams'
import { viewOperations } from 'modules/ducks/view'
import { Checkbox, TextInput, Styled, Dropdown } from '../../../components'
import { FormContainer, InputContainer, FormHeader } from './Styled'

class CreateUserPage extends React.Component {
  state = {
    user: {
      fname: '',
      lname: '',
      status: {
        admin: false,
        supervisor: false
      },
      email: '',
      team: null
    }
  }

  renderStatusMessage = user =>
    `${user.name.fname} was added with the email address: ${user.email}.`

  handleSubmit = e => {
    e.preventDefault()
    const { user } = this.state
    const { submitAddUser, showStatusBar, history, fetchAllTeams } = this.props

    submitAddUser(user)
      .then(res => {
        if (res.payload.user) {
          showStatusBar(this.renderStatusMessage(res.payload.user))
          fetchAllTeams()
          history.push('/admin/all-teams')
        }
      })
      .catch(err => console.log(err))
  }

  handleSelectChange = e => {
    if (e.target.value) {
      const { teams } = this.props
      const { user } = this.state
      /* eslint-disable no-param-reassign */
      const teamID = teams.reduce((prev, current) => {
        if (current.name === e.target.value) {
          prev = current.id
        }
        return prev
      }, {})
      /* eslint-enable no-param-reassign */

      this.setState({
        user: {
          ...user,
          team: teamID
        }
      })
    }
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
    const { error, submitting, teams } = this.props

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
          <Dropdown
            options={teams.map(team => team.name)}
            label="Select a team"
            required
            name="team"
            onSelectChange={this.handleSelectChange}
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
        <Styled.SubmitButton
          type="submit"
          value={submitting ? 'Creating user...' : 'Add User'}
        />
      </FormContainer>
    )
  }
}

CreateUserPage.defaultProps = {
  error: null,
  teams: []
}

const { func, string, bool, arrayOf } = PropTypes

CreateUserPage.propTypes = {
  submitAddUser: func.isRequired,
  showStatusBar: func.isRequired,
  error: string,
  submitting: bool.isRequired,
  history: historyProps.isRequired,
  teams: arrayOf(TeamPT),
  fetchAllTeams: func.isRequired
}

const mapStateToProps = state => ({
  error: state.supervisor.addUser.errors,
  submitting: state.supervisor.addUser.submitting,
  teams: state.teams.all
})

export default withRouter(
  connect(
    mapStateToProps,
    {
      submitAddUser: supervisorOperations.submitAddUser,
      showStatusBar: viewOperations.showStatusBar,
      fetchAllTeams: teamOperations.fetchAllTeams
    }
  )(CreateUserPage)
)
