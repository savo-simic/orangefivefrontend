import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from "reactstrap";

export default class DeleteConfirmation extends Component {
    render() {
        return (
            <div>
                <Modal isOpen={this.props.deleteConfirmationModal}
                       toggle={this.props.toggleDeleteConfirmationModal}>
                    <ModalHeader toggle={this.props.toggleDeleteConfirmationModal}>
                       Warning
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Are you sure you want to delete this item?</Label>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.deleteItem(this.props.deleteConfirmationId)}> Delete </Button>
                        <Button color="secondary" onClick={this.props.toggleDeleteConfirmationModal}> Cancel </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}