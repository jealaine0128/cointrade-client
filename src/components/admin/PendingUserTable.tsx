import { AllUser } from '@/app/admin/page'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface Props {
    skeleton: string[]
    user: AllUser[]
    searchQuery: string
    isLoading: boolean
    approveUser: (user: AllUser) => Promise<void>
}

const PendingUserTable: React.FC<Props> = ({ isLoading, skeleton, user, searchQuery, approveUser }) => {
    return (
        <div className={`relative overflow-x-auto w-full `}>
            <table className="w-full text-left  text-gray-400">
                <thead className="text-sm text-slate-200 bg-slate-700">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {user.length > 0 ? user.map(item => (
                        <tr className="border-b text-slate-200 bg-slate-800 border-gray-700 text-sm" key={item.id}>
                            <th scope="row" className="px-6 py-3 font-medium flex items-center gap-3 whitespace-nowrap text-white">
                                <div className='text-white flex items-center font-bold'>{item.id}</div>
                            </th>
                            <td className="px-6 py-3">
                                <div className='h-5'>
                                    {item.name}
                                </div>
                            </td>
                            <td className="px-6 py-3">
                                <div className='h-5'>
                                    {item.email}
                                </div>
                            </td>
                            <td className='py-3 relative px-6'>
                                <button disabled={isLoading && true} onClick={() => approveUser(item)} className={`${isLoading ? 'bg-green-400' : 'hover:bg-green-400 bg-green-500'} px-6 cursor-pointer text-white py-1 flex items-center justify-center rounded-md`}>
                                    {isLoading ? <FontAwesomeIcon icon={faSpinner} className='animate-spin' width={16} height={16} /> : 'Approve'}
                                </button>
                            </td>
                        </tr>
                    ))
                        : searchQuery && user.length < 1 ?
                            <tr className="border-b text-slate-200 bg-gray-800 border-gray-700">
                                <th scope="row" className="px-6 py-3 font-medium flex items-center gap-3 whitespace-nowrap text-white">
                                    Trader
                                </th>
                                <td className="px-6 py-3">
                                    {searchQuery}
                                </td>
                                <td className="px-6 py-3">
                                    Not
                                </td>
                                <td className="px-6 py-3 h-[30px] text-lg">
                                    Found
                                </td>
                            </tr>
                            : skeleton.map(item => (
                                <tr className="border-b text-slate-200 bg-gray-800 border-gray-700" key={item}>
                                    <th scope="row" className="px-6 py-3.5 font-medium flex items-center gap-3 whitespace-nowrap text-white">
                                        <div className='w-36 h-[23px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                    </th>
                                    <td className="px-6 py-3.5">
                                        <div className='w-36 h-[23px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <div className='w-32 h-[23px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                    </td>
                                    <td className="px-6 py-3.5 h-[23px] text-lg">
                                        <div className='flex items-center gap-3'>
                                            <div className='w-28 h-[23px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>)
}

export default PendingUserTable