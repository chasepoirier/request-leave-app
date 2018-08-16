import React from 'react'
import PropTypes from 'prop-types'
import { CheckboxWrapper, InputLabel, Check } from './Styled'

const Checkbox = ({ value, onInputChange, name, label }) => (
  <CheckboxWrapper>
    <InputLabel>{label}</InputLabel>
    <Check value={value} onChange={onInputChange} name={name} type="checkbox" />
  </CheckboxWrapper>
)

const { string, func, bool } = PropTypes

Checkbox.propTypes = {
  value: bool.isRequired,
  name: string.isRequired,
  onInputChange: func.isRequired,
  label: string.isRequired
}

export default Checkbox
