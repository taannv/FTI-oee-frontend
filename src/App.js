import React, {Component} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import Login from "./components/users/Login";
import AppLayout from "./layouts/AppLayout";
import {PATH_LOGIN, PATH_ROOT} from "./constants";
import {getCurrentUser} from "./services/UserService";

class App extends Component{

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            isAuthenticated: false,
            currentUser: null
        }

        this.resetAuth = this.resetAuth.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
    }

    resetAuth() {
        this.setState({
            loading: false,
            isAuthenticated: false,
            currentUser: null
        });
    }

    loadCurrentUser() {
        getCurrentUser()
            .then(response => this.authSuccess(response))
            .catch(() => {
                this.props.history.push(PATH_LOGIN);
                this.setState({loading: false});
            });
    }

    authSuccess(user) {
        this.setState({
            currentUser: user,
            isAuthenticated: true,
            loading: false
        });
        this.props.history.push(PATH_ROOT);
    }

    render() {
        return (
            <Switch>
                <Route exact path={PATH_LOGIN} render={() => <Login resetAuth={this.resetAuth} loadCurrentUser={this.loadCurrentUser} />} />
                <Route render={() => <AppLayout loading={this.state.loading} loadCurrentUser={this.loadCurrentUser} currentUser={this.state.currentUser} />}/>
            </Switch>
        )
    }
}

export default withRouter(App);
