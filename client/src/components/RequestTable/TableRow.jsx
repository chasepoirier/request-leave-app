import React from 'react'
import moment from 'moment'
import { TableCell, Row } from './Styled'

const dateFormat = 'dd. MMM Do'

const TableRow = ({
  startDate,
  endDate,
  types,
  reason,
  id,
  supervisor,
  admin
}) => (
  <Row id={id}>
    <TableCell>
      {types.map(
        (type, index) =>
          index === types.length - 1 ? type.type : `${type.type}, `
      )}
    </TableCell>
    <TableCell>{moment(startDate).format(dateFormat)}</TableCell>
    <TableCell>{moment(endDate).format(dateFormat)}</TableCell>
    <TableCell>{!reason ? 'No reason provided..' : reason}</TableCell>
    <TableCell>{getRequestStatus(admin)}</TableCell>
    <TableCell>{getRequestStatus(supervisor)}</TableCell>
  </Row>
)

const getRequestStatus = status => {
  if (status.pending) {
    return 'Awaiting approval...'
  }
  if (status.approved) {
    return 'Approved!'
  }
  return 'Disapproved'
}

export default TableRow
