import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/HamburgerBtn';
import youTUbeLanguage from '../Localization/Language';
import "../ChannelNavbar/ChannelNavbar.scss"
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
    const { userAbboutAccount, setUserAbboutAccount } = useContext(Context)
    const { userVideoUpload, setUserViodeUpload } = useContext(Context)
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
    //             .then(response => setAddHeaderChannelInfo([response, ...addHeaderChannelInfo]))
    //             .catch(err => console.error(err));
    //     })
    // }, [addChannel]);

    const handleChanelHome = () => {
        setUserViodeUpload(false)
    }

    const data = Array.from(new Set(addHeaderChannelInfo.map(JSON.stringify))).map(JSON.parse);

    window.localStorage.getItem("sortData")
    window.localStorage.setItem("sortData", JSON.stringify(data))

    useEffect(() => {
        window.localStorage.setItem("sortData", JSON.stringify(data))
    }, [data]);
    return (
        <div className={humbergerBtn ? `side-bar upload__bar ${themeColor}` : `side-bar-short upload__bar ${themeColor}`}>

            <div className='upload__navbar'>
                <NavLink onClick={handleChanelHome} to="/">
                    <div style={userAbboutAccount.length > 0 ? { backgroundColor: `${userAbboutAccount[userAbboutAccount.length - 1]?.accountBg}` } : userAbboutAccount[0]?.accountBg}
                        className={humbergerBtn ? `user__account-icon-switch  upload__accountName  library__user-account` : `user__account-icon-switch library__user-account upload__accountNameLittle`}>
                        {userAbboutAccount.length > 0 ? userAbboutAccount[userAbboutAccount.length - 1]?.userAddName?.split("")[0] : userAbboutAccount[0]?.userAddName?.split("")[0]}
                    </div>
                </NavLink>

                <div className={humbergerBtn ? "d-block upload__name" : "d-none"}>
                    <h2 className='user__name'>
                        Your channel
                    </h2>
                    <span className='upload__account-fullName'>
                        {userAbboutAccount.length > 0 ? userAbboutAccount[userAbboutAccount.length - 1]?.userAddName : userAbboutAccount[0]?.userAddName}
                    </span>
                </div>
            </div>

            <hr className={humbergerBtn ? "d-block" : "d-none"} />

            <div className={`${themeColor} upload__navLeft navbar`}>

                <NavLink style={({ isActive }) =>
                    (isActive ? { color: 'red' } : { color: 'blue' })} onClick={handleClickHome} to="/dashboard" className="nav-link">
                    <div className='nav__links'>
                        <i className={`material-icons ${themeColor}`}>dashboard</i>
                    </div>
                    <span className={humbergerBtn ? "d-block" : "d-none"}>
                        Dashboard
                    </span>
                </NavLink>

                <NavLink to="/channelvideo" className="nav-link">
                    <div className='nav__links'>
                        <i className={`material-icons ${themeColor}`}>
                            video_library
                        </i>
                    </div>
                    <span className={humbergerBtn ? "d-block" : "d-none"}>
                        Content
                    </span>
                </NavLink>

                <NavLink to="/comments" className="nav-link">
                    <div className='nav__links'>
                        <i className={`material-icons ${themeColor}`}>
                            message
                        </i>
                    </div>
                    <span className={humbergerBtn ? "d-block" : "d-none"}>
                        Comments
                    </span>
                </NavLink>

                <NavLink to="/title" className="nav-link">
                    <div className='nav__links'>
                        <i className={`material-icons ${themeColor}`}>subtitles</i>
                    </div>
                    <span className={humbergerBtn ? "d-block" : "d-none"}>
                        Subtitles
                    </span>
                </NavLink>

                <NavLink to="/copyright" className="nav-link">
                    <div className='nav__links'>
                        <i className={`material-icons ${themeColor}`}>copyright</i>
                    </div>
                    <span className={humbergerBtn ? "d-block" : "d-none"}>
                        Copyright
                    </span>
                </NavLink>

                <NavLink to="/money" className="nav-link">
                    <div className='nav__links'>
                        <i className={`material-icons ${themeColor}`}>attach_money</i>
                    </div>
                    <span className={humbergerBtn ? "d-block" : "d-none"}>
                        Monetization
                    </span>
                </NavLink>

                <NavLink to="/music" className="nav-link">
                    <div className='nav__links'>
                        <i className={`material-icons ${themeColor}`}>library_music</i>
                    </div>
                    <span className={humbergerBtn ? "d-block" : "d-none"}>
                        Audio library
                    </span>
                </NavLink>
                {
                    data?.map(i => {
                        return <NavLink to="/hjcbsa" className={humbergerBtn ? "d-block nav-link" : "d-none nav-link"} >

                            <span >Browse channels</span>
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

                <a className={humbergerBtn ? "d-block nav-link" : "d-none nav-link"} >
                    <i className={`material-icons ${themeColor}`}>sports_esports</i>
                    <span >
                        {youTubeNavbarLang?.gamingLang}
                    </span>
                </a>

                <a className={humbergerBtn ? "d-block nav-link" : "d-none nav-link"} >
                    <img className='link__icon' width="24" height="24" src={themeColor == "dark" ? liveLight : live} />
                    <span >
                        {youTubeNavbarLang?.liveLang}
                    </span>
                </a>

                <a className={humbergerBtn ? "d-block nav-link" : "d-none nav-link"} >
                    <img className='link__icon' width="24" height="24" src={themeColor == "dark" ? musicLight : musicDark} />
                    <span >
                        {youTubeNavbarLang?.musicLang}
                    </span>
                </a>

                <a className={humbergerBtn ? "d-block nav-link" : "d-none nav-link"} >
                    <i className={`material-icons ${themeColor}`}>emoji_events</i>

                    <span >
                        {youTubeNavbarLang?.sportLang}
                    </span>
                </a>

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
