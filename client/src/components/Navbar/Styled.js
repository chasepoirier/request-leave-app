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

export { NavContainer, StyledLink, Logo, LinkContainer, WelcomeText, Button }
