import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { TableCell, TableRow, TrashIcon, TablePositioner } from './Styled'
import TotalTimeCell from '../../../components/TotalTimeCell'

const dateFormat = 'dd. MMM Do'

const FullTableRow = ({
  name,
  startDate,
  endDate,
  types,
  totalTime,
  reason,
  handleApprove,
  id,
  teamUid,
  userUid,
  teamID,
  team,
  startTime,
  endTime
}) => (
  <TableRow
    id={id}
    onClick={() => handleApprove({ id, teamUid, userUid, teamID })}
  >
    <TableCell>{`${name.lname}, ${name.fname}`}</TableCell>
    {team && <TableCell>{team}</TableCell>}
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
    <TableCell>
      <TablePositioner>
        <TrashIcon className="fas fa-check-circle" id={id} />
        {!reason ? 'No reason provided..' : reason}
      </TablePositioner>
    </TableCell>
  </TableRow>
)

const { string, arrayOf, objectOf, func, number } = PropTypes

FullTableRow.defaultProps = {
  team: null
}

FullTableRow.propTypes = {
  name: objectOf(string).isRequired,
  startDate: string.isRequired,
  endDate: string.isRequired,
  types: arrayOf(objectOf(string)).isRequired,
  totalTime: number.isRequired,
  reason: string.isRequired,
  id: string.isRequired,
  handleApprove: func.isRequired,
  teamUid: string.isRequired,
  teamID: string.isRequired,
  userUid: string.isRequired,
  team: string
}

export default FullTableRow
