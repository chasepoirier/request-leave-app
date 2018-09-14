import React from 'react'
import { QueryWrapper, FilterWrapper, FilterTitle, SubLabel } from './Styled'
import { DatePickerUI } from '../../../../components'

export default class FilterByDate extends React.Component {
  state = {
    endDate: null,
    startDate: null
  }

  handleStartDateChange = date => {
    this.props.updateQuery('startDate', date)
    this.setState({ startDate: date })
  }

  handleEndDateChange = date => {
    this.props.updateQuery('endDate', date)
    this.setState({ endDate: date })
  }

  render() {
    const { startDate, endDate } = this.state
    return (
      <FilterWrapper
        style={{ zIndex: this.props.index, alignItems: 'flex-end' }}
      >
        <QueryWrapper>
          <FilterTitle>Filter by Date Range</FilterTitle>
          <SubLabel>Start Date</SubLabel>
          <DatePickerUI
            date={startDate}
            onChange={this.handleStartDateChange}
          />
        </QueryWrapper>
        <QueryWrapper>
          <SubLabel>End Date</SubLabel>
          <DatePickerUI date={endDate} onChange={this.handleEndDateChange} />
        </QueryWrapper>
      </FilterWrapper>
    )
  }
}
