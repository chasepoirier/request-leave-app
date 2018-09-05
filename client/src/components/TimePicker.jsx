import React from 'react'
import PropTypes from 'prop-types'
import 'react-datepicker/dist/react-datepicker.css'
import { momentObj } from 'react-moment-proptypes'
import DatePicker from 'react-datepicker'
import * as Calculate from '../utils/calculations'

const TimePickerUI = ({ date, onChange }) => (
  <DatePicker
    selected={date}
    onChange={onChange}
    filterDate={Calculate.isWeekday}
    showTimeSelect
    showTimeSelectOnly
    timeIntervals={30}
    dateFormat="LT"
    timeCaption="Time"
  />
)

TimePickerUI.propTypes = {
  date: momentObj.isRequired,
  onChange: PropTypes.func.isRequired
}

export default TimePickerUI
