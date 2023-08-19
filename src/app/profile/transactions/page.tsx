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
import UserCoins from '@/components/profile/UserCoins'
import UserTrades from '@/components/profile/UserTrades'
import DepositModal from '@/components/profile/DepositModal'
import { useRouter } from 'next/navigation'
import { fetchPendingTrades } from '@/lib/styles/api/fetchTrades'
import { Trades } from '@/app/trade/[coin]/page'
import Link from 'next/link'

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

  const [isDeposit, setIsDeposit] = useState(false)

  const [formData, setFormData] = useState({
    coin: '',
    amount: ''
  })

  const [myTrades, setMyTrades] = useState<Trades[]>([])

  const depositCoin = async (e: any) => {
    e.preventDefault()

    const { coin, amount } = formData


    if (!coin) return alert('Select a coin to deposit')
    if (!amount) return alert('Amount cannnot be empty.')

    try {

      const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/coins`, {
        coin, amount: Number(amount)
      }, { headers: { Authorization: user.token } })

      if (data) {
        alert('Success')
        setIsDeposit(false)
        setFormData({ amount: '', coin: '' })
      }

      console.log(status);

    } catch (error: any) {

      if (error.request.status === 401) {
        alert('Session expired please login.')
        localStorage.clear()
        router.push('/login')
      }

    }

  }


  const fetchMyTrades = async () => {

    try {

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/trades`, {
        headers: {
          Authorization: user.token
        }
      })

      if (data) {
        setMyTrades(data)
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

      fetchMyTrades()

    }

    fetchPendingTrades()

  }, [user])

  return (
    <div className='overflow-x-hidden'>

      {isDeposit && <DepositModal depositCoin={depositCoin} formData={formData} setFormData={setFormData} user={user} setIsDeposit={setIsDeposit} />}
      <UserHeader user={user} />
      <div className='px-5 sm:px-10 md:px-16 lg:px-24 w-screen h-screen xl:px-36 2xl:px-44 pt-16 flex flex-col text-slate-300'>

        <div className='lg:px-36 md:px-20 md:border-x md:border-slate-800 xl:px-52 w-full py-5 md:py-10 flex flex-col'>

          <>
            <div className='flex w-full items-center justify-between gap-x-16 gap-y-5 flex-wrap'>

              <div className='flex items-center gap-3'>
                <FontAwesomeIcon icon={faCircleUser} width={30} height={30} className='w-[30px] h-[30px]' />
                <p className='text-white font-medium'>{user.name}</p>
              </div>

              <ul className='flex items-center gap-5 md:gap-10 text-xs sm:text-sm md:text-base'>
                {user.is_approved && user.token ? <li onClick={() => setIsDeposit(true)} className='cursor-pointer bg-yellow-500 hover:bg-yellow-400 text-white px-5 sm:px-6 md:px-7 rounded-md font-medium py-1.5'>Deposit</li>
                  : <li>Your account status is pending you can't deposit.</li>
                }
                <Link href={'/profile'} className='px-5 sm:px-6 md:px-7 rounded-md font-medium py-1.5 border-slate-500 border hover:text-white hover:border-white'>Profile</Link>
              </ul>

            </div>

          </>

          <UserTrades myTrades={myTrades} />

        </div>

      </div>
    </div >
  )
}

export default Page