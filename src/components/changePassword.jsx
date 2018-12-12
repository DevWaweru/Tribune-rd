import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput  } from 'mdbreact';
// import { updatePassword } from '../services/authService';
import { postApiData } from '../services/httpService';

class ChangePassword extends Component {
    state = {
        data: {}
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const { data } = this.state;
            const res = await postApiData('rest-auth/password/change/', data);
            console.log(res);
            
            // const { state } = this.props.location;
            // window.location = state ? state.from.pathname : '/';
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
                                    <form onSubmit={this.handleSubmit}>
                                        <MDBInput label="Password" group type="password" name="new_password1" validate onChange={this.handleChange} />
                                        <MDBInput label="Confirm password" group type="password" name="new_password2" validate containerClass="mb-0" onChange={this.handleChange} />
                                        <div className="text-center mb-4 mt-5">
                                            <MDBBtn color="purple" type="submit" className="btn-block z-depth-2" > Change Password </MDBBtn>
                                        </div>
                                    </form>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </React.Fragment>
        );
    }
}

export default ChangePassword;