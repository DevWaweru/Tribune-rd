import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <React.Fragment>
                <MDBContainer style={{ marginTop: "5rem" }}>
                    <MDBRow>
                        <MDBCol md="12">
                            <h2 className="text-center">Article</h2>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </React.Fragment>
        );
    }
}

export default Post;