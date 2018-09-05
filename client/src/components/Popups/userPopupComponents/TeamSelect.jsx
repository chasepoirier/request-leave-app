import React from 'react'
import {
  SelectContainer,
  SelectLabel,
  ContentContainer,
  FullOverlay
} from './Styled'
import { CloseIcon } from '../Styled'

const TeamSelect = ({ teams, closePopup, value, onInputChange }) => (
  <FullOverlay>
    <SelectContainer>
      <CloseIcon
        onClick={() => closePopup(false)}
        className="far fa-times-circle"
      />
      <ContentContainer>
        <SelectLabel>Choose a new team</SelectLabel>
        <select value={value.id} name={value.name} onChange={onInputChange}>
          {teams.map(team => (
            <option key={value.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </ContentContainer>
    </SelectContainer>
  </FullOverlay>
)

export default TeamSelect
