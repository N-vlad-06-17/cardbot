import React from 'react'
import './HowItDo.css'

function HowItDo() {
    return(
            <div className="how_it_do">
                <div className="howItDoText">Как это работает?</div>
                <div className="container">
                    <div className="section">
                        <div className="sectionItem">
                            <h2>Переходи по ссылке</h2>
                            <h3>к боту Вконтакте</h3>
                            <a href="https://vk.com/card_bot" target="_blank" rel="noreferrer"><img src="logo_vk.svg" alt="vk"/></a>
                        </div>
                        <div className="sectionItem">
                            <h2>Пиши боту</h2>
                            <h3>названия нужных карт</h3>
                            <img src="item2.svg" alt="Write to bot"/>
                        </div>
                        <div className="sectionItem">
                            <h2>Получай скидочные карты</h2>
                            <h3>и экономь в магазинах</h3>
                            <img src="item3.svg" alt="Get card"/>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default HowItDo;