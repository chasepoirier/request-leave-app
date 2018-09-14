import styled from 'styled-components'
import Colors from '../../design/Colors'

const NavContainer = styled.div`
  width: 100%;
  height: 60px;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.14);
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLink = styled.div`
  margin-right: 35px;
  color: ${Colors.Black400};
  font-weight: 500;
  font-size: 16px;
  text-decoration: none;
  display: block;
  transition: all 0.2s;
  cursor: pointer;
  opacity: 1;
  &:hover {
    opacity: 0.6;
  }
`

const StyledLinkMobile = styled.div`
  margin-right: 35px;
  color: ${Colors.Black400};
  font-weight: 500;
  font-size: 16px;
  width: 100%;
  text-align: center;
  margin: 25px 0;
  text-decoration: none;
  display: block;
  transition: all 0.2s;
  cursor: pointer;
  opacity: 1;
  &:hover {
    opacity: 0.6;
  }
`

const WelcomeText = styled.div`
  margin-right: 20px;
  font-size: 16px;
  font-weight: 500;
`

const LinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`

const Logo = styled.div`
  background-color: #222;
  width: 20px;
  height: 20px;
  border-radius: 50%;
`

const Button = styled.div`
  padding: 7px 15px 4px;
  background-color: ${Colors.blue500};
  color: ${Colors.White1000};
  font-size: 15px;
  text-align: center;
  border-radius: 4px;
  border-bottom: 2px solid ${Colors.blue200};
  cursor: pointer;
  display: block;
  transition: all 0.2s;
  &:hover {
    transform: translateY(2px);
  }
`

const Hamburger = styled.div`
  width: 30px;
  height: 100%;
`

const Patty = styled.div`
  margin: 6px;
  width: 100%;
  background-color: #222;
  height: 2px;
  border-radius: 4px;
  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: #222;
    margin-top: 4px;
  }
  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: #222;
    margin-bottom: 4px;
  }
`

const Sidebar = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #fff;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  z-index: 100000000;
`

const ContentContainer = styled.div`
  width: 90%;
`

const CloseButton = styled.div`
  width: 40px;
  height: 40px;
  font-size: 21px;
  position: absolute;
  top: 20px;
  right: 20px;
  color: #222;
`

export {
  CloseButton,
  Sidebar,
  ContentContainer,
  NavContainer,
  StyledLink,
  Logo,
  LinkContainer,
  WelcomeText,
  Button,
  Patty,
  Hamburger,
  StyledLinkMobile
}
