import styled from 'styled-components'

const LeaveForm = styled.form`
  width: 100%;
  max-width: 900px;
  margin-top: 50px;
`

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`

const SubHeader = styled.div`
  font-size: 21px;
  font-weight: 600;
  margin-bottom: 15px;
`

const FormSecondary = styled.div`
  margin-top: 50px;
`

const SubLabel = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 25px;
  ${props => props.color && `color: ${props.color}`};
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 75px;
`

export {
  LeaveForm,
  FlexContainer,
  SubHeader,
  FormSecondary,
  SubLabel,
  ButtonContainer
}
