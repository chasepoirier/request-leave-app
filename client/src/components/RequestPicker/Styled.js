import styled from 'styled-components'
import Colors from '../../design/Colors'

const RequestContainer = styled.div`
  width: 100%;
  margin-bottom: 35px;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`

const SubHeader = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 4px;
`

const DeleteIcon = styled.i`
  color: ${Colors.Red200};
  cursor: pointer;
  transition: all 0.2s;
  opacity: 1;
  &:hover {
    opacity: 0.65;
  }
`

const IconContainer = styled.div`
  margin-left: 75px;
  display: flex;
  justify-content: flex-start;
  height: 100%;
  align-items: center;
`

export { RequestContainer, FlexContainer, SubHeader, DeleteIcon, IconContainer }
