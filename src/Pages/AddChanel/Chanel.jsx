import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../../Context/HamburgerBtn';
import "../AddChanel/Chanel.scss"
const Chanel = () => {
    const [chanel, setChanel] = useState([])
    const [chanelFilter, setChanelFilter] = useState([])
    const { addChannel, setAddChannel } = useContext(Context)
    const { themeColor, setThemeColor } = useContext(Context)
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
            'X-RapidAPI-Key': '9a1415f26cmshdb16db78cfd4330p155a7cjsn29e5eedb9562'
        }
    };

    useEffect(() => {
        fetch('https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=7ghhRHRP6t4&part=id%2Csnippet&type=video&maxResults=50', options)
            .then(response => response.json())
            .then(response => setChanel(response))
            .catch(err => console.error(err));
    }, []);


    useEffect(() => {
        setChanelFilter(chanel?.items?.filter(i => i.snippet))
    }, [chanel]);
    const handleAddChanel = (e) => {
        console.log(e.target.textContent);
        if (!addChannel.includes(e.target.id)) {
            e.target.textContent = "SUBSCRIBED"
            setAddChannel([...addChannel, e.target.id])
        }else if(addChannel.includes(e.target.id)) {
            e.target.textContent = "SUBSCRIBE"
            setAddChannel(addChannel.filter(i => i != e.target.id))
        }
    }
    // console.log(addChannel);
    return (
        <div className={`themeColor chanelAdd`}>
            {
                chanelFilter?.map(i => {
                    return <div className='chanelAdd__card'>
                        <NavLink to={`id/${i.snippet.channelId}`} className='chanelAdd__link'>
                            <img className='chanelAdd__card-img' width={"103"} height="103" src={i?.snippet?.thumbnails?.standard?.url || i?.snippet?.thumbnails?.default.url} alt="" />
                            <p style={themeColor == "dark" ? {color: "white"} : {color: "black"}} className='channel__title'>{i.snippet.channelTitle}</p>
                        </NavLink>
                        <button onClick={handleAddChanel} className={addChannel.includes(`${i.snippet.channelId}/${i.snippet.channelTitle}`) ? 'chanelAdd__card-btn addChannelSubscript' : "chanelAdd__card-btn"} id={`${i.snippet.channelId}/${i.snippet.channelTitle}`}>{!addChannel.includes(i.snippet.channelId) ? "SUBSCRIBE" : "SUBSCRIBED"}</button>
                    </div>
                })
            }

        </div>
    );
}

export default Chanel;
