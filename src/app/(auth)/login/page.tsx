/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client'
import Header from '@/components/home/Header'
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {

  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

  const loginUser = async (e: any) => {

    e.preventDefault()
    const { email, password } = formData
    if (!email || !password) return alert('Fill up the form')

    try {

      setIsLoading(true)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: { email, password }
        }),
      });

      const data = await response.json();

      if (response.status === 200 && data.status.code === 200) {

        const user = {
          name: data.status.data.user.name,
          token: response.headers.get('authorization'),
          is_admin: data.status.data.user.is_admin,
          is_approved: data.status.data.user.is_approved
        };

        localStorage.setItem('user', JSON.stringify(user))

        setIsLoading(false)

        if(user.is_admin) {

          alert('Success')

          router.push('/admin')

        } else {

          alert('Success')
          
          router.push('/dashboard')
          
        }


      } else {

        setIsLoading(false)

        return alert('Something went wrong please try again,')

      }


    } catch (error) {

      setIsLoading(false)
      alert('Invalid Email or Password')

      console.log(error);

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
      <div className='flex pt-20 items-center h-screen w-screen bg-[url(/auth.webp)] bg-no-repeat bg-cover bg-center justify-between pt-24 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44'>
        <div className='w-full flex flex-col gap-10 lg:flex-row items-center h-full lg:justify-between lg:px-5 xl:px-10 lg:border-x lg:border-slate-800'>

          <div className='w-1/2 flex flex-col gap-5'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl text-white'>Welcome Back to CoinTrade</h1>
            <h2 className='text-slate-200 leading-7'>Log in to Access Your Crypto Portfolio</h2>
          </div>
          <form onSubmit={loginUser} className='bg-slate-900 w-[29rem] p-7 py-10 rounded-md border border-slate-500 flex flex-col items-center gap-4'>
            <input onChange={handleChange} name='email' className='w-full bg-slate-800 border-b px-3 text-slate-200 outline-none py-1.5' type="email" placeholder='Email' />
            <div className='flex items-center gap-4 relative w-full'>
              <FontAwesomeIcon onClick={() => setEye(prevEye => !prevEye)} icon={eye ? faEye : faEyeSlash} width={16} height={16} className='text-slate-300 right-2 absolute cursor-pointer hover:text-white' />
              <input onChange={handleChange} name='password' className='w-full bg-slate-800 border-b text-sm md:text-base px-3 text-slate-200 outline-none py-1.5' type={eye ? 'password' : 'text'} placeholder='Password' />
            </div>
            <button className='bg-yellow-400 text-white py-2.5 active:bg-white active:text-yellow-400 w-full rounded-sm my-4'>{isLoading ? <div className='flex items-center w-full justify-center gap-3'><FontAwesomeIcon icon={faSpinner} className='animate-spin' /> Processing...</div> : <div>Sign In</div>}</button>
            <div className='text-slate-300 flex gap-3'>Don't have account yet? <Link href={'/signup'} className='text-white'>Sign Up</Link></div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page
