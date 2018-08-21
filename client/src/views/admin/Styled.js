import styled from 'styled-components'
import Colors from '../../design/Colors'

const NavContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 25px;
`

const StyledLink = styled.div`
  margin-right: 45px;
  color: ${Colors.blue200};
  font-weight: 500;
`

const LinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`

export { NavContainer, LinkContainer, StyledLink }
