/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import AdminHeader from '@/components/admin/AdminHeader'
import { faEnvelope, faKey, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {

  const router = useRouter()

  const [user, setUser] = useState({ name: 'Arnold Nillas', token: '', isAdmin: false })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    is_admin: false,
    is_approved: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue
    }));
  };

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

  }, [])

  const createUser = async (e: any) => {

    e.preventDefault()

    const { name, email, password, is_admin, is_approved } = formData

    if (name.length < 3) return alert('Name is to short')
    if (email.length < 3) return alert('Email is to short')
    if (password.length < 3) return alert('Password is to short')

    try {

      setIsSubmitting(true)

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/signup`, {

        user: { name, email, password, is_admin, is_approved }

      })

      if (data.status.code === 200) {

        setIsSubmitting(false)

        router.push('/admin')

      } 
    } catch (error: any) {

      setIsSubmitting(false)

      alert('Email Already Exist.')
    }

  }

  return (
    <div>
      <AdminHeader user={user} />
      <div className='w-screen h-screen px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex flex-col pt-16 text-slate-300'>

        <div className='lg:px-36 md:px-20 md:border-x gap-10 md:border-slate-800 xl:px-52 h-full w-full py-5 md:pt-10 flex flex-col items-center'>
          <h1 className='w-full text-2xl text-white font-bold text-center'>CREATE USER</h1>

          <form onSubmit={createUser} className='max-w-[30rem] w-full flex flex-col gap-5 itmes-start lg:p-10 lg:border lg:border-slate-800'>

            <div className='w-full relative'>
              <FontAwesomeIcon icon={faUser} width={16} height={16} className='absolute top-3 left-3 text-white' />
              <input required value={formData.name} onChange={handleChange} type="text" placeholder='Name' name='name' className='border-b border-slate-400 w-full bg-slate-800 px-10 py-2 outline-none text-white' />
            </div>
            <div className='w-full relative'>
              <FontAwesomeIcon icon={faEnvelope} width={16} height={16} className='absolute top-3 left-3 text-white' />
              <input required value={formData.email} onChange={handleChange} type="text" placeholder='Email' name='email' className='border-b border-slate-400 w-full bg-slate-800 px-10 py-2 outline-none text-white' />
            </div>
            <div className='w-full relative'>
              <FontAwesomeIcon icon={faKey} width={16} height={16} className='absolute top-3 left-3 text-white' />
              <input required value={formData.password} onChange={handleChange} type="text" placeholder='Password' name='password' className='border-b border-slate-400 w-full bg-slate-800 px-10 py-2 outline-none text-white' />
            </div>

            <div className='flex items-center w-full gap-6'>
              <div className='flex items-center gap-2'>
                <label htmlFor="approved">
                  Approved
                </label>
                <input onChange={handleChange}
                  checked={formData.is_approved}
                  id='approved'
                  type="checkbox" name='is_approved'
                  className='w-5 h-5 rounded-full outline-none' />
              </div>
              <div className='flex items-center gap-2'>
                <label htmlFor="admin">
                  Admin
                </label>
                <input onChange={handleChange}
                  id='admin' type="checkbox"
                  checked={formData.is_admin}
                  name='is_admin'
                  className='w-5 h-5 rounded-full outline-none' />
              </div>
              <button disabled={isSubmitting && true} className={`w-full rounded-md ${isSubmitting ? 'bg-yellow-400' : 'bg-yellow-500 hover:bg-yellow-400'} text-white font-bold py-2`}>{isSubmitting ? <p className='flex items-center gap-2 justify-center'><FontAwesomeIcon icon={faSpinner} width={16} height={16} className='animate-spin' /> Processing</p> : 'Create'}</button>
            </div>

          </form>

        </div>

      </div>
    </div>
  )
}

export default Page