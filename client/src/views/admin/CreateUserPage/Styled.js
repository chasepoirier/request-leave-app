import styled from 'styled-components'
import Colors from '../../../design/Colors'

const FormContainer = styled.form`
  width: 95%;
  margin: 0px auto 50px;
  padding: 40px 0;
  max-width: 620px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  background-color: ${Colors.White1000};
  border-radius: 4px;
`

const FormHeader = styled.h2`
  font-weight: 600;
  text-align: center;
  margin-bottom: 25px;
`

const InputContainer = styled.div`
  width: 80%;
  margin: 45px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const InputContainerWrapped = styled.div`
  width: 80%;
  margin: 20px auto 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`

const TypeContainer = styled.div`
  width: calc((100% / 3) - 16px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`

const TypeHeader = styled.div`
  font-size: 16px;
  margin: 0 auto;
  font-weight: 500;
  width: 80%;
`

const Amount = styled.input`
  width: 50px;
  margin-left: 5px;
  font-size: 14px;
`

const TypeLabel = styled.div`
  font-weight: 500;
  font-size: 13px;
  color: ${Colors.Black400};
`

export {
  FormContainer,
  InputContainer,
  FormHeader,
  InputContainerWrapped,
  TypeContainer,
  Amount,
  TypeLabel,
  TypeHeader
}
