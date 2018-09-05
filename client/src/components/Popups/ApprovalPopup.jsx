import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RequestPT } from '../../customPTs'
import { generateID } from '../../utils/calculations'
import { viewOperations } from '../../modules/ducks/view'
import { ButtonOutline, ButtonFilled } from '../Styled'
import {
  PopupWrapper,
  PopupContainer,
  ContentContainer,
  CloseContainer,
  Header,
  SubHeader,
  CloseIcon,
  FlexContainer,
  LabelText,
  ValueText,
  FlexItem,
  InlineItem
} from './Styled'
import Colors from '../../design/Colors'

const dateFormat = 'dd. MMM Do'

const ApprovalPopup = ({
  handleApprove,
  title,
  desc,
  handleDisapprove,
  closePopup,
  request
}) => {
  const {
    name: { fname, lname },
    timestamp,
    types,
    startDate,
    endDate,
    reason
  } = request
  return (
    <PopupContainer>
      <PopupWrapper>
        <CloseIcon onClick={closePopup} className="far fa-times-circle" />
        <ContentContainer>
          <Header>{title}</Header>
          <SubHeader>{desc}</SubHeader>
          <FlexContainer>
            <FlexItem>
              <LabelText>Name</LabelText>
              <ValueText>{`${lname}, ${fname}`}</ValueText>
            </FlexItem>
            <FlexItem>
              <LabelText>Request Created</LabelText>
              <ValueText>{moment(timestamp).fromNow()}</ValueText>
            </FlexItem>
          </FlexContainer>
          <FlexContainer>
            <InlineItem style={{ width: '100%' }}>
              <LabelText>Types</LabelText>
              <FlexContainer style={{ marginBottom: 0 }}>
                {types.map(type => (
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
              <ValueText>{moment(startDate).format(dateFormat)}</ValueText>
            </FlexItem>
            <FlexItem>
              <LabelText>End Date</LabelText>
              <ValueText>{moment(endDate).format(dateFormat)}</ValueText>
            </FlexItem>
          </FlexContainer>
          <FlexContainer>
            <InlineItem>
              <LabelText>Reason</LabelText>
              <ValueText>{reason}</ValueText>
            </InlineItem>
          </FlexContainer>
          <ButtonFilled
            style={{
              backgroundColor: Colors.blue500,
              borderColor: Colors.blue500,
              width: '100%',
              marginBottom: 8,
              marginTop: 15
            }}
            onClick={handleApprove}
          >
            Approve
          </ButtonFilled>
          <ButtonOutline
            style={{
              borderColor: Colors.blue500,
              color: Colors.blue500,
              width: '100%'
            }}
            onClick={handleDisapprove}
          >
            Disapprove
          </ButtonOutline>
        </ContentContainer>
      </PopupWrapper>
      <CloseContainer onClick={closePopup} />
    </PopupContainer>
  )
}

const Type = ({ name, amount }) => (
  <InlineItem>
    <ValueText>{`${name}: ${amount} hours`}</ValueText>
  </InlineItem>
)

const { func, string } = PropTypes

Type.propTypes = {
  name: string.isRequired,
  amount: string.isRequired
}

ApprovalPopup.propTypes = {
  title: string.isRequired,
  desc: string.isRequired,
  handleApprove: func.isRequired,
  handleDisapprove: func.isRequired,
  closePopup: func.isRequired,
  request: RequestPT.isRequired
}

const mapStateToProps = state => ({
  handleApprove: state.view.popup.content.handleApprove,
  handleDisapprove: state.view.popup.content.handleDisapprove,
  title: state.view.popup.content.title,
  desc: state.view.popup.content.desc,
  request: state.requests.currentRequest
})

export default connect(
  mapStateToProps,
  { closePopup: viewOperations.hidePopup }
)(ApprovalPopup)
