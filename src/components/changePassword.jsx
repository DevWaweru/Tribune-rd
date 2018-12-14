import React, { Fragment } from 'react';
import Joi from 'joi-browser';
import { Alert, notification } from 'antd';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import { postApiData } from '../services/httpService';
import FormHandler from '../common/formHandler';

class ChangePassword extends FormHandler {
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

    openNotificationWithIcon = (type) => {
        notification[type]({
            message: 'Password Changed',
            description: 'Password changed successfully!',
        });
    };

    doSubmit = async () => {
        try{
            let { data } = this.state;
            const res = await postApiData('rest-auth/password/change/', data);
            if (res.status === 200) this.openNotificationWithIcon('success');
        }catch (ex) {
            console.log(ex);            
        }             
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