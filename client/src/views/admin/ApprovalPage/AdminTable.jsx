import React from 'react'
import PropTypes from 'prop-types'
import { RequestPT } from 'customPTs'
import { connect } from 'react-redux'
import { viewOperations } from 'modules/ducks/view'

import { Table, TableHeader, TableRow, TeamsContainer } from './Styled'
import FullTableRow from './FullTableRow'

class AdminTable extends React.Component {
  handleDangerPopup = e => {
    const { showPopup } = this.props

    showPopup({
      type: 'success',
      content: {
        title: 'Confirm Approval.',
        desc: `Are you sure you want to approve`,
        handleSubmit: this.handleApprovalRequest.bind({}, e.target.id)
      }
    })
  }

  handleApprovalRequest = () => {
    const { hidePopup } = this.props
    // deleteRequest({ requestID: id, teamID }).then(success => {
    //   if (success) {
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
        id={req.uid}
        handleApprove={this.handleDangerPopup}
        reason={req.reason}
        totalTime={req.totalTime}
      />
    ))

  render() {
    const { requests } = this.props
    return (
      <TeamsContainer>
        {!requests.loading && (
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
  hidePopup: func.isRequired
}

const mapStateToProps = state => ({
  requests: state.admin.pendingApprovals,
  teamID: state.user.info.team
})

export default connect(
  mapStateToProps,
  {
    showPopup: viewOperations.showPopup,
    hidePopup: viewOperations.hidePopup
  }
)(AdminTable)
