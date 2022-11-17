import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/HamburgerBtn';
import youTUbeLanguage from '../Localization/Language';
import "../Sidebar/Navbar.css"
import shortsIcon from "../../Assets/img/shorts.png"
import { NavLink } from 'react-router-dom';
import musicLight from '../../Assets/img/music-light.png';
import musicDark from '../../Assets/img/music-dark.png';
import live from '../../Assets/img/live-dark.png';
import liveLight from '../../Assets/img/live-light.png';
const Navbar = () => {
    const { humbergerBtn } = useContext(Context)
    const { search, setSearch } = useContext(Context)
    const { addChannel, setAddChannel } = useContext(Context)
    const { themeColor, setThemeColor } = useContext(Context)
    const { languages, setLanguages } = useContext(Context)
    const [chanelNames, setChanelName] = useState([])

    const [addHeaderChannelInfo, setAddHeaderChannelInfo] = useState([])


    const handleClickHome = () => {
        setSearch([])
    }

    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    //         'X-RapidAPI-Key': '7306d73337msh7fad6a0fa751d98p10c355jsna8f006a0cd81'
    //     }
    // };

    // useEffect(() => {
    //     fetch(`https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${addChannel}`, options)
    //         .then(response => response.json())
    //         .then(response => setChanelName(response))
    //         .catch(err => console.error(err));
    // }, [addChannel]);

    const youTubeNavbarLang = youTUbeLanguage.navbar[languages]

    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    //         'X-RapidAPI-Key': '7306d73337msh7fad6a0fa751d98p10c355jsna8f006a0cd81'
    //     }
    // };

    // useEffect(() => {
    //     addChannel?.map(i => {
    //         fetch(`https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${i}`, options)
    //             .then(response => response.json())
    //             .then(response => setAddHeaderChannelInfo([response]))
    //             .catch(err => console.error(err));
    //     })
    // }, [addChannel]);

    // const data = Array.from(new Set(addHeaderChannelInfo.map(JSON.stringify))).map(JSON.parse);

    // console.log(addChannel);

    // window.localStorage.getItem("sortData")
    // window.localStorage.setItem("sortData",JSON.stringify(data))

    // useEffect(() => {
    //     window.localStorage.setItem("sortData",JSON.stringify(data))
    // }, [data]);
    return (
        <div className={humbergerBtn ? `side-bar ${themeColor}` : `side-bar-short ${themeColor}`}>
            <div className={`${themeColor} navbar`}>
                <NavLink style={({ isActive }) =>
                    (isActive ? { color: 'red' } : { color: 'blue' })} onClick={handleClickHome} to="/" className="nav-link">
                    <div className='nav__links'>
                        <i className={`material-icons ${themeColor}`}>home</i>
                        <span id='link__name' className={humbergerBtn ? "d-none" : "d-block"}>
                            {youTubeNavbarLang?.homeLang}
                        </span>
                    </div>
                    <span className={humbergerBtn ? "d-block" : "d-none"}>
                        {youTubeNavbarLang?.homeLang}
                    </span>
                </NavLink>

                <NavLink to="/explore" className="nav-link">
                    <div className='nav__links'>
                        <i className={`material-icons ${themeColor}`}>
                            explore
                        </i>
                        <span id='link__name' className={humbergerBtn ? "d-none" : "d-block"}>
                            {youTubeNavbarLang?.exploreLang}
                        </span>
                    </div>
                    <span className={humbergerBtn ? "d-block" : "d-none"}>
                        {youTubeNavbarLang?.exploreLang}
                    </span>
                </NavLink>

                <NavLink to="/hello/aaa" className="nav-link">
                    <div className='nav__links'>
                        <img className='nav__links-shorts' width="30" src={shortsIcon} alt="" />
                        <span id='link__name' className={humbergerBtn ? "d-none" : "d-block"}>Shorts</span>
                    </div>
                    <span className={humbergerBtn ? "d-block" : "d-none"}>Shorts</span>
                </NavLink>

                <NavLink to="/hello/bbb" className={humbergerBtn ? "d-block nav-link" : "d-none nav-link"}>
                    <i className={`material-icons ${themeColor}`}>subscriptions</i>
                    <span className={humbergerBtn ? "d-block ss" : "d-none ss"}>
                        {youTubeNavbarLang?.subscriptionsLang}
                    </span>
                </NavLink>

                <hr className={humbergerBtn ? "d-block" : "d-none"} />

                <NavLink to="/library" className="nav-link">
                    <div className='nav__links'>
                        <i className={`material-icons ${themeColor}`}>video_library</i>
                        <span id='link__name' className={humbergerBtn ? "d-none" : "d-block"}>
                            {youTubeNavbarLang?.libraryLang}
                        </span>
                    </div>
                    <span className={humbergerBtn ? "d-block" : "d-none"}>
                        {youTubeNavbarLang?.libraryLang}
                    </span>
                </NavLink>

                <NavLink to="/history" className="nav-link">
                    <div className='nav__links'>
                        <i className={`material-icons ${themeColor}`}>history</i>
                        <span id='link__name' className={humbergerBtn ? "d-none" : "d-block"}>
                            {youTubeNavbarLang?.historyLang}
                        </span>
                    </div>
                    <span className={humbergerBtn ? "d-block" : "d-none"}>
                        {youTubeNavbarLang?.historyLang}
                    </span>
                </NavLink>

                <NavLink to="/like" className={humbergerBtn ? "d-block nav-link" : "d-none nav-link"} >
                    <i className={`material-icons ${themeColor}`}>thumb_up</i>
                    <span >
                        {youTubeNavbarLang?.likedVideosLang}
                    </span>
                </NavLink>

                <hr className={humbergerBtn ? "d-block" : "d-none"} />

                <h3 className={humbergerBtn ? "d-block subscription" : "d-none subscription"} >
                    {youTubeNavbarLang?.subscribeNameLang}
                </h3>

                {
                    addChannel?.map(i => {

                        return <NavLink to={`/${i.split("/")[0]}/${i.split("/")[0]}`} className={humbergerBtn ? "d-block nav-link" : "d-none nav-link"} >
                            <i style={{color: "red"}} className={`material-icons ${themeColor}`}>bookmark_added</i>
                            <span >
                                {i.split("/")[1]}
                            </span>
                        </NavLink>
                    })
                }


                <NavLink to="/chanel" className={humbergerBtn ? `${themeColor} d-block nav-link` : `${themeColor} d-none nav-link`} >
                    <i className={`material-icons `}>add_circle_outline</i>
                    <span >
                        {youTubeNavbarLang?.addChannelLang}
                    </span>
                </NavLink>

                <hr className={humbergerBtn ? "d-block" : "d-none"} />

                <h3 className={humbergerBtn ? "d-block subscription" : "d-none subscription"} >
                    {youTubeNavbarLang?.youTubeInfolang}
                </h3>

                <NavLink to="/hello/fff" className={humbergerBtn ? "d-block nav-link" : "d-none nav-link"} >
                    <i className={`material-icons ${themeColor}`}>sports_esports</i>
                    <span >
                        {youTubeNavbarLang?.gamingLang}
                    </span>
                </NavLink>

                <NavLink to="/hello/ccc" className={humbergerBtn ? "d-block nav-link" : "d-none nav-link"} >
                    <img className='link__icon' width="24" height="24" src={themeColor == "dark" ? liveLight : live} />
                    <span >
                        {youTubeNavbarLang?.liveLang}
                    </span>
                </NavLink>

                <NavLink to="/hello/qqq" className={humbergerBtn ? "d-block nav-link" : "d-none nav-link"} >
                    <img className='link__icon' width="24" height="24" src={themeColor == "dark" ? musicLight : musicDark} />
                    <span >
                        {youTubeNavbarLang?.musicLang}
                    </span>
                </NavLink>

                <NavLink to="/hello/ll" className={humbergerBtn ? "d-block nav-link" : "d-none nav-link"} >
                    <i className={`material-icons ${themeColor}`}>emoji_events</i>

                    <span >
                        {youTubeNavbarLang?.sportLang}
                    </span>
                </NavLink>

                <hr className={humbergerBtn ? "d-block" : "d-none"} />

                <span className={humbergerBtn ? "creator d-block" : "creator d-none"}>
                    <span>{youTubeNavbarLang?.creatorLang}: -- Tohirjon Doniyorov</span>
                    <span>{youTubeNavbarLang?.createTime}</span>
                    <a className='creator__link' href='https://www.linkedin.com/in/tohir-doniyorov-1b7540231'>{youTubeNavbarLang?.ceratorLinkedIn}</a>
                    <a className='creator__link' href='https://github.com/tohird03/'>
                        {youTubeNavbarLang?.creatorGitHub}
                    </a>
                </span>
            </div>
        </div>

    );
}

export default Navbar;
