import React from 'react'
import './cabinet.css'
import {NavLink, Switch, Route} from "react-router-dom";
import {Redirect} from "react-router-dom";
import Cards from "../../content/cards/cards";
import Alert from "../../components/alert/alert";
import Setting from "../../content/setting/setting";

function Cabinet(props) {

    const LogOut = () => {
        props.onClickOut()
    }

    return(
        <div className="cabinet">
            { localStorage.getItem("token") === null ? <Redirect to="/" /> : null }
            <nav className="navbar">
                <ul className="desctop_navbar">
                    <li><NavLink to="/cabinet/card" >Карты</NavLink></li>
                    <li><NavLink to="/cabinet/setting" exact>Настройки</NavLink></li>
                    <li onClick={LogOut} ><NavLink to="/" exact>Выйти</NavLink></li>
                </ul>
                <ul className="mobile_navbar">
                    <li><NavLink to="/cabinet/card" ><i className="far fa-credit-card"/></NavLink></li>
                    <li><NavLink to="/cabinet/setting" exact><i className="fas fa-cog"/></NavLink></li>
                    <li onClick={LogOut} ><NavLink to="/" exact><i className="fas fa-power-off"/></NavLink></li>
                </ul>
            </nav>
            {
                props.vkId === null ?
                <Alert
                    tokenVk = {props.tokenVk}
                /> :
                    <Switch>
                        <Route path="/cabinet/card" >
                            <Cards
                                commands={props.commands}
                                vkId={props.vkId}
                                onCheckToken={props.onCheckToken}
                            />
                        </Route>
                        <Route path="/cabinet/setting" >
                            <Setting
                                login={props.login}
                                email={props.email}
                                onCheckToken={props.onCheckToken}
                                MessageForNewPass={props.MessageForNewPass}
                                setMessageForPass={props.setMessageForPass}
                            />
                        </Route>
                    </Switch>
            }
        </div>
    )
}

export default Cabinet;