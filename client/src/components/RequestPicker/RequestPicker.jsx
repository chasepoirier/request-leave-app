import React from 'react'
import PropTypes from 'prop-types'
import {
  RequestContainer,
  FlexContainer,
  SubHeader,
  DeleteIcon,
  IconContainer
} from './Styled'
import { Select, Option } from '../Inputs/Styled'

class RequestPicker extends React.Component {
  componentDidMount() {}

  renderRequestTypes = types =>
    types.map(type => (
      <Option key={type.id} value={type.id}>
        {`${type.id.toUpperCase()} - ${type.name}`}
      </Option>
    ))

  renderTimeAmounts = times =>
    times.map(time => (
      <Option key={time} value={time}>{`${time} - Hours`}</Option>
    ))

  render() {
    const {
      requestTypes,
      timeAmounts,
      handleChangeType,
      handleChangeAmount,
      id,
      typeValue,
      amountValue,
      handleDeleteRequest
    } = this.props

    return (
      <RequestContainer>
        <FlexContainer>
          <div style={{ marginRight: 75 }}>
            <SubHeader>Pick a type</SubHeader>
            <Select value={typeValue} onChange={e => handleChangeType(e, id)}>
              <Option value="">--- Select an Option ---</Option>
              {this.renderRequestTypes(requestTypes)}
            </Select>
          </div>
          {typeValue && (
            <div>
              <SubHeader>Select an amount of hours</SubHeader>

              <Select
                value={amountValue}
                onChange={e => handleChangeAmount(e, id)}
              >
                <Option value="">--- Select an Option ---</Option>
                {this.renderTimeAmounts(timeAmounts)}
              </Select>
            </div>
          )}
          <IconContainer>
            <DeleteIcon
              onClick={() => handleDeleteRequest(id)}
              className="fas fa-trash"
            />
          </IconContainer>
        </FlexContainer>
      </RequestContainer>
    )
  }
}

const { arrayOf, number, string, shape, func, oneOfType } = PropTypes

RequestPicker.propTypes = {
  timeAmounts: arrayOf(number).isRequired,
  requestTypes: arrayOf(shape({ name: string, id: string })).isRequired,
  id: string.isRequired,
  handleChangeType: func.isRequired,
  handleChangeAmount: func.isRequired,
  typeValue: string.isRequired,
  amountValue: oneOfType([string, number]).isRequired,
  handleDeleteRequest: func.isRequired
}

export default RequestPicker
