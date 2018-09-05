import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { viewOperations } from '../../modules/ducks/view'
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
  InlineItem,
  LabelTextContainer,
  ChangeText
} from './Styled'
import { AllRequests } from './userPopupComponents'
import { generateID } from '../../utils/calculations'
import RequestTable from '../RequestTable'

// const dateFormat = 'dd. MMM Do'

class UserAdminPopup extends React.Component {
  componentDidMount() {
    const body = document.querySelector('body')
    body.style.overflow = 'hidden'
  }

  componentWillUnmount() {
    const body = document.querySelector('body')
    body.style.overflow = 'auto'
  }

  render() {
    const { title, desc, closePopup, user } = this.props
    return (
      <PopupContainer>
        <PopupWrapper style={{ maxWidth: 960 }}>
          <CloseIcon onClick={closePopup} className="far fa-times-circle" />
          {user.loading ? (
            <div>Fetching user...</div>
          ) : (
            <ContentContainer>
              <Header>{title}</Header>
              <SubHeader>{desc}</SubHeader>
              <FlexContainer>
                <FlexItem>
                  <LabelText>Name</LabelText>
                  <ValueText>{`${user.info.name.lname}, ${
                    user.info.name.fname
                  }`}</ValueText>
                </FlexItem>
                <FlexItem>
                  <LabelTextContainer>
                    <LabelText>Email</LabelText>
                  </LabelTextContainer>
                  <ValueText>{user.info.email}</ValueText>
                </FlexItem>
              </FlexContainer>
              <FlexContainer>
                <LabelTextContainer>
                  <LabelText>Amounts By Type</LabelText>
                </LabelTextContainer>
                <FlexContainer style={{ marginBottom: 0, marginTop: 8 }}>
                  {user.info.typeAmounts.map(type => (
                    <Type
                      name={type.id}
                      amount={type.amount}
                      key={generateID()}
                    />
                  ))}
                </FlexContainer>
              </FlexContainer>
              <FlexContainer>
                <LabelTextContainer>
                  <LabelText>All Requests</LabelText>
                </LabelTextContainer>
                <RequestTable />
              </FlexContainer>
            </ContentContainer>
          )}
        </PopupWrapper>
        <CloseContainer onClick={closePopup} />
      </PopupContainer>
    )
  }
}

const Type = ({ name, amount }) => (
  <InlineItem>
    <ValueText>{`${name.toUpperCase()}: ${amount} hours`}</ValueText>
  </InlineItem>
)

const { func, string } = PropTypes

Type.propTypes = {
  name: string.isRequired
}

UserAdminPopup.propTypes = {
  title: string.isRequired,
  desc: string.isRequired,
  closePopup: func.isRequired
}

const mapStateToProps = state => ({
  title: state.view.popup.content.title,
  desc: state.view.popup.content.desc,
  user: state.user.selectedUser
})

export default connect(
  mapStateToProps,
  {
    closePopup: viewOperations.hidePopup
  }
)(UserAdminPopup)
