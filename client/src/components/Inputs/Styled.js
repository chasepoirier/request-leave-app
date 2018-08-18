import styled from 'styled-components'
import Colors from '../../design/Colors'

const InputWrapper = styled.div`
  width: ${props => (props.short ? 'calc(50% - 25px)' : '100%')};
`

const CheckboxWrapper = styled.div`
  width: calc(50% - 25px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Input = styled.input`
  border: none;
  outline: none;
  border-bottom: 2px solid #b0b0b0;
  color: #252525;
  font-size: 16px;
  font-family: 'open sans';
  padding-bottom: 4px;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    border-bottom: 2px solid #000;
  }
  &::placeholder {
    color: #aaa;
    font-size: 16px;
    font-family: 'open sans';
  }
`

const Check = styled.input`
  display: block;
  margin-top: -2px;
  cursor: pointer;
`

const InputLabel = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${Colors.Black200};
  margin-right: 15px;
`

const SelectContainer = styled.div`
  width: 100%;
`

const Select = styled.select`
  width: 100%;
  margin-top: 8px;
`

const Option = styled.option``

export {
  Check,
  InputWrapper,
  Input,
  InputLabel,
  CheckboxWrapper,
  SelectContainer,
  Select,
  Option
}
