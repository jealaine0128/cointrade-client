import Link from 'next/link'
import React from 'react'

const TraderHeader = () => {
    return (
        <div className='flex items-center justify-between gap-5'>

            <h1 className='text-white font-black lg:text-xl'>MANAGE TRADERS</h1>

            <ul className='flex items-center gap-5 md:gap-10 text-xs sm:text-sm md:text-base'>
                <Link href={'/admin/create-user'} className='text-white border border-yellow-500 px-5 sm:px-6 md:px-7 py-1.5 rounded-md bg-yellow-500 hover:bg-yellow-400' >Create Trader</Link>
                <Link href={'/admin/user-pending'} className='hover:text-white border px-5 sm:px-6 md:px-7 py-1.5 rounded-md  border-slate-500 hover:border-white' >Pending Traders</Link>
            </ul>

        </div>
    )
}

export default TraderHeader