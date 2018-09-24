import React from 'react'
import FilterTypes from '../../../utils/FilterTypes'
import styled from 'styled-components'

const {
  nameDown,
  nameUp,
  requestTypes,
  startDate,
  endDate,
  approval
} = FilterTypes

const Filters = ({ toggleFilter, value }) => (
  <FilterContainer>
    <div style={{ marginBottom: 10 }}>Filter Results</div>
    <select value={value} onChange={toggleFilter}>
      <option value="">--- No Filters ---</option>
      <option value={nameUp}>By Name (asc)</option>
      <option value={nameDown}>By Name (desc)</option>
      <option value={requestTypes}>By Request Types</option>
      <option value={startDate}>By Start Date</option>
      <option value={endDate}>By End Date</option>
      <option value={approval}>By Approval Status</option>
    </select>
  </FilterContainer>
)

const FilterContainer = styled.div`
  width: 100%;
  margin-top: 50px;
`

export default Filters
