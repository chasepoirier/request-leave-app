import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { PageWrapper } from 'components/Styled'
import { connect } from 'react-redux'
import { userOperations } from 'modules/ducks/user'
import { StyledLink, LinkContainer, Btn } from '../Styled'

const UserBar = ({ logUserOut, routes }) => (
  <PageWrapper flex>
    <NavItem text={routes.home.text} path={routes.home.path} />
    <LinkContainer>
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
      <Btn type="submit" onClick={logUserOut}>
        Log Out
      </Btn>
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

UserBar.propTypes = {
  routes: objectOf(objectOf(string)).isRequired,
  logUserOut: func.isRequired
}

export default connect(
  null,
  { logUserOut: userOperations.logUserOut }
)(UserBar)
