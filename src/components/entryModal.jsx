import React, { Component } from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, MDBInput } from 'mdbreact';

class EntryModal extends Component {
    state = {
        data: {title:"", content:""}
    }

    handleChange = ({ currentTarget: input }) => {
        const data = {...this.state.data};
        data[input.name]=input.value;
        this.setState({ data });
    }

    render() {
        const { modal, toggle, doSubmit } = this.props;
        const { data } = this.state;
        return (
            <Container>
                <Modal isOpen={modal} toggle={toggle} fullHeight position="left">
                    <ModalHeader toggle={toggle}>Fill form to add article</ModalHeader>
                    <ModalBody>
                        <form>
                            <MDBInput name="title" label="Title" size="lg" onChange={this.handleChange} />
                            <MDBInput name="content" label="Type content here..." type="textarea" rows="20" onChange={this.handleChange} />
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Close</Button>
                        <Button color="primary" onClick={() => doSubmit(data)}>Save changes</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}

export default EntryModal;