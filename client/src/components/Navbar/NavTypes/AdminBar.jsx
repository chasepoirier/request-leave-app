import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { PageWrapper } from 'components/Styled'
import { connect } from 'react-redux'
import { userOperations } from 'modules/ducks/user'
import { StyledLink, LinkContainer, WelcomeText, Button } from '../Styled'

const AdminBar = ({ logUserOut, routes, name }) => (
  <PageWrapper flex>
    <LinkContainer>
      <NavItem text={routes.home.text} path={routes.home.path} />
      <NavItem
        text={routes.requestLeave.text}
        path={routes.requestLeave.path}
      />
      <NavItem
        text={routes.requestStatus.text}
        path={routes.requestStatus.path}
      />
      <NavItem
        text={routes.leaveHistory.text}
        path={routes.leaveHistory.path}
      />
      <NavItem text={routes.admin.text} path={routes.admin.path} />
    </LinkContainer>
    <LinkContainer>
      <WelcomeText>{`Welcome, ${name}`}</WelcomeText>
      <Button onClick={logUserOut}>Log Out</Button>
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

AdminBar.defaultProps = {
  name: ''
}

AdminBar.propTypes = {
  routes: objectOf(objectOf(string)).isRequired,
  logUserOut: func.isRequired,
  name: string
}

export default connect(
  null,
  { logUserOut: userOperations.logUserOut }
)(AdminBar)
