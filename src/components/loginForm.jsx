import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter } from 'mdbreact';
import { login } from '../services/authService';
import '../App.css';

class LoginForm extends Component {
    state = {
        data: {username:"", password:""}
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const { data } = this.state;
            await login(data.username, data.password);
            const { state } = this.props.location;
            window.location = state ? state.from.pathname : '/';
        }catch (ex) {
            console.log(ex);            
        }             
    }
    handleChange = ({currentTarget: input}) => {
        const data = {...this.state.data};
        data[input.name]=input.value;
        this.setState({ data });
    }
    render() {
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
                                        <a href="#!" className="blue-text ml-1"> Sign Up </a>
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