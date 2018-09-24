import styled from 'styled-components'
import Colors from '../../design/Colors'

const FlexWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 820px) {
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 8px;
  }
`

const Label = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 16px;
  background-color: ${props => props.color};
  margin-right: 8px;
  margin-top: -2px;
  margin-left: 40px;
  @media (max-width: 820px) {
    margin-left: 10;
  }
`

const PopupWrapper = styled.div`
  width: 90%;
  max-width: 740px;
  background-color: ${Colors.White1000};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.14);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border-radius: 4px;
  position: relative;
  padding: 75px 0 50px;
  overflow-y: auto;
  max-height: 95vh;
`

const CloseIcon = styled.i`
  width: 25px;
  height: 25px;
  font-size: 20px;
  position: absolute;
  top: 20px;
  right: 20px;
  color: ${Colors.Black400};
  opacity: 1;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`

const ContentContainer = styled.div`
  width: 80%;
  height: 100%;
`

const Header = styled.header`
  width: 100%;
  margin-bottom: 8px;
  font-size: 24px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 45px;
`

const SubHeader = styled.header`
  width: 100%;

  font-size: 16px;
  text-align: center;
`

const PopupContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const ValueText = styled.div`
  font-size: 16px;
`

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  flex-wrap: wrap;
`

const FlexItem = styled.div`
  width: calc(50% - 10px);
`

const InlineItem = styled.div`
  margin-right: 25px;
  width: calc(100% / 4);
  margin-bottom: 8px;
`

const LabelText = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
`

const LabelTextContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export {
  ValueText,
  InlineItem,
  FlexItem,
  LabelText,
  FlexWrapper,
  FlexContainer,
  Label,
  PopupWrapper,
  PopupContainer,
  Header,
  SubHeader,
  CloseIcon,
  ContentContainer
}
