import React, {useState} from 'react'
import './header.css'
import {NavLink} from "react-router-dom";

function Header(props) {

    let [isOpenMenu, setMenuState] = useState(false);

    let stl = ['menu']
    let stlBurgerMenu = ['burger_menu']
    let stlMobileMenu = ['mobile_menu']
    let stlBackMobileMenu = ['backMobileMenu']

    if(isOpenMenu){
        stl.push('menu_open')
        stlBurgerMenu.push('burger_menu_open')
        stlMobileMenu.push('mobile_menu_open')
        stlBackMobileMenu.push('backMobileMenuOpen')
    }

    let Links_login = (
        <ul className="Links_login">
            <li><NavLink to="/signup">Регистрация</NavLink></li>
            <li><NavLink activeStyle={{color: '#80FFDB'}} className="btn_login" to="/login">Войти</NavLink></li>
        </ul>
    )

    let mobile_nav = (
        <>
            <li><NavLink to="/login">Войти</NavLink></li>
            <li><NavLink to="/signup">Регистрация</NavLink></li>
        </>
    )

    if(localStorage.getItem("token")){
        Links_login = (
            <ul className="Links_login">
                <li><NavLink to="/cabinet/card">{ props.login }</NavLink></li>
                <li><NavLink activeStyle={{color: '#80FFDB'}} className="btn_login" to="/cabinet/card">Кабинет</NavLink></li>
            </ul>
        )

        mobile_nav = (
            <>
                <li><NavLink to="/cabinet/card">Личный кабинет</NavLink></li>
            </>
        )
    }

    return(
            <header>
                <div className="container">
                    <NavLink
                        to="/"
                        className="Logo">
                        <img src="/bot_icon.png" alt=" "/>
                        <span>CardBot</span>
                    </NavLink>
                    <ul className="nav">
                        <li><NavLink exact to="/">Главная</NavLink></li>
                        <li><a href="https://vk.com/card_bot" target="_blank" rel="noreferrer">Бот</a></li>
                        <li><NavLink to="/about">О&nbsp;проекте</NavLink></li>
                    </ul>
                    { Links_login }
                </div>
                <div onTouchStart={()=> setMenuState(isOpenMenu = false)}
                     className={stlBackMobileMenu.join(' ')}
                     onClick={()=> setMenuState(isOpenMenu = !isOpenMenu)}
                >
                </div>
                <div
                    className={stlMobileMenu.join(' ')}>
                    <div
                        onClick={()=> setMenuState(isOpenMenu = !isOpenMenu)}
                        className={stlBurgerMenu.join(' ')}>
                        <div className={stl.join(' ')}></div>
                    </div>
                    <div
                        onClick={()=> setMenuState(isOpenMenu = !isOpenMenu)}
                    >
                        <ul className="mobile_nav">
                            <li><NavLink exact to="/">Главная</NavLink></li>
                            { mobile_nav }
                            <li><NavLink to="/about">О&nbsp;проекте</NavLink></li>
                        </ul>
                        <a className="mobileMenuBtn" href="https://vk.com/card_bot" target="_blank" rel="noreferrer">Ссылка на бота</a>
                    </div>
                </div>
            </header>
    )
}

export default Header;