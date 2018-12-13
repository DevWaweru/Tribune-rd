import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, render, ...rest}) => {
    const token = localStorage.getItem('token');
    return ( 
        <Route {...rest} render={ props => {
            if (!token) return <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
            return Component ? <Component {...props} /> : render(props);
            } 
        } />
    );
}
 
export default ProtectedRoute;