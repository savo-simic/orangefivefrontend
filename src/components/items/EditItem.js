import React, { Component } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from "reactstrap";

export default class EditItem extends Component {
    render() {
        return (
            <div>
                <Modal isOpen={this.props.editItemModal}
                       toggle={this.props.toggleEditItemModal}>
                    <ModalHeader toggle={this.props.toggleEditItemModal}>
                        Update Item
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input id="title"
                                   name="title"
                                   value={this.props.editItemData.title}
                                   onChange={this.props.onChangeEditItemHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input id="description"
                                   name="description"
                                   value={this.props.editItemData.description}
                                   onChange={this.props.onChangeEditItemHandler}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.updateItem}>Update</Button>
                        <Button color="secondary" onClick={this.props.toggleEditItemModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}