'use client'
import { faBars, faChevronDown, faChevronUp, faRightFromBracket, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface Props {
    user: {
        name: string
        token: string
        isAdmin: boolean
    }
}

const AdminHeader: React.FC<Props> = ({ user }) => {

    const router = useRouter()

    const [checkProfile, setCheckProfile] = useState(false)

    const [menu, setMenu] = useState(false)

    const logout = async (e: any) => {

        try {

            localStorage.clear()

            router.push('/login')
            
        } catch (error) {
            
            console.error(error);
            
        }

    }

    return (
        <header className='fixed bg-slate-950 z-20 top-0 left-0 w-screen h-16 border-b border-slate-800 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex items-center text-slate-300'>
            <div className='w-full h-full lg:px-5 xl:px-10 flex items-center'>
                <Link href={'/dashboard'} className='text-white w-80 text-xl md:text-2xl tracking-tight font-black'>CoinTrade</Link>
                <FontAwesomeIcon icon={menu ? faXmark : faBars} width={16} height={16} className='text-2xl cursor-pointer absolute z-10 right-5 top-5 text-white md:hidden' onClick={() => setMenu(prevData => !prevData)} />
                <ul className={`w-full justify-end md:flex lg:items-center md:gap-8 ${menu ? 'gap-5 shadow-2xl flex flex-col fixed top-0 left-0 w-screen bg-slate-950 p-10 border-b border-slate-800 text-gray-slate-300' : 'hidden'}`}>

                    <Link href={'/admin'} className='flex items-center gap-2 cursor-pointer hover:text-white'>
                        <div>Traders</div>
                    </Link>

                    <Link href={'/admin/transactions'} className='flex items-center gap-2 cursor-pointer hover:text-white'>
                        <div>Transactions</div>
                    </Link>

                    <li className='relative'>
                        <button onClick={() => setCheckProfile(prevData => !prevData)} className=" outline-none gap-2 py-1 flex items-center">{user.name}
                            <FontAwesomeIcon icon={checkProfile ? faChevronUp : faChevronDown} width={16} height={16} />
                        </button>
                        <ul className={`py-3 w-full flex flex-col gap-3 px-5 absolute bg-slate-800 ${!checkProfile && 'hidden'}`}>

                            <li className='flex items-center hover:text-white gap-3 cursor-pointer' onClick={(e: any) => logout(e)}>
                                Logout
                                <FontAwesomeIcon icon={faRightFromBracket} />
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default AdminHeader