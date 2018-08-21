import React from 'react'
import { Styled } from 'components'
import StatusTable from './requestStatus/StatusTable'

const RequestStatus = () => (
  <Styled.PageWrapper>
    <Styled.Header style={{ marginTop: 50 }}>Request Status</Styled.Header>
    <StatusTable />
  </Styled.PageWrapper>
)

export default RequestStatus
