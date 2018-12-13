import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import LoginForm from './components/loginForm';
import Feed from './components/feed';
import NotFound from './components/notFound';
import Logout from './components/logout';
import ChangePassword from './components/changePassword';
import Post from './components/post';
import MyPosts from './components/myPosts';
import RegisterForm from './components/registerForm';
import ProtectedRoute from './common/protectedRoute';

const Routes = ({ user }) => {    
    return (
        <React.Fragment>
            <Switch>
                <Route path="/register" exact component={RegisterForm} />
                <Route path="/login" exact component={LoginForm} />
                <ProtectedRoute path="/logout" exact component={Logout} />
                <ProtectedRoute path="/changepassword" exact render={props => <ChangePassword {...props} user={user} />} />
                <ProtectedRoute path="/post/:id" exact render={props => <Post {...props} user={user} />}  />
                <ProtectedRoute path="/profile" exact render={props => <MyPosts {...props} user={user} />}  />
                <Route path="/not-found" component={NotFound} />
                <Route path="/" exact render={props => <Feed {...props} user={user} />} />
                <Redirect to="/not-found"/>
            </Switch>
        </React.Fragment>
    );
}

export default Routes;