import React from 'react'
import PropTypes from 'prop-types'
import { RequestPT } from 'customPTs'
import { connect } from 'react-redux'
import { viewOperations } from 'modules/ducks/view'
import { requestOperations } from 'modules/ducks/requests'

import {
  Table,
  TableHeader,
  TableRow,
  TeamsContainer,
  LoadingState
} from './Styled'
import FullTableRow from './FullTableRow'

class AdminTable extends React.Component {
  handleApproval = id => {
    const { showPopup, setCurrentRequest, requests } = this.props

    setCurrentRequest(id, requests.all)
    showPopup({
      type: 'approval',
      content: {
        title: 'Confirm Approval.',
        desc: `Are you sure you want to approve`,
        handleApprove: this.submitRequest.bind({}, id, true),
        handleDisapprove: this.submitRequest.bind({}, id, false)
      }
    })
  }

  submitRequest = (id, approved) => {
    const { hidePopup } = this.props
    // deleteRequest({ requestID: id, teamID }).then(success => {
    //   if (success) {
    console.log(id, approved)
    hidePopup()
    //   }
    // })
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
      />
    ))

  render() {
    const { requests } = this.props
    return (
      <TeamsContainer>
        {!requests.loading ? (
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
            <tbody>{this.renderRequests(requests.all)}</tbody>
          </Table>
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
  setCurrentRequest: func.isRequired
}

const mapStateToProps = state => ({
  requests: state.admin.pendingApprovals,
  teamID: state.user.info.team
})

export default connect(
  mapStateToProps,
  {
    showPopup: viewOperations.showPopup,
    hidePopup: viewOperations.hidePopup,
    setCurrentRequest: requestOperations.setCurrentRequest
  }
)(AdminTable)
