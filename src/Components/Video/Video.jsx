import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import "../Video/Video.css"
import notVideo from "../../Assets/img/not.png"
import { Context } from '../../Context/HamburgerBtn';
import Search from '../../Pages/Search/Search';
const Video = () => {
    const x = useParams()
    const [video, setVideo] = useState([])
    const [coments, setComents] = useState([])
    const [chanelVideo, setChanelVideo] = useState([])

    const [searchResultInfo, setSearchResultInfo] = useState([])
    const [searchResultInfoFilter, setSearchResultInfoFilter] = useState([])
    const { history, setHistory } = useContext(Context)
    const { chanelVideoNext, setChanelVideoNext } = useContext(Context)
    const { search, setSearch } = useContext(Context)
    const [commentNext, setCommentNext] = useState("")
    const { themeColor, setThemeColor } = useContext(Context)

    const [dislike, setDislike] = useState(false)
    const [shareModal, setShareModal] = useState(false)
    const [copy, setCopy] = useState(false)

    // const localUserLike = JSON.parse(window.localStorage.getItem('likeBtn'))
    const [like, setLike] = useState(false)
    // window.localStorage.setItem('likeBtn', JSON.stringify(like))
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
            'X-RapidAPI-Key': 'b58c9764e3mshec61f233fed968ep1958fbjsn9edf982a6081'
        }
    };

    useEffect(() => {

        fetch(`https://youtube-search-and-download.p.rapidapi.com/video/comments?id=${x.id}`, options)
            .then(response => response.json())
            .then(response => setComents(response))
            .catch(err => console.error(err));
    }, [x]);
    // ///
    useEffect(() => {
        fetch(`https://youtube-search-and-download.p.rapidapi.com/channel?id=${x.productId}&next=4qmFsgKFARIYVUNpVEdLQTlXMEcwVEw4SG03VWZfdTlBGjpFZ1oyYVdSbGIzTVlBeUFBTUFFNEFlb0RGa05uUVZORFoycHdNazVFTkRWT2VVcHNhMmR2VFdjJTNEmgIsYnJvd3NlLWZlZWRVQ2lUR0tBOVcwRzBUTDhIbTdVZl91OUF2aWRlb3MxMDI%253D&sort=n`, options)
            .then(response => response.json())
            .then(response => setChanelVideo(response))
            .catch(err => console.error(err));
    }, [x]);

    // ///////////////////// video
    const optionsVideo = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
            'X-RapidAPI-Key': 'b58c9764e3mshec61f233fed968ep1958fbjsn9edf982a6081'
        }
    };

    useEffect(() => {
        fetch('https://youtube-search-and-download.p.rapidapi.com/trending?type=C%20g%2C%20n%2C%20mo&hl=en&gl=US', optionsVideo)
            .then(response => response.json())
            .then(response => setVideo(response))
            .catch(err => console.error(err));
    }, []);

    //view
    const optionsVideoInfo = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
            'X-RapidAPI-Key': 'b58c9764e3mshec61f233fed968ep1958fbjsn9edf982a6081'
        }
    };

    useEffect(() => {
        fetch(`https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${x.id}`, optionsVideoInfo)
            .then(response => response.json())
            .then(response => setSearchResultInfo(response))
            .catch(err => console.error(err));
    }, []);


    const hanldeLike = () => {
        setLike(!like)
        setDislike(false)


    }

    const hadleDislike = () => {
        setDislike(!dislike)
        setLike(false)

    }

    useEffect(() => {
        if (like) {
            chanelVideoNext.push(x)
            window.localStorage.setItem('like', JSON.stringify(chanelVideoNext))
        } else {
            // const foundElement = chanelVideoNext.findIndex(i => i.id == x.id)
            // chanelVideoNext.splice(foundElement, 1)
            // window.localStorage.setItem('like', JSON.stringify(chanelVideoNext))
        }
    }, [like]);

    const handleReply = () => {
        setShareModal(!shareModal)
    }

    function handleClick(e) {

        if (e.target.className == "copy__btn") {
            console.log(e);
            navigator.clipboard.writeText(e.target.id);
            setCopy(true)
        }

        setTimeout(() => {
            setCopy(false)
        }, 1000);
    }

    console.log(searchResultInfo);

    const handleSaveWatchLatter = () => {

    }

    return (
        <div className='info'>
            <div id='video__content' className='info__content'>
                <iframe className='info__video' src={`https://www.youtube.com/embed/${x.id}?autoplay=1&mute=1`}>
                </iframe>
                <h3 className='info__video-title'>{x.title}</h3>

                <div className='video__subscribe'>
                    <div>
                        <span className='info__video-about'> {searchResultInfo?.items?.map(i => i?.statistics?.viewCount)[0]} views • {x?.publishedTimeText} </span>
                    </div>

                    {/* //share modal */}
                    <div className={shareModal ? "bg__blur-modal" : ``}></div>
                    <div className={shareModal ? `share__modal` : "share__modal d-none"}>
                        <div className='share__header'>
                            <p>Share</p>
                            <i onClick={handleReply} className={`material-icons mic ${themeColor}`}>
                                close
                            </i>
                        </div>
                        <div className='share__caruse'>
                            {/* <a className='prev__btn' href='#1'>
                                <i className={`material-icons mic ${themeColor}`}>
                                arrow_back_ios_new
                                </i>
                            </a>
                            <a id='1' target="_blank" href='https://www.facebook.com'>
                                <div className='share__link'>f</div>
                                <span>Facebook</span>
                            </a>
                            <a target="_blank" href='https://www.facebook.com'>
                                <div className='share__link'>f</div>
                                <span>Facebook</span>
                            </a>
                            <a target="_blank" href='https://www.facebook.com'>
                                <div className='share__link'>f</div>
                                <span>Facebook</span>
                            </a>
                            <a target="_blank" href='https://www.facebook.com'>
                                <div className='share__link'>f</div>
                                <span>Facebook</span>
                            </a>
                            <a target="_blank" href='https://www.facebook.com'>
                                <div className='share__link'>f</div>
                                <span>Facebook</span>
                            </a>
                            <a target="_blank" href='https://www.facebook.com'>
                                <div className='share__link'>f</div>
                                <span>Facebook</span>
                            </a>
                            <a target="_blank" href='https://www.facebook.com'>
                                <div className='share__link'>f</div>
                                <span>Facebook</span>
                            </a>
                            <a target="_blank" href='https://www.facebook.com'>
                                <div className='share__link'>f</div>
                                <span>Facebook</span>
                            </a>
                            <a target="_blank" href='https://www.facebook.com'>
                                <div className='share__link'>f</div>
                                <span>Facebook</span>
                            </a>
                            <a target="_blank" href='https://www.facebook.com'>
                                <div className='share__link'>f</div>
                                <span>Facebook</span>
                            </a>
                            <a target="_blank" href='https://www.facebook.com'>
                                <div className='share__link'>f</div>
                                <span>Facebook</span>
                            </a>
                            <a target="_blank" href='https://www.facebook.com'>
                                <div className='share__link'>f</div>
                                <span>Facebook</span>
                            </a>
                            <a target="_blank" href='https://www.facebook.com'>
                                <div className='share__link'>f</div>
                                <span>Facebook</span>
                            </a>
                            <a target="_blank" href='https://www.facebook.com'>
                                <div className='share__link'>f</div>
                                <span>Facebook</span>
                            </a>
                            <a target="_blank" href='https://www.facebook.com'>
                                <div className='share__link'>f</div>
                                <span>Facebook</span>
                            </a>
                            <a target="_blank" href='https://www.facebook.com'>
                                <div className='share__link'>f</div>
                                <span>Facebook</span>
                            </a>
                            <a id='2' target="_blank" href='https://www.facebook.com'>
                                <div className='share__link'>f</div>
                                <span>Facebook</span>
                            </a>
                            <a className='next__btn' href='#2'>
                                <i className={`material-icons mic ${themeColor}`}>
                                    arrow_forward_ios
                                </i>
                            </a> */}
                        </div>

                        <div onClick={handleClick} className='copy'>
                            <p className={copy ? "bg__blue" : "bg__transparrent"}>{`https://youtu.be/${x.id}`}</p>
                            <button id={`https://youtu.be/${x.id}`} className='copy__btn'>{copy ? "COPYED" : "COPY"}</button>
                        </div>
                    </div>

                    <div className={`video-content__btn ${themeColor}`}>
                        <button className={`like__button ${themeColor}`} onClick={hanldeLike}>
                            <i className={`material-icons mic ${themeColor}`}>
                                {
                                    like ? "thumb_up" : "thumb_up_off_alt"
                                }


                            </i>

                            {like ? +searchResultInfo?.items?.map(i => i?.statistics?.likeCount)[0] + 1 : searchResultInfo?.items?.map(i => i?.statistics?.likeCount)[0]}
                        </button>
                        <button className={`like__button ${themeColor}`} onClick={hadleDislike}>
                            <i className={`material-icons mic ${themeColor}`}>
                                {dislike ? "thumb_down" : "thumb_down_off_alt"}
                            </i>
                            Dislike
                        </button>
                        <button className={`like__button ${themeColor}`} onClick={handleReply}>
                            <i className={`material-icons mic ${themeColor}`}>reply</i>
                            Share
                        </button>
                        <button className={`like__button ${themeColor}`}>
                            <i className={`material-icons mic ${themeColor}`}>content_cut</i>
                            Clip
                        </button>

                        <button onClick={handleSaveWatchLatter} className={`${themeColor} like__button`}>
                            <i className={`material-icons mic ${themeColor}`}>playlist_add</i>
                            Clip
                        </button>
                    </div>


                </div>

                <hr />

                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <NavLink to={`/${x.productId}/${x.productId}`}>
                                <img style={{ marginTop: "10px" }} className='channel__account-img' src={searchResultInfo?.items?.map(i => i.snippet.thumbnails.default.url)[0]} alt="" />
                            </NavLink>

                            <div>
                                <p style={themeColor == "dark" ? { marginTop: "15px", color: "white" } : { marginTop: "15px" }}>{searchResultInfo?.items?.map(i => i?.snippet?.channelTitle)[0]}</p>
                                <span>{searchResultInfo?.items?.map(i => i?.statistics?.likeCount)[0]} likes</span>

                                <p style={themeColor == "dark" ? { marginTop: "20px", width: "80%", color: "white" } : { marginTop: "20px", width: "80%" }}>{searchResultInfo?.items?.map(i => i?.snippet?.description)[0]}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className='hr' />

                {
                    coments.comments?.map(i => {
                        return < div key={Math.random()} className="info__desc-details">
                            <div className="author">
                                <img src={i?.authorThumbnails[0].url}
                                    alt="" />
                            </div>
                            <div>
                                <div className="info__desc-title">
                                    <h3 className='info__desc-heading'>
                                        {i?.authorName}
                                    </h3>
                                    <span>{i?.publishedTimeText} </span>
                                </div>

                                <div>
                                    {i?.text}
                                </div>
                            </div>
                        </div>

                    })
                }

            </div>
            <div className={`${themeColor} chanel-video`}>
                {
                    video?.contents?.map(i => {
                        return <Link className='chanel__category-video' key={Math.random()} to={`/${i.video.channelId}/${i.video.videoId}/${i.video.title}/${i.video.viewCountText}/${i.video.publishedTimeText}/${i.video.channelName}`}>
                            <div className="chanel__video">
                                <div className="chanel__category-img">
                                    <img className='chanel__imgs' width="168" height="90" src={i.video.thumbnails.map(i => {
                                        return i.url
                                    }) || notVideo} alt="" />
                                </div>

                                <div className="details">
                                    <div className="title">
                                        <h3 style={themeColor == "dark" ? { color: "white" } : { color: "" }}>
                                            {i.video.title}
                                        </h3>
                                        <a href="">
                                            {i.video.channelName}
                                        </a>
                                        <span> {i.video.viewCountText} • {i.video.publishedTimeText} </span>
                                    </div>
                                </div>

                            </div>
                        </Link>

                    })
                }

            </div>
        </div >
    );
}

export default Video;
