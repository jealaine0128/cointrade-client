/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'

interface Props {

    coin: string

    coinDetails: {
        data: {
            PRICE: string;
            CHANGE24HOUR: string;
            HIGHDAY: string;
            OPENDAY: string;
            MKTCAP: string;
            LOWDAY: string;
        };
        image: string;
    }

}

const CoinDetails: React.FC<Props> = ({ coinDetails, coin }) => {

    return (
        <div className='lg:px-5 xl:px-10 pt-5 lg:border-x lg:border-slate-800 w-full flex items-start lg:flex-row lg:items-center gap-10 flex-col'>
            <div className='flex items-center gap-5'>
                {coinDetails.image ? <img src={coinDetails.image} alt={coin} width={30} height={30} />
                    : <div className='w-[30px] h-[30px] rounded-full bg-slate-700 animate-pulse'></div>
                }
                <span className='font-medium text-white uppercase'>{coin}</span>
            </div>
            <ul className='flex items-center gap-5 w-full 2xl:gap-10 text-sm flex-wrap justify-start'>
                {coinDetails.data.PRICE ?
                    <li>Price: {coinDetails.data.PRICE}</li>
                    :
                    <li className='h-6 w-32 bg-slate-700 rounded-3xl animate-pulse'></li>
                }
                {coinDetails.data.HIGHDAY ?
                    <li>High: {coinDetails.data.HIGHDAY}</li>
                    :
                    <li className='h-6 w-32 bg-slate-700 rounded-3xl animate-pulse'></li>
                }
                {coinDetails.data.LOWDAY ?
                    <li>Low: {coinDetails.data.LOWDAY}</li>
                    :
                    <li className='h-6 w-28 bg-slate-700 rounded-3xl animate-pulse'></li>
                }
                {coinDetails.data.CHANGE24HOUR ?
                    <li>24h Change: <span className={`${coinDetails.data.CHANGE24HOUR.includes('-') ? ' text-red-500' : 'text-green-500'}`}>{coinDetails.data.CHANGE24HOUR}</span></li>
                    :
                    <li className='h-6 w-32 bg-slate-700 rounded-3xl animate-pulse'></li>
                }
                {coinDetails.data.MKTCAP ?
                    <li>Market Cap: {coinDetails.data.MKTCAP}</li>
                    :
                    <li className='h-6 w-32 bg-slate-700 rounded-3xl animate-pulse'></li>
                }
            </ul>
        </div>)
}

export default CoinDetails