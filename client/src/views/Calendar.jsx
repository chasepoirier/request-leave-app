import React from 'react'
import { connect } from 'react-redux'
import { Styled, InitialLoadingState } from 'components'
import { CalendarComponent, Filters } from './calendar/'
import {
  calendarOperations,
  calendarSelectors
} from '../modules/ducks/calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

class Calendar extends React.Component {
  state = {
    visibleRequests: {
      otherTeams: true,
      ownTeam: true,
      self: true
    }
  }

  componentWillMount() {
    this.props.fetchAllRequests()
  }

  toggleFilter = e => {
    this.setState({
      ...this.state,
      visibleRequests: {
        ...this.state.visibleRequests,
        [e.target.name]: e.target.checked
      }
    })
  }

  filterRequests = reqs => {
    // return reqs.filter(req => req.category === 'self')
    const { otherTeams, ownTeam, self } = this.state.visibleRequests
    const teamRs = reqs.filter(req => req.category === 'team')
    const selfRs = reqs.filter(req => req.category === 'self')
    const allRs = reqs.filter(req => req.category === 'all')

    const visible = [
      self ? [...selfRs] : [],
      ownTeam ? [...teamRs] : [],
      otherTeams ? [...allRs] : []
    ]

    return [].concat(...visible)
  }

  render() {
    const { allRequests, formatedRequests } = this.props
    const { otherTeams, ownTeam, self } = this.state.visibleRequests
    return (
      <Styled.PageWrapper>
        <Styled.FlexBetween style={{ marginTop: 50 }}>
          <Styled.Header>Calendar page</Styled.Header>
          <Filters
            toggleFilter={this.toggleFilter}
            self={self}
            team={ownTeam}
            all={otherTeams}
          />
        </Styled.FlexBetween>
        {allRequests.loading ? (
          <InitialLoadingState />
        ) : (
          <CalendarComponent events={this.filterRequests(formatedRequests)} />
        )}
      </Styled.PageWrapper>
    )
  }
}

const mapStateToProps = state => ({
  allRequests: state.calendar.requests,
  formatedRequests: calendarSelectors.formatRequests(state)
})

export default connect(
  mapStateToProps,
  { fetchAllRequests: calendarOperations.fetchAllApprovedRequests }
)(Calendar)
