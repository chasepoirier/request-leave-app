import React from 'react'
import PropTypes from 'prop-types'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { momentObj } from 'react-moment-proptypes'
import DatePicker from 'react-datepicker'
import { connect } from 'react-redux'
import * as Calculate from '../utils/calculations'

const DatePickerUI = ({ date, onChange, excludedDates }) => (
  <DatePicker
    selected={date}
    onChange={onChange}
    filterDate={date => validDate(date, excludedDates)}
  />
)

const validDate = (date, excludedDates) => {
  const weekDay = Calculate.isWeekday(date)
  if (weekDay) {
    const moments = excludedDates.map(d => moment(d.date))
    const valid = moments.reduce((prev, curr) => {
      if (date.isSame(curr, 'day')) {
        prev = false
      }
      return prev
    }, true)
    return valid
  }
  return false
}

DatePickerUI.propTypes = {
  date: momentObj,
  onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  excludedDates: state.calendar.excludedDates.dates.all
})

export default connect(mapStateToProps)(DatePickerUI)
