import React from 'react'
import { connect } from 'react-redux'
import { Table, TableRow, TableCell, TableHeader, TableLabel } from './Styled'

class LeaveTable extends React.Component {
  renderTableRows = amounts =>
    amounts.map(type => <TableCell key={type.id}>{type.amount}</TableCell>)

  renderTableHeaders = amounts =>
    amounts.map(type => (
      <TableHeader key={type.id}>{this.getNameFromType(type.id)}</TableHeader>
    ))

  getNameFromType = id => {
    const { types } = this.props
    return types.all.reduce((prev, curr) => {
      if (curr.id === id) {
        prev = curr.name
      }
      return prev
    }, null)
  }

  render() {
    // console.log(this.props.amounts)
    return (
      <div style={{ marginTop: 40 }}>
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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  amounts: state.user.info.typeAmounts,
  types: state.requests.leaveTypes
})

export default connect(mapStateToProps)(LeaveTable)
