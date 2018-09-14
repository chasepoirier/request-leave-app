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
  @media (max-width: 700px) {
    margin: 10px 0;
    margin-right: 45px;
  }
`

const LinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  @media (max-width: 700px) {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`

export { NavContainer, LinkContainer, StyledLink }
