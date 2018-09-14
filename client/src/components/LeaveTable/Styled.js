import styled from 'styled-components'
import Colors from '../../design/Colors'

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`

const TableWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: auto;
  margin-top: 40px;
`

const TableRow = styled.tr`
  transition: all 0.2s;
  &:nth-child(even) {
    background-color: ${Colors.White600};
  }
`

const TableCell = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`

const TableHeader = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: default;
`

const TableLabel = styled.div`
  font-size: 21px;
  margin-bottom: 15px;
  font-weight: 600;
`

export { Table, TableRow, TableCell, TableHeader, TableLabel, TableWrapper }
