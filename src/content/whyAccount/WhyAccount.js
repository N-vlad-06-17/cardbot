import React from 'react'
import './WhyAccount.css'

function WhyAccount() {
    return(
            <div className="whyAccount">
                <div className="container">
                    <div className="whyAccountText">Зачем заводить аккаунт на сайте?</div>
                    <div className="opportunities">
                        <div className="opportunitiesItem">
                            <h2>Возможности</h2>
                            <p>Общаться с ботом</p>
                            <p>Получать скидочные карты</p>
                            <p>Добавить боту свою карту</p>
                            <p>Добавить боту свои команды</p>
                        </div>
                        <div className="opportunitiesItem">
                            <h3>Без&nbsp;аккаунта</h3>
                            <img src="Success.svg" alt="ok"/>
                            <img src="Success.svg" alt="ok"/>
                            <img src="Error.svg" alt="error"/>
                            <img src="Error.svg" alt="error"/>
                        </div>
                        <div className="opportunitiesItem">
                            <h3>С&nbsp;аккаунтом</h3>
                            <img src="Success.svg" alt="ok"/>
                            <img src="Success.svg" alt="ok"/>
                            <img src="Success.svg" alt="ok"/>
                            <img src="Success.svg" alt="ok"/>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default WhyAccount;