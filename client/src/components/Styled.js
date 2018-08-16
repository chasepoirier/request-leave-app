import styled from 'styled-components'
import Colors from '../design/Colors'

const PageWrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  max-width: 1200px;
  ${props =>
    props.flex &&
    `
    display: flex;
    justify-content: space-between;
    align-items: center;
  `};
`

const Header = styled.h1`
  font-size: 28px;
  margin: 0;
  margin-top: 50px;
  padding: 0;
`

const SubmitButton = styled.input`
  padding: 10px 55px;
  background-color: ${Colors.blue500};
  color: ${Colors.White1000};
  font-size: 15px;
  -webkit-appearance: none;
  border: none;
  outline: none;
  text-align: center;
  border-radius: 4px;
  border-bottom: 2px solid ${Colors.blue200};
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: translateY(2px);
  }
  margin: 0px auto;
  display: block;
`

export { PageWrapper, Header, SubmitButton }
