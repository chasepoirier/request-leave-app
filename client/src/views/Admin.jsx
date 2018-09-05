import React from 'react'
import PropTypes from 'prop-types'
import { match as matchProps } from 'react-router-prop-types'
import { Styled, RouteTypes } from 'components'
import { Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Routes from 'utils/Routes'
import { teamOperations } from 'modules/ducks/teams'
import AdminNav from './admin/AdminNav'
import * as Pages from './admin/'
import SupervisorNav from './admin/SupervisorNav'

const { addUser, allTeams, approval, manageTeam } = Routes.adminRoutes

class Admin extends React.Component {
  componentDidMount() {
    const { fetchAllTeams } = this.props

    fetchAllTeams()
  }

  render() {
    const { match, status, loggedIn } = this.props
    return (
      <Styled.PageWrapper>
        {status.supervisor ? (
          <SupervisorNav routes={Routes.adminRoutes} matchUrl={match.url} />
        ) : (
          <AdminNav routes={Routes.adminRoutes} matchUrl={match.url} />
        )}
        <Switch>
          <RouteTypes.Admin
            status={status}
            loggedIn={loggedIn}
            path={match.url + approval.path}
            render={history => (
              <Pages.ApprovalPage match={match} history={history} />
            )}
          />
          <RouteTypes.Admin
            status={status}
            loggedIn={loggedIn}
            path={match.url + manageTeam.path}
            render={history => (
              <Pages.ManageTeamsPage match={match} history={history} />
            )}
          />
          <RouteTypes.Supervisor
            status={status}
            loggedIn={loggedIn}
            path={match.url + allTeams.path}
            render={history => (
              <Pages.AllTeamsPage match={match} history={history} />
            )}
          />
          <RouteTypes.Supervisor
            status={status}
            loggedIn={loggedIn}
            path={match.url + addUser.path}
            render={history => (
              <Pages.CreateUserPage match={match} history={history} />
            )}
          />
        </Switch>
      </Styled.PageWrapper>
    )
  }
}

const { bool, shape, func } = PropTypes

Admin.propTypes = {
  match: matchProps.isRequired,
  status: shape({
    admin: bool,
    supervisor: bool
  }).isRequired,
  loggedIn: bool.isRequired,
  fetchAllTeams: func.isRequired
}

const mapStateToProps = state => ({
  status: state.user.info.status,
  loggedIn: state.user.login.loggedIn,
  teams: state.teams.all
})

export default connect(
  mapStateToProps,
  { fetchAllTeams: teamOperations.fetchAllTeams }
)(Admin)
