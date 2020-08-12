import React from 'react';
import '../styles/App.css';
import Main from "./Main";
import Pool from "./auth/UserPool";

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
        this.setState((prevState)=>({isLoggedIn:false, session:null}))
    }

    render(){
        return (
            <div className="App">
                <Main
                    isLoggedIn={this.state.isLoggedIn}
                    session={this.state.session}
                    handleLoginSucceed = {this.handleLoginSucceed}
                    handleLogout = {this.handleLogout}
                />
            </div>
        );
    }
}

export default App;
