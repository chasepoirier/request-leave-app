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

export default class FilterByName extends React.Component {
  state = {
    filteredNames: [],
    selected: [],
    inputValue: ''
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })

    const val = e.target.value.toLowerCase()
    if (val) {
      this.filterNames(val)
    } else {
      this.setState({ filteredNames: [] })
    }
  }

  addToSelected = id => {
    const userToAdd = this.props.users.reduce((prev, curr) => {
      if (curr.id === id) {
        prev = curr
      }
      return prev
    })
    const updatedResults = [...this.state.selected, { ...userToAdd }]
    this.setState({ selected: updatedResults })
    this.props.updateQuery('users', updatedResults)
    this.clearInput()
  }

  removeFromSelected = id => {
    const { selected } = this.state
    const index = selected.map(s => s.id).indexOf(id)
    const updatedResults = [
      ...selected.slice(0, index),
      ...selected.slice(index + 1)
    ]
    this.props.updateQuery('users', updatedResults)
    this.setState({ selected: updatedResults })
  }

  clearInput = () => {
    this.setState({ inputValue: '', filteredNames: [] })
  }

  filterNames = string => {
    const names = this.props.users.filter(user => {
      const fnameLname = `${user.fname} ${user.lname}`
      const lnameFname = `${user.lname} ${user.fname}`
      const alreadySelected = this.state.selected
        .map(r => r.id)
        .indexOf(user.id)

      if (alreadySelected !== -1) return false
      if (fnameLname.includes(string)) return true
      if (lnameFname.includes(string)) return true
      return false
    })

    this.setState({ filteredNames: names })
  }

  render() {
    const { filteredNames, inputValue, selected } = this.state
    return (
      <FilterWrapper style={{ zIndex: this.props.index }}>
        <QueryWrapper>
          <FilterTitle>Filter By Name</FilterTitle>
          <InputContainer>
            <Input
              type="text"
              value={inputValue}
              onFocus={this.clearInput}
              onChange={this.handleInputChange}
            />

            <ResultsWrapper length={filteredNames.length}>
              {filteredNames.map(name => (
                <FilteredName
                  key={name.id}
                  name={name}
                  addToSelected={this.addToSelected}
                />
              ))}
            </ResultsWrapper>
          </InputContainer>
        </QueryWrapper>
        <QueryWrapper>
          <FilterTitle>Selected Names</FilterTitle>
          {selected.length === 0 ? (
            <SelectedPlaceholder>
              No names selected, all will be queried
            </SelectedPlaceholder>
          ) : (
            this.state.selected.map(r => (
              <SelectedContainer key={r.id}>
                <SelectedText>{`${r.lname}, ${r.fname}`}</SelectedText>
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

const FilteredName = ({ name, addToSelected }) => (
  <ResultWrapper onClick={() => addToSelected(name.id)}>
    <Result>{name.lname}</Result>
    <Result>{`, ${name.fname}`}</Result>
  </ResultWrapper>
)
