import React, { Component } from 'react';
import Joi from 'joi-browser';
import { Alert } from 'antd';
import { Redirect } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter } from 'mdbreact';
import { login } from '../services/authService';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
    state = {
        data: {username:"", password:""},
        errors: {}
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }
    validate = () => {
        const options = {abortEarly: false};
        const { error } = Joi.validate(this.state.data, this.schema, options);
        
        const errors = {}
        if (!error) return null;
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
        // return Object.keys(errors).length === 0 ? null : errors;
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value } //computed properties in ES6 to take and store values dynamically
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema );

        return error ? error.details[0].message : null;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {}  });

        if (errors) return;
        this.doSubmit();
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
    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors}
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name]=errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name]=input.value;
        this.setState({ data, errors });
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