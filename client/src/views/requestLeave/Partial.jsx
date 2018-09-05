import React from 'react'
import PropTypes from 'prop-types'
import { momentObj } from 'react-moment-proptypes'
import { FormSecondary, SubHeader, FlexContainer, SubLabel } from './Styled'
import { DatePickerUI, MessageBar } from '../../components'
import TimePickerUI from '../../components/TimePicker'

const Partial = ({
  startDate,
  handleDateChange,
  handleStartTimeChange,
  handleEndTimeChange,
  dateMessage,
  validDate,
  startTime,
  endTime
}) => (
  <FormSecondary>
    <SubHeader>2. Select a Start and End Date</SubHeader>
    <FlexContainer>
      <div>
        <SubLabel>Pick a Start Date</SubLabel>
        <DatePickerUI date={startDate} onChange={handleDateChange} />
      </div>
      <div style={{ marginLeft: 60, marginRight: 50 }}>
        <SubLabel>Pick a Start Time</SubLabel>
        <TimePickerUI date={startTime} onChange={handleStartTimeChange} />
      </div>
      <div style={{ marginLeft: 60, marginRight: 50 }}>
        <SubLabel>Pick an End Time</SubLabel>
        <TimePickerUI date={endTime} onChange={handleEndTimeChange} />
      </div>
    </FlexContainer>
    <MessageBar message={dateMessage} success={validDate} />
  </FormSecondary>
)

const { func } = PropTypes

Partial.propTypes = {
  handleDateChange: func.isRequired,
  startDate: momentObj.isRequired
}

export default Partial
