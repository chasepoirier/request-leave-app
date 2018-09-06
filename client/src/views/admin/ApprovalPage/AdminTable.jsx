import React from 'react'
import PropTypes from 'prop-types'
import { RequestPT } from 'customPTs'
import { connect } from 'react-redux'
import { viewOperations } from 'modules/ducks/view'
import { requestOperations, requestSelectors } from 'modules/ducks/requests'
import { adminOperations } from 'modules/ducks/admin'

import {
  Table,
  TableHeader,
  TableRow,
  TeamsContainer,
  LoadingState
} from './Styled'
import FullTableRow from './FullTableRow'

class AdminTable extends React.Component {
  handleApproval = ids => {
    const { showPopup, setCurrentRequest, requests } = this.props

    setCurrentRequest(ids, requests.all)
    showPopup({
      type: 'approval',
      content: {
        title: 'Confirm Approval.',
        desc: `Are you sure you want to approve`,
        handleApprove: this.submitRequest.bind({}, ids, true),
        handleDisapprove: this.submitRequest.bind({}, ids, false)
      }
    })
  }

  submitRequest = (ids, approved) => {
    const {
      hidePopup,
      submitApprovalStatus,
      fetchAdminPendingApprovals,
      teamID
    } = this.props
    submitApprovalStatus(ids, approved).then(() => {
      fetchAdminPendingApprovals(teamID)
      hidePopup()
    })
  }

  renderRequests = requests =>
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
      />
    ))

  render() {
    const { requests } = this.props
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
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Start Date</TableHeader>
                    <TableHeader>End Date</TableHeader>
                    <TableHeader>Total Time</TableHeader>
                    <TableHeader>Reason</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {this.renderRequests(
                    requestSelectors.sortByDateCreated(requests.all)
                  )}
                </tbody>
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

AdminTable.propTypes = {
  requests: shape({ loading: bool, errors: string, all: arrayOf(RequestPT) })
    .isRequired,
  showPopup: func.isRequired,
  hidePopup: func.isRequired,
  setCurrentRequest: func.isRequired,
  submitApprovalStatus: func.isRequired,
  fetchAdminPendingApprovals: func.isRequired
}

const mapStateToProps = state => ({
  requests: state.admin.pendingApprovals
})

export default connect(
  mapStateToProps,
  {
    showPopup: viewOperations.showPopup,
    hidePopup: viewOperations.hidePopup,
    setCurrentRequest: requestOperations.setCurrentRequest,
    submitApprovalStatus: adminOperations.submitApprovalStatus,
    fetchAdminPendingApprovals: adminOperations.fetchPendingApprovals
  }
)(AdminTable)
