import styled from 'styled-components'
import Colors from '../../../../design/Colors'

const Result = styled.div`
  text-transform: capitalize;
`

const ResultWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${Colors.White1000};
  padding: 6px 0;
  border-bottom: 1px solid ${Colors.White400};
  opacity: 1;
  &:hover {
    opacity: 0.6;
  }
`

const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 25px 0;
  position: relative;
`

const QueryWrapper = styled.div`
  width: calc(50% - 10px);
`

const InputContainer = styled.div`
  width: 100%;
  position: relative;
`

const Input = styled.input`
  font-size: 14px;
  color: ${Colors.Black400};
  outline: none;
  border-radius: 4px;
  text-indent: 10px;
  height: 30px;
  border: 1px solid ${Colors.Black1000};
  width: 100%;
`

const FilterTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`

const ResultsWrapper = styled.div`
  width: 100%;
  padding: 15px 10px;
  position: absolute;
  top: 30px;
  left: 0;
  background-color: ${Colors.White1000};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: ${props => (props.length <= 0 ? 'none' : 'block')};
  max-height: 250px;
  overflow: auto;
`

const ParamContainer = styled.div`
  position: relative;
  z-index: 10;
`

const SelectedContainer = styled.div`
  padding: 6px 15px;
  margin-right: 10px;
  border-radius: 40px;
  margin-bottom: 8px;
  background-color: ${Colors.blue500};
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`

const SelectedText = styled.div`
  font-size: 14px;
  color: ${Colors.White1000};
  text-transform: capitalize;
`

const SelectedPlaceholder = styled.div`
  font-size: 14px;
  font-style: italic;
`

const DeleteButton = styled.i`
  font-size: 14px;
  color: ${Colors.White1000};
  cursor: pointer;
  margin-left: 6px;
  transition: all 0.2s;
  opacity: 1;
  &:hover {
    opacity: 0.6;
  }
`

const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: 920px) {
    flex-wrap: wrap;
  }
`

const SubLabel = styled.div`
  font-size: 13px;
  font-style: italic;
`

export {
  SubLabel,
  FlexWrapper,
  ParamContainer,
  Result,
  ResultWrapper,
  QueryWrapper,
  InputContainer,
  ResultsWrapper,
  FilterWrapper,
  Input,
  FilterTitle,
  SelectedContainer,
  SelectedText,
  DeleteButton,
  SelectedPlaceholder
}
