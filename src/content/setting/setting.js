import React, {useState} from 'react'
import './setting.css'

function Setting(props) {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const submitHandler = async (event) =>{
        event.preventDefault()

        let formData = new FormData();
        formData.append('oldPassword',oldPassword );
        formData.append('newPassword', newPassword);
        formData.append('token', localStorage.getItem("token"))

        const res = await fetch('',{
            method: 'POST',
            body: formData
        });
        const data = await res.json();

        props.onCheckToken();
         switch (data.message){
             case "Error":
                 props.setMessageForPass('Старый пароль не совпадает')
                 break;
             case "Success":
                 props.setMessageForPass('')
                 break;
             default:
                 break;
         }
    }

    return(
            <div className="setting">
                <small>Логин</small>
                <h2>{props.login}</h2>
                <small>Почта</small>
                <h2>{props.email}</h2>
                <form onSubmit={submitHandler}>
                    <small>Сменить пароль</small>
                    <input
                        name="oldPassword"
                        required
                        minLength="5"
                        placeholder="Введите старый пароль..."
                        id="oldPassword"
                        type="password"
                        className="oldPassword"
                        onChange={event => setOldPassword(event.target.value)}
                    />
                    <small className="errorClass">{props.MessageForNewPass}</small>
                    <input
                        name="NewPassword"
                        placeholder="Введите новый пароль..."
                        id="newPassword"
                        type="text"
                        required
                        autoComplete="off"
                        minLength="5"
                        className='newPassword'
                        onChange={event => setNewPassword(event.target.value)}
                    />
                    <button>Изменить пароль</button>
                </form>
                <small>* после смены пароля будет произведен выход из аккаунта на всех устройствах</small>
            </div>
    )
}

export default Setting;