import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { PageWrapper } from 'components/Styled'
import Link from 'react-router-dom/Link'
import { StyledLink, LinkContainer, WelcomeText, Button } from '../Styled'

const AdminBar = ({ logout, routes, name }) => (
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
      <NavItem
        text={routes.admin.text}
        path={`${routes.admin.path}/pending-approvals`}
      />
      <StyledLink onClick={logout}>Logout</StyledLink>
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

AdminBar.defaultProps = {
  name: ''
}

AdminBar.propTypes = {
  routes: objectOf(objectOf(string)).isRequired,
  logout: func.isRequired,
  name: string
}

export default AdminBar
