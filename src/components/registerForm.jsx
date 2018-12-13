import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon, MDBModalFooter } from 'mdbreact';
import { Link } from 'react-router-dom';
import { register } from '../services/authService';

class RegisterForm extends Component {
    state = {
        data: []
    }
    
    handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const { data } = this.state;
            await register(data);
            const { state } = this.props.location;
            window.location = state ? state.from.pathname : '/';
        }catch (ex) {
            console.log(ex);            
        }             
    }

    handleChange = ({currentTarget: input}) => {
        const data = {...this.state.data};
        data[input.name]=input.value;
        console.log(data);
        this.setState({ data });
    }
    render() {
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
                                <form onSubmit={this.handleSubmit} >
                                    <MDBInput label="Username" group type="text" name="username" onChange={this.handleChange} validate />
                                    <MDBInput label="Email" group type="text" name="email" onChange={this.handleChange} validate />
                                    <MDBInput label="Password" group type="password" name="password1" onChange={this.handleChange} validate />
                                    <MDBInput label=" Confirm Password" group type="password" name="password2" onChange={this.handleChange} validate />
                                    <MDBRow className="d-flex align-items-center mb-4">
                                        <MDBCol md="12" className="text-center">
                                            <button type="submit" className="btn btn-pink btn-block btn-rounded z-depth-1" > Sign up </button>
                                        </MDBCol>
                                    </MDBRow>
                                </form>
                            </MDBCardBody>
                            <MDBModalFooter className="mx-5 pt-3 mb-1">
                                <p className="font-small grey-text d-flex justify-content-end"> Have an account? 
                                    <Link to="/login" className="blue-text ml-1"><MDBIcon icon="paper-plane-o mr-2" /> Sign In </Link>
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