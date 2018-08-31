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
  subLabel,
  style
}) => (
  <InputWrapper style={style} short={short}>
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

const { string, func, bool, objectOf, oneOfType, number } = PropTypes

TextInput.defaultProps = {
  required: false,
  short: false,
  subLabel: null,
  style: null,
  placeholder: ''
}

TextInput.propTypes = {
  placeholder: string,
  value: oneOfType([string, number]).isRequired,
  name: string.isRequired,
  type: string.isRequired,
  onTextChange: func.isRequired,
  required: bool,
  short: bool,
  subLabel: string,
  style: objectOf(oneOfType([string, number]))
}

export default TextInput
