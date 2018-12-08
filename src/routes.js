import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import LoginForm from './components/loginForm';
import Feed from './components/feed';
import NotFound from './components/notFound';
import Logout from './components/logout';
import ChangePassword from './components/changePassword';

const Routes = ({ user }) => {    
    return (
        <React.Fragment>
            <Switch>
                <Route path="/login" exact component={LoginForm} />
                <Route path="/logout" exact component={Logout} />
                <Route path="/changepassword" exact render={props => <ChangePassword {...props} user={user} />} />
                <Route path="/not-found" component={NotFound} />
                <Route path="/" exact render={props => <Feed {...props} user={user} />} />
                <Redirect to="/not-found"/>
            </Switch>
        </React.Fragment>
    );
}

export default Routes;