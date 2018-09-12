import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Redirect } from 'react-router-dom'
import { Navbar, RouteTypes, InitialLoadingState, StatusBar } from 'components'
import { userOperations } from 'modules/ducks/user'
import { requestOperations } from 'modules/ducks/requests'
import { connect } from 'react-redux'

import {
  Admin,
  Home,
  LeaveHistory,
  RequestLeave,
  RequestStatus,
  Login,
  Calendar
} from 'views'

import Routes from './utils/Routes'
import {
  ApprovalPopup,
  DangerPopup,
  UserPopup,
  UserAdminPopup
} from './components/Popups'

const {
  login,
  home,
  admin,
  leaveHistory,
  requestLeave,
  requestStatus,
  calendar
} = Routes.primary

class App extends React.Component {
  componentWillMount() {
    const { fetchCurrentUser, fetchAllLeaveTypes } = this.props
    fetchCurrentUser()
    fetchAllLeaveTypes()
  }

  renderPopup = (type, visible) => {
    if (visible) {
      switch (type) {
        case 'danger':
          return <DangerPopup />
        case 'approval':
          return <ApprovalPopup />
        case 'user':
          return <UserPopup />
        case 'user-admin':
          return <UserAdminPopup />
        default:
          return null
      }
    }
    return null
  }

  render() {
    const { userFetched, status, loggedIn, popup } = this.props

    return (
      <section>
        {userFetched ? (
          <div>
            <StatusBar />
            {this.renderPopup(popup.type, popup.visible)}
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
                <RouteTypes.BasicRoute
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
                <RouteTypes.BasicRoute
                  path={leaveHistory.path}
                  status={status}
                  loggedIn={loggedIn}
                  render={(match, history) => (
                    <LeaveHistory match={match} history={history} />
                  )}
                />
                <RouteTypes.BasicRoute
                  path={requestLeave.path}
                  status={status}
                  loggedIn={loggedIn}
                  render={(match, history) => (
                    <RequestLeave match={match} history={history} />
                  )}
                />
                <RouteTypes.BasicRoute
                  path={requestStatus.path}
                  status={status}
                  loggedIn={loggedIn}
                  render={(match, history) => (
                    <RequestStatus match={match} history={history} />
                  )}
                />
                <RouteTypes.BasicRoute
                  path={calendar.path}
                  status={status}
                  loggedIn={loggedIn}
                  render={(match, history) => (
                    <Calendar match={match} history={history} />
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

const { shape, func, bool, string } = PropTypes

App.propTypes = {
  fetchCurrentUser: func.isRequired,
  fetchAllLeaveTypes: func.isRequired,
  userFetched: bool.isRequired,
  status: shape({
    admin: bool,
    supervisor: bool
  }).isRequired,
  loggedIn: bool.isRequired,
  popup: shape({
    visible: bool,
    type: string
  }).isRequired
}

const mapStateToProps = state => ({
  userFetched: state.user.userFetched,
  status: state.user.info.status,
  loggedIn: state.user.login.loggedIn,
  popup: state.view.popup
})

export default connect(
  mapStateToProps,
  {
    fetchCurrentUser: userOperations.fetchCurrentUser,
    fetchAllLeaveTypes: requestOperations.fetchAllLeaveTypes
  }
)(App)
