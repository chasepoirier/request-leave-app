import React from 'react'
import { Checkbox } from '../../components/Inputs'
import { FlexWrapper, Label } from './Styled'

const Filters = ({ toggleFilter, self, team, all }) => (
  <FlexWrapper>
    <FlexWrapper>
      <Label color="rgb(248, 177, 46)" />
      <Checkbox
        value={self}
        style={{ width: 'auto' }}
        name="self"
        label="Own Requests"
        onInputChange={toggleFilter}
      />
    </FlexWrapper>
    <FlexWrapper>
      <Label color="#4885ed" />
      <Checkbox
        value={team}
        style={{ width: 'auto' }}
        name="ownTeam"
        label="Own Team"
        onInputChange={toggleFilter}
      />
    </FlexWrapper>
    <FlexWrapper>
      <Label color="rgb(58, 216, 71)" />
      <Checkbox
        value={all}
        style={{ width: 'auto' }}
        name="otherTeams"
        label="All Other Teams"
        onInputChange={toggleFilter}
      />
    </FlexWrapper>
  </FlexWrapper>
)

// , marginLeft: 40
export default Filters
