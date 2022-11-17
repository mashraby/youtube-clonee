import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../Context/HamburgerBtn';
import { Link } from 'react-router-dom';
import notVideo from "../../Assets/img/not.png"
import "../History/History.css"
const History = () => {
    const [historyVideo, setHistoryVideo] = useState([])
    const { history, setHistory } = useContext(Context)
    const { themeColor, setThemeColor } = useContext(Context)

    var uniq = history.map((name) => {
        return { count: 1, name: name }
    })
        .reduce((a, b) => {
            a[b.name] = (a[b.name] || 0) + b.count
            return a
        }, {})

    var sorted = Object.keys(uniq).sort((a, b) => uniq[a] < uniq[b])

    const handleHistoryDelete = () => {
        setHistory([])
        window.localStorage.setItem('product', JSON.stringify(history))
    }

    return (<div className='history__body'>
        <div className={`you-tube-history ${themeColor}`}>
            <p className='history__desc'>Watch history</p>
            {
                sorted?.map(i => {
                    console.log(i.split("/"));

                    return <Link className='history__link search__result-video' key={Math.random()} to={`/${i}`}>
                        <div className="video history search__videos">
                            <div className="history__account-img search__account-img">
                                <i style={{ width: "100px" }} className={`material-icons history__icon ${themeColor}`}>smart_display</i>
                            </div>

                            <div className="details searchs">
                                <div className="title search__titles">
                                    <h3 className='search__video-title'>
                                        {i.split("/")[2]}
                                    </h3>

                                </div>
                                <div className="author search__author">
                                    {/* <img src={i?.snippet?.thumbnails?.high.url}
                                            alt="" /> */}
                                    <span className='search__author-span'>{i.split("/")[5]} </span>
                                </div>

                                <div>
                                    <span className='search__author-span'>{i.split("/")[4]} </span> •
                                    <span className='search__author-span'>{i.split("/")[3]} </span>
                                </div>
                            </div>

                        </div>
                    </Link>
                })
            }


        </div>

        <div className={`history__setting ${themeColor}`}>
            <input placeholder='Search watch history' className='history__input' type="text" />
            <div onClick={handleHistoryDelete} className='histor__delete history__delete__all'>
                <i className={`material-icons ${themeColor}`}>delete_forever</i>
                <p>CLEAR ALL WATCH HISTORY</p>
            </div>
            <a className='histor__delete' target="_blank" href="https://myactivity.google.com/product/youtube?hl=en&utm_medium=web&utm_source=youtube">
                <i className={`material-icons ${themeColor}`}>settings</i>
                <p>Manage all history</p>
            </a>
            <a className='history__links' target="_blank" href="https://myactivity.google.com/product/youtube?hl=en&utm_medium=web&utm_source=youtube">
                Watch and search history
            </a>
            <a className='history__links' target="_blank" href="https://myactivity.google.com/page?hl=en&utm_medium=web&utm_source=youtube&page=youtube_comments">
                Comments
            </a>
            <a className='history__links' target="_blank" href="https://myactivity.google.com/page?hl=en&utm_medium=web&utm_source=youtube&page=youtube_comments">
                Live chat
            </a>
        </div>
    </div>);
}

export default History;
