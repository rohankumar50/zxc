import React from 'react'
import { useEffect, useState } from 'react'
import './coins.css'
import axios from 'axios'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import Loading from '../loading/Loading'

// import Table from './Table';


const Coins = () => {

    // const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=2&sparkline=false'
    // const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=40&page=1&sparkline=false'
    const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&sparkline=false&price_change_percentage=1h%2C24h%2C7d'
    const [coins, setCoins] = useState([])
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);


    const getCoinData = () => {
        axios.get(URL).then((response) => {
            setLoading(false)
            setCoins(
                response.data.map(row => ({
                    key: row.id,
                    _id: row.market_cap_rank,
                    coin: <Link to={`/coins/${row.id}`}>
                        <div className='coin'>
                            <div className='coin_img'>
                                <img src={row.image} alt='coins' /><p>{row.name}</p>
                            </div>
                            <div className='symbol'>
                                <p>{row.symbol.toUpperCase()}</p>
                            </div>
                        </div></Link>,
                    price: <div className='price'><p>&#x20B9;</p>{row.current_price.toLocaleString()}</div>,
                    _1hchange: <div className='price-change'><p>{row.price_change_percentage_1h_in_currency.toFixed(2)}</p><p>%</p></div>,
                    _24hchange: <div className='price-change'><p>{row.price_change_percentage_24h_in_currency.toFixed(2)}</p><p>%</p></div>,
                    _7dchange: <div className='price-change'><p>{row.price_change_percentage_7d_in_currency.toFixed(2)}</p><p>%</p></div>,
                    marketCap: <div className='market_cap'><p>&#x20B9;</p>{row.market_cap.toLocaleString()}</div>
                })))
            setLoading(true)
            setTotalPages(response.data.length)
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getCoinData();
        const interval = setInterval(() => {
            getCoinData()
        }, 15000)
        return () => clearInterval(interval)
    }, [])

    const columns = [
        {
            title: '#',
            dataIndex: '_id'
        },
        {
            title: 'Coin',
            dataIndex: 'coin',
        },
        {
            title: 'Price',
            dataIndex: 'price'
        },
        {
            title: '1h',
            dataIndex: '_1hchange'
        },
        {
            title: '24h',
            dataIndex: '_24hchange'
        },
        {
            title: '7d',
            dataIndex: '_7dchange'
        },
        {
            title: 'Mkt Cap',
            dataIndex: 'marketCap'
        },
    ]

    return (
        <div>
            <div className="container">
                {
                    loading ? (
                        <div className="table">
                            <Table
                                columns={columns}
                                dataSource={coins}
                                pagination={
                                    {
                                        pageSize: 10,
                                        total: totalPages
                                    }
                                }
                            >
                            </Table>
                        </div>
                    ) : <Loading />
                }

            </div>
        </div>
    )
}

export default Coins