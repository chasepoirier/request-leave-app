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

const SubHeader = styled.div`
  font-size: 21px;
  margin-bottom: 15px;
  font-weight: 600;
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

const FlexBetween = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 820px) {
    flex-wrap: wrap;
  }
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
    transform: ${props =>
      props.disabled ? 'translateY(0px)' : 'translateY(2px)'};
  }
  margin: 0px auto;
  display: block;
  padding-top: 12px;
  opacity: ${props => (props.disabled ? 0.6 : 1)}
  pointer-events: ${props => (props.disabled ? 'none' : '')}
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

const ApprovalContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const ApprovalText = styled.div`
  margin-left: 10px;
`

const ApprovalType = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${props =>
    props.pending
      ? Colors.Orange200
      : props.approved
        ? Colors.Green200
        : Colors.Red200};
`

const TimeTotal = styled.div`
  margin-right: 10px;
`

const TimeText = styled.div`
  font-size: 13px;
`

export {
  TimeTotal,
  TimeText,
  ApprovalContainer,
  ApprovalText,
  ApprovalType,
  PageWrapper,
  Header,
  SubmitButton,
  ButtonOutline,
  ButtonFilled,
  SubLabel,
  SubHeader,
  FlexBetween
}
