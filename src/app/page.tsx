import Header from '@/components/home/Header'
import Main from '@/components/home/Main'
import { fetchPendingTrades } from '@/lib/styles/api/fetchTrades'
import React from 'react'

const Page = () => {

  return (
    <>
      <Header />
      <Main />
    </>
  )
}

export default Page