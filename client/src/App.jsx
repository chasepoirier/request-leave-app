import React from 'react'
import { UserInfoPTs } from 'customPTs'
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
    const { userFetched, user } = this.props

    return (
      <section>
        {userFetched ? (
          <div>
            <Navbar routes={Routes.primary} />
            <section>
              <Switch>
                <RouteTypes.NonAuth
                  exact
                  user={user}
                  path={login.path}
                  render={(match, history) => (
                    <Login match={match} history={history} />
                  )}
                />
                <RouteTypes.Admin
                  exact
                  path={home.path}
                  user={user}
                  render={(match, history) => (
                    <Home match={match} history={history} />
                  )}
                />
                <RouteTypes.Admin
                  path={admin.path}
                  user={user}
                  render={(match, history) => (
                    <Admin match={match} history={history} />
                  )}
                />
                <RouteTypes.Admin
                  path={leaveHistory.path}
                  user={user}
                  render={(match, history) => (
                    <LeaveHistory match={match} history={history} />
                  )}
                />
                <RouteTypes.Admin
                  path={requestLeave.path}
                  user={user}
                  render={(match, history) => (
                    <RequestLeave match={match} history={history} />
                  )}
                />
                <RouteTypes.Admin
                  path={requestStatus.path}
                  user={user}
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

App.defaultProps = {
  user: null
}

App.propTypes = {
  fetchCurrentUser: PropTypes.func.isRequired,
  userFetched: PropTypes.bool.isRequired,
  user: UserInfoPTs
}

const mapStateToProps = state => ({
  userFetched: state.user.userFetched,
  user: state.user.info
})

export default connect(
  mapStateToProps,
  { fetchCurrentUser: userOperations.fetchCurrentUser }
)(App)
