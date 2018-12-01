import React, {Component} from 'react';
import{Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';

import uuid from 'uuid';

class ItemModal extends Component {

    //explicit use of component state because one has to differentiate application (redux) state and component concerns
    state = {
        modal: false,
        name: ''
    }

    toggle = () =>{
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = e =>{
        //e.target.name is the textinput objectname (in this case it´s "name")
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = e =>{
        e.preventDefault();
        const newItem ={
            id: uuid(),
            name: this.state.name
        }

        //Add Item via AddItemAction
        this.props.addItem(newItem);

        //close modal
        this.toggle();
    }

    render(){

        return(
            <div>
                 <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >Add Item
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add to Shoppinglist</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="add shopping item"
                                    onChange={this.onChange}
                                >
                                </Input>
                                <Button 
                                color="dark"
                                style={{marginTop: '1rem'}}
                                block>
                                    AddItem
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

//maps the components state to the given reducer state
const mapStateToProps = (state) => ({
    //item => the name of the root reducer in combineReducers
    //state.item => the compnent state
    item : state.item
});

//connects this state with the property of getItems in item actions and lets the item actions access the reducer
export default connect(mapStateToProps,{addItem})(ItemModal);