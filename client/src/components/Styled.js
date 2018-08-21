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
  padding: 0;
`

const ButtonOutline = styled.div`
  padding: 10px 55px;
  color: ${Colors.blue500};
  font-size: 15px;
  text-align: center;
  border-radius: 4px;
  border: 2px solid ${Colors.blue500};
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: translateY(2px);
  }
  margin: 0px auto;
  display: block;
  padding-top: 12px;
`

const ButtonFilled = styled.div`
  padding: 10px 55px;
  background-color: ${Colors.blue500}
  color: ${Colors.White1000};
  font-size: 15px;
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
  padding-top: 12px;
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

const SubLabel = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 25px;
  ${props => props.color && `color: ${props.color}`};
`

export {
  PageWrapper,
  Header,
  SubmitButton,
  ButtonOutline,
  ButtonFilled,
  SubLabel
}
