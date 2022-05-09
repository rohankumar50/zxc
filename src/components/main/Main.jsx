import React from 'react'
import Coins from '../coins/Coins'
import News from '../news/News'
import Trending from '../trendingCoin/Trending'
const Main = () => {
    return (
        <div id='main'>
            <News />
            <Trending />
            <Coins />
        </div>
    )
}

export default Main