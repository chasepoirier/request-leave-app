import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

export default class Calendar extends React.Component {
  render() {
    const { events } = this.props
    return (
      <div>
        <BigCalendar
          eventPropGetter={event => ({
            className: 'category-' + event.category.toLowerCase()
          })}
          events={events}
          startAccessor="startDate"
          endAccessor="endDate"
          elementProps={{ style: { height: 400 } }}
        />
      </div>
    )
  }
}
