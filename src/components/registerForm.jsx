import React, { Component } from "react";
import Joi from 'joi-browser';
import { Alert } from 'antd';
import { Redirect } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon, MDBModalFooter } from 'mdbreact';
import { Link } from 'react-router-dom';
import { register } from '../services/authService';

class RegisterForm extends Component {
    state = {
        data: [],
        errors: {}
    }

    schema = {
        username: Joi.string().required().min(3).label('Username'),
        email: Joi.string().email().required().label('Email'),
        password1: Joi.string().required().min(8).label('Password'),        
        password2: Joi.string().required().valid(Joi.ref('password1')).label('Confirm Password').options({ 
            language: { 
                any: { 
                    allowOnly: '!!Passwords do not match' 
                } 
            } 
        }) 
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
            await register(data);
            const { state } = this.props.location;
            window.location = state ? state.from.pathname : '/';
        }catch (ex) {
            if (ex.response && ex.response.status === 400){
                const errors = { ...this.state.errors};
                if (ex.response.data.username !== undefined) errors.username = ex.response.data.username["0"];
                if (ex.response.data.email !== undefined) errors.email = ex.response.data.email["0"];
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
        const { errors, data } = this.state;
        return (
            <MDBContainer>
                <MDBRow className="center">
                    <MDBCol md="5">
                        <MDBCard>
                            <MDBCardBody className="mx-4">
                                <div className="text-center">
                                    <h3 className="pink-text mb-5">
                                        <strong>Sign up</strong>
                                    </h3>
                                </div>
                                {errors["username"] && <Alert type="error" message={errors["username"]}/>}
                                {errors["email"] && <Alert type="error" message={errors["email"]}/>}
                                {errors["password1"] && <Alert type="error" message={errors["password1"]}/>}
                                {errors["password2"] && data["password2"] !== data["password1"] && <Alert type="error" message={errors["password2"]}/>}
                                <form onSubmit={this.handleSubmit} >
                                    <MDBInput label="Username" group type="text" name="username" onChange={this.handleChange} validate />
                                    <MDBInput label="Email" group type="text" name="email" onChange={this.handleChange} validate />
                                    <MDBInput label="Password" group type="password" name="password1" onChange={this.handleChange} validate />
                                    <MDBInput label=" Confirm Password" group type="password" name="password2" onChange={this.handleChange} validate />
                                    <MDBRow className="d-flex align-items-center mb-4">
                                        <MDBCol md="12" className="text-center">
                                            <button type="submit" className="btn btn-pink btn-block btn-rounded z-depth-1" ><MDBIcon icon="paper-plane-o mr-2" /> Sign up </button>
                                        </MDBCol>
                                    </MDBRow>
                                </form>
                            </MDBCardBody>
                            <MDBModalFooter className="mx-5 pt-3 mb-1">
                                <p className="font-small grey-text d-flex justify-content-end"> Have an account? 
                                    <Link to="/login" className="blue-text ml-1"> Sign In </Link>
                                </p>
                            </MDBModalFooter>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default RegisterForm;