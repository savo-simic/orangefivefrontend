import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";

export default class AddItem extends Component {
    render() {
        return (
            <div>
                <Button style={{float: "left"}} className="float-left mb-4 ml-2" color="primary"
                        onClick={this.props.toggleAddItemModal}>
                    Add Item
                </Button>
                <Modal isOpen={this.props.addItemModal}
                       toggle={this.props.toggleAddItemModal}>
                    <ModalHeader toggle={this.props.toggleAddItemModal}>
                        Add new Item
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input id="title" name="title"
                                   value={this.props.newItemData.title}
                                   onChange={this.props.onChangeAddItemHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input id="description" name="description"
                                   value={this.props.newItemData.description}
                                   onChange={this.props.onChangeAddItemHandler}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.addItem()}> Add </Button>
                        <Button color="secondary" onClick={this.props.toggleAddItemModal}> Cancel </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}