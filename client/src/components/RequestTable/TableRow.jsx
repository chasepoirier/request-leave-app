import React from 'react'
import moment from 'moment'
import { TableCell, Row } from './Styled'
import ApprovalMessage from '../ApprovalMessage'
import TotalTimeCell from '../TotalTimeCell'

const dateFormat = 'dd. MMM Do'

const TableRow = ({
  startDate,
  endDate,
  types,
  reason,
  id,
  supervisor,
  admin,
  totalTime,
  startTime,
  endTime
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
    <TableCell>
      <TotalTimeCell total={totalTime} start={startTime} end={endTime} />
    </TableCell>
    <TableCell>{!reason ? 'No reason provided..' : reason}</TableCell>
    <TableCell>
      <ApprovalMessage status={admin} />
    </TableCell>
    <TableCell>
      <ApprovalMessage status={supervisor} />
    </TableCell>
  </Row>
)

export default TableRow
