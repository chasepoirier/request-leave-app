import styled from 'styled-components'
import Colors from '../../../design/Colors'

const SelectContainer = styled.div`
  width: 235px;
  position: absolute;
  top: 230px;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.14);
  border-radius: 4px;
  padding: 25px 0;
  z-index: 1000;
  right: 80px;
`

const SelectLabel = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 25px;
`

// const Select = styled.select`
//   width: 100%;
//   margin-bottom
// `

const ContentContainer = styled.div`
  width: 70%;
  margin: 0 auto;
`

const AmountContainer = styled.div`
  width: 90%;
  position: absolute;
  top: 130px;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.14);
  border-radius: 4px;
  padding: 25px 0;
  z-index: 1000;
  left: calc(50% - 45%);
`

const RequestsContainer = styled.div`
  width: 80%;
  position: absolute;
  top: 75px;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.14);
  border-radius: 4px;
  padding: 25px 0;
  z-index: 1000;
  left: calc(50% - 40%);
`

const FlexContainer = styled.div`
  width: 100%;
  margin: 25px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SaveButton = styled.div`
  margin-top: 6px;
  width: 45%;
  padding: 8px 0px;
  border: 1px solid ${Colors.blue500};
  background-color: ${Colors.blue500};
  color: ${Colors.White1000};
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

const CancelButton = styled.div`
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

const FullOverlay = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 4px;
  position: absolute;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.4);
`

const FullOverlayFixed = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1000000;
  background-color: rgba(0, 0, 0, 0.4);
`

const SubHeader = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 25px;
  text-align: center;
`

const Header = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  text-align: center;
`

export {
  FullOverlay,
  SelectContainer,
  SelectLabel,
  ContentContainer,
  AmountContainer,
  SaveButton,
  CancelButton,
  FlexContainer,
  Header,
  SubHeader,
  RequestsContainer,
  FullOverlayFixed
}
