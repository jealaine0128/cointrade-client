/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState } from 'react'
import { CoinSearch } from '../dashboard/TradeCoins'
import axios from 'axios'
import { faChevronDown, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {

    depositCoin: (e: any) => Promise<void>

    formData: {
        coin: string
        amount: string
    }

    setFormData: React.Dispatch<React.SetStateAction<{
        coin: string;
        amount: string;
    }>>

    user: {
        name: string,
        token: string,
        is_admin: boolean
    }

    setIsDeposit: React.Dispatch<React.SetStateAction<boolean>>

}

const DepositModal: React.FC<Props> = ({ formData, setFormData, user, setIsDeposit, depositCoin }) => {

    const [allCoins, setAllCoins] = useState<CoinSearch[]>([])

    const [searchQuery, setSearchQuery] = useState('')

    const filterCoins = allCoins.filter(item => item.coin.toUpperCase().includes(searchQuery.toUpperCase())).slice(0, 50)

    const fetchAllCoins = async () => {

        try {

            const { data } = await axios.get('https://min-api.cryptocompare.com/data/all/coinlist')

            const coins = Object.values(data.Data).map((item: any) => ({
                coin: item.Name,
                name: item.CoinName,
                full_name: item.FullName,
                image: `https://www.cryptocompare.com${item.ImageUrl}`
            }))

            setAllCoins(coins)

            localStorage.setItem('coins', JSON.stringify(coins))


        } catch (error) {

            console.error(error);

        }
    }


    useEffect(() => {

        const coins = localStorage.getItem('coins')

        if (coins) {

            setAllCoins(JSON.parse(coins))

        } else {

            fetchAllCoins()

        }

    }, [])

    const getCoinDetails = async (coin: string) => {

        try {

            const { data } = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coin}&tsyms=USD`)

            const coinDetails: any = Object.values(data.DISPLAY)

            const coinData = {
                data: coinDetails[0].USD,
                image: `https://www.cryptocompare.com${coinDetails[0].USD.IMAGEURL}`,
            }

            if (!coinData.data.CHANGE24HOUR) {

                setSearchQuery('')
                setFormData(prevForm => ({ ...prevForm, coin: '' }))
                return alert(`Coin ${formData.coin} is dead choose another coin`)

            }

        } catch (error) {

            console.error(error);

        }
    }

    return (
        <div className='fixed w-screen h-screen z-50 grid place-items-center bg-slate-950 bg-opacity-60 text-slate-300 px-5 sm:px-10'>
            <form onSubmit={depositCoin} className='w-full sm:w-96 md:w-[27rem] p-12 bg-slate-950 border border-slate-500 flex flex-col gap-4 relative'>

                <FontAwesomeIcon icon={faXmark} width={16} height={16} className='text-xl cursor-pointer absolute top-4 right-4 hover:text-white' onClick={() => setIsDeposit(false)} />
                <div className='w-full relative'>
                    <FontAwesomeIcon icon={faChevronDown} width={16} height={16} className='absolute right-3 top-3' />
                    <input type="text" id='search' placeholder="Select Coin" value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} className='px-4 py-2 bg-slate-900 border border-slate-800 text-slate-200 w-full outline-none' />
                    <ul className={`bg-slate-800 p-5 overflow-x-hidden top-10 ${filterCoins.length > 0 ? 'h-96' : ''} z-40 overflow-y-auto absolute w-full ${searchQuery ? 'flex' : 'hidden'} flex-col gap-4`}>
                        {allCoins.length > 0 && filterCoins.length > 0 ? filterCoins.map((item) => (
                            <li onClick={() => {
                                setFormData(prevState => ({ ...prevState, coin: item.coin }))
                                setSearchQuery('')
                                getCoinDetails(item.coin)
                            }} key={item.coin} className='flex items-center gap-4 text-slate-300 text-xs lg:text-sm cursor-pointer hover:text-white'>
                                <img src={item.image} alt={item.name} width={15} height={15} loading='lazy' className='lg:w-[20px] lg:h-[20px]' />
                                {item.full_name}
                            </li>
                        )) : filterCoins.length < 1 && allCoins.length > 0 ? <li className='text-white flex items-center gap-4'>
                            No coins found.
                        </li>
                            :
                            <li className='text-white flex items-center gap-4'>
                                <FontAwesomeIcon icon={faSpinner} className='animate-spin' width={16} height={16} />
                                Searching...
                            </li>
                        }
                    </ul>
                </div>
                <div className='flex items-center gap-3'>Selected Coin: <span className='text-white font-bold'>{formData.coin}</span></div>
                <input type="text" placeholder='Amount' value={formData.amount} onChange={(e) => {
                    const input = e.target.value;
                    const numericInput = input.replace(/[^\d.]/g, ''); // Allow only digits and periods
                    const parts = numericInput.split('.'); // Split the input by period

                    if (parts.length > 2) {
                        // More than one period, consider only the first part as integer part and rest as decimal
                        const integerPart = parts.shift();
                        const decimalPart = parts.join('');
                        const sanitizedInput = `${integerPart}.${decimalPart}`;

                        setFormData(prevState => ({ ...prevState, amount: sanitizedInput }))

                    } else {

                        setFormData(prevState => ({ ...prevState, amount: numericInput }))

                    }
                }} className='bg-slate-900 border-b border-slate-500 px-3 py-1 w-full outline-none' />
                <button className='w-1/2 bg-yellow-500 hover:bg-yellow-400 py-1.5 rounded-md'>Deposit</button>
            </form>
        </div>
    )
}

export default DepositModal