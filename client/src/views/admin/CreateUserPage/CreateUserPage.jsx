import React from 'react'
import PropTypes, { shape } from 'prop-types'
import { TeamPT } from 'customPTs'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { history as historyProps } from 'react-router-prop-types'
import { supervisorOperations } from 'modules/ducks/supervisor'
import { teamOperations } from 'modules/ducks/teams'
import { viewOperations } from 'modules/ducks/view'
import { requestSelectors } from 'modules/ducks/requests'
import { Checkbox, TextInput, Styled, Dropdown } from '../../../components'
import {
  FormContainer,
  InputContainer,
  FormHeader,
  TypeContainer,
  InputContainerWrapped,
  TypeLabel,
  Amount,
  TypeHeader
} from './Styled'

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
      team: null,
      typeAmounts: null,
      startDate: null,
      additionalService: 0
    }
  }

  componentDidMount() {
    const { requestTypes } = this.props
    if (!requestTypes.loading)
      this.calculateInitialTypeAmounts(requestTypes.all)
  }

  componentDidUpdate(prevProps) {
    const { requestTypes } = this.props
    if (
      prevProps.requestTypes.loading !== requestTypes.loading &&
      !requestTypes.loading
    ) {
      this.calculateInitialTypeAmounts(requestTypes.all)
    }
  }

  calculateInitialTypeAmounts = types => {
    const { user } = this.state
    const typeAmounts = []
    types.forEach(type => typeAmounts.push({ id: type.id, amount: 0 }))
    this.setState({ user: { ...user, typeAmounts } })
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

  calculateNewAmount = e => {
    const {
      user: { typeAmounts },
      user
    } = this.state

    const index = typeAmounts.map(type => type.id).indexOf(e.target.name)
    const amount = e.target.value ? this.calculateNumber(e.target.value) : 0
    const updatedAmounts = [
      ...typeAmounts.slice(0, index),
      { ...typeAmounts[index], amount },
      ...typeAmounts.slice(index + 1)
    ]

    this.setState({ user: { ...user, typeAmounts: updatedAmounts } })
  }

  calculateNumber = numString => {
    const number = parseFloat(numString)
    return number < 0 ? 0 : number
  }

  calculateValue = id => {
    const {
      user: { typeAmounts }
    } = this.state
    if (typeAmounts) {
      const index = typeAmounts.map(type => type.id).indexOf(id)
      return typeAmounts[index].amount
    }
    return 0
  }

  renderRequestTypes = types =>
    types.map(type => (
      <TypeContainer key={type.id}>
        <TypeLabel>{type.name}</TypeLabel>
        <Amount
          onChange={this.calculateNewAmount}
          name={type.id}
          type="number"
          value={this.calculateValue(type.id)}
        />
      </TypeContainer>
    ))

  render() {
    const { user } = this.state

    const { error, submitting, teams, requestTypes } = this.props
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
        <TypeHeader>Add Leave Amounts</TypeHeader>
        {!requestTypes.loading && (
          <InputContainerWrapped>
            {this.renderRequestTypes(requestTypes.all)}
          </InputContainerWrapped>
        )}
        <InputContainer>
          <TextInput
            placeholder=""
            type="date"
            value={user.startDate}
            onTextChange={this.handleTextChange}
            name="startDate"
            required
            short
          />
          <TextInput
            type="number"
            value={user.additionalService}
            onTextChange={this.handleTextChange}
            name="additionalService"
            required
            subLabel="Additional service amount in months"
            short
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
  fetchAllTeams: func.isRequired,
  requestTypes: shape({
    loading: bool,
    errors: string,
    all: arrayOf(
      shape({
        id: string,
        name: string
      })
    )
  }).isRequired
}

const mapStateToProps = state => ({
  error: state.supervisor.manageUser.addUser.errors,
  submitting: state.supervisor.manageUser.addUser.submitting,
  teams: state.teams.all,
  requestTypes: requestSelectors.getOnlyTypesWithLimit(
    state.requests.leaveTypes
  )
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
