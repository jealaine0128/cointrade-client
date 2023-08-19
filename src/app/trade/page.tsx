'use client'
import TradeCoins from '@/components/dashboard/TradeCoins'
import UserHeader from '@/components/dashboard/UserHeader'
import { fetchPendingTrades } from '@/lib/styles/api/fetchTrades'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {

    const router = useRouter()

    const [user, setUser] = useState({ name: 'Arnold Nillas', token: '', is_admin: false })

    useEffect(() => {

        const user = localStorage.getItem('user')

        if (user) {

            setUser(JSON.parse(user))

        } else {

            router.push('/login')

        }

        fetchPendingTrades()


    }, [])
    
    return (
        <div>
            <UserHeader user={user} />
            <TradeCoins />
        </div>
    )
}

export default Page