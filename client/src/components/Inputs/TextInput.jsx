import React from 'react'
import PropTypes from 'prop-types'
import { InputWrapper, Input, SubLabel } from './Styled'

const TextInput = ({
  placeholder,
  value,
  onTextChange,
  name,
  type,
  required,
  short,
  subLabel
}) => (
  <InputWrapper short={short}>
    <Input
      value={value}
      onChange={onTextChange}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
    />
    {subLabel && <SubLabel>{subLabel}</SubLabel>}
  </InputWrapper>
)

const { string, func, bool } = PropTypes

TextInput.defaultProps = {
  required: false,
  short: false,
  subLabel: null
}

TextInput.propTypes = {
  placeholder: string.isRequired,
  value: string.isRequired,
  name: string.isRequired,
  type: string.isRequired,
  onTextChange: func.isRequired,
  required: bool,
  short: bool,
  subLabel: string
}

export default TextInput
