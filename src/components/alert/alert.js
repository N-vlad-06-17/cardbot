import React from 'react'
import './alert.css'

function Alert(props) {

    return(
        <div className="alert">
            <h3>Отправьте боту в личные сообщения код : </h3>
            <h2>{ props.tokenVk }</h2>
            <p>Необходимо отправить боту код в личные сообщения для привязки аккаунта к боту и дальнейшего использования</p>
        </div>
    )
}

export default Alert;

