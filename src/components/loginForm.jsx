import React, { Component } from 'react';
import Joi from 'joi-browser';
import { Alert } from 'antd';
import { Redirect } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter } from 'mdbreact';
import { login } from '../services/authService';
import { Link } from 'react-router-dom';
import FormHandler from '../common/formHandler';

class LoginForm extends FormHandler {
    state = {
        data: {},
        errors: {}
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    doSubmit = async () => {
        try{
            const { data } = this.state;
            await login(data.username, data.password);
            const { state } = this.props.location;
            window.location = state ? state.from.pathname : '/';
        }catch (ex) {
            if (ex.response && ex.response.status === 400){
                const errors = {...this.state.errors}
                errors.username = "Invalid username or password";
                this.setState({ errors });
            }
        }             
    }
    
    render() {
        if (localStorage.getItem('token')) return <Redirect to='/'/>
        const { errors } = this.state;
        return (
            <React.Fragment>
                <MDBContainer>
                    <MDBRow className='center'>
                        <MDBCol md="5">
                            <MDBCard>
                                <MDBCardBody className="mx-4">
                                    <div className="text-center">
                                        <h3 className="dark-grey-text mb-5">
                                            <strong>Sign in</strong>
                                        </h3>
                                    </div>
                                    {errors["username"] && <Alert type="error" message={errors["username"]}/>}
                                    {errors["password"] && <Alert type="error" message={errors["password"]}/>}
                                    <form onSubmit={this.handleSubmit}>
                                        <MDBInput onChange={this.handleChange} label="Username" name="username" group type="text" validate error="wrong" success="right" />
                                        <MDBInput onChange={this.handleChange} label="Password" name="password" group type="password" validate containerClass="mb-0" />
                                        <p className="font-small blue-text d-flex justify-content-end pb-3"> Forgot 
                                            <a href="#!" className="blue-text ml-1"> Password?</a>
                                        </p>
                                        <div className="text-center mb-3">
                                            <MDBBtn type="submit" gradient="blue" rounded className="btn-block z-depth-1a" > Sign in </MDBBtn>
                                        </div>
                                    </form>
                                </MDBCardBody>
                                <MDBModalFooter className="mx-5 pt-3 mb-1">
                                    <p className="font-small grey-text d-flex justify-content-end"> Not a member? 
                                        <Link to="/register" className="blue-text ml-1"> Sign Up </Link>
                                    </p>
                                </MDBModalFooter>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </React.Fragment>
        );
    }
}

export default LoginForm;