/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Header from '@/components/home/Header'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
const Page = () => {

  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  })

  const [isLoading, setIsLoading] = useState(false)

  const [eye, setEye] = useState(true)

  const handleChange = (e: any) => {

    const { name, value } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))

  }

  const registerUser = async (e: any) => {

    e.preventDefault()

    try {

      const { name, email, password, confirm_password } = formData

      if (!name || !email || !password || !confirm_password) return alert('Fill up the form')
      if (name.length < 3) return alert('Name is to short')
      if (email.length < 3) return alert('Email is to short')
      if (password.length < 3) return alert('Password is to short')
      if (password !== confirm_password) return alert('Password did not matched')

      setIsLoading(true)

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/signup`, {

        user: { name, email, password }

      })

      if (data.status.code === 200) {

        setIsLoading(false)

        emailjs.send(
          "service_58jukcv",
          "template_nu40vr9",
          {
            name, email
          },
          "wEqOs-4jO60RPRfog"
        );

        router.push('/login')

      }

    } catch (error) {

      console.log(error);

      setIsLoading(false)
      alert('Email Already Exist.')

    }
  }

  useEffect(() => {

    const user = localStorage.getItem('user')

    if (user) {

      router.push('/dashboard')
      
    }
  }, [])

  return (
    <div>
      <Header />
      <div className='flex items-center h-screen w-screen bg-[url(/auth.webp)] bg-no-repeat bg-cover bg-center justify-between pt-24 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44'>
        <div className='w-full flex items-center h-full justify-between lg:px-5 xl:px-10 lg:border-x lg:border-slate-800'>

          <div className='w-1/2 flex flex-col gap-5'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl text-white'>Sign Up for CoinTrade</h1>
            <h2 className='text-slate-200 leading-7'>Join Us and Start Trading Crypto Today</h2>
          </div>

          <form onSubmit={registerUser} className='bg-slate-900 w-[29rem] p-7 py-10 rounded-md border border-slate-500 flex flex-col items-center gap-4'>
            <input onChange={handleChange} name='name' className='w-full bg-slate-800 border-b text-sm md:text-base px-3 text-slate-200 outline-none py-1.5' type="text" placeholder='Name' />
            <input onChange={handleChange} name='email' className='w-full bg-slate-800 border-b text-sm md:text-base px-3 text-slate-200 outline-none py-1.5' type="email" placeholder='Email' />
            <div className='flex items-center gap-4 relative w-full'>
              <FontAwesomeIcon onClick={() => setEye(prevEye => !prevEye)} icon={eye ? faEye : faEyeSlash} width={16} height={16} className='text-slate-300 right-2 absolute cursor-pointer hover:text-white' />
              <input onChange={handleChange} name='password' className='w-full bg-slate-800 border-b text-sm md:text-base px-3 text-slate-200 outline-none py-1.5' type={eye ? 'password' : 'text'} placeholder='Password' />
              <input onChange={handleChange} name='confirm_password' className='w-full bg-slate-800 border-b text-sm md:text-base px-3 text-slate-200 outline-none py-1.5' type={eye ? 'password' : 'text'} placeholder='Confirm Password' />
            </div>
            <button className='bg-yellow-400 text-white py-2.5 active:bg-white active:text-yellow-400 w-full rounded-sm my-4'>{isLoading ? <div className='flex items-center w-full justify-center gap-3'><FontAwesomeIcon icon={faSpinner} className='animate-spin' /> Processing...</div> : <div>Sign Up</div>}</button>
            <div className='text-slate-300 flex gap-3'>Already signed up? <Link href={'/login'} className='text-white'>Login</Link></div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page