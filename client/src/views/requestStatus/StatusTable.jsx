import React from 'react'
import PropTypes from 'prop-types'
import { RequestPT } from 'customPTs'
import { connect } from 'react-redux'
import { viewOperations } from 'modules/ducks/view'
import { requestOperations } from 'modules/ducks/requests'

import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TeamsContainer,
  TrashIcon,
  TablePositioner
} from './Styled'

const { arrayOf, func, string, shape, bool } = PropTypes

class StatusTable extends React.Component {
  static propTypes = {
    requests: shape({ loading: bool, errors: string, all: arrayOf(RequestPT) })
      .isRequired,
    showPopup: func.isRequired,
    hidePopup: func.isRequired,
    fetchAllUserRequests: func.isRequired,
    userID: string.isRequired,
    name: arrayOf(string).isRequired
  }

  componentDidMount() {
    const { fetchAllUserRequests, userID } = this.props
    fetchAllUserRequests(userID)
  }

  handleDangerPopup = e => {
    const { showPopup } = this.props

    showPopup({
      type: 'danger',
      content: {
        title: 'Confirm delete.',
        desc: `Are you sure you want to delete ${this.getNameFromRow(e)}`,
        handleSubmit: this.handleDeleteUser.bind({}, e.target.id)
      }
    })
  }

  handleDeleteRequest = () => {
    const { hidePopup } = this.props
    // submitDeleteUser(id).then(success => {
    //   if (success) {
    //     fetchAllUserRequests()
    hidePopup()
    //   }
    // })
  }

  getNameFromRow = event =>
    event.target.parentNode.parentNode.parentNode.children[2].innerText

  getRequestStatus = status => {
    if (!status.admin) {
      return 'Awaiting admin approval...'
    }
    if (!status.supervisor) {
      return 'Awaiting superivors approval'
    }
    return 'Approved!'
  }

  renderRequests = requests => {
    const { name } = this.props
    return requests.map(request => (
      <TableRow key={request.id}>
        <TableCell>{`${name.lname}, ${name.fname}`}</TableCell>
        <TableCell>{request.startDate}</TableCell>
        <TableCell>{request.totalTime}</TableCell>
        <TableCell>
          <TablePositioner>
            {this.getRequestStatus(request.approval)}
            <TrashIcon
              onClick={this.handleDangerPopup}
              className="fas fa-trash"
              id={request.id}
            />
          </TablePositioner>
        </TableCell>
      </TableRow>
    ))
  }

  render() {
    const { requests } = this.props
    return (
      <TeamsContainer>
        {!requests.loading && (
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Start Date</TableHeader>
                <TableHeader>Total Time</TableHeader>
                <TableHeader>Status</TableHeader>
              </TableRow>
            </thead>
            <tbody>{this.renderRequests(requests.all)}</tbody>
          </Table>
        )}
      </TeamsContainer>
    )
  }
}

const mapStateToProps = state => ({
  requests: state.requests.userRequests,
  userID: state.user.info.id,
  name: state.user.info.name
})

export default connect(
  mapStateToProps,
  {
    showPopup: viewOperations.showPopup,
    hidePopup: viewOperations.hidePopup,
    fetchAllUserRequests: requestOperations.submitRequestForUserRequests
  }
)(StatusTable)
