import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { TableCell, TableRow, TrashIcon, TablePositioner } from './Styled'

const dateFormat = 'dd. MMM Do'

const FullTableRow = ({
  name,
  startDate,
  endDate,
  types,
  totalTime,
  reason,
  handleApprove,
  id
}) => (
  <TableRow>
    <TableCell>{`${name.lname}, ${name.fname}`}</TableCell>
    <TableCell>
      {types.map(
        (type, index) =>
          index === types.length - 1 ? type.type : `${type.type}, `
      )}
    </TableCell>
    <TableCell>{moment(startDate).format(dateFormat)}</TableCell>
    <TableCell>{moment(endDate).format(dateFormat)}</TableCell>
    <TableCell>{totalTime}</TableCell>
    <TableCell>
      <TablePositioner>
        <TrashIcon onClick={handleApprove} className="fas fa-trash" id={id} />
        {!reason ? 'No reason provided..' : reason}
      </TablePositioner>
    </TableCell>
  </TableRow>
)

const { string, arrayOf, objectOf, func, number } = PropTypes

FullTableRow.propTypes = {
  name: objectOf(string).isRequired,
  startDate: string.isRequired,
  endDate: string.isRequired,
  types: arrayOf(string).isRequired,
  totalTime: number.isRequired,
  reason: string.isRequired,
  id: string.isRequired,
  handleApprove: func.isRequired
}

export default FullTableRow
