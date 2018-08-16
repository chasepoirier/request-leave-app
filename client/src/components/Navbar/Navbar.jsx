import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { userOperations } from 'modules/ducks/user'
import { NavContainer } from './Styled'

import { AdminBar, UserBar, NonUserBar } from './NavTypes'

class Navbar extends React.Component {
  renderNavType = () => {
    const { routes, user } = this.props

    if (user) {
      if (user.super || user.admin) {
        return <AdminBar routes={routes} name={user.fname} />
      }
      return <UserBar routes={routes} name={user.fname} />
    }
    return <NonUserBar routes={routes} />
  }

  render() {
    return <NavContainer>{this.renderNavType()}</NavContainer>
  }
}

Navbar.defaultProps = {
  user: null
}

const { objectOf, bool, string, shape } = PropTypes

Navbar.propTypes = {
  routes: objectOf(objectOf(string)).isRequired,
  user: shape({
    id: string,
    uid: string,
    email: string,
    fname: string,
    lname: string,
    admin: bool,
    super: bool,
    token: string
  })
}

const mapStateToProps = state => ({
  user: state.user.info
})

export default connect(
  mapStateToProps,
  { logUserOut: userOperations.logUserOut }
)(Navbar)
