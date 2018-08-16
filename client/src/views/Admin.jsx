import React from 'react'
import { match as matchProps } from 'react-router-prop-types'
import { Styled, RouteTypes } from 'components'
import { Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { UserInfoPTs } from 'customPTs'
import Routes from 'utils/Routes'
import CreateUser from './admin/CreateUser'
import AdminNav from './admin/AdminNav'

const { addUser } = Routes.adminRoutes

const Admin = ({ match, user }) => (
  <Styled.PageWrapper>
    <Styled.Header>Admin Pages</Styled.Header>
    <AdminNav routes={Routes.adminRoutes} matchUrl={match.url} />
    <Switch>
      <RouteTypes.Supervisor
        user={user}
        path={match.url + addUser.path}
        render={history => <CreateUser match={match} history={history} />}
      />
    </Switch>
  </Styled.PageWrapper>
)

Admin.propTypes = {
  match: matchProps.isRequired,
  user: UserInfoPTs.isRequired
}

const mapStateToProps = state => ({
  user: state.user.info
})

export default connect(mapStateToProps)(Admin)
