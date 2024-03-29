import styled from 'styled-components'
import Colors from '../../design/Colors'

const TeamsContainer = styled.div`
  width: 100%;
`

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 25px 0 50px;
`

const LoadingState = styled.div`
  width: 100%;
  margin: 25px 0 50px;
  text-align: center;
  margin-top: 100px;
`

const Row = styled.tr`
  transition: all 0.2s;
  cursor: pointer;
  &:nth-child(even) {
    background-color: ${Colors.White600};
  }
`

const TableCell = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`

const TablePositioner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const TableHeader = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  font-size: 18px;
  font-weight: 500;
  cursor: default;
`

const TeamHeader = styled.div`
  font-size: 21px;
  font-weight: 500;
  &:first-of-type {
    margin-top: 50px;
  }
`

const TableWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: auto;
`

export {
  TeamsContainer,
  TableWrapper,
  Table,
  Row,
  TableCell,
  TableHeader,
  TeamHeader,
  TablePositioner,
  LoadingState
}
