import React, { useContext } from 'react';
import "../Library/Library.scss"
import { NavLink } from 'react-router-dom';
import history from "../../Assets/img/history.png"
import clock from "../../Assets/img/clock.png"
import playlest from "../../Assets/img/playlist.png"
import likedlight from "../../Assets/img/liked.png"
import { Context } from '../../Context/HamburgerBtn';

const Library = () => {
    const { themeColor, setThemeColor } = useContext(Context)
    const { userAbboutAccount, setUserAbboutAccount } = useContext(Context)
    const { history, setHistory } = useContext(Context)
    const { chanelVideoNext, setChanelVideoNext } = useContext(Context)
    const { addChannel, setAddChannel } = useContext(Context)
    const ids = chanelVideoNext.map(o => o.id)
    const filtered = chanelVideoNext.filter(({ id }, index) => !ids.includes(id, index + 1))

    var uniq = history.map((name) => {
        return { count: 1, name: name }
    })
        .reduce((a, b) => {
            a[b.name] = (a[b.name] || 0) + b.count
            return a
        }, {})

    var sorted = Object.keys(uniq).sort((a, b) => uniq[a] < uniq[b])

    return (
        <div className={`library`}>
            <div className='library__types'>
                <div className='library__category-type'>
                    <NavLink to="/history" className='library__category'>
                        <i id="menu" className={`material-icons humburger__menu-icon ${themeColor}`}>history</i>
                        <h3 className='library__category-heading'>History</h3>
                    </NavLink>

                    <p className='library__category-desc'>Videos you watch will show up here. <NavLink className="library__home-link" to="/">Browse videos</NavLink></p>
                </div>

                <hr />

                <div className='library__category-type'>
                    <NavLink to="/history" className='library__category'>
                        <i id="menu" className={`material-icons humburger__menu-icon ${themeColor}`}>watch_later</i>
                        <h3 className='library__category-heading'>Watch later</h3>
                    </NavLink>

                    <p className='library__category-desc'>
                        Save videos to watch later. Your list shows up right here.
                    </p>
                </div>

                <hr />

                <div className='library__category-type'>
                    <NavLink to="/history" className='library__category'>
                        <i id="menu" className={`material-icons humburger__menu-icon ${themeColor}`}>playlist_play</i>
                        <h3 className='library__category-heading'>Playlists</h3>
                    </NavLink>

                    <p className='library__category-desc'>
                        Playlists you create or save will show up here.
                    </p>
                </div>
                <hr />

                <div className='library__category-liked library__category-type'>
                    <NavLink to="/like" className='library__category'>
                        <i id="menu" className={`material-icons humburger__menu-icon ${themeColor}`}>thumb_up_off_alt</i>
                        <h3 className='library__category-heading '>
                            Liked videos
                            <span className='library__category-likeHeading'>{filtered.length}</span>
                        </h3>
                    </NavLink>

                    <NavLink to="/like" className='library__category-likeDesc'>
                        See All
                    </NavLink>
                </div>
            </div>

            <div className='library__user'>
                <div >
                    <div style={userAbboutAccount.length > 0 ? { backgroundColor: `${userAbboutAccount[userAbboutAccount.length - 1]?.accountBg}` } : userAbboutAccount[0]?.accountBg}
                        className='user__account-icon-switch library__user-account'>
                        {userAbboutAccount.length > 0 ? userAbboutAccount[userAbboutAccount.length - 1]?.userAddName?.split("")[0] : userAbboutAccount[0]?.userAddName?.split("")[0]}
                    </div>
                </div>
                <p className='library__user-name'>
                    <div>
                        <h2 className='user__name'>
                            {userAbboutAccount.length > 0 ? userAbboutAccount[userAbboutAccount.length - 1]?.userAddName : userAbboutAccount[0]?.userAddName}
                        </h2>
                    </div>
                </p>

                <hr className='library__user-linear' />

                <div className='library__user-subscript'>
                    <span>Subscriptions</span>
                    <span>{addChannel.length}</span>
                </div>

                <hr className='library__user-linear' />

                <div className='library__user-subscript'>
                    <span>Uploads</span>
                    <span>0</span>
                </div>

                <hr className='library__user-linear' />
                <div className='library__user-subscript'>
                    <span>Likes</span>
                    <span>{filtered.length}</span>
                </div>

                <hr className='library__user-linear' />
            </div>
        </div>
    );
}


export default Library;
