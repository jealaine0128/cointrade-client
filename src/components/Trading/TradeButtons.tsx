/* eslint-disable react-hooks/exhaustive-deps */
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
interface Props {

    price: string
    buyWith: string
    coin: string
    sellForm: {
        amount: string
        total: string
    }
    buyForm: {
        amount: string
        total: string
    }

    isLoading: boolean

    setSellForm: React.Dispatch<React.SetStateAction<{
        amount: string;
        total: string;
    }>>

    sellLimit: (e: any) => Promise<void>
    buyLimit: (e: any) => Promise<void>

    buyMarket: (e: any) => Promise<void>
    sellMarket: (e: any) => Promise<void>


    setBuyForm: React.Dispatch<React.SetStateAction<{
        amount: string;
        total: string;
    }>>

    buyType: string

    setBuyType: React.Dispatch<React.SetStateAction<string>>

    setPrice: React.Dispatch<React.SetStateAction<string>>

}
const TradeButtons: React.FC<Props> = ({ price, isLoading, sellLimit, buyLimit, buyType, buyMarket, sellMarket, setBuyType, setPrice, buyWith, buyForm, setBuyForm, coin, sellForm, setSellForm }) => {

    return (
        <div className='w-full flex flex-col'>

            <ul className='w-full flex gap-7 text-xs text-slate-400 pb-4'>
                <li onClick={() => {

                    setBuyType('limit')
                    setBuyForm({ amount: '', total: '' })
                    setSellForm({ amount: '', total: '' })

                }} className={`cursor-pointer ${buyType === 'limit' && 'text-yellow-400'}`}>Limit</li>
                <li onClick={() => {

                    setBuyType('market')
                    setBuyForm({ amount: '', total: '' })
                    setSellForm({ amount: '', total: '' })

                }} className={`cursor-pointer ${buyType === 'market' && 'text-yellow-400'}`}>Market</li>
            </ul>

            {buyType === 'limit' ?
                <div className='flex items-center w-full justify-between gap-5 md:gap-10 text-slate-300 text-sm'>

                    <div className='flex w-full flex-col gap-2'>
                        <div className='flex items-center w-full'>
                            <div className='w-full relative'>
                                <label htmlFor="price" className='absolute top-[5px] left-3 text-slate-400'>Price</label>
                                <input type="text" value={price && !isNaN(Number(price)) && isFinite(Number(price)) ? price : ''}
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        const numericInput = input.replace(/[^\d.]/g, ''); // Allow only digits and periods
                                        const parts = numericInput.split('.'); // Split the input by period

                                        if (parts.length > 2) {
                                            // More than one period, consider only the first part as integer part and rest as decimal
                                            const integerPart = parts.shift();
                                            const decimalPart = parts.join('');
                                            const sanitizedInput = `${integerPart}.${decimalPart}`;

                                            setPrice(String(sanitizedInput));

                                            setBuyForm(prevState => ({ ...prevState, total: String(Number(prevState.amount) * Number(sanitizedInput)) }))

                                        } else {

                                            setPrice(String(numericInput));

                                            setBuyForm(prevState => ({ ...prevState, total: String(Number(prevState.amount) * Number(numericInput)) }))


                                        }
                                    }}
                                    className='outline-none text-right px-20 py-1 w-full bg-slate-900 border border-slate-800' />
                                <div className='absolute right-3 top-[5px]'>{buyWith}</div>
                            </div>
                        </div>

                        <div className='flex items-center w-full'>
                            <div className='w-full relative'>
                                <label htmlFor="price" className='top-[5px] absolute left-3 text-slate-400'>Amount</label>
                                <input
                                    type="text"
                                    className='appearance-none text-right outline-none px-20 py-1 w-full bg-slate-900 border border-slate-800'
                                    value={buyForm.amount ? buyForm.amount : ''}
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        const numericInput = input.replace(/[^\d.]/g, ''); // Allow only digits and periods
                                        const parts = numericInput.split('.'); // Split the input by period

                                        if (parts.length > 2) {
                                            // More than one period, consider only the first part as integer part and rest as decimal
                                            const integerPart = parts.shift();
                                            const decimalPart = parts.join('');
                                            const sanitizedInput = `${integerPart}.${decimalPart}`;

                                            setBuyForm({ total: String(Number(sanitizedInput) * Number(price)), amount: sanitizedInput });
                                        } else {
                                            setBuyForm({ total: String(Number(numericInput) * Number(price)), amount: numericInput });
                                        }
                                    }}
                                />
                                <div className='absolute right-3 top-[5px] uppercase'>{coin}</div>
                            </div>
                        </div>

                        <div className='flex items-center w-full'>
                            <div className='w-full relative'>
                                <label htmlFor="price" className='left-3 top-[5px] absolute text-slate-400'>Total</label>
                                <input type="text" onChange={(e) => {
                                    const input = e.target.value;
                                    const numericInput = input.replace(/[^\d.]/g, ''); // Allow only digits and periods
                                    const parts = numericInput.split('.'); // Split the input by period

                                    if (parts.length > 2) {
                                        const integerPart = parts.shift();
                                        const decimalPart = parts.join('');
                                        const sanitizedInput = `${integerPart}.${decimalPart}`;

                                        setBuyForm({ amount: String(Number(sanitizedInput) / Number(price)), total: sanitizedInput });

                                    } else {

                                        setBuyForm({ amount: String(Number(numericInput) / Number(price)), total: numericInput });

                                    }

                                }} className='outline-none px-20 text-right py-1 w-full bg-slate-900 border border-slate-800' value={buyForm.total && !isNaN(Number(buyForm.total)) ? buyForm.total : ''} />
                                <div className='absolute right-3 top-[5px] uppercase'>{buyWith}</div>
                            </div>
                        </div>
                        <button
                            className='w-full mt-2.5 hover:bg-green-400 rounded-md h-10 bg-green-500 uppercase font-bold text-white'
                            disabled={isLoading && true}
                            onClick={(e: any) => buyLimit(e)}>
                            {!isLoading ? `BUY ${coin}` : <FontAwesomeIcon icon={faSpinner} width={16} height={16} className='animate-spin' />}
                        </button>
                    </div>

                    <div className='flex w-full flex-col gap-2'>
                        <div className='flex items-center w-full'>
                            <div className='w-full relative'>
                                <label htmlFor="price" className='absolute top-[5px] left-3 text-slate-400'>Price</label>
                                <input type="text" value={price && !isNaN(Number(price)) && isFinite(Number(price)) ? price : ''}
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        const numericInput = input.replace(/[^\d.]/g, ''); // Allow only digits and periods
                                        const parts = numericInput.split('.'); // Split the input by period

                                        if (parts.length > 2) {
                                            // More than one period, consider only the first part as integer part and rest as decimal
                                            const integerPart = parts.shift();
                                            const decimalPart = parts.join('');
                                            const sanitizedInput = `${integerPart}.${decimalPart}`;

                                            setPrice(String(sanitizedInput));

                                            setSellForm(prevState => ({ ...prevState, total: String(Number(prevState.amount) * Number(sanitizedInput)) }))

                                        } else {

                                            setPrice(String(numericInput));

                                            setSellForm(prevState => ({ ...prevState, total: String(Number(prevState.amount) * Number(numericInput)) }))


                                        }
                                    }}

                                    className='outline-none text-right px-20 py-1 w-full bg-slate-900 border border-slate-800' />
                                <div className='absolute right-3 top-[5px]'>{buyWith}</div>
                            </div>
                        </div>

                        <div className='flex items-center w-full'>
                            <div className='w-full relative'>
                                <label htmlFor="price" className='top-[5px] absolute left-3 text-slate-400'>Amount</label>
                                <input
                                    type="text"
                                    className='appearance-none text-right outline-none px-20 py-1 w-full bg-slate-900 border border-slate-800'
                                    value={sellForm.amount && !isNaN(Number(sellForm.amount)) ? sellForm.amount : ''}
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        const numericInput = input.replace(/[^\d.]/g, ''); // Allow only digits and periods
                                        const parts = numericInput.split('.'); // Split the input by period

                                        if (parts.length > 2) {
                                            // More than one period, consider only the first part as integer part and rest as decimal
                                            const integerPart = parts.shift();
                                            const decimalPart = parts.join('');
                                            const sanitizedInput = `${integerPart}.${decimalPart}`;

                                            setSellForm({ total: String(Number(sanitizedInput) * Number(price)), amount: sanitizedInput });
                                        } else {
                                            setSellForm({ total: String(Number(numericInput) * Number(price)), amount: numericInput });
                                        }
                                    }}
                                />
                                <div className='absolute right-3 top-[5px] uppercase'>{coin}</div>
                            </div>
                        </div>

                        <div className='flex items-center w-full'>
                            <div className='w-full relative'>
                                <label htmlFor="price" className='left-3 top-[5px] absolute text-slate-400'>Total</label>
                                <input type="text" onChange={(e) => {
                                    const input = e.target.value;
                                    const numericInput = input.replace(/[^\d.]/g, ''); // Allow only digits and periods
                                    const parts = numericInput.split('.'); // Split the input by period

                                    if (parts.length > 2) {
                                        const integerPart = parts.shift();
                                        const decimalPart = parts.join('');
                                        const sanitizedInput = `${integerPart}.${decimalPart}`;

                                        setSellForm({ amount: String(Number(sanitizedInput) / Number(price)), total: sanitizedInput });

                                    } else {

                                        setSellForm({ amount: String(Number(numericInput) / Number(price)), total: numericInput });

                                    }

                                }} className='outline-none px-20 text-right py-1 w-full bg-slate-900 border border-slate-800' value={sellForm.total && !isNaN(Number(sellForm.total)) ? sellForm.total : ''} />
                                <div className='absolute right-3 top-[5px] uppercase'>{buyWith}</div>
                            </div>
                        </div>
                        <button
                            disabled={isLoading && true}
                            className='w-full mt-2.5 hover:bg-red-400 rounded-md h-10 text-white font-bold bg-red-500 uppercase'
                            onClick={(e: any) => sellLimit(e)}>
                            {!isLoading ? `SELL ${coin}` : <FontAwesomeIcon icon={faSpinner} width={16} height={16} className='animate-spin' />}
                        </button>
                    </div>

                </div>


                :

                <div className='flex items-center w-full justify-between gap-5 md:gap-10 text-slate-300 text-sm'>

                    <div className='flex w-full flex-col gap-2'>
                        <div className='flex items-center w-full'>
                            <div className='w-full relative'>
                                <label htmlFor="price" className='absolute top-[5px] left-3 text-slate-400'>Price</label>
                                <input type="text" value='Market' readOnly className='outline-none text-right px-20 py-1 w-full bg-slate-900 border border-slate-800' />
                                <div className='absolute right-3 top-[5px]'>{buyWith}</div>
                            </div>
                        </div>

                        <div className='flex items-center w-full'>
                            <div className='w-full relative'>
                                <label htmlFor="price" className='top-[5px] absolute left-3 text-slate-400'>Amount</label>
                                <input
                                    type="text"
                                    className='appearance-none text-right outline-none px-20 py-1 w-full bg-slate-900 border border-slate-800'
                                    value={buyForm.amount ? buyForm.amount : ''}
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        const numericInput = input.replace(/[^\d.]/g, ''); // Allow only digits and periods
                                        const parts = numericInput.split('.'); // Split the input by period

                                        if (parts.length > 2) {
                                            // More than one period, consider only the first part as integer part and rest as decimal
                                            const integerPart = parts.shift();
                                            const decimalPart = parts.join('');
                                            const sanitizedInput = `${integerPart}.${decimalPart}`;

                                            setBuyForm({ total: String(Number(sanitizedInput) * Number(price)), amount: sanitizedInput });
                                        } else {
                                            setBuyForm({ total: String(Number(numericInput) * Number(price)), amount: numericInput });
                                        }
                                    }}
                                />
                                <div className='absolute right-3 top-[5px] uppercase'>{coin}</div>
                            </div>
                        </div>

                        <div className='flex items-center w-full'>
                            <div className='w-full relative'>
                                <label htmlFor="price" className='left-3 top-[5px] absolute text-slate-400'>Total</label>
                                <input type="text" onChange={(e) => {
                                    const input = e.target.value;
                                    const numericInput = input.replace(/[^\d.]/g, ''); // Allow only digits and periods
                                    const parts = numericInput.split('.'); // Split the input by period

                                    if (parts.length > 2) {
                                        const integerPart = parts.shift();
                                        const decimalPart = parts.join('');
                                        const sanitizedInput = `${integerPart}.${decimalPart}`;

                                        setBuyForm({ amount: String(Number(sanitizedInput) / Number(price)), total: sanitizedInput });

                                    } else {

                                        setBuyForm({ amount: String(Number(numericInput) / Number(price)), total: numericInput });

                                    }

                                }} className='outline-none px-20 text-right py-1 w-full bg-slate-900 border border-slate-800' value={buyForm.total ? buyForm.total : ''} />
                                <div className='absolute right-3 top-[5px] uppercase'>{buyWith}</div>
                            </div>
                        </div>
                        <button
                            className='w-full mt-2.5 hover:bg-green-400 rounded-md h-10 bg-green-500 uppercase font-bold text-white'
                            disabled={isLoading && true}
                            onClick={(e: any) => buyMarket(e)}>
                            {!isLoading ? `BUY ${coin}` : <FontAwesomeIcon icon={faSpinner} width={16} height={16} className='animate-spin' />}
                        </button>
                    </div>

                    <div className='flex w-full flex-col gap-2'>
                        <div className='flex items-center w-full'>
                            <div className='w-full relative'>
                                <label htmlFor="price" className='absolute top-[5px] left-3 text-slate-400'>Price</label>
                                <input type="text" value='Market' readOnly className='outline-none text-right px-20 py-1 w-full bg-slate-900 border border-slate-800' />
                                <div className='absolute right-3 top-[5px]'>{buyWith}</div>
                            </div>
                        </div>

                        <div className='flex items-center w-full'>
                            <div className='w-full relative'>
                                <label htmlFor="price" className='top-[5px] absolute left-3 text-slate-400'>Amount</label>
                                <input
                                    type="text"
                                    className='appearance-none text-right outline-none px-20 py-1 w-full bg-slate-900 border border-slate-800'
                                    value={sellForm.amount ? sellForm.amount : ''}
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        const numericInput = input.replace(/[^\d.]/g, ''); // Allow only digits and periods
                                        const parts = numericInput.split('.'); // Split the input by period

                                        if (parts.length > 2) {
                                            // More than one period, consider only the first part as integer part and rest as decimal
                                            const integerPart = parts.shift();
                                            const decimalPart = parts.join('');
                                            const sanitizedInput = `${integerPart}.${decimalPart}`;

                                            setSellForm({ total: String(Number(sanitizedInput) * Number(price)), amount: sanitizedInput });
                                        } else {
                                            setSellForm({ total: String(Number(numericInput) * Number(price)), amount: numericInput });
                                        }
                                    }}
                                />
                                <div className='absolute right-3 top-[5px] uppercase'>{coin}</div>
                            </div>
                        </div>

                        <div className='flex items-center w-full'>
                            <div className='w-full relative'>
                                <label htmlFor="price" className='left-3 top-[5px] absolute text-slate-400'>Total</label>
                                <input type="text" onChange={(e) => {
                                    const input = e.target.value;
                                    const numericInput = input.replace(/[^\d.]/g, ''); // Allow only digits and periods
                                    const parts = numericInput.split('.'); // Split the input by period

                                    if (parts.length > 2) {
                                        const integerPart = parts.shift();
                                        const decimalPart = parts.join('');
                                        const sanitizedInput = `${integerPart}.${decimalPart}`;

                                        setSellForm({ amount: String(Number(sanitizedInput) / Number(price)), total: sanitizedInput });

                                    } else {

                                        setSellForm({ amount: String(Number(numericInput) / Number(price)), total: numericInput });

                                    }

                                }} className='outline-none px-20 text-right py-1 w-full bg-slate-900 border border-slate-800' value={sellForm.total ? sellForm.total : ''} />                                <div className='absolute right-3 top-[5px] uppercase'>{buyWith}</div>
                            </div>
                        </div>
                        <button
                            disabled={isLoading && true}
                            className='w-full mt-2.5 hover:bg-red-400 rounded-md h-10 text-white font-bold bg-red-500 uppercase'
                            onClick={(e: any) => sellMarket(e)}>
                            {!isLoading ? `SELL ${coin}` : <FontAwesomeIcon icon={faSpinner} width={16} height={16} className='animate-spin' />}
                        </button>
                    </div>

                </div>

            }

        </div>

    )
}

export default TradeButtons