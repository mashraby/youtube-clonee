import React, { useContext, useEffect } from 'react';
import { Context } from '../../Context/HamburgerBtn';
import { Link } from 'react-router-dom';
import "../Like/Like.scss"
const Like = () => {
    const { chanelVideoNext, setChanelVideoNext } = useContext(Context)
    const { themeColor, setThemeColor } = useContext(Context)
    const { likeSort, setLIkeSort } = useContext(Context)

    const ids = chanelVideoNext.map(o => o.id)
    const filtered = chanelVideoNext.filter(({ id }, index) => !ids.includes(id, index + 1))

    const data = Array.from(new Set(chanelVideoNext.map(JSON.stringify))).map(JSON.parse);

    console.log(filtered);

    return (
        <div className='like__body'>
            <div className='like__last'>

            </div>
            <div className='like__videos'>
                <div className=''>
                    {
                       filtered.length > 0 ? filtered?.map((i, index) => {
                            console.log(i);
                            return <Link to={`/${i?.productId}/${i?.id}/${i?.title}/${i?.views}/${i?.publishedTimeText}/${i?.channelName}`} className='search__result-video ' key={Math.random()}>
                                <div className="video like search__videos like__link">
                                    <div className="history__account-img search__account-img like__video">
                                        <p className='like__index'>{index + 1}</p>

                                        <i className={`material-icons ${themeColor}`}>smart_display</i>
                                    </div>

                                    <div className="details searchs">
                                        <div className="search__titles">
                                            <h3 className='like__title'>
                                                {i?.title}
                                            </h3>

                                        </div>
                                        <div className="author search__author">
                                            <span className=''>{i?.channelName}
                                            </span>
                                        </div>

                                    </div>

                                </div>
                            </Link>
                        }) : <h1  style={themeColor == "dark" ? {color: "white", position: "absolute", left: "50%", top: "50%"} : {position: "absolute", left: "50%", top: "50%"}}>Not Like video</h1>
                    }


                </div>
            </div>


        </div>
    );
}

export default Like;
