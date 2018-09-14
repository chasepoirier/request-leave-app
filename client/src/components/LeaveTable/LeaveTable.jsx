import React from 'react'
import { connect } from 'react-redux'
import { userSelectors } from '../../modules/ducks/user'
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TableLabel,
  TableWrapper
} from './Styled'

class LeaveTable extends React.Component {
  renderTableRows = amounts =>
    amounts.map(type => <TableCell key={type.id}>{type.amount}</TableCell>)

  renderTableHeaders = amounts =>
    amounts.map(type => <TableHeader key={type.id}>{type.name}</TableHeader>)

  render() {
    // console.log(this.props.amounts)
    return (
      <TableWrapper>
        <TableLabel>Available Leave Amounts</TableLabel>
        {!this.props.types.loading && (
          <Table>
            <thead>
              <TableRow>{this.renderTableHeaders(this.props.amounts)}</TableRow>
            </thead>
            <tbody>
              <TableRow>{this.renderTableRows(this.props.amounts)}</TableRow>
            </tbody>
          </Table>
        )}
      </TableWrapper>
    )
  }
}

const mapStateToProps = state => ({
  amounts: userSelectors.sortLeaveAmountsByOrder(state),
  types: state.requests.leaveTypes
})

export default connect(mapStateToProps)(LeaveTable)
