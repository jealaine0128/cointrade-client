/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

import { AllCoins } from '@/app/trade/[coin]/page'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import router, { useRouter } from 'next/navigation'
import React from 'react'

interface Props {

    coinSearchQuery: string
    coin: string
    buyWith: string
    allCoins: AllCoins[]
    filterCoins: AllCoins[]
    filterBuyWithCoins: AllCoins[]
    setBuyWith: React.Dispatch<React.SetStateAction<string>>
    setCoinSearchQuery: React.Dispatch<React.SetStateAction<string>>
    setBuyWithSearchQuery: React.Dispatch<React.SetStateAction<string>>
    buyWithSearchQuery: string

}
const SymbolExChange: React.FC<Props> = (
    { coinSearchQuery, coin, buyWith, filterBuyWithCoins,
        buyWithSearchQuery, setBuyWithSearchQuery, setCoinSearchQuery,
        allCoins, filterCoins, setBuyWith }
) => {

    const router = useRouter()
    
    return (
        <div className='w-full flex items-center gap-4 justify-center text-xs'>
            <div className='w-full relative'>
                <input type="text" id='search' placeholder={coin.toUpperCase()} value={coinSearchQuery} onChange={(e: any) => setCoinSearchQuery(e.target.value)} className='px-4 py-2 bg-slate-900 border border-slate-800 text-slate-200 w-full outline-none' />
                <ul className={`bg-slate-800 p-5 overflow-x-hidden top-10 ${filterCoins.length > 0 ? 'h-96' : ''} z-40 overflow-y-auto absolute w-full ${coinSearchQuery ? 'flex' : 'hidden'} flex-col gap-4`}>
                    {allCoins.length > 0 && filterCoins.length > 0 ? filterCoins.map((item) => (
                        <li onClick={() => {
                            router.push(`/trade/${item.coin.toUpperCase()}`)
                            setBuyWithSearchQuery('')
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
            <div className='text-slate-300 w-52 flex items-center justify-center uppercase'>
                {coin} / {buyWith}
            </div>
            <div className='w-full relative'>
                <input type="text" id='search' placeholder={buyWith} value={buyWithSearchQuery} onChange={(e: any) => setBuyWithSearchQuery(e.target.value)} className='px-4 py-2 bg-slate-900 border border-slate-800 text-slate-200 w-full outline-none' />
                <ul className={`bg-slate-800 p-5 overflow-x-hidden top-10 ${filterBuyWithCoins.length > 0 ? 'h-96' : ''} z-40 overflow-y-auto absolute w-full ${buyWithSearchQuery ? 'flex' : 'hidden'} flex-col gap-4`}>
                    {allCoins.length > 0 && filterBuyWithCoins.length > 0 ? filterBuyWithCoins.map((item) => (
                        <li key={item.coin} onClick={() => {
                            setBuyWith(item.coin.toUpperCase())
                            setBuyWithSearchQuery('')
                        }} className='flex items-center gap-4 text-slate-300 text-xs lg:text-sm cursor-pointer hover:text-white'>
                            <img src={item.image} alt={item.name} width={15} height={15} loading='lazy' className='lg:w-[20px] lg:h-[20px]' />
                            {item.full_name}
                        </li>
                    )) : filterBuyWithCoins.length < 1 && allCoins.length > 0 ? <li className='text-white flex items-center gap-4'>
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
        </div>)
}

export default SymbolExChange