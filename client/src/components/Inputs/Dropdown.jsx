import React from 'react'
import PropTypes from 'prop-types'
import { SelectContainer, Select, Option, InputLabel } from './Styled'

class Dropdown extends React.Component {
  renderOptions = options =>
    options.map(option => (
      <Option value={option} key={option}>
        {option}
      </Option>
    ))

  render() {
    const { label, options, onSelectChange, required, name } = this.props
    return (
      <SelectContainer>
        <InputLabel>{label}</InputLabel>
        <Select name={name} required={required} onChange={onSelectChange}>
          <Option value="">--- Select an Option ---</Option>
          {this.renderOptions(options)}
        </Select>
      </SelectContainer>
    )
  }
}
const { string, arrayOf, func, bool } = PropTypes

Dropdown.defaultProps = {
  required: false
}

Dropdown.propTypes = {
  label: string.isRequired,
  options: arrayOf(string).isRequired,
  onSelectChange: func.isRequired,
  required: bool,
  name: string.isRequired
}

export default Dropdown
