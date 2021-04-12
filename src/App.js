import './App.css'
import Header from "./components/header/header";
import Home from './pages/home/home'
import About from "./pages/About/About"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUP/SignUP"
import Cabinet from "./pages/cabinet/cabinet"
import Loader from "./components/loader/loader";
import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

class App extends React.Component {

    state = {
        login: "",
        email: "",
        tokenVk: "",
        vkId: "",
        commands: [],
        load: true,
        MessageForNewPass: ''
    }

    setMessageForPass = message => {
        this.setState({
            ...this.state,
            MessageForNewPass: message
        })
    }

    async componentDidMount() {
        await this.checkToken()
    }

    checkToken = async () => {
        let formData = new FormData();
        formData.append('token', localStorage.getItem("token"));

        const res = await fetch(' ',{
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(result => {
                if(result.message === 'Token found'){
                    this.setState({
                        login: result.login,
                        email: result.email,
                        tokenVk: result.tokenVk,
                        vkId: result.vkId
                    })
                }else{
                    localStorage.clear();
                }
            })

        if(this.state.vkId !== ""){
            formData = new FormData();
            formData.append('vkId', this.state.vkId);

            this.setState({
                ...this.state,
                load: true
            })

            const res_2 = await fetch(' ', {
                method: 'POST',
                body: formData
            })
            const commands = await res_2.json();

            this.setState({
                ...this.state,
                commands: commands,
                load: false
            })

        }
    }

    authorization = async (token) => {

        localStorage.setItem("token", token);

       await this.checkToken()
    }

    logOut = async (token) => {

        localStorage.clear()
        this.setState({
            login: "",
            email: ""
        })
    }

    render() {
        return (

                <div className="App">
                    <Header
                        login={this.state.login}
                    />
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/about" component={About}/>
                        <Route path="/login">
                            <Login onLogin={this.authorization} />
                        </Route>
                        <Route path="/signup">
                            <SignUp onLogin={this.authorization} />
                        </Route>
                        <Route path="/cabinet" >
                            {
                                this.state.load ? <Loader /> :
                                    <Cabinet
                                        onCheckToken={this.checkToken}
                                        onClickOut={this.logOut}
                                        tokenVk={this.state.tokenVk}
                                        commands={this.state.commands}
                                        vkId={this.state.vkId}
                                        login={this.state.login}
                                        email={this.state.email}
                                        MessageForNewPass={this.state.MessageForNewPass}
                                        setMessageForPass={this.setMessageForPass}
                                    />
                            }
                        </Route>
                        <Redirect to="/" />
                    </Switch>
                </div>
        );
    }
}

export default App;
