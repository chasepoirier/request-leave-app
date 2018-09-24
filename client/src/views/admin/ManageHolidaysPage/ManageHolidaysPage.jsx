import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { calendarOperations } from '../../../modules/ducks/calendar'
import {
  FlexWrapper,
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TeamHeader,
  TrashIcon,
  TablePositioner,
  Input
} from './Styled'
import { ButtonFilled } from '../../../components/Styled'

class ManageHolidays extends React.Component {
  state = {
    selectedDate: ''
  }

  handleDateChange = e => {
    this.setState({ selectedDate: e.target.value })
  }

  submitExcludedDate = () => {
    const { fetchExcludedDates, addExcludedDate } = this.props
    addExcludedDate(this.state.selectedDate).then(() => {
      fetchExcludedDates()
    })
  }

  handleDeleteDate = id => {
    this.props.deleteExcludedDate(id).then(() => {
      this.props.fetchExcludedDates()
    })
  }

  renderAllExcludedDates = dates =>
    dates.map(date => (
      <TableRow key={date.id}>
        <TableCell>
          <TablePositioner>
            {moment(date.date).format('MMM DD, YYYY')}
            <TrashIcon
              onClick={this.handleDeleteDate.bind({}, date.id)}
              className="fas fa-trash"
            />
          </TablePositioner>
        </TableCell>
      </TableRow>
    ))

  render() {
    const { selectedDate } = this.state
    return (
      <div>
        <TeamHeader>Manage Holidays</TeamHeader>
        <FlexWrapper>
          <Input
            type="date"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
          <ButtonFilled style={{ margin: 0 }} onClick={this.submitExcludedDate}>
            Add Date
          </ButtonFilled>
        </FlexWrapper>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Dates Already Excluded</TableHeader>
            </TableRow>
          </thead>
          <tbody>{this.renderAllExcludedDates(this.props.excludedDates)}</tbody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  excludedDates: state.calendar.excludedDates.dates.all
})

export default connect(
  mapStateToProps,
  {
    addExcludedDate: calendarOperations.addExcludedDate,
    fetchExcludedDates: calendarOperations.fetchExcludedDates,
    deleteExcludedDate: calendarOperations.deleteExcludedDate
  }
)(ManageHolidays)
