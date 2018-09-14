import React from 'react'
import { Table, TableHeader, TableRow, TeamsContainer } from './Styled'
import ResultRow from './ResultRow'

export default class PrintedComponent extends React.Component {
  renderResults = results =>
    results.map(result => <ResultRow data={result} key={result.timestamp} />)

  render() {
    const { requests } = this.props

    return (
      <div style={{ margin: '25px auto', width: '98%' }}>
        <TeamsContainer>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Start Date</TableHeader>
                <TableHeader>End Date</TableHeader>
                <TableHeader>Total Time</TableHeader>
                <TableHeader>Admin</TableHeader>
                <TableHeader>Clerk</TableHeader>
                <TableHeader>Reason</TableHeader>
              </TableRow>
            </thead>
            <tbody>{this.renderResults(requests)}</tbody>
          </Table>
        </TeamsContainer>
      </div>
    )
  }
}
