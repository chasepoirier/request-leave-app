import React from 'react'
import {
  AmountContainer,
  FlexContainer,
  SaveButton,
  CancelButton,
  FullOverlay,
  ContentContainer,
  SubHeader,
  Header
} from './Styled'
import { CloseIcon } from '../Styled'
import { TextInput } from '../../Inputs'

export default class MilitaryLeave extends React.Component {
  state = {
    amount: 0,
    errors: null
  }

  handleInputChange = e => {
    const amount = e.target.value ? parseFloat(e.target.value) : ''
    this.setState({ amount })
  }

  handleSubmit = () => {
    const { handleSubmit, active } = this.props
    const { amount } = this.state

    if (!active) {
      if (amount > 0) {
        handleSubmit(amount)
      } else {
        this.setState({ errors: 'Please Select an amount' })
      }
    } else {
      handleSubmit(0)
    }
  }

  render() {
    const { closePopup, active } = this.props
    return (
      <FullOverlay>
        <AmountContainer>
          <CloseIcon
            onClick={() => closePopup(false)}
            className="far fa-times-circle"
          />
          <ContentContainer>
            <Header>{`Confirm ${
              !active ? 'Activation' : 'Deactivation'
            }`}</Header>
            <SubHeader>{`${
              !active
                ? 'Select an amount to add to ML'
                : 'ML will be deactivated'
            }`}</SubHeader>
            {!active && (
              <FlexContainer>
                <TextInput
                  type="number"
                  value={this.state.amount}
                  onTextChange={this.handleInputChange}
                  name="amount"
                />
              </FlexContainer>
            )}
            <FlexContainer>
              <SaveButton onClick={this.handleSubmit}>{`${
                !active ? 'Activate' : 'Deactivate'
              } ML`}</SaveButton>
              <CancelButton onClick={() => closePopup(false)}>
                Cancel
              </CancelButton>
            </FlexContainer>
          </ContentContainer>
        </AmountContainer>
      </FullOverlay>
    )
  }
}
