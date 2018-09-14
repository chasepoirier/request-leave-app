import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { userOperations } from 'modules/ducks/user'
import { viewOperations } from 'modules/ducks/view'
import { NavContainer } from './Styled'
import { AdminBar, UserBar, NonUserBar } from './NavTypes'
import MobileAdminBar from './NavTypes/MobileAdminBar'
import MobileUserBar from './NavTypes/MobileUserBar'

class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {
      mobile: false
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  handleLogoutPopup = () => {
    const { showPopup } = this.props

    showPopup({
      type: 'danger',
      content: {
        title: 'Confirm Logout',
        desc: `Are you sure you want to logout?`,
        buttonText: 'Logout',
        handleSubmit: this.handleLogUserOut
      }
    })
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    if (window.innerWidth < 920) {
      this.setState({ mobile: true })
    } else {
      this.setState({ mobile: false })
    }
  }

  handleLogUserOut = () => {
    const { hidePopup, logUserOut } = this.props
    hidePopup()
    logUserOut()
  }

  renderNavType = () => {
    const { routes, status, name, loggedIn } = this.props
    const { mobile } = this.state

    if (loggedIn) {
      if (status.supervisor || status.admin) {
        if (mobile)
          return (
            <MobileAdminBar
              name={name.fname}
              logout={this.handleLogoutPopup}
              routes={routes}
            />
          )

        return (
          <AdminBar
            logout={this.handleLogoutPopup}
            routes={routes}
            name={name.fname}
          />
        )
      }
      if (mobile)
        return (
          <MobileUserBar
            name={name.fname}
            logout={this.handleLogoutPopup}
            routes={routes}
          />
        )
      return (
        <UserBar
          logout={this.handleLogoutPopup}
          routes={routes}
          name={name.fname}
        />
      )
    }
    return <NonUserBar logout={this.handleLogoutPopup} routes={routes} />
  }

  render() {
    return <NavContainer>{this.renderNavType()}</NavContainer>
  }
}

Navbar.defaultProps = {
  name: ''
}

const { objectOf, string, shape, bool, oneOfType, func } = PropTypes

Navbar.propTypes = {
  routes: objectOf(objectOf(string)).isRequired,
  name: oneOfType([objectOf(string), string]),
  status: shape({
    admin: bool,
    supervisor: bool
  }).isRequired,
  loggedIn: bool.isRequired,
  showPopup: func.isRequired,
  hidePopup: func.isRequired,
  logUserOut: func.isRequired
}

const mapStateToProps = state => ({
  status: state.user.info.status,
  loggedIn: state.user.login.loggedIn,
  name: state.user.info.name
})

export default connect(
  mapStateToProps,
  {
    logUserOut: userOperations.logUserOut,
    showPopup: viewOperations.showPopup,
    hidePopup: viewOperations.hidePopup
  }
)(Navbar)
