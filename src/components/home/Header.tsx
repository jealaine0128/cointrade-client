'use client'
import { faXmark, faBars, faChevronUp, faChevronDown, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useState } from 'react'

const Header = () => {

    const [menu, setMenu] = useState(false)

    return (
        <header className='fixed bg-slate-950 z-20 top-0 left-0 w-screen h-16 border-b border-slate-800 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex items-center text-slate-300'>
            <div className='flex w-full items-center lg:px-5 xl:px-10 h-full'>
                <Link href={'/'} className='text-white w-80 text-xl md:text-2xl tracking-tight font-black'>CoinTrade</Link>
                <FontAwesomeIcon icon={menu ? faXmark : faBars} width={16} height={16} className='text-2xl cursor-pointer absolute z-10 right-5 top-5 text-white md:hidden' onClick={() => setMenu(prevData => !prevData)} />
                <ul className={`w-full justify-end md:flex lg:items-center md:gap-8 ${menu ? 'gap-5 shadow-2xl flex flex-col fixed top-0 left-0 w-screen bg-slate-950 p-10 border-b border-slate-800 text-gray-slate-300' : 'hidden'}`}>

                    <Link href={'/signup'} className='flex items-center gap-2 cursor-pointer hover:text-white'>
                        <div>Sign Up</div>
                    </Link>

                    <Link href={'/login'} className='flex items-center gap-2 cursor-pointer hover:text-white'>
                        <div>Login</div>
                    </Link>

                </ul>
            </div>
        </header>
    )
}

export default Header