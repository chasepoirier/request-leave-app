import styled from 'styled-components'

const FlexWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const Label = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 16px;
  background-color: ${props => props.color};
  margin-right: 8px;
  margin-top: -2px;
  margin-left: 40px;
`

export { FlexWrapper, Label }
