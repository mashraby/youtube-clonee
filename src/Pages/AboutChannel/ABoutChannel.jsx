import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Content from '../../Components/Content/Content';
import { Context } from '../../Context/HamburgerBtn';
import { NavLink } from 'react-router-dom';
import "../AboutChannel/AboutChannel.scss"
import notVideo from "../../Assets/img/not.png"
import Chanel from '../AddChanel/Chanel';
const Aboutchannel = () => {
    const id = useParams()
    const localChannel = JSON.parse(window.localStorage.getItem('channelAbout'))
    const [channelAbout, setChannelAbout] = useState(localChannel || [])
    const { addChannel, setAddChannel } = useContext(Context)
    const { history, setHistory } = useContext(Context)
    const [videoContent, setVideoContent] = useState([])

    const localChannelVideo = JSON.parse(window.localStorage.getItem('videoChannel'))
    const localCommunity = JSON.parse(window.localStorage.getItem('community'))
    const channelCategorySub = JSON.parse(window.localStorage.getItem('subscript'))
    const localChannelInfo = JSON.parse(window.localStorage.getItem('channelInfo'))
    const { themeColor, setThemeColor } = useContext(Context)
    const [channelVideo, setChannelVideo] = useState(localChannelVideo || false)
    const [community, setCommunity] = useState(localCommunity || false)
    const [channelCategory, setChannelCategory] = useState(channelCategorySub || false)
    const [channelAboutTitle, setChannelAboutTitle] = useState(localChannelInfo || false)

    window.localStorage.setItem('videoChannel', JSON.stringify(channelVideo))
    window.localStorage.setItem('community', JSON.stringify(community))
    window.localStorage.setItem('subscript', JSON.stringify(channelCategory))
    window.localStorage.setItem('channelInfo', JSON.stringify(channelAboutTitle))


    useEffect(() => {
        window.localStorage.setItem('videoChannel', JSON.stringify(channelVideo))
    }, [channelVideo]);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
            'X-RapidAPI-Key': '9a1415f26cmshdb16db78cfd4330p155a7cjsn29e5eedb9562'
        }
    };

    //channels statistick
    useEffect(() => {
        fetch(`https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${id.channelId}`, options)
            .then(response => response.json())
            .then(response => setChannelAbout(response))
            .catch(err => console.error(err));
    }, [id]);

    // console.log(channelAbout.items[0].brandingSettings.image.bannerExternalUrl);

    const handleAddChanel = (e) => {
        if (!addChannel.includes(e.target.id)) {
            e.target.textContent = "SUBSCRIBED"
            setAddChannel([...addChannel, e.target.id])
        } else if (addChannel.includes(e.target.id)) {
            e.target.textContent = "SUBSCRIBE"
            setAddChannel(addChannel.filter(i => i != e.target.id))
        }
    }

    // channel video
    const optionsVideo = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
            'X-RapidAPI-Key': '9a1415f26cmshdb16db78cfd4330p155a7cjsn29e5eedb9562'
        }
    };

    useEffect(() => {
        fetch(`https://youtube-v31.p.rapidapi.com/search?channelId=${id.channelId}&part=snippet%2Cid&order=date&maxResults=50`, optionsVideo)
            .then(response => response.json())
            .then(response => setVideoContent(response))
            .catch(err => console.error(err));
    }, [id]);

    const hanldeHistory = (e) => {
        history.unshift(e.target.id)
        window.localStorage.setItem('product', JSON.stringify(history))
    }

    const hanldeVideoChannel = () => {
        setChannelVideo(true)
        setCommunity(false)
        setChannelCategory(false)
        setChannelAboutTitle(false)
    }

    const hanldeCommunity = () => {
        setCommunity(true)
        setChannelVideo(false)
        setChannelCategory(false)
        setChannelAboutTitle(false)
    }

    const handleCategoryChannel = () => {
        setChannelCategory(true)
        setCommunity(false)
        setChannelVideo(false)
        setChannelAboutTitle(false)
    }

    const handleChannelAbout = () => {
        setChannelAboutTitle(true)
        setChannelCategory(false)
        setCommunity(false)
        setChannelVideo(false)
    }

    console.log(channelAbout);
    window.localStorage.setItem('channelAbout', JSON.stringify(channelAbout))
    if (!channelAbout.items) {
        return <Content />
    } else {
        return (
            <div className={themeColor}>
                <img className='add__channel-banner' src={channelAbout?.items[0]?.brandingSettings?.image?.bannerExternalUrl} alt="" />

                <div className='add__channel-hero'>
                    <div className='add__channel-title'>
                        <img className='add__channel-img' width="88" height='88' src={channelAbout?.items[0]?.snippet?.thumbnails?.default?.url} alt="" />

                        <div>
                            <h3 style={themeColor == "dark" ? {color: "white"} : {color: ""}}>{channelAbout?.items[0]?.snippet?.title}</h3>
                            <p style={themeColor == "dark" ? {color: "white"} : {color: ""}}>{channelAbout?.items[0]?.statistics?.subscriberCount} subscribers</p>
                        </div>
                    </div>

                    <div>
                        <button onClick={handleAddChanel} className={addChannel?.includes(`${id?.channelId}/${channelAbout?.items[0]?.snippet?.title}`) ? 'chanelAdd__card-btn addChannelSubscript add__channel-subscript' : "add__channel-subscript chanelAdd__card-btn"} id={`${id?.channelId}/${channelAbout?.items[0]?.snippet?.title}`}>{!addChannel?.includes(id) ? "SUBSCRIBE" : "SUBSCRIBED"}</button>
                    </div>
                </div>

                <div className={`${themeColor} add__channel-btn`}>
                    <button onClick={hanldeVideoChannel} className={channelVideo ? "bg__btn-category" : ""}>VIDEOS</button>
                    <button onClick={hanldeCommunity} className={community ? "bg__btn-category" : ""}>COMMUNITY</button>
                    <button onClick={handleCategoryChannel} className={channelCategory ? "bg__btn-category" : ""}>CHANNELS</button>
                    <button onClick={handleChannelAbout} className={channelAboutTitle ? "bg__btn-category" : ""}>ABOUT</button>
                </div>

                <div className={channelVideo ? `${themeColor} d-block videos add__channel-content` : "d-none"}>
                    {
                        videoContent?.items?.map(i => {
                            const id = `${i.snippet.channelId}/${i.id.videoId}/${i.snippet.title}/${i.snippet.publishedAt}/${i.snippet.publishTime}/${i.snippet.channelTitle}`
                            return <NavLink className="" onClick={hanldeHistory} id={id} key={Math.random()} to={`/${i.snippet.channelId}/${i.id.videoId}/${i.snippet.title}/${i.snippet.publishedAt}/${i.snippet.publishTime}/${i.snippet.channelTitle}`}>
                                <div id={id} className="video add__channel-video">
                                    <div id={id} className="thumbnail">
                                        <p id={id} className="add__channel-category-img">
                                            <img className='add__channel-category-img' id={id} src={i.snippet.thumbnails.default.url}/>
                                        </p>
                                    </div>

                                    <div id={id} className="details">
                                        <div id={id} className="author">
                                            {/* <img id={id} src={i.video.thumbnails[0].url}
                                                alt="" /> */}
                                        </div>
                                        <div id={id} className="title">
                                            <h3 id={id}>
                                                {i.snippet.title}
                                            </h3>
                                            <a id={id} href="">
                                                {i.snippet.channelTitle}
                                            </a>
                                            <span id={id}> {i.snippet.publishedAt} • {i.snippet.liveBroadcastContent} </span>
                                        </div>
                                    </div>

                                </div>
                            </NavLink>
                        })
                    }
                </div>

                <div className={community ? "d-block videos add__channel-content" : "d-none"}>
                    {
                        videoContent?.items?.map(i => {
                            const id = `${i.snippet.channelId}/${i.id.videoId}/${i.snippet.title}/${i.snippet.publishedAt}/${i.snippet.publishTime}/${i.snippet.channelTitle}`
                            return <div className='community-link'>
                                <div style={{display: "flex", alignItems: "center", marginBottom: "10px"}}>
                                    <img  className='add__channel-img community-link-img' width="88" height='88' src={channelAbout?.items[0]?.snippet?.thumbnails?.default?.url} alt="" />

                                    <div>
                                        <span>{i.snippet.channelTitle} {i.snippet.publishTime}</span>
                                        <p>{i.snippet.title}</p>
                                    </div>
                                </div>
                                <NavLink style={{marginLeft: "50px"}} className="add__channel-link" onClick={hanldeHistory} id={id} key={Math.random()} to={`/${i.snippet.channelId}/${i.id.videoId}/${i.snippet.title}/${i.snippet.publishedAt}/${i.snippet.publishTime}/${i.snippet.channelTitle}`}>
                                    <div  style={{backgroundColor: "white", padding:"10px"}}  id={id} className="video add__channel-community">
                                        <div id={id} className=" add__channel-thumbnail">
                                            <p className='add__channel-desc ' id={id}>
                                                <img className='add__channel-desc ' width="210" height="120" id={id} src={i.snippet.thumbnails.default.url} />
                                            </p>
                                        </div>

                                        <div id={id} className="details">
                                            <div id={id} className="author">
                                            </div>
                                            <div id={id} className="title">
                                                <h3 id={id}>
                                                    {i.snippet.title}
                                                </h3>
                                                <a id={id} href="">
                                                    {i.snippet.channelTitle}
                                                </a>
                                                <span id={id}> {i.snippet.publishedAt} • {i.snippet.liveBroadcastContent} </span>
                                                <p style={{color: "black", marginTop: "10px"}}>{i.snippet.description}</p>
                                            </div>

                                            <div>
                                            </div>
                                        </div>

                                    </div>
                                </NavLink>
                            </div>
                        })
                    }
                </div>

                <div className={channelCategory ? "d-block videos channelsAddCategory add__channel-category" : "d-none"}>
                    <Chanel />
                </div>

                <div className={channelAboutTitle ? "channelsAddCategory d-block videos add__channel-category" : "d-none"}>
                    <div style={{display: "flex", alignItems: "flex-start"}}>
                        <div style={{padding: "0 100px", marginBottom: "50px"}}>
                            <h3 className='aboutChannel-heading'>Description</h3>

                            <p style={{marginBottom: "50px"}}>{channelAbout?.items[0]?.brandingSettings?.channel?.description}</p>

                            <hr style={{marginBottom: "50px"}}/>

                            <h3 className='aboutChannel-heading'>Details</h3>
                            <p >
                                <span style={{ marginRight: "30px" }}>Location:</span>
                                <span>
                                    {channelAbout?.items[0]?.brandingSettings?.channel?.country}
                                </span>
                            </p>
                        </div>

                        <div style={{minWidth: "30%", padding: "0px 50px"}}>
                            <h3 className='aboutChannel-heading'>Stats</h3>

                            <hr />

                            <p>
                                Joined  {channelAbout?.items[0]?.snippet?.publishedAt}
                            </p>
                            <hr />

                            <p>
                                {channelAbout?.items[0]?.statistics?.viewCount} views
                            </p>

                            <hr />

                            <p>
                                {channelAbout?.items[0]?.statistics?.subscriberCount} subscriber
                            </p>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default Aboutchannel;
