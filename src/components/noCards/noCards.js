import React from 'react'
import './noCards.css'

function NoCards() {

    return(
        <div className="noCards">
            <hr />
            <h2>У вас нет ни одной команды или карты для бота</h2>
            <p>Нажмите на плюсик в правой части экрана и добавьте свою первую карту или команду</p>
        </div>
    )
}

export default NoCards;