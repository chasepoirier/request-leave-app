import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { PageWrapper } from 'components/Styled'
import { NavContainer, StyledLink, LinkContainer, Btn } from '../Styled'

const NonUserBar = ({ routes }) => (
  <NavContainer>
    <PageWrapper flex>
      <NavItem text={routes.home.text} path={routes.home.path} />
      <LinkContainer>
        <NavLink to={routes.login.path}>
          <Btn>{routes.login.text}</Btn>
        </NavLink>
      </LinkContainer>
    </PageWrapper>
  </NavContainer>
)

const NavItem = ({ text, path }) => (
  <NavLink to={path}>
    <StyledLink>{text}</StyledLink>
  </NavLink>
)

const { objectOf, string } = PropTypes

NonUserBar.propTypes = {
  routes: objectOf(objectOf(string)).isRequired
}

NavItem.propTypes = {
  text: string.isRequired,
  path: string.isRequired
}

export default NonUserBar
