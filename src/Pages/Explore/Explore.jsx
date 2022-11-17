import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "../Explore/Explore.scss"
import notVideo from "../../Assets/img/not.png"
import trend from "../../Assets/img/trend1.png"
import muzic from "../../Assets/img/music-dark.png"
import live from "../../Assets/img/trend2.png"
import gameng from "../../Assets/img/game.png"
import news from "../../Assets/img/news.png"
import sports from "../../Assets/img/sports.png"
import learning from "../../Assets/img/learning.png"
import fashion from "../../Assets/img/fashion.png"
import { Context } from '../../Context/HamburgerBtn';
const Explore = () => {
    const { themeColor, setThemeColor } = useContext(Context)
    const [trendVideo, setTrendVideo] = useState("n")
    const handleClick = (e) => {
        setTrendVideo(e.target.textContent);
    }

    const [video, setVideo] = useState([])
    const { search, setSearch } = useContext(Context)
    const { searchPage, setSearchPage } = useContext(Context)
    const { history, setHistory } = useContext(Context)
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
            'X-RapidAPI-Key': 'b58c9764e3mshec61f233fed968ep1958fbjsn9edf982a6081'
        }
    };

    useEffect(() => {
        fetch(`https://youtube-search-and-download.p.rapidapi.com/trending?type=${trendVideo}&hl=en&gl=US`, options)
            .then(response => response.json())
            .then(response => setVideo(response))
            .catch(err => console.error(err));
    }, [trendVideo]);

    const hanldeHistory = (e) => {
        history.unshift(e.target.id)
        window.localStorage.setItem('product', JSON.stringify(history))
    }

    return (
        <div className={`explore ${themeColor}`}>
            <div onClick={e => handleClick(e)} className={`explore__category ${themeColor}`}>
                <div className='explore__card'>
                    <img className="explore__card-img" src={trend} alt="" width="32" height="32" />
                    <h3 className='explore__card-heading'>Trending</h3>
                </div>
                <div className='explore__card'>
                    <i style={{fontSize: "40px"}} className={`material-icons ${themeColor}`}>music_note</i>
                    <h3 className='explore__card-heading'>Muzic</h3>
                </div>
                <div className='explore__card'>
                    <img className="explore__card-img" src={live} alt="" width="32" height="32" />
                    <h3 className='explore__card-heading'>Live</h3>
                </div>
                <div className='explore__card'>
                    <img className="explore__card-img" src={gameng} alt="" width="32" height="32" />
                    <h3 className='explore__card-heading'>Gameng</h3>
                </div>
                <div className='explore__card'>
                    <img className="explore__card-img" src={news} alt="" width="32" height="32" />
                    <h3 className='explore__card-heading'>News</h3>
                </div>
                <div className='explore__card'>
                    <img className="explore__card-img" src={sports} alt="" width="32" height="32" />
                    <h3 className='explore__card-heading'>Sports</h3>
                </div>
                <div className='explore__card'>
                    <img className="explore__card-img" src={learning} alt="" width="32" height="32" />
                    <h3 className='explore__card-heading'>Learning</h3>
                </div>
                <div className='explore__card'>
                    <img className="explore__card-img" src={fashion} alt="" width="32" height="32" />
                    <h3 className='explore__card-heading'>Fashion & Beauty</h3>
                </div>
            </div>

            <div style={{ marginTop: "30px" }} className="videos explore__content">

                {
                    video?.contents?.map(i => {
                        console.log(i);
                        const id = `${i.video.channelId}/${i.video.videoId}/${i.video.title}/${i.video.viewCountText}/${i.video.publishedTimeText}/${i.video.channelName}`
                        return <NavLink className={`explore__links`} onClick={hanldeHistory} id={id} key={Math.random()} to={`/${i.video.channelId}/${i.video.videoId}/${i.video.title}/${i.video.viewCountText}/${i.video.publishedTimeText}/${i.video.channelName}`}>
                            <div style={{ display: "flex" }} id={id} className={`video explore__video ${themeColor}`}>
                                <div id={id} className="thumbnail explore__img">
                                    <p style={{ marginRight: "20px" }} id={id}>
                                        <img style={{ marginRight: "20px" }} id={id} src={i.video.thumbnails.map(i => {
                                            return i.url
                                        }) || notVideo} alt="" />
                                    </p>
                                </div>

                                <div id={id} className={`${themeColor}`}>
                                    <div id={id} className="title esplore__heading">
                                        <h3 className={themeColor} style={themeColor ? { color: "white", fontSize: "20px" } : { color: "black", fontSize: "20px" }} id={id}>
                                            {i.video.title}
                                        </h3>
                                        <div style={{ display: "flex", alignItems: "center" }} >
                                            <a style={themeColor ? { color: "white", fontSize: "18px", marginRight: "10px" } : { color: "black", fontSize: "18px", marginRight: "10px" }} id={id} href="">
                                                {i.video.channelName}
                                            </a>
                                            <span id={id}> {i.video.viewCountText} • {i.video.publishedTimeText} </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </NavLink>

                    })
                }

                {/* https://www.youtube.com/watch?v=zpNZ6GxLlDI */}
            </div>
        </div>
    );
}

export default Explore;
