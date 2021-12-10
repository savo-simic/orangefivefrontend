import React, { Component } from "react";
import {Button, Table} from "reactstrap";
import axios from "axios";
import ShowItem from "./ShowItem";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import DeleteConfirmation from "./DeleteConfirmation";

export default class Items extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            itemData: {
                title: "",
                description: "",
            },
            newItemData: {
                title: "",
                description: "",
            },
            isLoading: false,
            status: "",
            addItemModal: false,
            editItemData: {
                title: "",
                description: "",
            },
            editItemModal: false,
            deleteConfirmationModal: false,
            deleteConfirmationId: "",
            noDataFound: "",
            errors: {}
        }
    }

    componentDidMount() {
        this.getItems();
    }

    getItems() {
        axios.get("http://localhost:8000/api/items").then((response) => {
            if (response.status === 200) {
                this.setState({
                    items: response.data.data ? response.data.data : [],
                });
            }

            if (
                response.data.status === "failed" &&
                response.data.success === false
            ) {
                this.setState({
                    noDataFound: response.data.message,
                });
            }
        });
    }

    showItem = (id) => {
        axios.get("http://localhost:8000/api/items/"+id).then((response) => {
            if (response.status === 200) {
                this.setState({
                    itemData: response.data.data ? response.data.data : [],
                    showItemModal: !this.state.showItemModal,
                });
            }
            if (
                response.data.status === "failed" &&
                response.data.success === false
            ) {
                this.setState({
                    noDataFound: response.data.message,
                });
            }
        });
    };

    toggleShowItemModal = () => {
        this.setState({
            showItemModal: !this.state.showItemModal,
        });
    };

    toggleAddItemModal = () => {
        this.setState({
            addItemModal: !this.state.addItemModal,
        });
    };

    onChangeAddItemHandler = (e) => {
        let { newItemData } = this.state;
        newItemData[e.target.name] = e.target.value;
        this.setState({ newItemData });
    };

    addItem = () => {
        let title =   this.state.newItemData['title'];
        let description =   this.state.newItemData['description'];

        if (title === "") {
            alert('Title field is required.');

            return;
        } else if (title.length > 255) {
            alert('Title field can not be larger than 255 characters.');

            return;
        }

        if (description === "") {
            alert('Description field is required.');

            return;
        }

        axios
            .post(
                "http://localhost:8000/api/items",
                this.state.newItemData
            )
            .then((response) => {
                const { items } = this.state;
                const newItems = [...items];
                newItems.push(response.data);
                this.setState(
                    {
                        items: newItems,
                        addItemModal: false,
                        newItemData: {
                            title: "",
                            description: "",
                        },
                    },
                    () => this.getItems()
                );
            });
    };

    toggleEditItemModal = () => {
        this.setState({
            editItemModal: !this.state.editItemModal,
        });
    };

    onChangeEditItemHandler = (e) => {
        let { editItemData } = this.state;
        editItemData[e.target.name] = e.target.value;
        this.setState({ editItemData });
    };

    editItem = (id) => {
        axios.get("http://localhost:8000/api/items/"+id).then((response) => {
            if (response.status === 200) {
                let data = response.data.data;

                this.setState({
                    editItemData:data,
                    editItemModal: !this.state.editItemModal,
                });
            }
            if (
                response.data.status === "failed" &&
                response.data.success === false
            ) {
                this.setState({
                    noDataFound: response.data.message,
                });
            }
        });
    };

    updateItem = () => {
        let {id, title, description} = this.state.editItemData;

        if (title === "") {
            alert('Title field is required.');

            return;
        } else if (title.length > 255) {
            alert('Title field can not be larger than 255 characters.');

            return;
        }

        if (description === "") {
            alert('Description field is required.');

            return;
        }

        this.setState({
            isLoading: true,
        });
        axios
            .patch("http://localhost:8000/api/items/"+id, {
                    id,
                    title,
                    description
                }
            )
            .then((response) => {
                this.getItems();
                this.setState({
                    editItemModal: false,
                    editItemData: { title },
                    isLoading:false,
                });
            })
            .catch((error) => {
                this.setState({isLoading:false})
                console.log(error.response);
            });
    };

    toggleDeleteConfirmationModal = (id) => {
        this.setState({
            deleteConfirmationId: id,
            deleteConfirmationModal: !this.state.deleteConfirmationModal,
        });
    };

    deleteItem = (id) => {
        this.setState({
            isLoading: true,
        });
        axios
            .delete("http://localhost:8000/api/items/" + id)
            .then((response) => {
                this.setState({
                    isLoading: false,
                    deleteConfirmationModal: false,
                });
                this.getItems();
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
            });
    };

    render() {
        const { itemData, newItemData, editItemData, noDataFound, items} = this.state;
        let itemsDetails = [];
        if (items.length) {
            itemsDetails = items.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>
                            <Button color="warning" size="sm" className="m-1" onClick={() => this.showItem(item.id)}>Show</Button>
                            <Button color="success" size="sm" className="m-1" onClick={() => this.editItem(item.id, item.name,)}>
                                Edit
                            </Button>
                            <Button color="danger" size="sm" className="m-1" onClick={() => this.toggleDeleteConfirmationModal(item.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                );
            });
        }
        return (
            <div className="container pl-5">
                <div className="row">
                    <h3 className="font-weight-bold mt-2">Crud operations for Items</h3>
                    <ShowItem
                        toggleShowItemModal={this.toggleShowItemModal}
                        showItemModal={this.state.showItemModal}
                        itemData={itemData}
                        showItem={this.showItem}
                    />
                    <AddItem
                        toggleAddItemModal={this.toggleAddItemModal}
                        addItemModal={this.state.addItemModal}
                        onChangeAddItemHandler={this.onChangeAddItemHandler}
                        newItemData={newItemData}
                        addItem={this.addItem}
                    />
                    <EditItem
                        toggleEditItemModal={this.toggleEditItemModal}
                        editItemModal={this.state.editItemModal}
                        onChangeEditItemHandler={this.onChangeEditItemHandler}
                        editItem={this.editItem}
                        editItemData={editItemData}
                        updateItem={this.updateItem}
                    />
                    <DeleteConfirmation
                        toggleDeleteConfirmationModal={this.toggleDeleteConfirmationModal}
                        deleteConfirmationModal={this.state.deleteConfirmationModal}
                        deleteConfirmationId={this.state.deleteConfirmationId}
                        deleteItem={this.deleteItem}
                    />
                    <div className="col-md-10 ">
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>  {itemsDetails}    </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}