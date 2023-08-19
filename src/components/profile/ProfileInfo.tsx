import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

interface Props {
  user: {
    name: string
    token: string
    is_approved: boolean
    is_admin: boolean
  }
  totalBalance: number

  setIsDeposit: React.Dispatch<React.SetStateAction<boolean>>

}

const ProfileInfo: React.FC<Props> = ({ user, totalBalance, setIsDeposit }) => {

  return (
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
          <Link href={'/profile/transactions'} className='px-5 sm:px-6 md:px-7 rounded-md font-medium py-1.5 border-slate-500 border hover:text-white hover:border-white'>Transactions</Link>
        </ul>

      </div>

      <div className='w-full flex justify-start'>

        <div className='flex  my-10 flex-col gap-2 text-lg text-white'>
          <h1 className='font-bold text-xl'>Estimated Balance</h1>
          {totalBalance ? <p className='underline'>= $ {totalBalance}</p>
            :
            <p className='underline'>= $ 00.00</p>
          }
        </div>

      </div >
    </>
  )
}

export default ProfileInfo
