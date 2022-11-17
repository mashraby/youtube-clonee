import { createContext, useState, useEffect } from "react";

const Context = createContext()

function Provider({children}){
    const localProduct = JSON.parse(window.localStorage.getItem('product'))
    const localSearch = JSON.parse(window.localStorage.getItem('products'))
    const localChannel = JSON.parse(window.localStorage.getItem('addChannel'))
    const localUserToken = JSON.parse(window.localStorage.getItem('themeColor'))
    const localLanguage = JSON.parse(window.localStorage.getItem('language'))
    const localUserAccount = JSON.parse(window.localStorage.getItem('userToken'))
    const localUserAccountEmail = JSON.parse(window.localStorage.getItem('emailFilter'))
    const localUserVideoUpload = JSON.parse(window.localStorage.getItem('upload'))
    const localUserModal = JSON.parse(window.localStorage.getItem('uploadModal'))
    const localUserLike = JSON.parse(window.localStorage.getItem('like'))
    const localUserLikeSort = JSON.parse(window.localStorage.getItem('likeSort'))

    const [userAbboutAccount, setUserAbboutAccount] = useState(localUserAccount || [])
    const [emailFilter, setEmailFilter] = useState(localUserAccountEmail || [])
    let [themeColor, setThemeColor] = useState(localUserToken || "light")
    let [languages, setLanguages] = useState(localLanguage || "uz")
    let [humbergerBtn, setHumbergerBtn] = useState(true)
    let [searchPage, setSearchPage] = useState(true)
    let [uploadModal, setUploadModal] = useState(localUserModal || false)
    let [userVideoUpload, setUserViodeUpload] = useState(localUserVideoUpload || false)
    let [search, setSearch] = useState(localSearch || [])
    let [addChannel, setAddChannel] = useState(localChannel || [])
    let [history, setHistory] = useState(localProduct || [])
    let [likeSort, setLIkeSort] = useState(localUserLikeSort || [])

    const [chanelVideoNext, setChanelVideoNext] = useState(localUserLike || [])

    window.localStorage.setItem('product', JSON.stringify(history))
    window.localStorage.setItem('likeSort', JSON.stringify(likeSort))
    window.localStorage.setItem('addChannel', JSON.stringify(addChannel))
    window.localStorage.setItem('upload', JSON.stringify(userVideoUpload))
    window.localStorage.setItem('uploadModal', JSON.stringify(uploadModal))
    window.localStorage.setItem('like', JSON.stringify(chanelVideoNext))

    useEffect(() => {
        window.localStorage.setItem('userToken', JSON.stringify(userAbboutAccount))
    }, [userAbboutAccount]);

    useEffect(() => {
        window.localStorage.setItem('likeSort', JSON.stringify(likeSort))
    }, [userAbboutAccount]);

    // useEffect(() => {
    //     window.localStorage.setItem('like', JSON.stringify(chanelVideoNext))
    // }, [chanelVideoNext]);

    useEffect(() => {
        window.localStorage.setItem('uploadModal', JSON.stringify(uploadModal))
    }, [uploadModal]);

    useEffect(() => {
        window.localStorage.setItem('upload', JSON.stringify(userVideoUpload))
    }, [userVideoUpload]);
    useEffect(() => {
        window.localStorage.setItem('emailFilter', JSON.stringify(emailFilter))
    }, [emailFilter]);

    useEffect(() => {
        window.localStorage.setItem('themeColor', JSON.stringify(themeColor))
    }, [themeColor]);

    useEffect(() => {
        window.localStorage.setItem('language', JSON.stringify(languages))
    }, [languages]);

    useEffect(() => {
        window.localStorage.setItem('product', JSON.stringify(history))
    }, [history]);

    useEffect(() => {
        window.localStorage.setItem('products', JSON.stringify(search))
    }, [search])

    useEffect(() => {
        window.localStorage.setItem('addChannel', JSON.stringify(addChannel))
    }, [addChannel])

    return(
        <Context.Provider value={{humbergerBtn, setHumbergerBtn, search, setSearch, history, setHistory, searchPage, setSearchPage, themeColor, setThemeColor, addChannel, setAddChannel, themeColor, setThemeColor, languages, setLanguages, userAbboutAccount, setUserAbboutAccount, emailFilter, setEmailFilter, userVideoUpload, setUserViodeUpload, uploadModal, setUploadModal, chanelVideoNext, setChanelVideoNext, likeSort, setLIkeSort}}>
            {children}
        </Context.Provider>
    )
}


export { Context, Provider }