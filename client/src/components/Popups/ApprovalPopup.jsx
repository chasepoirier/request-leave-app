import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RequestPT } from '../../customPTs'
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
  FlexItem
} from './Styled'
import Colors from '../../design/Colors'

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
    types
  } = request
  return (
    <PopupContainer>
      <PopupWrapper>
        <CloseIcon onClick={closePopup} className="far fa-times-circle" />
        <ContentContainer>
          <Header>{title}</Header>
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
            <FlexItem>
              <LabelText>Types</LabelText>
              <ValueText>
                {types.map(type => (
                  <Type name={type.type} amount={type.amount} key={type.type} />
                ))}
              </ValueText>
            </FlexItem>
            <FlexItem>
              <LabelText>Request Created</LabelText>
              <ValueText>{moment(timestamp).fromNow()}</ValueText>
            </FlexItem>
          </FlexContainer>
          <ButtonOutline
            style={{
              borderColor: Colors.blue500,
              color: Colors.blue500,
              width: '100%',
              marginBottom: 8
            }}
            onClick={handleDisapprove}
          >
            Disapprove
          </ButtonOutline>
          <ButtonFilled
            style={{
              backgroundColor: Colors.blue500,
              borderColor: Colors.blue500,
              width: '100%'
            }}
            onClick={handleApprove}
          >
            Approve
          </ButtonFilled>
        </ContentContainer>
      </PopupWrapper>
      <CloseContainer onClick={closePopup} />
    </PopupContainer>
  )
}

const Type = ({ name, amount }) => (
  <FlexItem>
    <ValueText>{`${name}: ${amount} hours`}</ValueText>
  </FlexItem>
)

const { func, string, number } = PropTypes

Type.propTypes = {
  name: string.isRequired,
  amount: number.isRequired
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
