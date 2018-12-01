import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getItems, deleteItem} from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component{

    componentDidMount(){
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }

    render(){
        //destructuring items from this.state.items
        //const  {items} = this.state; <= state is no longer held in the component anymore -> null!

        //this.props.item is the whole state and items is the held state content we want to access
        const items = this.props.item.items;

        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({id,name}) =>(
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem key={id}>
                                    
                                    <Button className="remove-btn" color="danger" size="sm" 
                                    onClick={this.onDeleteClick.bind(this,id)}>
                                    &times;
                                    </Button>
                                    {name}

                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}


ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

//maps the components state to the given reducer state
const mapStateToProps = (state) => ({
    //item => the name of the root reducer in combineReducers
    //state.item => the compnent state
    item : state.item
});

//connects this state with the property of getItems in item actions and lets the item actions access the reducer
export default connect(mapStateToProps,{getItems, deleteItem})(ShoppingList);