import React, {useReducer} from 'react'
import './SignUP.css'
import {Redirect} from "react-router-dom";

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const initialState = {
    login: {
        text: "",
        messageError: '',
        errorClass: ''
    },
    email: {
        text: "",
        messageError: '',
        errorClass: ''
    },
    password: {
        text: "",
        messageError: '',
        errorClass: ''
    },
    passwordCheck: {
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
                    //isTouch: state.login.isTouch,
                    messageError: state.login.messageError,
                    errorClass: state.login.errorClass
                }
            };
        case 'setErrorLogin':
            return {
                ...state,
                login: {
                    text: state.login.text,
                    //isTouch: state.login.isTouch,
                    messageError: action.payload.message,
                    errorClass: action.payload.errorClass
                }
            };
        case 'inputEmail':
            return {
                ...state,
                email: {
                    text: action.payload,
                    //isTouch: state.login.isTouch,
                    messageError: state.email.messageError,
                    errorClass: state.email.errorClass
                }
            };
        case 'setErrorEmail':
            return {
                ...state,
                email: {
                    text: state.email.text,
                    //isTouch: state.login.isTouch,
                    messageError: action.payload.message,
                    errorClass: action.payload.errorClass
                }
            };
        case 'inputPassword':
            return {
                ...state,
                password: {
                    text: action.payload,
                    //isTouch: state.login.isTouch,
                    messageError: state.password.messageError,
                    errorClass: state.password.errorClass
                }
            };
        case 'setErrorPassword':
            return {
                ...state,
                password: {
                    text: state.password.text,
                    //isTouch: state.login.isTouch,
                    messageError: action.payload.message,
                    errorClass: action.payload.errorClass
                }
            };
        case 'inputPasswordCheck':
            return {
                ...state,
                passwordCheck: {
                    text: action.payload,
                    //isTouch: state.login.isTouch,
                    messageError: state.passwordCheck.messageError,
                    errorClass: state.passwordCheck.errorClass
                }
            };
        case 'setErrorPasswordCheck':
            return {
                ...state,
                passwordCheck: {
                    text: state.passwordCheck.text,
                    //isTouch: state.login.isTouch,
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

function SignUp(props) {

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
            if(state.email.messageError === undefined &&
                state.password.messageError === undefined &&
                state.passwordCheck.messageError === undefined){

                dispatch({type: 'setVerify', payload: ' '})
            }
        }
    }

    const inputEmail = () => {
        if(!validateEmail(state.email.text)){
            dispatch({type: 'setErrorEmail', payload: {
                    message: "Введите корректную почту",
                    errorClass: "errorClass"
                }})
            dispatch({type: 'setVerify', payload: 'disabled'})
        }else{
            dispatch({type: 'setErrorEmail', payload: ""})
            if(state.login.messageError === undefined &&
                state.password.messageError === undefined &&
                state.passwordCheck.messageError === undefined){

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
            if(state.login.messageError === undefined &&
                state.email.messageError === undefined &&
                state.passwordCheck.messageError === undefined){

                dispatch({type: 'setVerify', payload: ' '})
            }
        }

        if(event.target.value !== state.passwordCheck.text){
            dispatch({type: 'setErrorPasswordCheck', payload: {
                    message: "Пароли не совпадают",
                    errorClass: "errorClass"
                }})
            dispatch({type: 'setVerify', payload: 'disabled'})
        }else{
            dispatch({type: 'setErrorPasswordCheck', payload: ""})
            if(state.login.messageError === undefined &&
                state.email.messageError === undefined &&
                state.passwordCheck.messageError === undefined){

                dispatch({type: 'setVerify', payload: ' '})
            }
        }
    }

    const inputPasswordCheck = (event) => {
        dispatch({type: 'inputPasswordCheck', payload: event.target.value})

        if(event.target.value !== state.password.text){
            dispatch({type: 'setErrorPasswordCheck', payload: {
                    message: "Пароли не совпадают",
                    errorClass: "errorClass"
                }})
            dispatch({type: 'setVerify', payload: 'disabled'})
        }else{
            dispatch({type: 'setErrorPasswordCheck', payload: ""})
            if(state.login.messageError === undefined &&
                state.email.messageError === undefined &&
                state.password.messageError === undefined){

                dispatch({type: 'setVerify', payload: ' '})
            }
        }
    }

    const submitHandler = async (event) =>{
        event.preventDefault()

        let formData = new FormData();
        formData.append('login', state.login.text);
        formData.append('password', state.password.text);
        formData.append('email', state.email.text);

        const res = await fetch('https://cardbotapi.ru//API/signup',{
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        switch (data.message){
            case "Email was taken":
                dispatch({type: 'setVerify', payload: 'disabled'})
                dispatch({type: 'setErrorEmail', payload: {
                        message: "Почта уже зарегестрирована",
                        errorClass: "errorClass"
                    }})

                break;
            case "Login was taken":
                dispatch({type: 'setVerify', payload: 'disabled'})
                dispatch({type: 'setErrorLogin', payload: {
                        message: "Логин занят",
                        errorClass: "errorClass"
                    }})
                break;
            case "User registred":
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
            <div className="signup">
                <form onSubmit={submitHandler}>
                    <h2>Регистрация</h2>
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

                    <label htmlFor="email">Электронная почта</label>
                    <input
                        id="email"
                        placeholder="Введите почту..."
                        name="email"
                        type="email"
                        autoComplete="off"
                        value={state.email.text}
                        className={state.email.errorClass}
                        onChange={event => dispatch({type: 'inputEmail', payload: event.target.value})}
                        onBlur={inputEmail}
                    />
                    <small>{ state.email.messageError }</small>

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

                    <label htmlFor="passwordCheck">Повторите пароль</label>
                    <input
                        name="passwordCheck"
                        placeholder="Введите пароль ещё раз..."
                        id="passwordCheck"
                        type="password"
                        className={state.passwordCheck.errorClass}
                        value={state.passwordCheck.text}
                        onChange={event => inputPasswordCheck(event)}
                    />
                    <small>{ state.passwordCheck.messageError }</small>
                    {
                        state.stateVerify === 'disabled' ?
                            <button
                                className="disabled"
                                disabled
                            >Зарегестрироваться</button> :
                            <button>Зарегестрироваться</button>
                    }
                </form>
            </div>
        </>
    )
}

export default SignUp;