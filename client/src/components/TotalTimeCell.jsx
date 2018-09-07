import React from 'react'
import moment from 'moment'
import { ApprovalContainer, TimeText, TimeTotal } from './Styled'

const timeFormat = 'LT'
const TotalTimeCell = ({ total, start, end }) => (
  <ApprovalContainer>
    <TimeTotal>{`${total}`}</TimeTotal>
    {start ? (
      <TimeText>
        {moment(start).format(timeFormat)} - {moment(end).format(timeFormat)}
      </TimeText>
    ) : (
      <i style={{ fontSize: 13 }}>Full Day</i>
    )}
  </ApprovalContainer>
)

export default TotalTimeCell
