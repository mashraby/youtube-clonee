import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/HamburgerBtn';
import "../Content/ContentUser.scss"
const Content = () => {
    const { uploadModal, setUploadModal } = useContext(Context)
    const { themeColor, setThemeColor } = useContext(Context)
    const [arrUploadSort, setArrUploadSort] = useState([])
    const handleClose = () => {
        setUploadModal(false)
    }

    //Upload

    const inputRef = React.useRef();

    const [source, setSource] = React.useState();
    const [src, setSrc] = useState([])

    useEffect(() => {
        setSrc([...src, source])
    }, [source]);
    console.log(src);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setSource(url);
        console.log(event.target.files);
    };
    const handleChoose = (event) => {

    };

    const srcVideoHref = src.filter(i => i !== undefined ? i : null)
    console.log(srcVideoHref);

    const data = Array.from(new Set(srcVideoHref.map(JSON.stringify))).map(JSON.parse);
    console.log(data);

    const handleUploadVideo = () => {
        inputRef.current.click();
        setUploadModal(false)
    }

    return (
        <div className='upload__content'>

            <div className="VideoInput">
                <input
                    className="VideoInput_input"
                    type="file"
                    onChange={handleFileChange}
                    accept=".mov,.mp4"
                />
                {src.filter(i => i !== undefined ? i : null) && (
                    data?.map(srcVideo => {
                        return <div>
                            <video
                                className="VideoInput_video"
                                width="100%"
                                height={400}
                                controls
                                src={srcVideo}
                            />
                        </div>
                    })
                )}
            </div>

            <div className={uploadModal ? "bg__blur-modal" : ``}></div>
            <div className={`${themeColor} upload__modal`}>
                <div className={uploadModal ? `${themeColor} keyboard d-block` : `keyboard d-none ${themeColor}`}>
                    <div className='user__keyboard-modal-type'>
                        <div className='upload__modal-hero'>
                            <h2>Upload videos</h2>
                            <i onClick={handleClose} id="menu" className={`material-icons humburger__menu-icon ${themeColor}`}>close</i>
                        </div>
                    </div>

                    <div onClick={handleUploadVideo} className='upload__modal-body'>
                        <div className='upload__modal-center'>
                            <div className='upload__modal-icon'>
                                <i className={`material-icons humburger__menu-icon ${themeColor}`}>upload</i>
                            </div>
                            <p>Drag and drop video files to upload</p>
                            <span>Your videos will be private until you publish them.</span>
                        </div>

                        <div className='upload__modal-footer'>
                            <span className='d-block'>
                                By submitting your videos to YouTube, you acknowledge that you agree to YouTube's
                                <a href="https://www.youtube.com/t/terms">Terms of Service</a>
                                and
                                <a href="https://www.youtube.com/howyoutubeworks/policies/community-guidelines/">Community Guidelines.</a>
                            </span>

                            <span className='d-block'>
                                Please be sure not to violate others' copyright or privacy rights.
                                <a href="https://www.youtube.com/howyoutubeworks/policies/copyright/">Learn more</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;
