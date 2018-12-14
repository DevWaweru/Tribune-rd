import React, { Component, Fragment } from 'react';
import Joi from 'joi-browser';
import { Alert } from 'antd';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
// import { updatePassword } from '../services/authService';
import { postApiData } from '../services/httpService';

class ChangePassword extends Component {
    state = {
        data: {},
        errors: {}
    }

    schema = {
        new_password1: Joi.string().required().min(8).label('Password'),        
        new_password2: Joi.string().required().valid(Joi.ref('new_password1')).label('Confirm Password').options({ 
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
            const res = await postApiData('rest-auth/password/change/', data);
            console.log(res);
            
        }catch (ex) {
            console.log(ex);            
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
        const { errors, data } = this.state;
        return (
            <Fragment>
                <MDBContainer style={{ marginTop: "5rem" }}>
                    <MDBRow className="center" style={{ height: "auto" }}>
                        <MDBCol md="6">
                            <MDBCard>
                                <div className="header pt-3 grey lighten-2">
                                    <MDBRow className="d-flex justify-content-center">
                                        <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5"> Change Password </h3>
                                    </MDBRow>
                                </div>
                                <MDBCardBody className="mx-4 mt-4">
                                    {errors["new_password1"] && <Alert type="error" message={errors["new_password1"]}/>}
                                    {errors["new_password2"] && data["new_password2"] !== data["new_password1"] && <Alert type="error" message={errors["new_password2"]}/>}
                                    <form onSubmit={this.handleSubmit}>
                                        <MDBInput label="Password" name="new_password1" type="password" group validate onChange={this.handleChange} error={errors["new_password1"]} />
                                        <MDBInput label="Confirm password" name="new_password2" type="password" group validate containerClass="mb-0" onChange={this.handleChange} error={errors["new_password2"]}/>
                                        <div className="text-center mb-4 mt-5">
                                            <MDBBtn color="purple" type="submit" className="btn-block z-depth-2" > Change Password </MDBBtn>
                                        </div>
                                    </form>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </Fragment>
        );
    }
}

export default ChangePassword;