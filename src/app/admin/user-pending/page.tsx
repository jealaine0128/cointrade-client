/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import AdminHeader from '@/components/admin/AdminHeader'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AllUser } from '../page'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PendingUserTable from '@/components/admin/PendingUserTable'
import axios from 'axios'
import emailjs from '@emailjs/browser';

const Page = () => {

  const router = useRouter()

  const [user, setUser] = useState({ name: 'Arnold Nillas', token: '', isAdmin: false })

  const [searchQuery, setSearchQuery] = useState('')

  const [skeleton, setSkeleton] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])

  const [allUser, setAllUser] = useState<AllUser[]>([])

  const [currentPage, setCurrentPage] = useState(1)

  const [isLoading, setIsLoading] = useState(false)

  const filterUser = allUser.filter((item) => item.name.toUpperCase().includes(searchQuery.toUpperCase()) && !item.is_approved)

  const itemsPerPage = 10

  const end = currentPage * itemsPerPage;

  const start = end - itemsPerPage;

  const itemsOnCurrentPage = filterUser.slice(start, end);

  const getTotalPages = () => Math.ceil(filterUser.length / itemsPerPage)

  const handlePageChange = (pageNumber: number) => {

    setCurrentPage(pageNumber);

  };

  const getAllUser = async () => {

    try {

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/users`)

      if (data) {

        setAllUser(data)

      } else {

        alert('Something went wrong')

      }

    } catch (error) {

      console.error(error);

    }
  }

  const approveUser = async (user: AllUser) => {

    const { email, name, is_admin, is_approved, id } = user

    try {

      setIsLoading(true)

      const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/users/${id}`, {
        is_approved: true
      })

      if (data) {

        setIsLoading(false)

        getAllUser()

        emailjs.send(
          "service_58jukcv",
          "template_mth6zke",
          {
            name, email
          },
          "wEqOs-4jO60RPRfog"
        );

        alert(`${name} is approved.`)

      }

    } catch (error) {

      alert('Something went wrong')

      setIsLoading(false)

      console.log(error);

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

    getAllUser()

  }, [])


  return (
    <div>
      <AdminHeader user={user} />
      <div className='w-screen px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex flex-col pt-16 text-slate-300'>

        <div className='lg:px-36 md:px-20 md:border-x gap-10 md:border-slate-800 xl:px-52 w-full py-5 md:pt-10 flex flex-col'>

          <div className='flex items-center justify-between gap-5'>

            <h1 className='text-white font-black lg:text-xl'>MANAGE PENDING TRADERS</h1>

            <ul className='flex items-center gap-5 md:gap-10 text-xs sm:text-sm md:text-base'>
              <Link href={'/admin/create-user'} className='text-white border border-yellow-500 px-5 sm:px-6 md:px-7 py-1.5 rounded-md bg-yellow-500 hover:bg-yellow-400' >Create Trader</Link>
            </ul>

          </div>

          <div className='flex flex-col w-full gap-5'>

            <div className='w-1/2 text-sm md:text-base lg:w-1/4 relative'>
              <input type="text" id='search-trader' placeholder='Search Trader' value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} className='px-4 py-2 bg-slate-800 text-slate-200 w-full outline-none' />
              <label htmlFor="search-trader" className='cursor-pointer'>
                <FontAwesomeIcon icon={faSearch} className='absolute right-5 text-slate-200 top-2.5 w-5 h-5 hover:text-white' />
              </label>
            </div>

            <PendingUserTable isLoading={isLoading} approveUser={approveUser} user={itemsOnCurrentPage} skeleton={skeleton} searchQuery={searchQuery} />

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
                disabled={end >= allUser.length}
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