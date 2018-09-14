import React from 'react'
import moment from 'moment'
import { TableCell, TableRow } from './Styled'
import TotalTimeCell from '../../../components/TotalTimeCell'
import ApprovalMessage from '../../../components/ApprovalMessage'

const dateFormat = 'dd. MMM Do'

const ResultRow = ({ data }) => (
  <TableRow id={data.id}>
    <TableCell>
      {`${data.name.lname}, ${data.name.fname}`}
      <div style={{ fontSize: 13, marginTop: 3 }}>{data.email}</div>
    </TableCell>
    {data.team && <TableCell>{data.team}</TableCell>}
    <TableCell>
      {data.types.map(
        (type, index) =>
          index === data.types.length - 1 ? type.type : `${type.type}, `
      )}
    </TableCell>
    <TableCell>{moment(data.startDate).format(dateFormat)}</TableCell>
    <TableCell>{moment(data.endDate).format(dateFormat)}</TableCell>
    <TableCell>
      <TotalTimeCell
        total={data.totalTime}
        start={data.startTime}
        end={data.endTime}
      />
    </TableCell>
    <TableCell>
      <ApprovalMessage status={data.approval.admin} />
    </TableCell>
    <TableCell>
      <ApprovalMessage status={data.approval.supervisor} />
    </TableCell>
    <TableCell style={{ maxWidth: 300 }}>
      {!data.reason ? 'No reason provided..' : data.reason}
    </TableCell>
  </TableRow>
)

export default ResultRow
