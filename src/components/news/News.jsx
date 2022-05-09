import React from 'react'
import './news.css'
import { BsCircleFill } from 'react-icons/bs'
const News = () => {
    return (
        <div id='news'>
            <div className="container">
                <div className="newsbox">
                    <div className="trending">
                        <p>Trending Today</p>
                    </div>
                    <h3>Bitcoin on social media.</h3>
                    <p>Bitcoin was mentioned in 471,365 out of 2,317,513 social media posts on Twitter and Reddit on Apr 27, 2022. 238,404 unique individuals are talking about Bitcoin and it is ranked #1 in most mentions and activity from collected posts.</p>
                    <BsCircleFill className='dots' />
                    <BsCircleFill className='dots' />
                    <BsCircleFill className='dots' />
                </div>
            </div>
        </div>
    )
}

export default News