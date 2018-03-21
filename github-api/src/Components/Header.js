import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class Header extends Component {

  onLogin(){
    this.props.onLogin();
  }

  onLogout(){
    this.props.onLogout();
  }

  render(){
    let page;

    if(this.props.accessToken){
      page = <NavItem href="#" onClick={this.onLogout.bind(this)}>Logout</NavItem>
    } else{
      page = <NavItem href="#" onClick={this.onLogin.bind(this)}>Login</NavItem>
    }

    return(
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          Git Searcher
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        {page}
      </Nav>
    </Navbar>
    )
  }
}

export default Header;
