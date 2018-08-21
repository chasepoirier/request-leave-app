import React from 'react'
import PropTypes from 'prop-types'
import { momentObj } from 'react-moment-proptypes'
import { FormSecondary, SubHeader, SubLabel } from './Styled'
import { DatePickerUI, MessageBar } from '../../components'

const AllDay = ({ startDate, handleDateChange, dateMessage, validDate }) => (
  <FormSecondary style={{ marginBottom: 40 }}>
    <SubHeader>2. Select a Leave Type</SubHeader>
    <SubLabel>*An all day leave must add up to 8 hours.</SubLabel>
    <DatePickerUI date={startDate} onChange={handleDateChange} />
    <MessageBar message={dateMessage} success={validDate} />
  </FormSecondary>
)

const { func, string, bool } = PropTypes

AllDay.propTypes = {
  handleDateChange: func.isRequired,
  startDate: momentObj.isRequired,
  dateMessage: string.isRequired,
  validDate: bool.isRequired
}

export default AllDay
