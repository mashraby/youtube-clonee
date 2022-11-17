import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../../Context/HamburgerBtn';
import logo from "../../Assets/img/logo.png"
import "../Login/Login.css"
const Login = () => {

    const { userAbboutAccount, setUserAbboutAccount } = useContext(Context)
    const [userEmail, setUserEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [desabled, setDesabled] = useState("disabled")
    const { emailFilter, setEmailFilter } = useContext(Context)
    const { themeColor, setThemeColor } = useContext(Context)
    const runNum = Math.floor(Math.random() * 20)
    console.log(runNum);
    const handleSubmit = (e) => {

        const newAddAccount = {
            userAddEmail: userEmail,
            userAddName: userName,
            accountBg: runNum == 1 ? "red" : runNum == 2 ? "bluee" : runNum == 3 ? "black" : runNum == 4 ? "green" : runNum == 5 ? "yellow" : runNum == 6 ? "brown" : runNum == 7 ? "deepskyblue" : runNum == 8 ? "magenta" : runNum == 9 ? "chartreuse" : runNum == 10 ? "purple" : runNum == 11 ? "fuchsia" : runNum ==12 ? "lime" : runNum == 13 ? "olive" : runNum == 14 ? "navy" : runNum == 15 ? "teal" : runNum == 16 ? "darkblue" : runNum == 17 ? "darkgray" : runNum == 18 ? "darkorange" : runNum == 19 ? "firebrick" : "maroon"
        }

        setUserAbboutAccount([...userAbboutAccount, newAddAccount])
        setEmailFilter([...emailFilter, newAddAccount.userAddEmail])
    }

    useEffect(() => {
        if((userEmail.length == 0) || (userName.length == 0)){
            setDesabled("toldir")
        }else if(emailFilter.includes(userEmail)) {
            setDesabled("userBeforeregister")
        }else {
            setDesabled("open")
        }
    }, [userName, userEmail]);

    return (
        <div className={`${themeColor} forms__login`}>
            <div className='forms'>
                <div className="background">
                    
                </div>
                <form className='logon__form'>

                    <label className="login__label" htmlFor="email">Email</label>
                    <input onChange={e => setUserEmail(e.target.value)} type="email" className='form__input' id="email" placeholder='Enter your email' />

                    <label className="login__label" htmlFor="name">Name and Surname</label>
                    <input onChange={e => {setUserName(e.target.value)}} type="text" className='form__input' id="name" placeholder='Name and Surname' />

                    <div className={desabled}>
                        <NavLink onClick={handleSubmit} to="/" type='button' className={   `${desabled} login__send`}>{desabled == "toldir" ? "Ma'lumotni to'ldiring" : desabled == "userBeforeregister" ? "Avval ro'yxatdan o'tgansiz" : "Log in"}</NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
