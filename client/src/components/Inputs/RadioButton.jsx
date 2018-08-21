import React from 'react'
import PropTypes from 'prop-types'
import { CheckboxWrapper, InputLabel, Check } from './Styled'

const RadioButton = ({ value, onInputChange, name, label }) => (
  <CheckboxWrapper>
    <InputLabel>{label}</InputLabel>
    <Check value={value} onChange={onInputChange} name={name} type="radio" />
  </CheckboxWrapper>
)

const { string, func } = PropTypes

RadioButton.propTypes = {
  value: string.isRequired,
  name: string.isRequired,
  onInputChange: func.isRequired,
  label: string.isRequired
}

export default RadioButton
