/* eslint-disable react-hooks/exhaustive-deps */

import { Trades } from '@/app/trade/[coin]/page';
import React from 'react'

interface Props {
    myTrades: Trades[]
    allTrades: Trades[]
}


const AllTrades: React.FC<Props> = ({ allTrades, myTrades }) => {
    return (
        <div className='flex text-xs flex-col items-center w-full pt-7 gap-6 text-[10px]'>

            <div className='flex flex-col w-full'>
                <h1 className='w-full mb-3 text-white font-medium text-sm'>Market Trades</h1>
                <div className='w-full h-72 overflow-y-auto'>
                    {allTrades && allTrades.length > 0 ? <table className="w-full text-left text-gray-400">
                        <thead className="text-xs text-slate-200 bg-slate-700">
                            <tr>
                                <th scope="col" className="p-3">
                                    Price
                                </th>
                                <th scope="col" className="p-3">
                                    Amount
                                </th>
                                <th scope="col" className="p-3">
                                    Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTrades.length > 0 && allTrades.map((item) => {
                                const createdAt = new Date(item.created_at);
                                const formattedCreatedAt = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`;
                                return (
                                    <tr className="border-b text-slate-200 bg-gray-800 border-gray-700" key={item.id}>
                                        <th scope="row" className={`p-3 font-medium flex items-center gap-1 whitespace-nowrap ${item.trade_type === 'buy' ? 'text-green-400' : 'text-red-500'}`}>
                                            <div>{item.price}</div>
                                            <div className='text-slate-300 flex items-center'>({item.using_coin})</div>
                                        </th>
                                        <td className="p-3">
                                            <div className='flex items-center gap-1'>
                                                <span>{item.amount}</span>
                                                <span>({item.target_coin})</span>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <div className='flex items-center'>
                                                {formattedCreatedAt}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table> : <div className='text-slate-400 w-full h-64 justify-center flex items-center'>No Data</div>}
                </div>
            </div>

            <div className='flex flex-col w-full'>
                <h1 className='w-full mb-3 text-white font-medium text-sm'>My Trades</h1>
                <div className='w-full h-72 overflow-y-auto'>

                    {myTrades && myTrades.length > 0 ? <table className="w-full text-left text-gray-400">
                        <thead className="text-xs text-slate-200 bg-slate-700">
                            <tr>
                                <th scope="col" className="p-3">
                                    Price
                                </th>
                                <th scope="col" className="p-3">
                                    Amount
                                </th>
                                <th scope="col" className="p-3">
                                    Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {myTrades.length > 0 && myTrades.map((item) => {
                                const createdAt = new Date(item.created_at);
                                const formattedCreatedAt = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`;
                                return (
                                    <tr className="border-b text-slate-200 bg-gray-800 border-gray-700" key={item.id}>
                                        <th scope="row" className={`p-3 font-medium flex items-center gap-1 whitespace-nowrap ${item.trade_type === 'buy' ? 'text-green-400' : 'text-red-500'}`}>
                                            <div>{item.price}</div>
                                            <div className='text-slate-300 flex items-center'>({item.using_coin})</div>
                                        </th>
                                        <td className="p-3">
                                            <div className='flex items-center gap-1'>
                                                <span>{item.amount}</span>
                                                <span>({item.target_coin})</span>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <div className='flex items-center'>
                                                {formattedCreatedAt}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table> : <div className='text-slate-400 w-full h-64 justify-center flex items-center'>No Data</div>}
                </div>
            </div>

        </div>
    )
}

export default AllTrades