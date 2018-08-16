import styled from 'styled-components'

const NavContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const StyledLink = styled.div`
  mergin-right: 15px;
`

const LinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`

export { NavContainer, StyledLink, LinkContainer }
