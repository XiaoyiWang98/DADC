import React, {Component} from 'react';
import NgoMain from "./ngos/NgoMain"
import DonorMain from "./donors/DonorMain"


class AppMain extends Component {

    getLogin = () => {
        return this.props.isLoggedIn
            ? <Redirect to="/home"/>
            : <Login handleLoginSuccessed={this.props.handleLoginSucceed}/>;
    }

    // getProfile = () => {
    //     return this.props.isLoggedIn
    //         ? <UserProfile session={this.props.session} handleLogout={this.props.handleLogout}/>
    //         : <Redirect to="/"/>
    // }

    getHome = () => {
        if (this.props.isLoggedIn) {
            return this.props.session.idToken.payload["custom:custom:NGO"] == 0
                ? <DonorHome session={this.props.session} handleLogout={this.props.handleLogout}/>
                : <NgoHome session={this.props.session} handleLogout={this.props.handleLogout}/>
        } else {
            return <Redirect to={"/"}/>;
        }
    }

    getRegister = () => {
        return this.props.isLoggedIn
            ? <Redirect to="/home"/>
            : <Register handleLogout={this.props.handleLogout}/>;
    }

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/register" render={this.getRegister}/>
                    <Route exact path="/" render={this.getLogin}/>
                    {/*<Route exact path="/home" render={this.getHome}/>*/}
                    {/*<Route exact path="/mapTest" component={MapCompositeTestLoader}/>*/}

                </Switch>
            </div>
        );
    }


    isNgo = () => {
        return this.props.session.idToken.payload["custom:custom:NGO"] == 0;
    }

    render() {
        return (
            <div>
                {this.isNgo()
                    ? <NgoMain isLoggedIn={this.props.isLoggedIn}
                               session={this.props.session}
                               handleLoginSucceed={this.props.handleLoginSucceed}
                               handleLogout={this.props.handleLogout}/>
                    : <DonorMain isLoggedIn={this.props.isLoggedIn}
                                 session={this.props.session}
                                 handleLoginSucceed = {this.props.handleLoginSucceed}
                                 handleLogout = {this.props.handleLogout}/>}
            </div>
        );
    }
}

export default AppMain;