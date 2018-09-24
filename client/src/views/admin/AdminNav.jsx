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
            text={routes.manageTeam.text}
            path={matchUrl + routes.manageTeam.path}
          />
          <NavItem
            text={routes.reports.text}
            path={matchUrl + routes.reports.path}
          />
          <NavItem
            text={routes.holidays.text}
            path={matchUrl + routes.holidays.path}
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
