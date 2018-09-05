import styled from 'styled-components'
import Colors from '../../design/Colors'

const PopupWrapper = styled.div`
  width: 90%;
  max-width: 620px;
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
  height: 100%;
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const Header = styled.header`
  width: 100%;
  margin-bottom: 8px;
  font-size: 24px;
  text-align: center;
  font-weight: 600;
`

const SubHeader = styled.header`
  width: 100%;
  margin-bottom: 45px;
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
  overflow: hidden;
`

const CloseContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${Colors.Black200};
  opacity: 0.3;
  z-index: 1;
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

const ChangeText = styled.div`
  font-size: 14px;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${Colors.blue500};
  margin-left: 15px;
  transition: all 0.2s;
  opacity: 1;
  &:hover {
    opacity: 0.65;
  }
`

const SmallButton = styled.div`
  margin-top: 6px;
  width: 45%;
  padding: 8px 0px;
  border: 1px solid ${Colors.blue500};
  color: ${Colors.blue500};
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  transform: translateY(0px);
  border-radius: 4px;
  &:hover {
    transform: translateY(2px);
  }
`

const ValueText = styled.div`
  font-size: 16px;
`

export {
  PopupWrapper,
  PopupContainer,
  ContentContainer,
  CloseContainer,
  SubHeader,
  Header,
  CloseIcon,
  FlexContainer,
  LabelText,
  ValueText,
  FlexItem,
  ChangeText,
  LabelTextContainer,
  InlineItem,
  SmallButton
}
