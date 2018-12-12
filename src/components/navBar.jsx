import React, { Component } from "react";
import { Navbar, NavbarBrand, NavbarNav, NavLink, NavItem, NavbarToggler, Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Fa } from "mdbreact";
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
                            <NavLink to="/">Home</NavLink>
                        </NavItem>
                    </NavbarNav>
                    <NavbarNav right>
                        {user &&
                        <NavItem>
                            <Dropdown>
                                <DropdownToggle nav caret>
                                    <Fa icon="user" /> {user.username}
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-default" right>
                                    <Link className="dropdown-item" to="/profile">My Profile</Link>
                                    <Link className="dropdown-item" to="/changepassword">Change Password</Link>
                                    <Link className="dropdown-item" to="/logout">Log Out</Link>
                                </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                        }
                        {!user &&
                        <NavItem>
                            <NavLink to="/login">Login</NavLink>
                        </NavItem>
                        }
                    </NavbarNav>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavBar;