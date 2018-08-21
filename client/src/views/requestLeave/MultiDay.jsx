import React from 'react'
import PropTypes from 'prop-types'
import { momentObj } from 'react-moment-proptypes'
import { FormSecondary, SubHeader, FlexContainer, SubLabel } from './Styled'
import { DatePickerUI, MessageBar } from '../../components'

const MultiDay = ({
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  validDate,
  dateMessage
}) => (
  <FormSecondary>
    <SubHeader>2. Select a Start and End Date</SubHeader>
    <FlexContainer>
      <div>
        <SubLabel>Pick a Start Date</SubLabel>
        <DatePickerUI date={startDate} onChange={handleStartDateChange} />
      </div>
      <div style={{ marginLeft: 100, marginRight: 50 }}>
        <SubLabel>Pick an End Date</SubLabel>
        <DatePickerUI date={endDate} onChange={handleEndDateChange} />
      </div>
    </FlexContainer>
    <MessageBar message={dateMessage} success={validDate} />
  </FormSecondary>
)

const { func, bool, string } = PropTypes

MultiDay.propTypes = {
  handleStartDateChange: func.isRequired,
  handleEndDateChange: func.isRequired,
  startDate: momentObj.isRequired,
  endDate: momentObj.isRequired,
  validDate: bool.isRequired,
  dateMessage: string.isRequired
}

export default MultiDay
