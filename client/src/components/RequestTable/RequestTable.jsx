import React from 'react'
import { connect } from 'react-redux'
import { Table, TableHeader, Row, TeamsContainer, LoadingState } from './Styled'
import TableRow from './TableRow'

class RequestTable extends React.Component {
  renderRequests = requests =>
    requests.map(req => (
      <TableRow
        startDate={req.startDate}
        types={req.types}
        endDate={req.endDate}
        id={req.id}
        reason={req.reason}
        key={req.timestamp}
        supervisor={req.approval.supervisor}
        admin={req.approval.admin}
        totalTime={req.totalTime}
        endTime={req.endTime}
        startTime={req.startTime}
      />
    ))

  render() {
    const { requests } = this.props
    return (
      <TeamsContainer>
        {requests.length > 0 ? (
          <Table>
            <thead>
              <Row>
                <TableHeader>Type</TableHeader>
                <TableHeader>Start Date</TableHeader>
                <TableHeader>End Date</TableHeader>
                <TableHeader>Total Time</TableHeader>
                <TableHeader>Reason</TableHeader>
                <TableHeader>Admin</TableHeader>
                <TableHeader>Clerk</TableHeader>
              </Row>
            </thead>
            <tbody>{this.renderRequests(requests)}</tbody>
          </Table>
        ) : (
          <LoadingState>No requests found for this user</LoadingState>
        )}
      </TeamsContainer>
    )
  }
}

const mapStateToProps = state => ({
  requests: state.user.selectedUser.info.requests
})

export default connect(mapStateToProps)(RequestTable)
