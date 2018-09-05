import React from 'react'
import {
  AmountContainer,
  FlexContainer,
  SaveButton,
  CancelButton,
  FullOverlay,
  ContentContainer
} from './Styled'
import { CloseIcon } from '../Styled'
import { Dropdown, TextInput } from '../../Inputs'

export default class ChangeTypeAmount extends React.Component {
  state = {
    selectedType: '',
    amount: 0,
    error: null
  }

  handleSelectChange = e => {
    this.setState({ selectedType: e.target.value })
  }

  handleTextChange = e => {
    const amount = e.target.value ? parseFloat(e.target.value) : ''
    this.setState({ amount })
  }

  handleSubmitChange = () => {
    const { selectedType, amount } = this.state
    const { handleSubmit, adding, closePopup } = this.props

    if (selectedType && amount) {
      handleSubmit({ id: selectedType, amount }, adding)
      closePopup(false)
    } else {
      this.setState({ error: 'Please fill out all fields' })
    }
  }

  render() {
    const { types, btnText, closePopup } = this.props

    const options = types.map(i => i.id.toUpperCase())

    const { selectedType, amount, error } = this.state
    return (
      <FullOverlay>
        <AmountContainer>
          <CloseIcon
            onClick={() => closePopup(false)}
            className="far fa-times-circle"
          />
          <ContentContainer>
            <div>Change Amount</div>
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
