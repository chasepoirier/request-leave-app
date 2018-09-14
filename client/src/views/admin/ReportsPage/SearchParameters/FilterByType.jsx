import React from 'react'
import {
  Result,
  ResultWrapper,
  QueryWrapper,
  InputContainer,
  ResultsWrapper,
  FilterWrapper,
  Input,
  FilterTitle,
  SelectedContainer,
  SelectedText,
  DeleteButton,
  SelectedPlaceholder
} from './Styled'

export default class FilterByType extends React.Component {
  state = {
    filteredTypes: [],
    selected: [],
    inputValue: ''
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })

    const val = e.target.value.toLowerCase()
    if (val) {
      this.filterTypes(val)
    } else {
      this.setState({ filteredTypes: [] })
    }
  }

  addToSelected = id => {
    const typeToAdd = this.props.types.reduce((prev, curr) => {
      if (curr.id === id) {
        prev = curr
      }
      return prev
    })

    const updatedResults = [...this.state.selected, { ...typeToAdd }]
    this.setState({ selected: updatedResults })
    this.props.updateQuery('types', updatedResults)
    this.clearInput()
  }

  removeFromSelected = id => {
    const { selected } = this.state
    const index = selected.map(s => s.id).indexOf(id)
    const updatedResults = [
      ...selected.slice(0, index),
      ...selected.slice(index + 1)
    ]
    this.props.updateQuery('types', updatedResults)
    this.setState({ selected: updatedResults })
  }

  clearInput = () => {
    this.setState({ inputValue: '', filteredTypes: [] })
  }

  filterTypes = string => {
    const types = this.props.types.filter(t => {
      const alreadySelected = this.state.selected.map(r => r.id).indexOf(t.id)

      if (alreadySelected !== -1) return false
      if (t.name.toLowerCase().includes(string)) return true
      if (t.id.toLowerCase().includes(string)) return true
      return false
    })
    this.setState({ filteredTypes: types })
  }

  render() {
    const { filteredTypes, inputValue, selected } = this.state
    return (
      <FilterWrapper style={{ zIndex: this.props.index }}>
        <QueryWrapper>
          <FilterTitle>Filter By Leave Type</FilterTitle>
          <InputContainer>
            <Input
              type="text"
              value={inputValue}
              onFocus={this.clearInput}
              onChange={this.handleInputChange}
            />

            <ResultsWrapper length={filteredTypes.length}>
              {filteredTypes.map(type => (
                <FilteredType
                  key={type.id}
                  type={type}
                  addToSelected={this.addToSelected}
                />
              ))}
            </ResultsWrapper>
          </InputContainer>
        </QueryWrapper>
        <QueryWrapper>
          <FilterTitle>Selected Types</FilterTitle>
          {selected.length === 0 ? (
            <SelectedPlaceholder>
              No types selected, all will be queried
            </SelectedPlaceholder>
          ) : (
            this.state.selected.map(r => (
              <SelectedContainer key={r.id}>
                <SelectedText>{`${r.id.toUpperCase()} - ${
                  r.name
                }`}</SelectedText>
                <DeleteButton
                  onClick={() => this.removeFromSelected(r.id)}
                  className="far fa-times-circle"
                />
              </SelectedContainer>
            ))
          )}
        </QueryWrapper>
      </FilterWrapper>
    )
  }
}

const FilteredType = ({ type, addToSelected }) => (
  <ResultWrapper onClick={() => addToSelected(type.id)}>
    <Result>{`${type.id.toUpperCase()} - ${type.name}`}</Result>
  </ResultWrapper>
)
