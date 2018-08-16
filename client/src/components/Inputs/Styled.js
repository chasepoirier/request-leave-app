import styled from 'styled-components'

const InputWrapper = styled.div`
  width: 100%;
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

export { InputWrapper, Input }
