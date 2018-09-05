import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { viewOperations } from '../../modules/ducks/view'
import { teamOperations } from '../../modules/ducks/teams'
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
  InlineItem,
  LabelTextContainer,
  ChangeText,
  SmallButton
} from './Styled'
import Colors from '../../design/Colors'
import { TeamSelect, ChangeTypeAmount } from './userPopupComponents'
import { Checkbox } from '../Inputs/'
import { generateID } from '../../utils/calculations'
import * as arrays from '../../utils/arrays'

// const dateFormat = 'dd. MMM Do'

class UserPopup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userInfo: null,
      teamSelect: {
        open: false,
        teams: []
      },
      addToAmount: {
        open: false
      },
      subtractFromAmount: {
        open: false
      },
      updated: {
        team: false,
        status: false,
        typeAmounts: false
      },
      submitting: false
    }
  }

  componentDidMount() {
    const { fetchAllTeams } = this.props
    fetchAllTeams().then(teams => {
      this.setState({ teamSelect: { teams: teams.payload.teams } })
    })

    const body = document.querySelector('body')
    body.style.overflow = 'hidden'
  }

  componentWillUnmount() {
    const body = document.querySelector('body')
    body.style.overflow = 'auto'
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !this.props.user.loading &&
      prevProps.user.loading !== this.props.user.loading
    ) {
      this.setState({ userInfo: this.props.user.info })
    }
  }

  toggleTeamSelect = toggle => {
    this.setState({ teamSelect: { ...this.state.teamSelect, open: toggle } })
  }

  toggleAddToAmount = toggle => {
    this.setState({ addToAmount: { open: toggle } })
  }

  toggleSubtractFromAmount = toggle => {
    this.setState({ subtractFromAmount: { open: toggle } })
  }

  onTeamChange = e => {
    const newTeam = this.state.teamSelect.teams.reduce((prev, curr) => {
      if (curr.id === e.target.value) {
        prev = curr
      }
      return prev
    }, {})
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        team: { ...newTeam }
      }
    })
    this.toggleTeamSelect(false)
  }

  handleCheckboxChange = e => {
    const { userInfo } = this.state
    this.setState({
      userInfo: {
        ...userInfo,
        status: { ...userInfo.status, [e.target.name]: e.target.checked }
      }
    })
  }

  handleTypeChange = (type, adding) => {
    const {
      userInfo: { typeAmounts },
      userInfo
    } = this.state
    const index = typeAmounts
      .map(t => t.id.toUpperCase())
      .indexOf(type.id.toUpperCase())
    const oldAmount = typeAmounts[index].amount
    const amount = adding ? oldAmount + type.amount : oldAmount - type.amount
    const newTypes = [
      ...typeAmounts.slice(0, index),
      { id: type.id, amount },
      ...typeAmounts.slice(index + 1)
    ]
    this.setState({ userInfo: { ...userInfo, typeAmounts: newTypes } })
  }

  handleUpdateUser = () => {
    const { userInfo, submitting } = this.state
    if (!submitting) {
      const { updateUserRequest } = this.props
      const {
        info: { team, status, typeAmounts }
      } = this.props.user

      const updates = {
        team: {
          updated: false,
          oldTeam: null
        },
        status: {
          updated: false
        },
        typeAmounts: {
          updated: false
        }
      }

      if (team.id !== userInfo.team.id) {
        updates.team.updated = true
        updates.team.oldTeam = team.id
      }
      if (
        status.admin !== userInfo.status.admin ||
        status.supervisor !== userInfo.status.supervisor
      ) {
        updates.status.updated = true
      }

      const typesEqual = arrays.equal(userInfo.typeAmounts, typeAmounts)

      if (!typesEqual) {
        updates.typeAmounts.updated = true
      }

      this.setState({ submitting: true })
      updateUserRequest({ updates, user: userInfo }).then(() => {
        window.location.reload()
      })
    }
  }

  render() {
    const { title, desc, closePopup } = this.props

    const {
      userInfo,
      teamSelect,
      submitting,
      addToAmount,
      subtractFromAmount
    } = this.state

    return (
      <PopupContainer>
        <PopupWrapper>
          {teamSelect.open && (
            <TeamSelect
              teams={teamSelect.teams}
              closePopup={this.toggleTeamSelect}
              value={userInfo.team}
              onInputChange={this.onTeamChange}
            />
          )}
          {addToAmount.open && (
            <ChangeTypeAmount
              closePopup={this.toggleAddToAmount}
              btnText="Add To Amount"
              types={userInfo.typeAmounts}
              handleSubmit={this.handleTypeChange}
              adding
            />
          )}
          {subtractFromAmount.open && (
            <ChangeTypeAmount
              closePopup={this.toggleSubtractFromAmount}
              btnText="Subtract From Amount"
              handleSubmit={this.handleTypeChange}
              types={userInfo.typeAmounts}
              adding={false}
            />
          )}
          <CloseIcon onClick={closePopup} className="far fa-times-circle" />
          {!userInfo ? (
            <div>Fetching user...</div>
          ) : (
            <ContentContainer>
              <Header>{title}</Header>
              <SubHeader>{desc}</SubHeader>
              <FlexContainer>
                <FlexItem>
                  <LabelText>Name</LabelText>
                  <ValueText>{`${userInfo.name.lname}, ${
                    userInfo.name.fname
                  }`}</ValueText>
                </FlexItem>
                <FlexItem>
                  <LabelTextContainer>
                    <LabelText>Team</LabelText>
                    <ChangeText onClick={() => this.toggleTeamSelect(true)}>
                      Change Team
                    </ChangeText>
                  </LabelTextContainer>
                  <ValueText>{userInfo.team.name}</ValueText>
                </FlexItem>
              </FlexContainer>
              <FlexContainer>
                <FlexItem>
                  <Checkbox
                    value={userInfo.status.admin}
                    label="Admin"
                    onInputChange={this.handleCheckboxChange}
                    name="admin"
                  />
                </FlexItem>
                <FlexItem>
                  <Checkbox
                    value={userInfo.status.supervisor}
                    label="Supervisor"
                    onInputChange={this.handleCheckboxChange}
                    name="supervisor"
                  />
                </FlexItem>
              </FlexContainer>
              <FlexContainer>
                <LabelTextContainer>
                  <LabelText>Amounts By Type</LabelText>
                </LabelTextContainer>
                <FlexContainer style={{ marginBottom: 10 }}>
                  <SmallButton onClick={() => this.toggleAddToAmount(true)}>
                    Add Time To Type
                  </SmallButton>
                  <SmallButton
                    onClick={() => this.toggleSubtractFromAmount(true)}
                  >
                    Subtract Time From Type
                  </SmallButton>
                </FlexContainer>
                <FlexContainer style={{ marginBottom: 0, marginTop: 8 }}>
                  {userInfo.typeAmounts.map(type => (
                    <Type
                      name={type.id}
                      amount={type.amount}
                      key={generateID()}
                    />
                  ))}
                </FlexContainer>
              </FlexContainer>
              <FlexContainer>
                <LabelText>Activate Special Leave Types</LabelText>
                <FlexContainer style={{ marginBottom: 0 }}>
                  <SmallButton>Family Leave</SmallButton>
                  <SmallButton>Military Leave</SmallButton>
                </FlexContainer>
              </FlexContainer>
              {/* 
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
          </FlexContainer> */}
              <ButtonFilled
                style={{
                  backgroundColor: Colors.blue500,
                  borderColor: Colors.blue500,
                  width: '100%',
                  marginBottom: 8,
                  marginTop: 15
                }}
                onClick={this.handleUpdateUser}
              >
                {submitting ? 'Updating user...' : 'Save User'}
              </ButtonFilled>
              <ButtonOutline
                style={{
                  borderColor: Colors.blue500,
                  color: Colors.blue500,
                  width: '100%'
                }}
                onClick={closePopup}
              >
                Cancel
              </ButtonOutline>
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

UserPopup.propTypes = {
  title: string.isRequired,
  desc: string.isRequired,
  closePopup: func.isRequired
}

const mapStateToProps = state => ({
  title: state.view.popup.content.title,
  desc: state.view.popup.content.desc,
  updateUserRequest: state.view.popup.content.updateUserRequest,
  user: state.user.selectedUser
})

export default connect(
  mapStateToProps,
  {
    closePopup: viewOperations.hidePopup,
    fetchAllTeams: teamOperations.fetchAllTeams
  }
)(UserPopup)
