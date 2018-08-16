import React from 'react'
import PropTypes from 'prop-types'
import { match as matchProps } from 'react-router-prop-types'
import { Styled, RouteTypes } from 'components'
import { Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Routes from 'utils/Routes'
import CreateUser from './admin/CreateUser'
import AdminNav from './admin/AdminNav'

const { addUser } = Routes.adminRoutes

const Admin = ({ match, status, loggedIn }) => (
  <Styled.PageWrapper>
    <Styled.Header>Admin Pages</Styled.Header>
    <AdminNav routes={Routes.adminRoutes} matchUrl={match.url} />
    <Switch>
      <RouteTypes.Supervisor
        status={status}
        loggedIn={loggedIn}
        path={match.url + addUser.path}
        render={history => <CreateUser match={match} history={history} />}
      />
    </Switch>
  </Styled.PageWrapper>
)

Admin.propTypes = {
  match: matchProps.isRequired,
  status: PropTypes.shape({
    admin: PropTypes.bool,
    supervisor: PropTypes.bool
  }).isRequired,
  loggedIn: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  status: state.user.info.status,
  loggedIn: state.user.login.loggedIn
})

export default connect(mapStateToProps)(Admin)
