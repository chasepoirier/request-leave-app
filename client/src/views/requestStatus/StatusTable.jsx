import React from 'react'
import PropTypes from 'prop-types'
import { RequestPT } from 'customPTs'
import { connect } from 'react-redux'
import moment from 'moment'
import { viewOperations } from 'modules/ducks/view'
import { requestOperations, requestSelectors } from 'modules/ducks/requests'

import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TeamsContainer,
  TrashIcon,
  TablePositioner
} from './Styled'
import ApprovalMessage from '../../components/ApprovalMessage'
import TotalTimeCell from '../../components/TotalTimeCell'

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
    const { deleteRequest, userID, teamID, requests } = this.props

    const request = requestSelectors.getOneRequest({ id }, requests.all)

    deleteRequest({
      userID,
      requestID: id,
      teamID,
      request
    }).then(success => {
      if (success) {
        window.location.reload()
      }
    })
  }

  getNameFromRow = event =>
    event.target.parentNode.parentNode.parentNode.children[2].innerText

  renderRequests = requests => {
    const { name } = this.props
    return requests.map(request => (
      <TableRow key={request.id}>
        <TableCell>{`${name.lname}, ${name.fname}`}</TableCell>
        <TableCell>{`${moment(request.timestamp).fromNow(
          'minutes'
        )} ago`}</TableCell>
        <TableCell>
          {request.types.map(
            (type, index) =>
              index === request.types.length - 1 ? type.type : `${type.type}, `
          )}
        </TableCell>
        <TableCell>{moment(request.startDate).format(dateFormat)}</TableCell>
        <TableCell>{moment(request.endDate).format(dateFormat)}</TableCell>
        <TableCell>
          <TotalTimeCell
            total={request.totalTime}
            start={request.startTime}
            end={request.endTime}
          />
        </TableCell>
        <TableCell>{request.reason}</TableCell>
        <TableCell>
          <ApprovalMessage status={request.approval.admin} />
        </TableCell>
        <TableCell>
          <TablePositioner>
            <ApprovalMessage status={request.approval.supervisor} />
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
    const { getPendingRequests, sortByDateCreated } = requestSelectors
    return (
      <TeamsContainer>
        {!requests.loading && (
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Created</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Start Date</TableHeader>
                <TableHeader>End Date</TableHeader>
                <TableHeader>Total Time</TableHeader>
                <TableHeader>Reason</TableHeader>
                <TableHeader>Admin</TableHeader>
                <TableHeader>Clerk</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {this.renderRequests(
                sortByDateCreated(getPendingRequests(requests.all))
              )}
            </tbody>
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
