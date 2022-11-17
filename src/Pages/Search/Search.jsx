import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/HamburgerBtn';
import { Link } from 'react-router-dom';
import notVideo from "../../Assets/img/not.png"
import "../Search/Search.css"
const Search = () => {
    const { search, setSearch } = useContext(Context)
    const [searchResult, setSearchResult] = useState([])

    const handleClickHome = () => {
        setSearch([])
    }

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
            'X-RapidAPI-Key': 'b58c9764e3mshec61f233fed968ep1958fbjsn9edf982a6081'
        }
    };

    useEffect(() => {

        fetch(`https://youtube-v31.p.rapidapi.com/search?q=${search}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date`, options)
            .then(response => response.json())
            .then(response => setSearchResult(response))
            .catch(err => console.error(err));
    }, [search]);
    console.log(searchResult);
    return (
        <div className='search__video'>
            {
                searchResult?.items?.map(i => {
                    return <Link onClick={handleClickHome} className='search__result-video' key={Math.random()} to={`/${i?.snippet?.channelId}/${i?.id?.videoId}/${i?.snippet?.title}/${i?.snippet?.publishTime}/${i?.snippet?.publishTime}/${i?.snippet?.channelTitle}`}>
                        <div className="video search__videos">
                            <div className=" search__account-img">
                                <img style={{objectFit: "cover"}} className='search__account__img' src={i?.snippet?.thumbnails?.medium?.url || notVideo} alt="" />
                            </div>

                            <div className="details searchs">
                                <div className="title search__titles">
                                    <h3 className='search__video-title'>
                                        {i?.snippet?.title}
                                    </h3>
                                    <span>{i?.snippet?.publishTime} </span>
                                </div>
                                <div className="author search__author">
                                    <img src={i?.snippet?.thumbnails?.default?.url || notVideo}
                                        alt="" />

                                    <span className='search__author-span'>{i?.snippet?.channelTitle} </span>
                                </div>

                                <div>
                                    <span>{i?.snippet?.description}</span>
                                </div>
                            </div>

                        </div>
                    </Link>
                })
            }
        </div>
    );
}

export default Search;
