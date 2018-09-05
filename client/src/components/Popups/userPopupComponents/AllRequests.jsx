import React from 'react'
import {
  FullOverlayFixed,
  Header,
  ContentContainer,
  RequestsContainer
} from './Styled'
import RequestTable from '../../RequestTable'
import { CloseIcon } from '../Styled'

const AllRequests = ({ closePopup }) => (
  <FullOverlayFixed>
    <RequestsContainer>
      <CloseIcon
        onClick={() => closePopup(false)}
        className="far fa-times-circle"
      />
      <ContentContainer>
        <Header>All Requests</Header>
        <RequestTable />
      </ContentContainer>
    </RequestsContainer>
  </FullOverlayFixed>
)

export default AllRequests
