import styled from 'styled-components'
import Colors from '../../../design/Colors'

const TeamsContainer = styled.div`
  width: 100%;
  overflow: auto;
  max-width: 100%;
`

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 25px 0 50px;
`

const TrashIcon = styled.i`
  color: ${Colors.Red200};
  opacity: 0;
  visibility: hidden;
  position: absolute;
  right: 15px;
  top: 0;
  bottom: 0;
  transition: all 0.2s;
`

const TableRow = styled.tr`
  transition: all 0.2s;
  cursor: pointer;
  &:nth-child(even) {
    background-color: ${Colors.White600};
  }
  &:hover ${TrashIcon} {
    opacity: 1;
    visibility: visible;
  }
  &:hover ${TrashIcon}:hover {
    opacity: 0.7;
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

const Input = styled.input`
  margin-right: 25px;
  border: 1px solid ${Colors.Black1000};
  height: 35px;
  font-size: 16px;
  text-indent: 2px;
  color: ${Colors.Black400};
`

const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  margin: 25px 0;
`

export {
  FlexWrapper,
  TeamsContainer,
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TeamHeader,
  TrashIcon,
  TablePositioner,
  Input
}
