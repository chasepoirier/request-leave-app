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
  SmallButton
} from './Styled'
import { generateID } from '../../utils/calculations'
import RequestTable from '../RequestTable'
import { LogsPopup } from '.'

// const dateFormat = 'dd. MMM Do'

class UserAdminPopup extends React.Component {
  state = {
    logsOpen: false
  }

  componentDidMount() {
    const body = document.querySelector('body')
    body.style.overflow = 'hidden'
  }

  componentWillUnmount() {
    const body = document.querySelector('body')
    body.style.overflow = 'auto'
  }

  toggleLogs = toggle => {
    this.setState({ logsOpen: toggle })
  }

  render() {
    const { title, desc, closePopup, user } = this.props
    return (
      <PopupContainer>
        {this.state.logsOpen && (
          <LogsPopup id={user.info.id} closePopup={this.toggleLogs} />
        )}
        <PopupWrapper style={{ maxWidth: 960 }}>
          <CloseIcon onClick={closePopup} className="far fa-times-circle" />
          {user.loading ? (
            <div>Fetching user...</div>
          ) : (
            <ContentContainer>
              <Header>{title}</Header>
              <SubHeader>{desc}</SubHeader>
              <FlexContainer>
                <FlexItem style={{ width: '30%' }}>
                  <LabelText>Name</LabelText>
                  <ValueText>{`${user.info.name.lname}, ${
                    user.info.name.fname
                  }`}</ValueText>
                </FlexItem>
                <FlexItem style={{ width: '30%' }}>
                  <LabelTextContainer>
                    <LabelText>Email</LabelText>
                  </LabelTextContainer>
                  <ValueText>{user.info.email}</ValueText>
                </FlexItem>
                <FlexItem style={{ width: '30%' }}>
                  <SmallButton onClick={() => this.toggleLogs(true)}>
                    View Logs
                  </SmallButton>
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
