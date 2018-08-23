import React from 'react'
import PropTypes from 'prop-types'
import { momentObj } from 'react-moment-proptypes'
import { FormSecondary, SubHeader } from './Styled'
import { DatePickerUI } from '../../components'

const Partial = ({ startDate, handleDateChange }) => (
  <FormSecondary>
    <SubHeader>2. Select a Start Date</SubHeader>
    <DatePickerUI date={startDate} onChange={handleDateChange} />
  </FormSecondary>
)

const { func } = PropTypes

Partial.propTypes = {
  handleDateChange: func.isRequired,
  startDate: momentObj.isRequired
}

export default Partial
