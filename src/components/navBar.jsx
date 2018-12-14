import React, { Component } from "react";
import { Navbar, NavbarBrand, NavbarNav, NavLink, NavItem, NavbarToggler, Collapse, Dropdown, DropdownToggle, DropdownMenu, MDBIcon } from "mdbreact";
import { Link } from 'react-router-dom';

class NavBar extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { user } = this.props;
        const loca = window.location.pathname;
        
        return (
            <Navbar color="purple darken-3" dark expand="md" scrolling fixed="top">
                <NavbarBrand>
                    <Link to="/"><strong className="white-text">Tribune</strong></Link>
                </NavbarBrand>
                <NavbarToggler
                    onClick={this.toggleCollapse}
                />
                <Collapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <NavbarNav left>
                        <NavItem>
                            <NavLink to="/"></NavLink>
                        </NavItem>
                    </NavbarNav>
                    <NavbarNav right>
                        {user &&
                        <NavItem>
                            <Dropdown>
                                <DropdownToggle nav caret>
                                    {user.username}
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-default" right>
                                    <Link className="dropdown-item" to="/profile"><MDBIcon icon="leaf mr-2" /> My Profile</Link>
                                    <Link className="dropdown-item" to="/changepassword"> <MDBIcon icon="key mr-2" /> Change Password</Link>
                                    <Link className="dropdown-item" to="/logout"><MDBIcon icon="wheelchair-alt mr-2" /> Log Out</Link>
                                </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                        }
                        {!user &&
                        <NavItem>
                            {loca === "/login" ? <NavLink to="/register">Register</NavLink> : <NavLink to="/login">Login</NavLink>}
                        </NavItem>
                        }
                    </NavbarNav>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavBar;