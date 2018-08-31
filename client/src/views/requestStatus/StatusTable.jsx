import React from 'react'
import PropTypes from 'prop-types'
import { RequestPT } from 'customPTs'
import { connect } from 'react-redux'
import moment from 'moment'
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

const { arrayOf, objectOf, func, string, shape, bool } = PropTypes
const dateFormat = 'dd. MMM Do'
class StatusTable extends React.Component {
  static propTypes = {
    requests: shape({ loading: bool, errors: string, all: arrayOf(RequestPT) })
      .isRequired,
    showPopup: func.isRequired,
    hidePopup: func.isRequired,
    fetchAllUserRequests: func.isRequired,
    userID: string.isRequired,
    teamID: string.isRequired,
    name: objectOf(string).isRequired,
    deleteRequest: func.isRequired
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
        buttonText: `Delete Request`,
        handleSubmit: this.handleDeleteRequest.bind({}, e.target.id)
      }
    })
  }

  handleDeleteRequest = id => {
    const {
      hidePopup,
      deleteRequest,
      fetchAllUserRequests,
      userID,
      teamID
    } = this.props
    deleteRequest({ userID, requestID: id, teamID }).then(success => {
      if (success) {
        fetchAllUserRequests(userID)
        hidePopup()
      }
    })
  }

  getNameFromRow = event =>
    event.target.parentNode.parentNode.parentNode.children[2].innerText

  getRequestStatus = status => {
    if (status.pending) {
      return 'Awaiting approval...'
    }
    if (status.approved) {
      return 'Approved!'
    }
    return 'Disapproved'
  }

  renderRequests = requests => {
    const { name } = this.props
    return requests.map(request => (
      <TableRow key={request.id}>
        <TableCell>{`${name.lname}, ${name.fname}`}</TableCell>
        <TableCell>{moment(request.startDate).format(dateFormat)}</TableCell>
        <TableCell>{moment(request.endDate).format(dateFormat)}</TableCell>
        <TableCell>{request.totalTime}</TableCell>
        <TableCell>{request.reason}</TableCell>
        <TableCell>{this.getRequestStatus(request.approval.admin)}</TableCell>
        <TableCell>
          <TablePositioner>
            {this.getRequestStatus(request.approval.supervisor)}
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
                <TableHeader>End Date</TableHeader>
                <TableHeader>Total Time</TableHeader>
                <TableHeader>Reason</TableHeader>
                <TableHeader>Admin</TableHeader>
                <TableHeader>Supervisor</TableHeader>
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
  name: state.user.info.name,
  teamID: state.user.info.team
})

export default connect(
  mapStateToProps,
  {
    showPopup: viewOperations.showPopup,
    hidePopup: viewOperations.hidePopup,
    fetchAllUserRequests: requestOperations.submitRequestForUserRequests,
    deleteRequest: requestOperations.submitRequestToDeleteRequest
  }
)(StatusTable)
