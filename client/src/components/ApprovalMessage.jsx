import React from 'react'
import { ApprovalContainer, ApprovalType, ApprovalText } from './Styled'

const ApprovalMessage = ({ status }) => (
  <ApprovalContainer>
    <ApprovalType pending={status.pending} approved={status.approved} />
    <ApprovalText>
      {status.pending ? 'Pending...' : status.approved ? 'Approved' : 'Denied'}
    </ApprovalText>
  </ApprovalContainer>
)

export default ApprovalMessage
