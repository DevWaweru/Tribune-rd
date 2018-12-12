import React, { Component, Fragment} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon } from 'mdbreact';

class RegisterForm extends Component {
    
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
                                <MDBInput label="Your email" group type="text" validate />
                                <MDBInput label="Your password" group type="password" validate />
                                <div className="md-form pb-3">
                                    <div className="form-check my-4">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="defaultCheck12"
                                        />
                                        <label htmlFor="defaultCheck12" className="grey-text">
                                            Accept the
                <a href="#!" className="blue-text">

                                                Terms and Conditions
                </a>
                                        </label>
                                    </div>
                                </div>
                                <MDBRow className="d-flex align-items-center mb-4">
                                    <MDBCol md="6" className="text-center">
                                        <button
                                            type="button"
                                            className="btn btn-pink btn-block btn-rounded z-depth-1"
                                        >
                                            Sign up
              </button>
                                    </MDBCol>
                                    <MDBCol md="6">
                                        <p className="font-small grey-text d-flex justify-content-end">
                                            Have an account?
                <a href="#!" className="blue-text ml-1">

                                                Log in
                </a>
                                        </p>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                            <div className="footer pt-3 mdb-color lighten-3">
                                <MDBRow className="d-flex justify-content-center">
                                    <p className="font-small white-text mb-2 pt-3">
                                        or Sign up with:
            </p>
                                </MDBRow>
                                <MDBRow className="mt-2 mb-3 d-flex justify-content-center">
                                    <a href="#!" className="fa-lg p-2 m-2 fb-ic">
                                        <MDBIcon className="fa fa-facebook white-text fa-lg"> </MDBIcon>
                                    </a>
                                    <a href="#!" className="fa-lg p-2 m-2 tw-ic">
                                        <MDBIcon className="fa fa-twitter white-text fa-lg"> </MDBIcon>
                                    </a>
                                    <a href="#!" className="fa-lg p-2 m-2 gplus-ic">
                                        <MDBIcon className="fa fa-google-plus white-text fa-lg"> </MDBIcon>
                                    </a>
                                </MDBRow>
                            </div>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default RegisterForm;