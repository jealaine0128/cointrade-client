/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import axios from 'axios'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Stock {
    stock: {
        x: number,
        y: number
    }[]
    symbol: string;
}

const DashboardMain = () => {

    const [stockName, setStockName] = useState('BTC')

    const [stockHistory, setStockHistory] = useState(1)

    const listCoins = ['BTC', 'LTC', 'BNB', 'ETH', 'DOGE', 'BNB', 'SHIB', 'SOL', 'LPT', 'XRP']

    const [stock, setStock] = useState<Stock>({ stock: [{ x: 0, y: 0 }], symbol: '' })

    const get1DayStock = async () => {

        try {

            setStock({ stock: [{ x: 0, y: 0 }], symbol: '' })

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}histominute?fsym=${stockName}&tsym=USD&limit=1439&api_key=fa1ddd2aaeb250a7c16e7cbd9b7ccae1cd95f700c4354b015bdc1787ae8a4e59`)

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

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}histohour?fsym=${stockName}&tsym=USD&limit=167&api_key=fa1ddd2aaeb250a7c16e7cbd9b7ccae1cd95f700c4354b015bdc1787ae8a4e59`)

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

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}histohour?fsym=${stockName}&tsym=USD&limit=719&api_key=fa1ddd2aaeb250a7c16e7cbd9b7ccae1cd95f700c4354b015bdc1787ae8a4e59`)

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

    const get60DayStock = async () => {

        setStock({ stock: [{ x: 0, y: 0 }], symbol: '' })

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}histoday?fsym=${stockName}&tsym=USD&limit=59&api_key=fa1ddd2aaeb250a7c16e7cbd9b7ccae1cd95f700c4354b015bdc1787ae8a4e59`)

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

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}histoday?fsym=${stockName}&tsym=USD&limit=364&api_key=fa1ddd2aaeb250a7c16e7cbd9b7ccae1cd95f700c4354b015bdc1787ae8a4e59`)

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
    const get2YearsStock = async () => {

        setStock({ stock: [{ x: 0, y: 0 }], symbol: '' })

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}histoday?fsym=${stockName}&tsym=USD&limit=729&api_key=fa1ddd2aaeb250a7c16e7cbd9b7ccae1cd95f700c4354b015bdc1787ae8a4e59`)

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

        } else if (stockHistory === 60) {

            get60DayStock()

        } else if (stockHistory === 730) {

            get2YearsStock()

        }


    }, [stockName, stockHistory])
    return (
        <div className='pt-16 w-screen px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex flex-col items-center text-slate-200'>
            <ul className='flex lg:border-x lg:border-slate-800 items-center w-full justify-between overflow-x-auto p-5 xl:p-10 gap-10'>
                {listCoins.map(item => (
                    <li onClick={() => {
                        setStock({ stock: [{ x: 0, y: 0 }], symbol: '' })
                        setStockName(item)
                    }} key={item} className={`cursor-pointer border ${stockName === item ? 'border-white text-white' : 'border-slate-800'} px-6 py-1 hover:text-white hover:border-white`}>{item}</li>
                ))}
            </ul>
            <div className='flex w-full flex-col xl:flex-row pt-5 items-start gap-10 lg:border-x lg:border-slate-800 lg:px-5  xl:px-10'>
                <div className='w-full 2xl:w-[70%] h-auto min-h-[19rem] sm:min-h-[26rem] md:min-h-[30rem] xl:min-h-[35rem] 2xl:min-h-[41rem] bg-slate-950 border border-slate-800 text-slate-800'>
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
                            height: '100%',
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
                        <div className='w-full flex items-center justify-center h-auto min-h-[19rem] sm:min-h-[26rem] md:min-h-[30rem] xl:min-h-[35rem] 2xl:min-h-[41rem] animate-pulse bg-slate-900 border border-slate-800'>
                            <div className='text-white flex items-center gap-3'>
                                <div className='bg-none border-2 w-6 h-6 relative rounded-full animate-spin flex items-center justify-center'>
                                    <div className='absolute bg-slate-950 top-0 w-4 h-4 rounded-none'></div>
                                </div>
                                Processing...
                            </div>
                        </div>
                    }
                </div>
                <ul className='flex items-center justify-center xl:flex-col flex-wrap gap-5 lg:gap-10 2xl:gap-12'>
                    <li onClick={() => setStockHistory(1)} className={` w-32 flex justify-center items-center text-xs cursor-pointer lg:text-sm xl:text-base py-1.5 ${stockHistory === 1 ? 'bg-yellow-400 text-white' : 'border bg-transparent text-white'}`}>1DAY</li>
                    <li onClick={() => setStockHistory(7)} className={` w-32 flex justify-center items-center text-xs cursor-pointer lg:text-sm xl:text-base py-1.5 ${stockHistory === 7 ? 'bg-yellow-400 text-white' : 'border bg-transparent text-white'}`}>7DAYS</li>
                    <li onClick={() => setStockHistory(30)} className={` w-32 flex justify-center items-center text-xs cursor-pointer lg:text-sm xl:text-base py-1.5 ${stockHistory === 30 ? 'bg-yellow-400 text-white' : 'border bg-transparent text-white'}`}>30DAYS</li>
                    <li onClick={() => setStockHistory(60)} className={` w-32 flex justify-center items-center text-xs cursor-pointer lg:text-sm xl:text-base py-1.5 ${stockHistory === 60 ? 'bg-yellow-400 text-white' : 'border bg-transparent text-white'}`}>60DAYS</li>
                    <li onClick={() => setStockHistory(365)} className={` w-32 flex justify-center items-center text-xs cursor-pointer lg:text-sm xl:text-base py-1.5 ${stockHistory === 365 ? 'bg-yellow-400 text-white' : 'border bg-transparent text-white'}`}>1YEAR</li>
                    <li onClick={() => setStockHistory(730)} className={` w-32 flex justify-center items-center text-xs cursor-pointer lg:text-sm xl:text-base py-1.5 ${stockHistory === 730 ? 'bg-yellow-400 text-white' : 'border bg-transparent text-white'}`}>2YEARS</li>
                    <Link href={`/trade/${stockName}`} className='bg-green-600 text-white w-32 py-1.5 flex items-center justify-center'>TRADE {stockName}</Link>
                </ul>
            </div>
        </div>
    )
}

export default DashboardMain