import styled from 'styled-components'
import Colors from '../../design/Colors'

const TeamsContainer = styled.div`
  width: 100%;
  overflow: auto;
  max-width: 100%;
`

const TrashIcon = styled.i`
  color: ${Colors.Red200};
  opacity: 0;
  visibility: hidden;
  position: absolute;
  right: -35px;
  top: 0;
  bottom: 0;
  transition: all 0.2s;
`

const Table = styled.table`
  border-collapse: collapse;
  margin: 25px 0 50px;
  width: calc(100% - 50px);
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
`

const TableCell = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  &:last-of-type {
    padding-right: 50px;
  }
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

export {
  TeamsContainer,
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TeamHeader,
  TablePositioner,
  TrashIcon
}
