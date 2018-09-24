import React from 'react'
import {
  AmountContainer,
  FlexContainer,
  SaveButton,
  CancelButton,
  FullOverlay,
  ContentContainer,
  SelectLabel
} from './Styled'
import { CloseIcon } from '../Styled'
import { Dropdown, TextInput } from '../../Inputs'

export default class ChangeTypeAmount extends React.Component {
  state = {
    selectedType: '',
    amount: 0,
    error: null,
    reason: ''
  }

  handleSelectChange = e => {
    this.setState({ selectedType: e.target.value })
  }

  handleTextChange = e => {
    if (e.target.name === 'amount') {
      const amount = e.target.value ? parseFloat(e.target.value) : ''
      this.setState({ ...this.state, amount })
    }
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  handleSubmitChange = () => {
    const { selectedType, amount, reason } = this.state
    const { handleSubmit, adding, closePopup } = this.props

    if (selectedType && amount && reason) {
      handleSubmit({ id: selectedType, amount, reason }, adding)
      closePopup(false)
    } else {
      this.setState({ error: 'Please fill out all fields' })
    }
  }

  render() {
    const { types, btnText, closePopup, adding } = this.props

    const options = types.map(i => i.id.toUpperCase())

    const { selectedType, amount, error, reason } = this.state

    return (
      <FullOverlay>
        <AmountContainer>
          <CloseIcon
            onClick={() => closePopup(false)}
            className="far fa-times-circle"
          />
          <ContentContainer>
            <SelectLabel style={{ marginTop: 30 }}>
              {`${adding ? 'Add Amount' : 'Subtract Amount'}`}
            </SelectLabel>
            <FlexContainer>
              <Dropdown
                label="Select type"
                options={options}
                name="add"
                value={selectedType}
                onSelectChange={this.handleSelectChange}
              />
            </FlexContainer>
            <FlexContainer>
              <TextInput
                value={amount}
                onTextChange={this.handleTextChange}
                type="number"
                name="amount"
              />
            </FlexContainer>
            <SelectLabel style={{ marginBottom: 5 }}>Reason</SelectLabel>
            <FlexContainer style={{ marginTop: 5 }}>
              <TextInput
                value={reason}
                onTextChange={this.handleTextChange}
                name="reason"
                type="string"
              />
            </FlexContainer>
            {error && <div>{error}</div>}
            <FlexContainer>
              <SaveButton onClick={this.handleSubmitChange}>
                {btnText}
              </SaveButton>
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
