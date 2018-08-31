import React from 'react'
import moment from 'moment-business-days'
import PropTypes from 'prop-types'
import {
  LeaveForm,
  FlexContainer,
  SubHeader,
  SubLabel,
  ButtonContainer
} from './Styled'
import * as Types from './Types'
import AllDay from './AllDay'
import MultiDay from './MultiDay'
import Partial from './Partial'

import * as Calculate from '../../utils/calculations'
import * as Validate from '../../utils/validations'
import {
  RadioButton,
  RequestPicker,
  MessageBar,
  TextInput
} from '../../components'
import { ButtonOutline, SubmitButton } from '../../components/Styled'

class RequestLeaveForm extends React.Component {
  static propTypes = {
    handleSubmitForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  state = {
    durationType: '',
    startDate: moment(),
    endDate: moment(),
    totalTime: 0,
    validDate: false,
    validAmount: false,
    dateMessage: 'Pick a date',
    requestMessage: 'Select a request type and amount',
    requestTypes: [
      {
        type: '',
        amount: 0,
        id: Calculate.generateID()
      }
    ],
    reason: ''
  }

  componentDidUpdate(prevProps, prevState) {
    const { durationType, validAmount } = this.state
    if (durationType !== prevState.durationType) {
      this.resetMessages()
    }
    if (validAmount !== prevState.validAmount && validAmount) {
      window.scrollTo(0, document.body.scrollHeight)
    }
  }

  resetMessages = () =>
    this.setState({
      validDate: false,
      dateMessage: 'Pick a date',
      validAmount: false,
      requestMessage: 'Select a request type and amount',
      startDate: moment(),
      endDate: moment()
    })

  handleParseForm = e => {
    e.preventDefault()
    const {
      validAmount,
      validDate,
      durationType,
      startDate,
      endDate,
      totalTime,
      requestTypes,
      reason
    } = this.state
    const { handleSubmitForm } = this.props
    const hoursInDay = 8
    if (validAmount && validDate) {
      const request = {
        timestamp: moment(),
        types: requestTypes,
        approval: {
          admin: {
            pending: true,
            approved: false
          },
          supervisor: {
            pending: true,
            approved: false
          }
        },
        reason,
        totalTime: totalTime * hoursInDay,
        startDate,
        endDate: durationType === 'md' ? endDate : startDate
      }
      handleSubmitForm(request)
    }
  }

  handleCheckboxChange = e => {
    this.setState({ durationType: e.target.value })
  }

  handleStartDateChange = startDate => {
    const { endDate, durationType } = this.state
    const diff = Calculate.dateDiff(startDate, endDate, durationType)
    const message = this.checkForError(diff, durationType)
    this.setState({
      startDate,
      totalTime: diff,
      validDate: message.success,
      dateMessage: message.message
    })
  }

  handleEndDateChange = endDate => {
    const { startDate, durationType } = this.state
    const diff = Calculate.dateDiff(startDate, endDate, durationType)
    const message = this.checkForError(diff, durationType)
    this.setState({
      endDate,
      totalTime: diff,
      validDate: message.success,
      dateMessage: message.message
    })
  }

  handleChangeType = (e, id) => {
    if (e.target.value) {
      const { requestTypes } = this.state
      const pos = requestTypes.map(el => el.id).indexOf(id)
      const newArr = requestTypes
      newArr[pos].type = e.target.value
      this.setState({ requestTypes: newArr })
    }
  }

  handleChangeAmount = (e, id) => {
    const { requestTypes } = this.state
    const pos = requestTypes.map(el => el.id).indexOf(id)
    const newArr = requestTypes
    newArr[pos].amount = e.target.value ? e.target.value : ''

    this.updateTotalRequestAmount()
    this.setState({ requestTypes: newArr })
  }

  handleDeleteRequest = id => {
    const { requestTypes } = this.state
    const pos = requestTypes.map(el => el.id).indexOf(id)
    const newArr = requestTypes
    newArr.splice(pos, 1)
    this.updateTotalRequestAmount()
    this.setState({ requestTypes: newArr })
  }

  handleTextChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  updateTotalRequestAmount = () => {
    const { requestTypes, totalTime } = this.state
    const totalDiff = Calculate.requestTotalFromDateTotal(
      requestTypes,
      totalTime
    )
    const message = Validate.validTotalAmount(totalDiff)
    this.setState({
      validAmount: message.success,
      requestMessage: message.message
    })
  }

  addNewRequest = () => {
    const { requestTypes } = this.state
    this.setState({
      requestTypes: [
        ...requestTypes,
        {
          type: '',
          amount: 0,
          id: Calculate.generateID()
        }
      ]
    })
  }

  checkForError = (diff, type) => {
    switch (type) {
      case 'ad':
        return Validate.validFullDay(diff)
      case 'md':
        return Validate.validMultiDay(diff)
      default:
        return { success: true, message: '' }
    }
  }

  renderLengthOptions = options =>
    options.map(option => (
      <RadioButton
        value={option.id}
        key={option.id}
        name="length"
        onInputChange={this.handleCheckboxChange}
        label={option.name}
      />
    ))

  renderFormType = type => {
    const { startDate, endDate, totalTime, dateMessage, validDate } = this.state
    switch (type) {
      case 'ad':
        return (
          <AllDay
            startDate={startDate}
            handleDateChange={this.handleStartDateChange}
            dateMessage={dateMessage}
            validDate={validDate}
          />
        )
      case 'md':
        return (
          <MultiDay
            startDate={startDate}
            endDate={endDate}
            handleStartDateChange={this.handleStartDateChange}
            handleEndDateChange={this.handleEndDateChange}
            totalTime={totalTime}
            dateMessage={dateMessage}
            validDate={validDate}
          />
        )
      case 'p':
        return (
          <Partial
            startDate={startDate}
            handleDateChange={this.handleStartDateChange}
          />
        )
      default:
        return null
    }
  }

  renderRequestPickers = types => {
    const { totalTime } = this.state

    return types.map(type => (
      <RequestPicker
        key={type.id}
        id={type.id}
        requestTypes={Types.leaveTypes}
        timeAmounts={Calculate.convertTotalTimeToHalfHours(totalTime)}
        typeValue={type.type}
        amountValue={type.amount}
        changeType={this.handleChangeType}
        handleChangeAmount={this.handleChangeAmount}
        handleChangeType={this.handleChangeType}
        handleDeleteRequest={this.handleDeleteRequest}
      />
    ))
  }

  render() {
    const {
      durationType,
      validDate,
      requestTypes,
      validAmount,
      requestMessage,
      reason
    } = this.state

    const { submitting } = this.props

    return (
      <LeaveForm onSubmit={this.handleParseForm}>
        <SubHeader>1. Select a Duration</SubHeader>
        <FlexContainer>
          {this.renderLengthOptions(Types.lengthTypes)}
        </FlexContainer>
        {this.renderFormType(durationType)}
        {validDate && (
          <div>
            <SubHeader>3. Select a Leave Type</SubHeader>
            <SubLabel>You can choose more than one.</SubLabel>
            {this.renderRequestPickers(requestTypes)}
            <MessageBar message={requestMessage} success={validAmount} />

            <ButtonOutline
              onClick={this.addNewRequest}
              style={{ margin: '0 0 50px', maxWidth: 300 }}
            >
              Add Another Request Type
            </ButtonOutline>

            {validAmount && (
              <div>
                <SubHeader>4. Add a reason for this request</SubHeader>
                <TextInput
                  placeholder="Type your reason"
                  value={reason}
                  name="reason"
                  onTextChange={this.handleTextChange}
                  type="text"
                  required
                  short
                />
                <ButtonContainer>
                  <SubmitButton
                    style={{ margin: '25px 0 75px', width: 300 }}
                    type="submit"
                    value={
                      submitting ? 'Creating request...' : 'Submit Request'
                    }
                  />
                </ButtonContainer>
              </div>
            )}
          </div>
        )}
      </LeaveForm>
    )
  }
}

export default RequestLeaveForm
