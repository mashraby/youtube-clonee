import { Navigate, Outlet } from "react-router-dom"
import React, { useContext } from 'react';
import { Context } from "../Context/HamburgerBtn";
import Search from "../Pages/Search/Search";


const Private = () => {
    const { search, setSearch } = useContext(Context)
    if(search.length > 0){
        return <Search/>
    }else{
        return <Outlet/>
    }
}

export default Private;
