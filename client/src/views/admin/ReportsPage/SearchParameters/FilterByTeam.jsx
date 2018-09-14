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

export default class FilterByTeam extends React.Component {
  state = {
    filteredTeams: [],
    selected: [],
    inputValue: ''
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })

    const val = e.target.value.toLowerCase()
    if (val) {
      this.filterNames(val)
    } else {
      this.setState({ filteredTeams: [] })
    }
  }

  addToSelected = id => {
    const teamToAdd = this.props.teams.reduce((prev, curr) => {
      if (curr.id === id) {
        prev = curr
      }
      return prev
    })
    const updatedResults = [...this.state.selected, { ...teamToAdd }]
    this.setState({ selected: updatedResults })
    this.props.updateQuery('teams', updatedResults)
    this.clearInput()
  }

  removeFromSelected = id => {
    const { selected } = this.state
    const index = selected.map(s => s.id).indexOf(id)
    const updatedResults = [
      ...selected.slice(0, index),
      ...selected.slice(index + 1)
    ]
    this.props.updateQuery('teams', updatedResults)
    this.setState({ selected: updatedResults })
  }

  clearInput = () => {
    this.setState({ inputValue: '', filteredTeams: [] })
  }

  filterNames = string => {
    const names = this.props.teams.filter(team => {
      const alreadySelected = this.state.selected
        .map(r => r.id)
        .indexOf(team.id)

      if (alreadySelected !== -1) return false
      if (team.name.toLowerCase().includes(string)) return true
      return false
    })

    this.setState({ filteredTeams: names })
  }

  render() {
    const { filteredTeams, inputValue, selected } = this.state
    return (
      <FilterWrapper style={{ zIndex: this.props.index }}>
        <QueryWrapper>
          <FilterTitle>Filter By Team</FilterTitle>
          <InputContainer>
            <Input
              type="text"
              value={inputValue}
              onFocus={this.clearInput}
              onChange={this.handleInputChange}
            />

            <ResultsWrapper length={filteredTeams.length}>
              {filteredTeams.map(team => (
                <FilteredTeam
                  key={team.id}
                  team={team}
                  addToSelected={this.addToSelected}
                />
              ))}
            </ResultsWrapper>
          </InputContainer>
        </QueryWrapper>
        <QueryWrapper>
          <FilterTitle>Selected Teams</FilterTitle>
          {selected.length === 0 ? (
            <SelectedPlaceholder>
              No teams selected, all will be queried
            </SelectedPlaceholder>
          ) : (
            this.state.selected.map(r => (
              <SelectedContainer key={r.id}>
                <SelectedText>{r.name}</SelectedText>
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

const FilteredTeam = ({ team, addToSelected }) => (
  <ResultWrapper onClick={() => addToSelected(team.id)}>
    <Result>{team.name}</Result>
  </ResultWrapper>
)
