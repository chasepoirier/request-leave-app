import styled from 'styled-components'
import Colors from '../../design/Colors'

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

const FormContainer = styled.form`
  width: 95%;
  margin: 50px auto;
  padding: 50px 0;
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
  margin: 50px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export {
  NavContainer,
  StyledLink,
  LinkContainer,
  FormContainer,
  InputContainer,
  FormHeader
}
