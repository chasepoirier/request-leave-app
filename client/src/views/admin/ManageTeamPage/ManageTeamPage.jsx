import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Styled } from 'components'
import { viewOperations } from 'modules/ducks/view'
import { userOperations } from 'modules/ducks/user'
import { teamSelectors } from 'modules/ducks/teams'
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TeamsContainer,
  TablePositioner
} from './Styled'

class AllTeamsPage extends React.Component {
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

  handleUserPopup = user => {
    const { showPopup, getUserById } = this.props
    getUserById(user.id)
    showPopup({
      type: 'user-admin',
      content: {
        title: 'All User Requests',
        desc: `View all requests made by ${user.name.fname}`
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
      <TableRow key={user.id} onClick={this.handleUserPopup.bind(this, user)}>
        <TableCell>{user.name.fname}</TableCell>
        <TableCell>{user.name.lname}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <TablePositioner>{this.getUserStatus(user.status)}</TablePositioner>
        </TableCell>
      </TableRow>
    ))

  render() {
    const { team } = this.props
    return (
      <TeamsContainer>
        <Styled.Header>{team.name}</Styled.Header>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>First Name</TableHeader>
              <TableHeader>Last Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Permissions</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {!_.isEmpty(team) && this.renderUsersOfTeam(team.users)}
          </tbody>
        </Table>
      </TeamsContainer>
    )
  }
}

const mapStateToProps = state => ({
  team: teamSelectors.getTeamById(state)
})

export default connect(
  mapStateToProps,
  {
    showPopup: viewOperations.showPopup,
    hidePopup: viewOperations.hidePopup,
    getUserById: userOperations.getUserByIdRequest
  }
)(AllTeamsPage)
