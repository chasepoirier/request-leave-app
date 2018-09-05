import React from 'react'
import { Styled } from 'components'
import LeaveTable from '../components/LeaveTable/LeaveTable'
import HistoryTable from './leaveHistory/HistoryTable'

const LeaveHistory = () => (
  <Styled.PageWrapper>
    <Styled.Header style={{ marginTop: 50 }}>Your Leave History</Styled.Header>
    <LeaveTable />
    <Styled.SubHeader style={{ marginTop: 50 }}>Past Requests</Styled.SubHeader>
    <HistoryTable />
  </Styled.PageWrapper>
)

export default LeaveHistory
