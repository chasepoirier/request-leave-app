import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { userOperations } from 'modules/ducks/user'
import { NavContainer } from './Styled'
import { AdminBar, UserBar, NonUserBar } from './NavTypes'

class Navbar extends React.Component {
  renderNavType = () => {
    const { routes, status, name, loggedIn } = this.props

    if (loggedIn) {
      if (status.supervisor || status.admin) {
        return <AdminBar routes={routes} name={name.fname} />
      }
      return <UserBar routes={routes} name={name.fname} />
    }
    return <NonUserBar routes={routes} />
  }

  render() {
    return <NavContainer>{this.renderNavType()}</NavContainer>
  }
}

Navbar.defaultProps = {
  name: ''
}

const { objectOf, string, shape, bool, oneOfType } = PropTypes

Navbar.propTypes = {
  routes: objectOf(objectOf(string)).isRequired,
  name: oneOfType([objectOf(string), string]),
  status: shape({
    admin: bool,
    supervisor: bool
  }).isRequired,
  loggedIn: bool.isRequired
}

const mapStateToProps = state => ({
  status: state.user.info.status,
  loggedIn: state.user.login.loggedIn,
  name: state.user.info.name
})

export default connect(
  mapStateToProps,
  { logUserOut: userOperations.logUserOut }
)(Navbar)
