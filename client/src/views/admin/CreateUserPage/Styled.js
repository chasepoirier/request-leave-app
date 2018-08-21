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

export { FormContainer, InputContainer, FormHeader }
