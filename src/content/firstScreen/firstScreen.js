import React from 'react'
import './firstScreen.css'
import MainImg from "../../components/mainImg/mainImg"
import {NavLink} from "react-router-dom";

function FirstScreen() {
    return(
            <div className="first_screen">
                <div className="container">
                    <div className="main_text">
                        <h1>
                            Скидочные карты всегда под рукой
                        </h1>
                        <h3>
                            Бот Вконтакте, предоставляющий более 50 скидочных карт!
                        </h3>
                        <NavLink className="mainLinkLogin" to="/login">Войти</NavLink>
                        <a className="mainLinkVkBot" target="_blank" href="https://vk.com/card_bot" rel="noreferrer">Ссылка на бота</a>
                    </div>
                    <div className="main_img">
                        <div className="circle"></div>
                        <MainImg />
                    </div>
                </div>
            </div>
    )
}

export default FirstScreen;

