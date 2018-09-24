import React from 'react'
import moment from 'moment'
import { generateID } from '../../utils/calculations'
import {
  PopupWrapper,
  PopupContainer,
  Header,
  FlexContainer,
  ContentContainer,
  CloseIcon,
  ValueText,
  InlineItem,
  FlexItem,
  LabelText
} from './Styled'

const dateFormat = 'dd. MMM Do'
const timeFormat = 'LT'

const EventPopup = ({ hideEvent, event }) => (
  <PopupContainer>
    <PopupWrapper>
      <CloseIcon onClick={hideEvent} className="far fa-times-circle" />
      <ContentContainer>
        <Header>Event</Header>
        <FlexContainer>
          <FlexItem>
            <LabelText>Name</LabelText>
            <ValueText>{`${event.name.lname}, ${event.name.fname}`}</ValueText>
          </FlexItem>
          <FlexItem>
            <LabelText>Request Created</LabelText>
            <ValueText>{moment(event.timestamp).fromNow()}</ValueText>
          </FlexItem>
        </FlexContainer>
        <FlexContainer>
          <InlineItem style={{ width: '100%' }}>
            <LabelText>Types</LabelText>
            <FlexContainer style={{ marginBottom: 0 }}>
              {event.types.map(type => (
                <Type
                  name={type.type}
                  amount={type.amount}
                  key={generateID()}
                />
              ))}
            </FlexContainer>
          </InlineItem>
        </FlexContainer>
        <FlexContainer>
          <FlexItem>
            <LabelText>Start Date</LabelText>
            <ValueText>{moment(event.startDate).format(dateFormat)}</ValueText>
          </FlexItem>
          <FlexItem>
            <LabelText>End Date</LabelText>
            <ValueText>{moment(event.endDate).format(dateFormat)}</ValueText>
          </FlexItem>
        </FlexContainer>
        {event.startTime && (
          <FlexContainer>
            <FlexItem>
              <LabelText>Start Time</LabelText>
              <ValueText>
                {moment(event.startTime).format(timeFormat)}
              </ValueText>
            </FlexItem>
            <FlexItem>
              <LabelText>End Time</LabelText>
              <ValueText>{moment(event.endTime).format(timeFormat)}</ValueText>
            </FlexItem>
          </FlexContainer>
        )}
        <FlexContainer>
          <InlineItem style={{ width: '100%' }}>
            <LabelText>Reason</LabelText>
            <ValueText>{event.reason}</ValueText>
          </InlineItem>
        </FlexContainer>
      </ContentContainer>
    </PopupWrapper>
  </PopupContainer>
)

const Type = ({ name, amount }) => (
  <InlineItem>
    <ValueText>{`${name}: ${amount} hours`}</ValueText>
  </InlineItem>
)

export default EventPopup
