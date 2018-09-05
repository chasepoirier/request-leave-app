import React from 'react'
import { Styled } from 'components'
import LeaveTable from '../components/LeaveTable/LeaveTable'

const Home = () => (
  <Styled.PageWrapper>
    <Styled.Header style={{ marginTop: 50 }}>Home Page</Styled.Header>

    <LeaveTable />
  </Styled.PageWrapper>
)

export default Home
