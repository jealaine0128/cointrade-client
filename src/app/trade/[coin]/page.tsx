/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import AllTrades from '@/components/Trading/AllTrades'
import CoinDetails from '@/components/Trading/CoinDetails'
import SymbolExChange from '@/components/Trading/SymbolExChange'
import TradeButtons from '@/components/Trading/TradeButtons'
import UserHeader from '@/components/dashboard/UserHeader'
import { fetchPendingTrades } from '@/lib/styles/api/fetchTrades'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props {
    params: {
        coin: string
    }
}

export interface Stock {
    stock: {
        x: number,
        y: number
    }[]
    symbol: string;
}

export interface AllCoins {
    name: string
    full_name: string
    image: string
    coin: string
}

export interface Trades {
    id: number
    user_id: number
    using_coin: string
    target_coin: string
    amount: string
    total: string
    trade_type: string
    created_at: string
    updated_at: string
    price: string
}

const Page = ({ params }: Props) => {

    const [user, setUser] = useState({ name: '', token: '', is_admin: false, is_approved: false })

    const router = useRouter()

    const { coin } = params

    const [stock, setStock] = useState<Stock>({ stock: [{ x: 0, y: 0 }], symbol: '' })

    const [buyWith, setBuyWith] = useState('USDT')

    const [isLoading, setIsLoading] = useState(false)

    const [history, setHistory] = useState('7D')

    const [allCoins, setAllCoins] = useState<AllCoins[]>([])

    const [buyWithSearchQuery, setBuyWithSearchQuery] = useState('')

    const [coinSearchQuery, setCoinSearchQuery] = useState('')

    const filterBuyWithAllCoins = allCoins.map((item) => ({
        ...item, full_name: `${coin.toUpperCase()} / ${item.coin}`
    }))

    const filterAllCoins = allCoins.map((item) => ({
        ...item, full_name: `${item.coin} / ${buyWith.toUpperCase()}`
    }))

    const filterCoins = filterAllCoins.filter((item) => item.coin.toUpperCase().includes(coinSearchQuery.toUpperCase()) && item.coin !== buyWith.toUpperCase()).slice(0, 50)

    const filterBuyWithCoins = filterBuyWithAllCoins.filter((item) => item.coin.toUpperCase().includes(buyWithSearchQuery.toUpperCase()) && item.coin !== coin.toUpperCase()).slice(0, 50)

    const [buyPrice, setBuyPrice] = useState(0)

    const [buyType, setBuyType] = useState('limit')

    const [coinPrice, setCoinPrice] = useState(0)

    const [buyForm, setBuyForm] = useState({
        amount: '',
        total: ''
    })

    const [price, setPrice] = useState('')

    const [sellForm, setSellForm] = useState({
        amount: '',
        total: ''
    })

    const [historyList, setHistoryList] = useState(['5M', '15M', '1H', '3H', '6H', '12H', '1D', '7D', '30D', '60D', '90D', '1Y', '2Y'])

    const [coinDetails, setCoinDetails] = useState<{
        data: {
            PRICE: string
            CHANGE24HOUR: string
            HIGHDAY: string
            OPENDAY: string
            MKTCAP: string
            LOWDAY: string
        }
        image: string;
    }>({ data: { PRICE: '', CHANGE24HOUR: '', HIGHDAY: '', OPENDAY: '', LOWDAY: '', MKTCAP: '' }, image: '' })

    const [allTrades, setAllTrades] = useState<Trades[]>([])
    const [myTrades, setMyTrades] = useState<Trades[]>([])

    const fetchBuy = async () => {

        try {

            const { data } = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${buyWith}&tsyms=USD&api_key=fa1ddd2aaeb250a7c16e7cbd9b7ccae1cd95f700c4354b015bdc1787ae8a4e59`)
            setBuyPrice(data.USD)

        } catch (error) {
            console.error(error);

        }

    }

    const getStockHistory = async () => {
        let limit;
        let type;

        switch (history) {
            case '5M':
                limit = 4
                type = 'histominute'
                break;
            case '15M':
                limit = 14
                type = 'histominute'
                break;
            case '1H':
                limit = 59
                type = 'histominute'
                break;
            case '3H':
                limit = 179
                type = 'histominute'
                break;
            case '6H':
                limit = 359
                type = 'histominute'
            case '12H':
                limit = 719
                type = 'histominute'
                break;
            case '1D':
                limit = 23
                type = 'histohour'
                break;
            case '7D':
                limit = 167
                type = 'histohour'
                break;
            case '30D':
                limit = 720
                type = 'histohour'
                break;
            case '60D':
                limit = 59
                type = 'histoday'
                break;
            case '90D':
                limit = 89
                type = 'histoday'
                break;
            case '1Y':
                limit = 364
                type = 'histoday'
                break;
            case '2Y':
                limit = 729
                type = 'histoday'
                break;
            default:
                limit = 167
                type = 'histohour'
                break;
        }

        try {

            setStock({ stock: [{ x: 0, y: 0 }], symbol: '' })

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${type}?fsym=${coin.toUpperCase()}&tsym=USD&limit=${limit}&api_key=fa1ddd2aaeb250a7c16e7cbd9b7ccae1cd95f700c4354b015bdc1787ae8a4e59`)

            const formatData = data.Data.Data.map((item: any) => ({
                x: item.time * 1000,
                y: [item.open, item.high, item.low, item.close]
            }))

            const stockData: Stock = {
                stock: formatData,
                symbol: coin.toUpperCase()
            }

            setStock(stockData)

        } catch (error) {

            console.error(error);

        }
    }

    const getCoinDetails = async () => {

        try {

            const { data } = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coin}&tsyms=USD&api_key=fa1ddd2aaeb250a7c16e7cbd9b7ccae1cd95f700c4354b015bdc1787ae8a4e59`)

            const coinDetails: any = Object.values(data.DISPLAY)

            const coinPriceData: any = Object.values(data.RAW)

            setCoinPrice(coinPriceData[0].USD.PRICE)

            const coinData = {
                data: coinDetails[0].USD,
                image: `https://www.cryptocompare.com${coinDetails[0].USD.IMAGEURL}`,
            }

            if (coinData.data.CHANGE24HOUR) {

                setCoinDetails(coinData)
            } else {

                alert(`Coin ${coin} is dead.`)

            }

        } catch (error) {

            console.error(error);

        }
    }

    const fetchMarketTrades = async () => {

        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/all_trades`)

            if (data) {

                setAllTrades(data)

            }

        } catch (error) {

            console.log(error);

        }
    }

    const fetchMyTrades = async () => {

        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/trades`, {
                headers: {
                    Authorization: user.token
                }
            })

            console.log(status);


            if (data) {

                setMyTrades(data)
            }
        } catch (error: any) {

            if (error.request.status === 401) {
                alert('Session expired please login.')
                localStorage.clear()
                router.push('/login')
            }

        }
    }

    const fetchAllCoins = async () => {

        try {

            const { data } = await axios.get('https://min-api.cryptocompare.com/data/all/coinlist?api_key=fa1ddd2aaeb250a7c16e7cbd9b7ccae1cd95f700c4354b015bdc1787ae8a4e59')

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

        getCoinDetails()

        fetchMarketTrades()

        const allCoins = localStorage.getItem('coins')

        if (allCoins) {

            setAllCoins(JSON.parse(allCoins))

        } else {

            fetchAllCoins()

        }

        if (!user.token) {

            const user = localStorage.getItem('user')

            if (user) {

                setUser(JSON.parse(user))

            } else {

                router.push('/login')

            }

        }

        fetchPendingTrades()

    }, [])

    useEffect(() => {

        if (user.token) {

            fetchMyTrades()

        }

    }, [user])

    useEffect(() => {

        getStockHistory()

    }, [history])

    useEffect(() => {

        fetchBuy()

        localStorage.setItem('buyWith', buyWith)

        if (buyWith === coin.toUpperCase()) {

            setBuyWith('USDT')

        }

    }, [buyWith])

    useEffect(() => {

        setBuyForm(prevForm => ({ ...prevForm, total: String(Number(price) * Number(prevForm.amount)) }))
        setSellForm(prevForm => ({ ...prevForm, total: String(Number(price) * Number(prevForm.amount)) }))

    }, [price])

    useEffect(() => {

        setPrice(String(coinPrice / buyPrice))


    }, [buyPrice, coinPrice, buyType])

    const buyMarket = async (e: any) => {

        
        e.preventDefault()

        if (!buyForm.amount || !buyForm.total || !price) return alert('Missing value fill up the form corrrectly.')

        try {

            fetchPendingTrades()

            setIsLoading(true)

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/trades`, {
                using_coin: buyWith,
                target_coin: coin.toUpperCase(),
                amount: Number(buyForm.amount),
                price: Number(price),
                trade_type: 'buy'
            }, {
                headers: {
                    Authorization: user.token
                }
            })

            if (data) {

                setIsLoading(false)
                fetchMyTrades()
                alert('Success')
                setBuyForm({ amount: '', total: '' })

            }


        } catch (error: any) {

            setIsLoading(false)

            if (error.request.status === 401) {
                alert('Session expired please login.')
                localStorage.clear()
                router.push('/login')
            }

        }

    }

    const sellMarket = async (e: any) => {

        e.preventDefault()

        if (!sellForm.amount || !sellForm.total || !price) return alert('Missing value fill up the form corrrectly.')

        try {

            fetchPendingTrades()

            setIsLoading(true)

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/trades`, {
                using_coin: buyWith,
                target_coin: coin.toUpperCase(),
                amount: Number(sellForm.amount),
                trade_type: 'sell',
                price: Number(price)
            }, {
                headers: {
                    Authorization: user.token
                }
            })

            if (data) {
                setIsLoading(false)
                fetchMyTrades()
                alert('Success')
                setSellForm({ amount: '', total: '' })
            }


        } catch (error: any) {

            alert('insufficient funds')

            setIsLoading(false)

            if (error.request.status === 401) {
                alert('Session expired please login.')
                localStorage.clear()
                router.push('/login')
            }

        }

    }

    const buyLimit = async (e: any) => {

        e.preventDefault()

        const { amount, total } = buyForm

        if (!amount || !total || !price) return alert('Missing value fill up the form corrrectly.')

        try {

            fetchPendingTrades()

            setIsLoading(true)

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1//limit_trades`, {
                using_coin: buyWith,
                target_coin: coin.toUpperCase(),
                amount, price,
                trade_type: 'buy',
            }, {
                headers: {
                    Authorization: user.token
                }
            })

            if (data) {
                setIsLoading(false)
                alert('Success')
                setBuyForm({ amount: '', total: '' })
            }

        } catch (error: any) {

            alert('insufficient funds')
            
            setIsLoading(false)

            if (error.request.status === 401) {
                alert('Session expired please login.')
                localStorage.clear()
                router.push('/login')
            }

        }

    }

    const sellLimit = async (e: any) => {

        e.preventDefault()

        fetchPendingTrades()

        const { amount, total } = sellForm

        if (!amount || !total || !price) return alert('Missing value fill up the form corrrectly.')

        try {

            setIsLoading(true)

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1//limit_trades`, {
                using_coin: buyWith,
                target_coin: coin.toUpperCase(),
                amount, price,
                trade_type: 'sell',
            }, {
                headers: {
                    Authorization: user.token
                }
            })

            if (data) {
                setIsLoading(false)
                alert('Success')
                setSellForm({ amount: '', total: '' })
            }

        } catch (error: any) {

            setIsLoading(false)

            if (error.request.status === 401) {
                alert('Session expired please login.')
                localStorage.clear()
                router.push('/login')
            }

        }

    }

    return (
        <>
            <UserHeader user={user} />

            <div className='text-slate-200 pt-16 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex flex-col w-screen'>

                <CoinDetails coin={coin} coinDetails={coinDetails} />

                <div className='flex w-full flex-col 2xl:flex-row lg:px-5 xl:px-10 py-5 lg:border-x lg:border-slate-800 gap-5 2xl:gap-10'>

                    <div className='flex w-full flex-col gap-4'>
                        <div className=' w-full h-auto min-h-[15rem] sm:min-h-[20rem] md:min-h-[28rem] lg:min-h-[35rem] 2xl:min-h-[36rem] xl:min-h-[38rem] text-slate-900 border border-slate-800'>
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
                                <div className='w-full flex items-center justify-center h-[15rem] sm:h-[25rem] md:h-[28rem] lg:h-[35rem] xl:h-[38rem] 2xl:h-[36rem] animate-pulse bg-slate-900 border border-slate-800'>
                                    <div className='text-white flex items-center gap-3'>
                                        <div className='bg-none border-2 w-6 h-6 relative rounded-full animate-spin flex items-center justify-center'>
                                            <div className='absolute bg-slate-950 top-0 w-4 h-4 rounded-none'></div>
                                        </div>
                                        Processing...
                                    </div>
                                </div>
                            }
                        </div>

                        {user.token && user.is_approved ? < TradeButtons buyLimit={buyLimit} sellLimit={sellLimit} isLoading={isLoading} buyMarket={buyMarket} sellMarket={sellMarket} coin={coin} buyWith={buyWith} buyType={buyType} setBuyType={setBuyType} setPrice={setPrice} price={price} sellForm={sellForm}
                            setSellForm={setSellForm} buyForm={buyForm} setBuyForm={setBuyForm} /> : <div className='h-full w-full flex items-center justify-center'>Your account status is pending you can't trade.</div>}

                    </div>

                    <div className='w-full 2xl:w-[60%] flex flex-col'>

                        <ul className='flex items-center w-full gap-3 text-sm justify-between pb-5 mb-5 border-b border-slate-800 text-slate-500'>
                            {historyList.map((item) => (
                                <li key={item} className={`cursor-pointer hover:text-white ${history === item && 'text-white font-bold'}`} onClick={() => setHistory(item)}>{item}</li>
                            ))}
                        </ul>

                        <SymbolExChange allCoins={allCoins} filterCoins={filterCoins} buyWith={buyWith}
                            coin={coin} setBuyWith={setBuyWith} buyWithSearchQuery={buyWithSearchQuery}
                            setBuyWithSearchQuery={setBuyWithSearchQuery} filterBuyWithCoins={filterBuyWithCoins}
                            coinSearchQuery={coinSearchQuery} setCoinSearchQuery={setCoinSearchQuery} />

                        <AllTrades allTrades={allTrades} myTrades={myTrades} />

                    </div>
                </div>

            </div>
        </>
    )
}

export default Page
