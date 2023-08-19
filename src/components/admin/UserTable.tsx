import { AllUser } from '@/app/admin/page'
import { faEllipsis, faEye, faPenToSquare, faTrash, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useState } from 'react'

interface Props {

    user: AllUser[]

    searchQuery: string

    skeleton: string[]

    selectedUser: {
        name: string;
        email: string;
        is_admin: boolean;
        is_approved: boolean;
        id: string;
    }

    selectedUserID: string

    setSelectedUser: React.Dispatch<React.SetStateAction<{
        name: string;
        email: string;
        is_admin: boolean;
        is_approved: boolean;
        id: string;
    }>>

    setSelectedUserID: React.Dispatch<React.SetStateAction<string>>

    operation: boolean

    deleteUser: (userID: string) => Promise<void>

    setOperation: React.Dispatch<React.SetStateAction<boolean>>

    setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>

}

const UserTable: React.FC<Props> = ({ setIsUpdating, deleteUser, user, searchQuery, skeleton, operation, setOperation, setSelectedUser, selectedUserID, setSelectedUserID }) => {

    return (
        <div className={`relative overflow-x-auto w-full `}>
            <table className="w-full text-left text-gray-400">
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
                        <tr className=" border-b text-slate-200 bg-slate-800 border-gray-700 text-sm" key={item.id}>
                            <th scope="row" className="px-6 py-3.5 font-medium flex items-center gap-3 whitespace-nowrap text-white">
                                <div className='text-white flex items-center font-bold'>{item.id}</div>
                            </th>
                            <td className="px-6 py-3.5">
                                <div className='h-5'>
                                    {item.name}
                                </div>
                            </td>
                            <td className="px-6 py-3.5">
                                <div className='h-5'>
                                    {item.email}
                                </div>
                            </td>
                            <td className='py-3.5 relative px-6'>
                                <FontAwesomeIcon icon={faEllipsis} className='text-2xl cursor-pointer hover:text-white' onClick={() => {
                                    setOperation(true)
                                    setSelectedUserID(item.id)
                                }} />
                                <ul className={`${operation && selectedUserID === item.id ? 'block' : 'hidden'} absolute bg-slate-900 p-3 gap-3 z-10 w-24 shadow-lg flex flex-col`}>
                                    <Link href={`/admin/view-trader/${item.id}`} className='flex items-center hover:text-green-500 cursor-pointer justify-between'>
                                        View
                                        <FontAwesomeIcon icon={faEye} width={16} height={16} />
                                    </Link>
                                    <li onClick={() => {
                                        setIsUpdating(true)
                                        setSelectedUser(item)
                                    }} className='flex items-center hover:text-blue-400 cursor-pointer justify-between'>
                                        Update
                                        <FontAwesomeIcon icon={faPenToSquare} width={16} height={16} />
                                    </li>
                                    <li onClick={() => deleteUser(item.id)} className='flex items-center hover:text-red-500 cursor-pointer justify-between'>
                                        Delete
                                        <FontAwesomeIcon icon={faTrashCan} width={16} height={16} />
                                    </li>
                                    <li className='flex pt-2 mt-2 border-slate-500 border-t items-center hover:text-white cursor-pointer justify-between' onClick={() => {
                                        setOperation(false)
                                        setSelectedUserID('')
                                    }}>
                                        Close
                                        <FontAwesomeIcon icon={faXmark} width={16} height={16} />
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    ))
                        : searchQuery && user.length < 1 ?
                            <tr className=" border-b text-slate-200 bg-gray-800 border-gray-700">
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
                                <tr className=" border-b text-slate-200 bg-gray-800 border-gray-700" key={item}>
                                    <th scope="row" className="px-6 py-4 font-medium flex items-center gap-3 whitespace-nowrap text-white">
                                        <div className='w-36 h-[22px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                    </th>
                                    <td className="px-6 py-4">
                                        <div className='w-36 h-[22px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className='w-32 h-[22px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                    </td>
                                    <td className="px-6 py-4 h-[22px] text-lg">
                                        <div className='flex items-center gap-3'>
                                            <div className='w-12 h-[22px] rounded-3xl bg-slate-600 animate-pulse'></div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserTable