import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

class NotFound extends Component {

    render() {
        return (
            <React.Fragment>
                <MDBContainer>
                    <MDBRow className="center">
                        <MDBCol md="5">
                            <h2 className="text-center">404</h2>
                            <p className="text-center">Not Found</p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </React.Fragment>
        );
    }
}

export default NotFound;