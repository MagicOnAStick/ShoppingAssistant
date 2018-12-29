import React, {Component} from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';  
import { Link } from 'react-router-dom';

class AppNavbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        };
    }
    toggle = () =>{
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){
        return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">Shoppinglist</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}></NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link className="nav-link" to="register">
                                    Sign Up
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link" to="login">
                                    Login
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link" to="/">
                                    Recipes
                                </Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
    }
}

export default AppNavbar;