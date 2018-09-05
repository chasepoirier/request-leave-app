import React from 'react'
import {
  AmountContainer,
  FlexContainer,
  SaveButton,
  CancelButton,
  FullOverlay,
  ContentContainer,
  SubHeader,
  Header
} from './Styled'
import { CloseIcon } from '../Styled'

const FamilyLeave = ({ handleSubmit, closePopup, active }) => (
  <FullOverlay>
    <AmountContainer>
      <CloseIcon
        onClick={() => closePopup(false)}
        className="far fa-times-circle"
      />
      <ContentContainer>
        <Header>{`Confirm ${!active ? 'Activation' : 'Deactivation'}`}</Header>
        <SubHeader>{`${
          !active ? '320 Hours will be added to FML' : 'FML will be deactivated'
        }`}</SubHeader>
        <FlexContainer>
          <SaveButton onClick={handleSubmit}>{`${
            !active ? 'Activate' : 'Deactivate'
          } FML`}</SaveButton>
          <CancelButton onClick={() => closePopup(false)}>Cancel</CancelButton>
        </FlexContainer>
      </ContentContainer>
    </AmountContainer>
  </FullOverlay>
)

export default FamilyLeave
