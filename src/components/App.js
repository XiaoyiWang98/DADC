import React, {useState} from 'react';
import '../styles/App.css';
import Pool from "./auth/UserPool";
import NgoMain from "./ngos/NgoMain";
import DonorMain from "./donors/DonorMain";
import Login from "./auth/Login";
import TopBar from "./TopBar";
import {Switch, Route} from 'react-router-dom';
import {Register} from "./auth/Register"


class App extends React.Component{
    //get session
    getSession = async () =>
        await new Promise(((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user){
                user.getSession((err,session)=>{
                    if(err){
                        reject();
                    }else {
                        resolve(session);
                    }
                });
            }else{
                reject();
            }
        }));

    state = {
        isLoggedIn: false,
        session: null,
        userNGO: false
    }

    componentDidMount() {
            this.getSession()
                .then((session)=>{
                    console.log('Session: ',session);
                    this.setState({isLoggedIn:true, session: session});
                })
    }

    handleLoginSucceed = () => {
        this.getSession()
            .then((session)=>{
                console.log('Session: ',session);
                this.setState({isLoggedIn:true, session: session});
            })
    }

    handleLogout = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
            this.setState((prevState)=>({isLoggedIn:false, session:null}))
        }
    }

    isDonor = () => {
        console.log("App state ->", this.state);
        return this.state.session.idToken.payload["custom:custom:NGO"] == 0;
    }

    getLoggedInUserMain = () => {
        return this.isDonor()
            ? <DonorMain isLoggedIn={this.state.isLoggedIn}
                         session={this.state.session}
                         handleLoginSucceed = {this.handleLoginSucceed}
                         handleLogout = {this.handleLogout}/>
            : <NgoMain isLoggedIn={this.state.isLoggedIn}
                       session={this.state.session}
                       handleLoginSucceed={this.handleLoginSucceed}
                       handleLogout={this.handleLogout}/>
    }

    getAuthPageWithRouter = () => {
        return(
            <div className="auth-main">
                <Switch>
                    <Route exact path="/register" render={() => <Register handleLogout={this.handleLogout}
                                                                          userNGO={this.state.userNGO}/>}/>
                    <Route exact path="/" render={() => <Login handleLoginSucceed={this.handleLoginSucceed}/>}/>
                    <Route render={() => <Login handleLoginSucceed={this.handleLoginSucceed}
                                                userNGO={this.state.userNGO} handleLogout={this.handleLogout}/>}/>
                </Switch>
            </div>
        );
    }

    switchToNGO = () =>{
        this.setState({userNGO:true})
    }

    switchToDonor = () =>{
        this.setState({userNGO:false})
    }

    render(){
        return (
            <div className="App">
                {!this.state.isLoggedIn
                    ?
                    <div>
                        <TopBar handleLogout={this.handleLogout}
                                isLoggedIn={this.state.isLoggedIn} state={this.state.userNGO}
                                switchToNGO={this.switchToNGO} switchToDonor={this.switchToDonor}/>
                        {this.getAuthPageWithRouter()}
                    </div>
                    : this.getLoggedInUserMain()
                }
            </div>
        );
    }
}

export default App;
