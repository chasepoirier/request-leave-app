import React from 'react'
import PropTypes from 'prop-types'
import { InputWrapper, Input } from './Styled'

const TextInput = ({
  placeholder,
  value,
  onTextChange,
  name,
  type,
  required
}) => (
  <InputWrapper>
    <Input
      value={value}
      onChange={onTextChange}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
    />
  </InputWrapper>
)

const { string, func, bool } = PropTypes

TextInput.defaultProps = {
  required: false
}

TextInput.propTypes = {
  placeholder: string.isRequired,
  value: string.isRequired,
  name: string.isRequired,
  type: string.isRequired,
  required: bool,
  onTextChange: func.isRequired
}

export default TextInput
