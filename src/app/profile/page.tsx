/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CoinSearch } from '@/components/dashboard/TradeCoins'
import UserHeader from '@/components/dashboard/UserHeader'
import ProfileInfo from '@/components/profile/ProfileInfo'
import { faCircleUser, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Trades } from '../trade/[coin]/page'
import UserCoins from '@/components/profile/UserCoins'
import UserTrades from '@/components/profile/UserTrades'
import DepositModal from '@/components/profile/DepositModal'
import { useRouter } from 'next/navigation'
import { fetchPendingTrades } from '@/lib/styles/api/fetchTrades'

interface AllCoins {
  coin: string
  image: string
  amount: number
  price: string
  value: number
}

const Page = () => {

  const router = useRouter()

  const [user, setUser] = useState({ name: '', token: '', is_admin: false, is_approved: false })

  const [skeleton, setSkeleton] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])

  const [searchQuery, setSearchQuery] = useState('')

  const [totalBalance, setTotalBalance] = useState(0)

  const [isDeposit, setIsDeposit] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    coin: '',
    amount: ''
  })

  const [userCoins, setUserCoins] = useState<{ coin: string, amount: string, id: number }[]>([]);

  const [myTrades, setMyTrades] = useState<Trades[]>([])

  const [modifiedCoins, setModifiedCoins] = useState<AllCoins[]>([])

  const filterCoins = modifiedCoins.filter((item) => item.coin.toUpperCase().includes(searchQuery.toUpperCase()))

  const itemsPerPage = 10

  const [currentPage, setCurrentPage] = useState(1)


  const end = currentPage * itemsPerPage;

  const start = end - itemsPerPage;

  const itemsOnCurrentPage = filterCoins.slice(start, end);

  const getTotalPages = () => Math.ceil(modifiedCoins.length / itemsPerPage)

  const handlePageChange = (pageNumber: number) => {

    setCurrentPage(pageNumber);

  };

  const depositCoin = async (e: any) => {
    e.preventDefault()

    const { coin, amount } = formData


    if (!coin) return alert('Select a coin to deposit')
    if (!amount) return alert('Amount cannnot be empty.')

    try {
      setIsLoading(true)

      const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/coins`, {
        coin, amount: Number(amount)
      }, { headers: { Authorization: user.token } })

      if (data) {
        getUserCoins()
        alert('Success')
        setIsLoading(false)
        setIsDeposit(false)
        setFormData({ amount: '', coin: '' })
      }

      console.log(status);

    } catch (error: any) {

      setIsLoading(false)
      alert('Something went wrong.')

      if (error.request.status === 401) {
          alert('Session expired please login.')
          localStorage.clear()
          router.push('/login')
      }

  }

  }

  const fetchCoinPrice = async () => {

    try {

      const res = await Promise.all(userCoins.map(async (item) => {

        const { data } = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${item.coin}&tsyms=USD&api_key=fa1ddd2aaeb250a7c16e7cbd9b7ccae1cd95f700c4354b015bdc1787ae8a4e59`)

        const coinDetails: any = Object.values(data.RAW)

        const price: any = Object.values(data.DISPLAY)

        const totalValue = Number(item.amount) * coinDetails[0].USD.PRICE

        const coinData = {
          coin: item.coin,
          amount: Number(item.amount),
          price: price[0].USD.PRICE,
          value: totalValue,
          image: `https://www.cryptocompare.com${coinDetails[0].USD.IMAGEURL}`,
        }

        return coinData

      }))

      setModifiedCoins(res)

    } catch (error) {

      console.error(error);

    }
  }

  const getUserCoins = async () => {

    try {

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/coins`, {
        headers: {
          Authorization: user.token
        }
      })

      if (data) {

        setUserCoins(data)
      }

    } catch (error: any) {

      if (error.request.status === 401) {
          alert('Session expired please login.')
          localStorage.clear()
          router.push('/login')
      }

  }
  }

  useEffect(() => {

    if (!user.token) {

      const currentUser = localStorage.getItem('user')

      if (currentUser) {

        setUser(JSON.parse(currentUser))

      } else {

        router.push('/login')

      }

    } else {

      getUserCoins()

    }

    fetchPendingTrades()

  }, [user])

  useEffect(() => {

    fetchCoinPrice()

  }, [userCoins])

  useEffect(() => {

    const balance = modifiedCoins.reduce((accumulator, item) => accumulator + item.value, 0);

    setTotalBalance(balance)

  }, [modifiedCoins])

  return (
    <div className='overflow-x-hidden'>

      {isDeposit && <DepositModal isLoading={isLoading} depositCoin={depositCoin} formData={formData} setFormData={setFormData} user={user} setIsDeposit={setIsDeposit} />}
      <UserHeader user={user} />
      <div className='px-5 sm:px-10 md:px-16 lg:px-24 w-screen h-screen xl:px-36 2xl:px-44 pt-16 flex flex-col text-slate-300'>

        <div className='lg:px-36 md:px-20 md:border-x md:border-slate-800 xl:px-52 w-full py-5 md:py-10 flex flex-col'>

          <ProfileInfo user={user} totalBalance={totalBalance} setIsDeposit={setIsDeposit} />

          <div className='w-1/2 text-sm md:text-base lg:w-1/4 relative mb-5'>
            <input type="text" id='search-coin' placeholder='Search Coins' value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} className='px-4 py-2 bg-slate-800 text-slate-200 w-full outline-none' />
            <label htmlFor="search-coin" className='cursor-pointer'>
              <FontAwesomeIcon icon={faSearch} className='absolute right-5 text-slate-200 top-2.5 w-5 h-5 hover:text-white' />
            </label>
          </div>

          <UserCoins token={user.token} coins={itemsOnCurrentPage} searchQuery={searchQuery} skeleton={skeleton} userCoins={userCoins} />

          <div className='text-slate-300 flex justify-end items-center gap-5 py-5 w-full'>
            <button
              className={`text-white`}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <span>{currentPage} / {getTotalPages()}</span>
            <button
              className={`text-white`}
              disabled={end >= modifiedCoins.length}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>

        </div>

      </div>
    </div >
  )
}

export default Page