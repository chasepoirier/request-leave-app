import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Redirect } from 'react-router-dom'
import { Navbar, RouteTypes, InitialLoadingState } from 'components'
import { userOperations } from 'modules/ducks/user'
import { connect } from 'react-redux'

import {
  Admin,
  Home,
  LeaveHistory,
  RequestLeave,
  RequestStatus,
  Login
} from 'views'

import Routes from './utils/Routes'

const {
  login,
  home,
  admin,
  leaveHistory,
  requestLeave,
  requestStatus
} = Routes.primary

class App extends React.Component {
  componentWillMount() {
    const { fetchCurrentUser } = this.props
    fetchCurrentUser()
  }

  render() {
    const { userFetched, status, loggedIn } = this.props

    return (
      <section>
        {userFetched ? (
          <div>
            <Navbar routes={Routes.primary} />
            <section>
              <Switch>
                <RouteTypes.NonAuth
                  exact
                  loggedIn={loggedIn}
                  path={login.path}
                  render={(match, history) => (
                    <Login match={match} history={history} />
                  )}
                />
                <RouteTypes.Admin
                  exact
                  path={home.path}
                  status={status}
                  loggedIn={loggedIn}
                  render={(match, history) => (
                    <Home match={match} history={history} />
                  )}
                />
                <RouteTypes.Admin
                  path={admin.path}
                  status={status}
                  loggedIn={loggedIn}
                  render={(match, history) => (
                    <Admin match={match} history={history} />
                  )}
                />
                <RouteTypes.Admin
                  path={leaveHistory.path}
                  status={status}
                  loggedIn={loggedIn}
                  render={(match, history) => (
                    <LeaveHistory match={match} history={history} />
                  )}
                />
                <RouteTypes.Admin
                  path={requestLeave.path}
                  status={status}
                  loggedIn={loggedIn}
                  render={(match, history) => (
                    <RequestLeave match={match} history={history} />
                  )}
                />
                <RouteTypes.Admin
                  path={requestStatus.path}
                  status={status}
                  loggedIn={loggedIn}
                  render={(match, history) => (
                    <RequestStatus match={match} history={history} />
                  )}
                />
                <Redirect to="/" />
              </Switch>
            </section>
          </div>
        ) : (
          <InitialLoadingState />
        )}
      </section>
    )
  }
}

const { shape, func, bool } = PropTypes

App.propTypes = {
  fetchCurrentUser: func.isRequired,
  userFetched: bool.isRequired,
  status: shape({
    admin: bool,
    supervisor: bool
  }).isRequired,
  loggedIn: bool.isRequired
}

const mapStateToProps = state => ({
  userFetched: state.user.userFetched,
  status: state.user.info.status,
  loggedIn: state.user.login.loggedIn
})

export default connect(
  mapStateToProps,
  { fetchCurrentUser: userOperations.fetchCurrentUser }
)(App)
