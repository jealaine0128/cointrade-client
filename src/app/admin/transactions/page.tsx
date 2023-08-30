/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Trades } from '@/app/trade/[coin]/page'
import AdminHeader from '@/components/admin/AdminHeader'
import TransactionHeader from '@/components/admin/TransactionHeader'
import UserTable from '@/components/admin/UserTable'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {

  const router = useRouter()

  const [user, setUser] = useState({ name: '', token: '', isAdmin: false })

  const [allTrades, setAllTrades] = useState<Trades[]>([])

  const [skeleton, setSkeleton] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10


  const end = currentPage * itemsPerPage;

  const start = end - itemsPerPage;

  const itemsOnCurrentPage = allTrades.slice(start, end);

  const getTotalPages = () => Math.ceil(allTrades.length / itemsPerPage)

  const handlePageChange = (pageNumber: number) => {

    setCurrentPage(pageNumber);

  };

  const getAllTrades = async () => {

    try {

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/all_trades`)

      if (data) {
        setAllTrades(data)
      } else {
        alert('Something went wrong.')
      }
    } catch (error) {

      console.log(error);

      alert('Something went wrong.')

    }
  }

  useEffect(() => {

    const currentUser = localStorage.getItem('user')

    if (currentUser) {

      const user = JSON.parse(currentUser)

      if (!user.is_admin) {

        router.push('/dashboard')

      } else {

        setUser(user)
      }

    } else {

      router.push('/login')

    }
    getAllTrades()

  }, [])

  return (
    <div>
      <AdminHeader user={user} />

      <div className='w-screen px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex flex-col pt-16 text-slate-300'>

        <div className='lg:px-36 md:px-20 md:border-x gap-10 md:border-slate-800 xl:px-52 w-full py-5 md:pt-10 flex flex-col'>

          <TransactionHeader />

          <div className='flex flex-col w-full gap-5'>

            <div className='flex text-xs flex-col items-center w-full'>

              <div className='flex flex-col w-full'>
                <div className={`w-full overflow-y-auto`}>
                  <table className="w-full text-left  text-gray-400">
                    <thead className="text-sm text-slate-200 bg-slate-700">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          User
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemsOnCurrentPage.length > 0 ? itemsOnCurrentPage.map((item) => {
                        const createdAt = new Date(item.created_at);
                        const formattedCreatedAt = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`;
                        return (
                          <tr className="border-b text-slate-200 bg-gray-800 border-gray-700" key={item.id}>
                            <td className="px-6 py-4">
                              <div className='h-5 w-28'>
                                <span>{item.user_id}</span>
                              </div>
                            </td>

                            <th scope="row" className={`px-6 py-4 font-medium whitespace-nowrap`}>
                              <div className='flex items-center gap-1 h-5 w-36'>
                                <div>{item.price}</div>
                                <div className='text-slate-300 flex items-center'>({item.using_coin})</div>
                              </div>
                            </th>
                            <td className="px-6 py-4">
                              <div className='flex items-center gap-1 h-5 w-28'>
                                <span>{item.amount}</span>
                                <span>({item.target_coin})</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className='h-5 w-36 flex items-center gap-1'>
                                <span>{item.total}</span>
                                <span>({item.using_coin})</span>
                              </div>
                            </td>
                            <td className='px-6 py-4'>
                              <div className={`h-5 w-16 uppercase ${item.trade_type === 'buy' ? 'text-green-400' : 'text-red-500'}`}>{item.trade_type}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className='flex items-center h-5 w-44'>
                                {formattedCreatedAt}
                              </div>
                            </td>
                          </tr>
                        );
                      }) : skeleton.map((item) => (
                        <tr className="border-b text-slate-200 bg-gray-800 border-gray-700" key={item}>
                           <td className="px-6 py-4">
                            <div className='h-5 bg-slate-600 animate-pulse rounded-3xl w-12'>
                            </div>
                          </td>
                          <th scope="row" className={`px-6 py-4 font-medium flex items-center gap-1 whitespace-nowrap`}>
                            <div className='h-5 bg-slate-600 animate-pulse rounded-3xl w-36'>
                            </div>
                          </th>
                          <td className="px-6 py-4">
                            <div className='h-5 bg-slate-600 animate-pulse rounded-3xl w-28'>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className='h-5 bg-slate-600 animate-pulse rounded-3xl w-36'>
                            </div>
                          </td>
                          <td className='px-6 py-4'>
                            <div className='h-5 bg-slate-600 animate-pulse rounded-3xl w-16'></div>
                          </td>
                          <td className="px-6 py-4">
                            <div className='h-5 bg-slate-600 animate-pulse rounded-3xl w-44'>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

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
                disabled={end >= allTrades.length}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Page