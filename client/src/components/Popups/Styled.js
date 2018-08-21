import styled from 'styled-components'
import Colors from '../../design/Colors'

const DangerContainer = styled.div`
  width: 90%;
  max-width: 620px;
  height: 80%;
  max-height: 450px;
  background-color: ${Colors.White1000};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.14);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border-radius: 4px;
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
  margin-bottom: 15px;
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

export {
  DangerContainer,
  PopupContainer,
  ContentContainer,
  CloseContainer,
  SubHeader,
  Header
}
