import styled from 'styled-components'
import Colors from '../../design/Colors'

const StatusContainer = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${Colors.blue500};
  display: flex;
  justify-content: center;
  align-items: center;
  display: ${props => (props.visible ? 'flex' : 'none')};
`

const CloseButton = styled.i`
  color: ${Colors.White1000};
  cursor: pointer;
  font-size: 1.2em;
  transition: all 0.2s;
  opacity: 1;
  &:hover {
    opacity: 0.6;
  }
  margin-left: 50px;
`

const Text = styled.div`
  color: ${Colors.White1000};
  text-align: center;
  font-size: 14px;
  font-weight: 500;
`

export { StatusContainer, CloseButton, Text }
