import { Trades } from '@/app/trade/[coin]/page';
import React from 'react'

interface Props {
    myTrades: Trades[]
}

const UserTrades: React.FC<Props> = ({ myTrades }) => {

    return (    
        <div className='flex text-[10px] sm:text-xs flex-col items-center w-full py-10 gap-6'>

            <div className='flex flex-col w-full'>
                <h1 className='w-full mb-5 text-white text-xl font-bold'>My Trades</h1>
                <div className={`w-full ${myTrades.length > 0 ? 'h-[30rem]' : 'h-20'} overflow-y-auto`}>

                    {myTrades && myTrades.length > 0 ?
                        <table className="w-full text-left text-gray-400">
                            <thead className="text-xs text-slate-200 bg-slate-700">
                                <tr>
                                    <th scope="col" className="px-6 py-4">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Total
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Type
                                    </th>
                                    <th scope="col" className="px-6 py-4">
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
                                            <th scope="row" className={`px-6 py-4 font-medium flex items-center gap-1 whitespace-nowrap`}>
                                                <div>{item.price}</div>
                                                <div className='text-slate-300 flex items-center'>({item.using_coin})</div>
                                            </th>
                                            <td className="px-6 py-4">
                                                <div className='flex items-center gap-1'>
                                                    <span>{item.amount}</span>
                                                    <span>({item.target_coin})</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <span>{item.total}</span>
                                                    <span>({item.using_coin})</span>
                                                </div>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <div className={`uppercase ${item.trade_type === 'buy' ? 'text-green-400' : 'text-red-500'}`}>{item.trade_type}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className='flex items-center'>
                                                    {formattedCreatedAt}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table> : <div className='text-slate-300 text-base w-full h-20 justify-center flex items-center'>No Data</div>}
                </div>
            </div>

        </div>
    )
}

export default UserTrades