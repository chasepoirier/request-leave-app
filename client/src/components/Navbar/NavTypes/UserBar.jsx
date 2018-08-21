import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { PageWrapper } from 'components/Styled'
import { connect } from 'react-redux'
import Link from 'react-router-dom/Link'
import { userOperations } from 'modules/ducks/user'
import { StyledLink, LinkContainer, Button, WelcomeText } from '../Styled'

const UserBar = ({ logUserOut, routes, name }) => (
  <PageWrapper flex>
    <LinkContainer>
      <NavItem text={routes.home.text} path={routes.home.path} />
      <NavItem
        text={routes.requestStatus.text}
        path={routes.requestStatus.path}
      />
      <NavItem
        text={routes.leaveHistory.text}
        path={routes.leaveHistory.path}
      />
      <StyledLink onClick={logUserOut}>Logout</StyledLink>
    </LinkContainer>
    <LinkContainer>
      <WelcomeText>{`Welcome, ${name}`}</WelcomeText>
      <Link to={routes.requestLeave.path} style={{ marginRight: 20 }}>
        <Button>Request Leave</Button>
      </Link>
    </LinkContainer>
  </PageWrapper>
)

const NavItem = ({ text, path }) => (
  <NavLink to={path}>
    <StyledLink>{text}</StyledLink>
  </NavLink>
)

const { objectOf, string, func } = PropTypes

NavItem.propTypes = {
  text: string.isRequired,
  path: string.isRequired
}

UserBar.defaultProps = {
  name: ''
}

UserBar.propTypes = {
  routes: objectOf(objectOf(string)).isRequired,
  logUserOut: func.isRequired,
  name: string
}

export default connect(
  null,
  { logUserOut: userOperations.logUserOut }
)(UserBar)
