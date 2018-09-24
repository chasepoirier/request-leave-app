import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import EventPopup from './EventPopup'

BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

export default class Calendar extends React.Component {
  state = {
    eventSelected: false,
    event: ''
  }

  showEvent = event => {
    this.setState({ event, eventSelected: true })
  }

  hideEvent = () => {
    this.setState({ event: '', eventSelected: false })
  }

  render() {
    const { events } = this.props
    return (
      <div>
        {this.state.eventSelected && (
          <EventPopup hideEvent={this.hideEvent} event={this.state.event} />
        )}
        <BigCalendar
          eventPropGetter={event => ({
            className: 'category-' + event.category.toLowerCase()
          })}
          popup
          events={events}
          startAccessor="startDate"
          endAccessor="endDate"
          elementProps={{ style: { height: 400 } }}
          components={{ event: Event }}
          onSelectEvent={this.showEvent}
          selectable
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
      {/* {event.types.map(type => `${type.type} `)} */}

      {/* {` - ${event.reason}`} */}
    </div>
  </div>
)
