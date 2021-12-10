import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";

export default class ShowItem extends Component {
    render() {
        return (
            <div>
                <Modal  isOpen={this.props.showItemModal}
                        toggle={this.props.toggleShowItemModal}>
                    <ModalHeader toggle={this.props.toggleShowItemModal}>
                        Show Item
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="id">Id: {this.props.itemData.id}</Label><br/>
                            <Label for="name">Title: {this.props.itemData.title}</Label><br/>
                            <Label for="name">Description: {this.props.itemData.description}</Label>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.toggleShowItemModal}> Close </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}