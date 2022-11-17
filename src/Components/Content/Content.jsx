import React, { useState, useEffect, useContext } from 'react';
import "../Content/Content.css"
import notVideo from "../../Assets/img/not.png"
import { NavLink, useParams } from 'react-router-dom';
import { Context } from '../../Context/HamburgerBtn';
import Search from '../../Pages/Search/Search';
const Content = () => {
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
        fetch('https://youtube-search-and-download.p.rapidapi.com/trending?type=C%20g%2C%20n%2C%20mo&hl=en&gl=US', options)
            .then(response => response.json())
            .then(response => setVideo(response))
            .catch(err => console.error(err));
    }, []);

    const hanldeHistory = (e) => {
        history.unshift(e.target.id)
        window.localStorage.setItem('product', JSON.stringify(history))
    }

    return (
        <>
            <div className="hhh">
                <button className='trends'>Music</button>
                <button className='trends'>Music</button>
                <button className='trends'>Music</button>
                <button className='trends'>Music</button>
                <button className='trends'>Music</button>
                <button className='trends'>Music</button>
                <button className='trends'>Music</button>
                <button className='trends'>Music</button>
                <button className='trends'>Music</button>
            </div>
            <div className="videos">

                {
                    video?.contents?.map(i => {
                        const id = `${i.video.channelId}/${i.video.videoId}/${i.video.title}/${i.video.viewCountText}/${i.video.publishedTimeText}/${i.video.channelName}`
                        return <NavLink onClick={hanldeHistory} id={id} key={Math.random()} to={`/${i.video.channelId}/${i.video.videoId}/${i.video.title}/${i.video.viewCountText}/${i.video.publishedTimeText}/${i.video.channelName}`}>
                            <div id={id} className="video">
                                <div id={id} className="thumbnail">
                                    <p id={id}>
                                        <img id={id} src={i.video.thumbnails.map(i => {
                                            return i.url
                                        }) || notVideo} alt="" />
                                    </p>
                                </div>

                                <div id={id} className="details">
                                    <div id={id} className="author">
                                        <img id={id} src={i.video.thumbnails[0].url}
                                            alt="" />
                                    </div>
                                    <div id={id} className="title">
                                        <h3 id={id}>
                                            {i.video.title}
                                        </h3>
                                        <a id={id} href="">
                                            {i.video.channelName}
                                        </a>
                                        <span id={id}> {i.video.viewCountText} • {i.video.publishedTimeText} </span>
                                    </div>
                                </div>

                            </div>
                        </NavLink>

                    })
                }

                {/* https://www.youtube.com/watch?v=zpNZ6GxLlDI */}
            </div>


        </>
    );
}

export default Content;
