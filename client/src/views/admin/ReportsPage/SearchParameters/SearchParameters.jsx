import React from 'react'
import FilterByName from './FilterByName'
import { ParamContainer, FlexWrapper } from './Styled'
import FilterByType from './FilterByType'
import FilterByDate from './FilterByDate'
import FilterByTeam from './FilterByTeam'

const SearchParameters = ({ updateQuery, users, leaveTypes, teams }) => (
  <ParamContainer>
    <FlexWrapper>
      <FilterByName updateQuery={updateQuery} users={users} index={2} />
      <FilterByType updateQuery={updateQuery} types={leaveTypes} index={1} />
    </FlexWrapper>
    <FlexWrapper>
      <FilterByDate updateQuery={updateQuery} />
      <FilterByTeam updateQuery={updateQuery} teams={teams} />
    </FlexWrapper>
  </ParamContainer>
)

export default SearchParameters
