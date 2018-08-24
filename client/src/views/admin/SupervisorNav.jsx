import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavContainer, StyledLink, LinkContainer } from './Styled'

class Navbar extends React.Component {
  componentDidMount() {}

  render() {
    const { matchUrl, routes } = this.props

    return (
      <NavContainer>
        <LinkContainer>
          <NavItem
            text={routes.approval.text}
            path={matchUrl + routes.approval.path}
          />
          <NavItem
            text={routes.allTeams.text}
            path={matchUrl + routes.allTeams.path}
          />
          <NavItem
            text={routes.addUser.text}
            path={matchUrl + routes.addUser.path}
          />
        </LinkContainer>
      </NavContainer>
    )
  }
}

const NavItem = ({ text, path }) => (
  <NavLink to={path}>
    <StyledLink>{text}</StyledLink>
  </NavLink>
)

const { string, objectOf } = PropTypes

Navbar.propTypes = {
  matchUrl: string.isRequired,
  routes: objectOf(objectOf(string)).isRequired
}

NavItem.propTypes = {
  text: string.isRequired,
  path: string.isRequired
}

export default connect(null)(Navbar)
