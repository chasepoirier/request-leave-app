import React from 'react'
import { PageWrapper } from 'components/Styled'
import { NavLink, Link } from 'react-router-dom'
import {
  StyledLinkMobile,
  WelcomeText,
  Button,
  Hamburger,
  Sidebar,
  ContentContainer,
  Patty,
  CloseButton,
  DangerButton
} from '../Styled'

export default class MobileUserBar extends React.Component {
  state = {
    showSidebar: false
  }

  toggleSidebar = () => {
    this.setState({ showSidebar: !this.state.showSidebar })
  }

  logout = () => {
    this.toggleSidebar()
    this.props.logout()
  }

  render() {
    const { routes } = this.props
    return (
      <PageWrapper flex>
        <WelcomeText>{`Welcome, ${this.props.name}`}</WelcomeText>
        <Hamburger onClick={this.toggleSidebar}>
          <Patty />
        </Hamburger>
        {this.state.showSidebar && (
          <LinkSidebar
            toggle={this.toggleSidebar}
            routes={routes}
            logout={this.logout}
          />
        )}
      </PageWrapper>
    )
  }
}

const NavItem = ({ text, path, toggle }) => (
  <NavLink onClick={toggle} to={path}>
    <StyledLinkMobile>{text}</StyledLinkMobile>
  </NavLink>
)

const LinkSidebar = ({ routes, logout, toggle }) => (
  <Sidebar>
    <CloseButton onClick={toggle} className="far fa-times-circle" />
    <ContentContainer>
      <NavItem
        toggle={toggle}
        text={routes.home.text}
        path={routes.home.path}
      />
      <NavItem
        toggle={toggle}
        text={routes.requestStatus.text}
        path={routes.requestStatus.path}
      />
      <NavItem
        toggle={toggle}
        text={routes.leaveHistory.text}
        path={routes.leaveHistory.path}
      />
      <NavItem
        toggle={toggle}
        text={routes.calendar.text}
        path={routes.calendar.path}
      />
      <Link onClick={toggle} to={routes.requestLeave.path}>
        <Button>Request Leave</Button>
      </Link>

      <DangerButton style={{ margin: '10px 0 0 0' }} onClick={logout}>
        Logout
      </DangerButton>
    </ContentContainer>
  </Sidebar>
)
