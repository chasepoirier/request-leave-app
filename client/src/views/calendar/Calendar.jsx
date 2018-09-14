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
          components={{ event: Event }}
        />
      </div>
    )
  }
}

const Event = ({ event }) => (
  <div>
    <div style={{ fontWeight: '500', fontSize: 15, padding: '2px 0' }}>{`${
      event.name.lname
    }, ${event.name.fname}`}</div>
    <div style={{ fontSize: 13 }}>
      {event.types.map(type => `${type.type} `)}

      {` - ${event.reason}`}
    </div>
  </div>
)
