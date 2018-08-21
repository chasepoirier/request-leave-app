import React from 'react'
import PropTypes from 'prop-types'
import 'react-datepicker/dist/react-datepicker.css'
import { momentObj } from 'react-moment-proptypes'
import DatePicker from 'react-datepicker'
import * as Calculate from '../utils/calculations'

const DatePickerUI = ({ date, onChange }) => (
  <DatePicker
    selected={date}
    onChange={onChange}
    filterDate={Calculate.isWeekday}
  />
)

DatePickerUI.propTypes = {
  date: momentObj.isRequired,
  onChange: PropTypes.func.isRequired
}

export default DatePickerUI
