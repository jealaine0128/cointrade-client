'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Stock {
    stock: {
        x: number,
        y: number
    }[]
    symbol: string;
}


const Main = () => {

    const [stockName, setStockName] = useState('BTC')

    const [stockHistory, setStockHistory] = useState(1)

    const stockList = ['BTC', 'LTC', 'BNB', 'ETH', 'DOGE']

    const [stock, setStock] = useState<Stock>({ stock: [{ x: 0, y: 0 }], symbol: '' })

    const get1DayStock = async () => {

        try {

            setStock({ stock: [{ x: 0, y: 0 }], symbol: '' })

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}histominute?fsym=${stockName}&tsym=USD&limit=1439`)

            const formatData = data.Data.Data.map((item: any) => ({
                x: item.time * 1000,
                y: [item.open, item.high, item.low, item.close]
            }))

            const stockData: Stock = {
                stock: formatData,
                symbol: stockName
            }

            setStock(stockData)

        } catch (error) {

            console.error(error);

        }
    }

    const get7DayStock = async () => {

        setStock({ stock: [{ x: 0, y: 0 }], symbol: '' })

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}histohour?fsym=${stockName}&tsym=USD&limit=167`)

        const formatData = data.Data.Data.map((item: any) => ({
            x: item.time * 1000,
            y: [item.open, item.high, item.low, item.close]
        }))

        const stockData: Stock = {
            stock: formatData,
            symbol: stockName
        }

        setStock(stockData)

    }

    const get30DayStock = async () => {

        setStock({ stock: [{ x: 0, y: 0 }], symbol: '' })

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}histohour?fsym=${stockName}&tsym=USD&limit=719`)

        const formatData = data.Data.Data.map((item: any) => ({
            x: item.time * 1000,
            y: [item.open, item.high, item.low, item.close]
        }))

        const stockData: Stock = {
            stock: formatData,
            symbol: stockName
        }

        setStock(stockData)

    }

    const get1YearStock = async () => {

        setStock({ stock: [{ x: 0, y: 0 }], symbol: '' })

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}histoday?fsym=${stockName}&tsym=USD&limit=364`)

        const formatData = data.Data.Data.map((item: any) => ({
            x: item.time * 1000,
            y: [item.open, item.high, item.low, item.close]
        }))

        const stockData: Stock = {
            stock: formatData,
            symbol: stockName
        }

        setStock(stockData)

    }

    useEffect(() => {

        if (stockHistory === 1) {

            get1DayStock()

        } else if (stockHistory === 7) {

            get7DayStock()

        } else if (stockHistory === 30) {

            get30DayStock()

        } else if (stockHistory === 365) {

            get1YearStock()
        }


    }, [stockName, stockHistory])

    return (
        <main className='bg-slate-950 w-screen pt-20 lg:pt-16 lg:h-screen pb-10 flex flex-col items-center justify-center px-5 sm:px-10 md:px-16b lg:px-24 xl:px-36 2xl:px-44'>
            <div className='flex items-center justify-between flex-col w-full gap-10 md:gap-20 lg:flex-row lg:px-5 xl:px-10 lg:border-x lg:border-slate-800 h-full'>
                <div className='flex flex-col text-white gap-6'>
                    <h1 className='text-3xl sm:text-4xl xl:text-5xl'>CoinTrade: Your Gateway to Seamless Crypto Trading</h1>
                    <h2 className='text-slate-200 leading-7'>Effortlessly Trade, Exchange, and Grow Your Digital Assets</h2>
                    <Link href={'/signup'} className='bg-yellow-400 py-2 w-1/2 text-center sm:w-1/4 lg:w-1/3 xl:w-1/4 rounded-sm hover:bg-transparent hover:border hover:border-white text-slat'>Get Started</Link>
                </div>
                <div className='flex flex-col items-center gap-5 w-full'>
                    <div className='w-full bg-slate-800 shadow-sm shadow-white rounded-md'>
                        {stock?.symbol && stock.symbol.length > 0 ? <Chart options={{
                            xaxis: {
                                type: 'datetime',
                                labels: {
                                    datetimeUTC: false,
                                    style: {
                                        colors: '#FFF'
                                    }
                                }
                            },
                            yaxis: {
                                labels: {
                                    style: {
                                        colors: '#FFF'
                                    }
                                },
                            },
                            tooltip: {
                                x: {
                                    format: 'MMM dd HH:mm'
                                }
                            },
                            chart: {
                                id: stock.symbol,
                                animations: {
                                    speed: 1000
                                },
                            },
                            plotOptions: {
                                candlestick: {
                                    colors: {
                                        upward: '#26C281',
                                        downward: '#ed3419'
                                    }
                                }
                            },
                            title: {
                                text: stock?.symbol,
                                align: 'center',
                                style: {
                                    fontSize: '20px',
                                    color: '#FFF'
                                }
                            },
                        }
                        }
                            series={[
                                {
                                    data: stock.stock,
                                    name: stock.symbol
                                }
                            ]}
                            type='candlestick'
                        /> :
                            <div className='w-full flex items-center justify-center h-[15rem] sm:h-[25rem] md:h-[32rem] lg:h-[15rem] 2xl:h-[29rem] animate-pulse bg-slate-950 shadow-sm shadow-white rounded-3xl'>
                                <div className='text-white flex items-center gap-3'>
                                    <div className='bg-none border-2 w-6 h-6 relative rounded-full animate-spin flex items-center justify-center'>
                                        <div className='absolute bg-slate-950 top-0 w-4 h-4 rounded-none'></div>
                                    </div>
                                    Processing...
                                </div>
                            </div>
                        }
                    </div>
                    <ul className='flex items-center gap-4 2xl:gap-8 flex-wrap justify-center'>
                        {stockList.map(item => (
                            <li key={item}
                                onClick={() => {
                                    setStock({ stock: [{ x: 0, y: 0 }], symbol: '' })
                                    setStockName(item)
                                }}
                                title={`${item} Price`}
                                className={`px-4 py-1.5 lg:text-sm text-xs xl:px-6 xl:text-base cursor-pointer rounded-3xl ${stockName === item ? 'bg-yellow-400 text-white' : 'bg-white text-slate-950'}`}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                    <ul className='flex items-center gap-5 2xl:gap-8 flex-wrap justify-center'>
                        <li onClick={() => setStockHistory(1)} className={`px-5 text-xs cursor-pointer lg:text-sm xl:text-base rounded-md py-1.5 ${stockHistory === 1 ? 'bg-yellow-400 text-white' : 'border bg-transparent text-white'}`}>1DAY</li>
                        <li onClick={() => setStockHistory(7)} className={`px-5 text-xs cursor-pointer lg:text-sm xl:text-base rounded-md py-1.5 ${stockHistory === 7 ? 'bg-yellow-400 text-white' : 'border bg-transparent text-white'}`}>7DAYS</li>
                        <li onClick={() => setStockHistory(30)} className={`px-5 text-xs cursor-pointer lg:text-sm xl:text-base rounded-md py-1.5 ${stockHistory === 30 ? 'bg-yellow-400 text-white' : 'border bg-transparent text-white'}`}>30DAYS</li>
                        <li onClick={() => setStockHistory(365)} className={`px-5 text-xs cursor-pointer lg:text-sm xl:text-base rounded-md py-1.5 ${stockHistory === 365 ? 'bg-yellow-400 text-white' : 'border bg-transparent text-white'}`}>1YEAR</li>
                    </ul>
                </div>
            </div>
        </main>
    )
}

export default Main