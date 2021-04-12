import React, {useReducer} from 'react'
import './Login.css'
import {NavLink} from "react-router-dom";
import {Redirect} from "react-router-dom";

const initialState = {
    login: {
        text: "",
        messageError: '',
        errorClass: ''
    },
    password: {
        text: "",
        messageError: '',
        errorClass: ''
    },
    stateVerify: "disabled",
    redirect: false
};

function reducer(state, action) {
    switch (action.type) {
        case 'inputLogin':
            return {
                ...state,
                login: {
                    text: action.payload,
                    messageError: state.login.messageError,
                    errorClass: state.login.errorClass
                }
            };
        case 'setErrorLogin':
            return {
                ...state,
                login: {
                    text: state.login.text,
                    messageError: action.payload.message,
                    errorClass: action.payload.errorClass
                }
            };
        case 'inputPassword':
            return {
                ...state,
                password: {
                    text: action.payload,
                    messageError: state.password.messageError,
                    errorClass: state.password.errorClass
                }
            };
        case 'setErrorPassword':
            return {
                ...state,
                password: {
                    text: state.password.text,
                    messageError: action.payload.message,
                    errorClass: action.payload.errorClass
                }
            };
        case 'setVerify':
            return {
                ...state,
                stateVerify: action.payload
            };
        case 'setRedirect':
            return {
                ...state,
                redirect: true
            };
        default:
            throw new Error();
    }
}

function Login(props) {

    const [state, dispatch] = useReducer(reducer, initialState);

    const inputLogin = (event) => {
        const data = event.target.value.replace(/[^0-9а-яА-Яa-zA-Z_\-\[\]]/g, "" )

        dispatch({type: 'inputLogin', payload: data})

        if(event.target.value.length < 5){
            dispatch({type: 'setErrorLogin', payload: {
                    message: "Логин должен содержать более 5 символов",
                    errorClass: "errorClass"
                }})
            dispatch({type: 'setVerify', payload: 'disabled'})
        }else{
            dispatch({type: 'setErrorLogin', payload: ""})
            if(state.password.errorClass === undefined){

                dispatch({type: 'setVerify', payload: ' '})
            }
        }
    }

    const inputPassword = (event) => {
        dispatch({type: 'inputPassword', payload: event.target.value})

        if(event.target.value.length < 5){
            dispatch({type: 'setErrorPassword', payload: {
                    message: "Пароль должен содержать больше 5 знаков",
                    errorClass: "errorClass"
                }})
            dispatch({type: 'setVerify', payload: 'disabled'})
        }else{
            dispatch({type: 'setErrorPassword', payload: ""})

            if(state.login.errorClass === undefined){

                dispatch({type: 'setVerify', payload: ' '})
            }
        }
    }

    const submitHandler = async (event) =>{
        event.preventDefault()

        let formData = new FormData();
        formData.append('login', state.login.text);
        formData.append('password', state.password.text);

        const res = await fetch('https://cardbotapi.ru//API/auth',{
            method: 'POST',
            body: formData
        });

        const data = await res.json();

        switch (data.message){
            case "User not found":
                dispatch({type: 'setErrorLogin', payload: {
                        message: "Неверный логин или пароль",
                        errorClass: undefined
                    }})
                dispatch({type: 'setErrorPassword', payload: {
                        message: "",
                        errorClass: undefined
                    }})

                break;
            case "User found":

                props.onLogin(data.token)
                dispatch({type: 'setRedirect'})
                break;
            default:
                break;
        }
    }
    return(
        <>
            { state.redirect ? <Redirect to="/cabinet/card" /> : null }
            { localStorage.getItem("token") !== null ? <Redirect to="/cabinet/card" /> : null }

            <div className="login">
                <form onSubmit={submitHandler}>
                    <h2>Авторизация</h2>
                    <label htmlFor="login">Логин</label>
                    <input
                        id="login"
                        placeholder="Введите логин..."
                        name="login"
                        type="text"
                        autoComplete="off"
                        value={state.login.text}
                        className={state.login.errorClass}
                        onChange={event => inputLogin(event)}
                    />
                    <small>{ state.login.messageError }</small>
                    <label htmlFor="password">Пароль</label>
                    <input
                        name="password"
                        placeholder="Введите пароль..."
                        id="password"
                        type="password"
                        className={state.password.errorClass}
                        value={state.password.text}
                        onChange={event => inputPassword(event)}
                    />
                    <small>{ state.password.messageError }</small>
                    {
                        state.stateVerify === 'disabled' ?
                            <button
                                className="disabled"
                                disabled
                            >Войти</button> :
                            <button>Войти</button>
                    }
                    <p>Нет аккаунта?</p>
                    <NavLink to="/signup">Зарегестрируйтесь</NavLink>
                </form>
            </div>
        </>
    )
}

export default Login;