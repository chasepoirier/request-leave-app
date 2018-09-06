import React from 'react'
import PropTypes from 'prop-types'
import { RequestPT } from 'customPTs'
import { connect } from 'react-redux'
import { viewOperations } from 'modules/ducks/view'
import { requestOperations } from 'modules/ducks/requests'
import { supervisorOperations } from 'modules/ducks/supervisor'

import {
  Table,
  TableHeader,
  TableRow,
  TeamsContainer,
  LoadingState
} from './Styled'
import FullTableRow from './FullTableRow'

class SuperTable extends React.Component {
  handleApproval = ids => {
    const { showPopup, setCurrentRequest, requests } = this.props

    setCurrentRequest(ids, requests.all)
    showPopup({
      type: 'approval',
      content: {
        title: 'Confirm Approval',
        desc: `Are you sure you want to approve this request?`,
        handleApprove: this.submitRequest.bind({}, ids, true),
        handleDisapprove: this.submitRequest.bind({}, ids, false)
      }
    })
  }

  submitRequest = (ids, approved) => {
    const {
      hidePopup,
      submitApprovalStatus,
      fetchPendingApprovals,
      teamID
    } = this.props
    submitApprovalStatus(ids, approved).then(() => {
      fetchPendingApprovals(teamID)
      hidePopup()
    })
  }

  renderRequests = (requests, teamID) =>
    requests.map(req => (
      <FullTableRow
        name={req.name}
        startDate={req.startDate}
        types={req.types}
        endDate={req.endDate}
        id={req.id}
        handleApprove={this.handleApproval}
        reason={req.reason}
        totalTime={req.totalTime}
        key={req.timestamp}
        teamID={req.teamId}
        userUid={req.userUid}
        teamUid={req.teamUid}
        team={req.team}
      />
    ))

  render() {
    const { requests, teamID } = this.props
    return (
      <TeamsContainer>
        {!requests.loading ? (
          <div>
            {requests.all.length === 0 ? (
              <LoadingState>No pending leave requests</LoadingState>
            ) : (
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Team</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Start Date</TableHeader>
                    <TableHeader>End Date</TableHeader>
                    <TableHeader>Total Time</TableHeader>
                    <TableHeader>Reason</TableHeader>
                  </TableRow>
                </thead>
                <tbody>{this.renderRequests(requests.all, teamID)}</tbody>
              </Table>
            )}
          </div>
        ) : (
          <LoadingState>Loading...</LoadingState>
        )}
      </TeamsContainer>
    )
  }
}

const { arrayOf, func, string, shape, bool } = PropTypes

SuperTable.propTypes = {
  requests: shape({ loading: bool, errors: string, all: arrayOf(RequestPT) })
    .isRequired,
  showPopup: func.isRequired,
  hidePopup: func.isRequired,
  setCurrentRequest: func.isRequired,
  teamID: string.isRequired,
  submitApprovalStatus: func.isRequired,
  fetchPendingApprovals: func.isRequired
}

const mapStateToProps = state => ({
  requests: state.supervisor.pendingApprovals,
  teamID: state.user.info.team
})

export default connect(
  mapStateToProps,
  {
    showPopup: viewOperations.showPopup,
    hidePopup: viewOperations.hidePopup,
    setCurrentRequest: requestOperations.setCurrentRequest,
    submitApprovalStatus: supervisorOperations.submitApprovalStatus,
    fetchPendingApprovals: supervisorOperations.fetchPendingApprovals
  }
)(SuperTable)
