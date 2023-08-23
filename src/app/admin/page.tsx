/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import AdminHeader from '@/components/admin/AdminHeader'
import TraderHeader from '@/components/admin/TraderHeader'
import UpdateUserModal from '@/components/admin/UpdateUserModal'
import UserTable from '@/components/admin/UserTable'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export interface AllUser {
  id: string
  name: string
  email: string
  is_admin: boolean
  is_approved: boolean
}

const Page = () => {

  const router = useRouter()

  const [user, setUser] = useState({ name: 'Arnold Nillas', token: '', isAdmin: false })

  const [searchQuery, setSearchQuery] = useState('')

  const [skeleton, setSkeleton] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])

  const [allUser, setAllUser] = useState<AllUser[]>([])

  const [currentPage, setCurrentPage] = useState(1)

  const filterUser = allUser.filter((item) => item.name.toUpperCase().includes(searchQuery.toUpperCase()) && item.is_approved)

  const itemsPerPage = 10

  const end = currentPage * itemsPerPage;

  const start = end - itemsPerPage;

  const itemsOnCurrentPage = filterUser.slice(start, end);

  const getTotalPages = () => Math.ceil(filterUser.length / itemsPerPage)

  const handlePageChange = (pageNumber: number) => {

    setCurrentPage(pageNumber);

  };

  const [operation, setOperation] = useState(false)

  const [selectedUserID, setSelectedUserID] = useState('')

  const [selectedUser, setSelectedUser] = useState({ name: '', email: '', is_admin: false, is_approved: false, id: '' })

  const [isUpdating, setIsUpdating] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === 'checkbox' ? checked : value;

    setSelectedUser((prevFormData) => ({
      ...prevFormData,
      [name]: newValue
    }));
  };


  const getAllUser = async () => {

    try {

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/users`)

      setAllUser(data)

    } catch (error) {

      console.error(error);

    }
  }

  const deleteUser = async (userID: string) => {

    try {

      const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/users/${userID}`)

      if (data) {

        getAllUser()
        alert('Success.')
        setOperation(false)
        setSelectedUserID('')

      }

    } catch (error) {

      console.error(error);

    }

  }

  const updateUser = async (e: any) => {

    e.preventDefault()

    const { name, email, is_admin, is_approved, id } = selectedUser

    try {

      setIsSubmitting(true)

      const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/users/${id}`, {
        name, email, is_admin, is_approved
      })

      if (data) {

        getAllUser()
        setIsUpdating(false)
        setSelectedUser({ name: '', email: '', is_admin: false, is_approved: false, id: '' })
        setIsSubmitting(false)
        setOperation(false)
        setSelectedUserID('')
      }

    } catch (error) {

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
    <>
      <AdminHeader user={user} />

      {isUpdating && <UpdateUserModal setIsUpdating={setIsUpdating} setSelectedUser={setSelectedUser} selectedUser={selectedUser} isSubmitting={isSubmitting} handleChange={handleChange} updateUser={updateUser} />}

      <div className='w-screen px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex flex-col pt-16 text-slate-300'>

        <div className='lg:px-36 md:px-20 md:border-x gap-10 md:border-slate-800 xl:px-52 w-full py-5 md:pt-10 flex flex-col'>

          <TraderHeader />

          <div className='flex flex-col w-full gap-5'>

            <div className='w-1/2 text-sm md:text-base lg:w-1/4 relative'>
              <input type="text" id='search-trader' placeholder='Search Trader' value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} className='px-4 py-2 bg-slate-800 text-slate-200 w-full outline-none' />
              <label htmlFor="search-trader" className='cursor-pointer'>
                <FontAwesomeIcon icon={faSearch} className='absolute right-5 text-slate-200 top-2.5 w-5 h-5 hover:text-white' />
              </label>
            </div>

            <UserTable setIsUpdating={setIsUpdating} deleteUser={deleteUser} user={itemsOnCurrentPage} operation={operation} setOperation={setOperation} setSelectedUser={setSelectedUser} setSelectedUserID={setSelectedUserID} selectedUser={selectedUser} selectedUserID={selectedUserID} searchQuery={searchQuery} skeleton={skeleton} />

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
                disabled={end >= filterUser.length}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>

          </div>


        </div>

      </div>

    </>
  )
}

export default Page