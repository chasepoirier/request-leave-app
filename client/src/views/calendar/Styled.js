import styled from 'styled-components'

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

export { FlexWrapper, Label }
