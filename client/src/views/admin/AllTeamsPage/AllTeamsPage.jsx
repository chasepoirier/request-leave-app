import React from 'react'
import PropTypes from 'prop-types'
import { TeamPT } from 'customPTs'
import { connect } from 'react-redux'
import { Styled } from 'components'
import { viewOperations } from 'modules/ducks/view'
import { userOperations } from 'modules/ducks/user'
import { teamOperations, teamSelectors } from 'modules/ducks/teams'
import { supervisorOperations } from 'modules/ducks/supervisor'
import {
  TeamHeader,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TeamsContainer,
  TrashIcon,
  TablePositioner,
  EditIcon
} from './Styled'

const { arrayOf, func } = PropTypes

class AllTeamsPage extends React.Component {
  static propTypes = {
    teams: arrayOf(TeamPT).isRequired,
    showPopup: func.isRequired,
    hidePopup: func.isRequired,
    submitDeleteUser: func.isRequired,
    fetchAllTeams: func.isRequired
  }

  handleDangerPopup = e => {
    const { showPopup } = this.props

    showPopup({
      type: 'danger',
      content: {
        title: 'Confirm delete.',
        desc: `Are you sure you want to delete ${this.getNameFromRow(e)}`,
        buttonText: `Delete User`,
        handleSubmit: this.handleDeleteUser.bind({}, e.target.id)
      }
    })
  }

  handleUserPopup = e => {
    const { showPopup, getUserById, updateUserRequest } = this.props
    getUserById(e.target.id)
    showPopup({
      type: 'user',
      content: {
        title: 'Edit User',
        desc: `Change user permissions, user's team, or adjust their leave hours.`,
        updateUserRequest
      }
    })
  }

  handleDeleteUser = id => {
    const { submitDeleteUser, fetchAllTeams, hidePopup } = this.props
    submitDeleteUser(id).then(success => {
      if (success) {
        fetchAllTeams()
        hidePopup()
      }
    })
  }

  getNameFromRow = event =>
    event.target.parentNode.parentNode.parentNode.children[2].innerText

  getUserStatus = status => {
    if (status.supervisor && status.admin) {
      return 'Admin, Supervisor'
    }
    if (status.supervisor) {
      return 'Supervisor'
    }
    if (status.admin) {
      return 'Admin'
    }
    return 'Employee'
  }

  renderUsersOfTeam = users =>
    users.map(user => (
      <TableRow key={user.id}>
        <TableCell>{user.name.fname}</TableCell>
        <TableCell>{user.name.lname}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <TablePositioner>
            {this.getUserStatus(user.status)}
            <EditIcon
              id={user.id}
              onClick={this.handleUserPopup}
              className="fas fa-user-edit"
            />
            <TrashIcon
              onClick={this.handleDangerPopup}
              className="fas fa-trash"
              id={user.id}
            />
          </TablePositioner>
        </TableCell>
      </TableRow>
    ))

  renderTeams = teams =>
    teams.map(team => (
      <div key={team.id}>
        <TeamHeader>{team.name}</TeamHeader>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>First Name</TableHeader>
              <TableHeader>Last Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Permissions</TableHeader>
            </TableRow>
          </thead>
          <tbody>{this.renderUsersOfTeam(team.users)}</tbody>
        </Table>
      </div>
    ))

  render() {
    const { teams } = this.props
    return (
      <TeamsContainer>
        <Styled.Header>Teams</Styled.Header>
        {this.renderTeams(teams)}
      </TeamsContainer>
    )
  }
}

const mapStateToProps = state => ({
  teams: teamSelectors.sortTeamsAlphabetically(state.teams.all)
})

export default connect(
  mapStateToProps,
  {
    showPopup: viewOperations.showPopup,
    hidePopup: viewOperations.hidePopup,
    submitDeleteUser: supervisorOperations.submitDeleteUser,
    updateUserRequest: supervisorOperations.updateUserRequest,
    fetchAllTeams: teamOperations.fetchAllTeams,
    getUserById: userOperations.getUserByIdRequest
  }
)(AllTeamsPage)
