import { faUser, faEnvelope, faKey, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface Props {

    selectedUser: {
        name: string
        email: string
        is_approved: boolean
        is_admin: boolean
    }
    updateUser: (e: any) => Promise<void>

    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void

    isSubmitting: boolean

    setSelectedUser: React.Dispatch<React.SetStateAction<{
        name: string;
        email: string;
        is_admin: boolean;
        is_approved: boolean;
        id: string;
    }>>

    setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>

}


const UpdateUserModal: React.FC<Props> = ({ updateUser, setSelectedUser, setIsUpdating, isSubmitting, selectedUser, handleChange }) => {

    console.log(selectedUser);
    
    return (
        <div className='fixed w-screen h-screen z-50 grid place-items-center bg-slate-950 bg-opacity-60 text-slate-300 px-5 sm:px-10'>
            <form onSubmit={updateUser} className='max-w-[30rem] w-full bg-slate-950 flex flex-col gap-5 relative itmes-start p-12 lg:border lg:border-slate-800'>
                <FontAwesomeIcon icon={faXmark} width={16} height={16} className='text-2xl hover:text-white absolute top-4 cursor-pointer right-4' onClick={() => {
                    setIsUpdating(false)
                    setSelectedUser({ id: '', name: '', email: '', is_approved: false, is_admin: false })
                }} />
                <div className='w-full relative'>
                    <FontAwesomeIcon icon={faUser} width={16} height={16} className='absolute top-3 left-3 text-white' />
                    <input required value={selectedUser.name} onChange={handleChange} type="text" placeholder='Name' name='name' className='border-b border-slate-400 w-full bg-slate-800 px-10 py-2 outline-none text-white' />
                </div>
                <div className='w-full relative'>
                    <FontAwesomeIcon icon={faEnvelope} width={16} height={16} className='absolute top-3 left-3 text-white' />
                    <input required value={selectedUser.email} onChange={handleChange} type="text" placeholder='Email' name='email' className='border-b border-slate-400 w-full bg-slate-800 px-10 py-2 outline-none text-white' />
                </div>

                <div className='flex items-center w-full gap-6'>
                    <div className='flex items-center gap-2'>
                        <label htmlFor="approved">
                            Approved
                        </label>
                        <input onChange={handleChange}
                            checked={selectedUser.is_approved}
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
                            checked={selectedUser.is_admin}
                            name='is_admin'
                            className='w-5 h-5 rounded-full outline-none' />
                    </div>
                    <button disabled={isSubmitting && true} className={`w-full rounded-md ${isSubmitting ? 'bg-yellow-400' : 'bg-yellow-500 hover:bg-yellow-400'} text-white font-bold py-2`}>{isSubmitting ? <p className='flex items-center gap-2 justify-center'><FontAwesomeIcon icon={faSpinner} width={16} height={16} className='animate-spin' /> Processing</p> : 'Update'}</button>
                </div>

            </form></div>
    )
}

export default UpdateUserModal