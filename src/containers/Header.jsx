import React, { Component } from 'react';
import { Row, Col, Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions';
import  jwt_decode  from 'jwt-decode';

class Header extends Component {
    constructor(props) {
        // console.log(props)
        super(props);
    }
    componentDidUpdate(){
        // if(this.props.isError){
        //     window.location.replace('/500')
        // }
    }

    render() {
        const { loggedIn, auth } = this.props
        return (
            <header>
                <div className="topBar">
                    <Container fluid>
                        <Row className="align-items-center">
                            <Col sm={8}>
                                <ul className="d-flex align-items-center">
                                    <li className="mr-3">
                                        <span><img src={require("../assets/call-icon.png")} alt="..." /></span>
                                        +880-232-2211
                                    </li>
                                    <li>
                                        <span><img src={require("../assets/email-icon.png")} alt="..." /></span>
                                        info@myticket.com
                                    </li>
                                </ul>
                            </Col>
                            <Col sm={4}>
                                {loggedIn && auth ? 
                                    <ul className="d-flex align-items-center justify-content-md-end">
                                        <Dropdown>
                                            <Dropdown.Toggle id="dropdown-basic">
                                                Hi, {auth.FirstName}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="/purchased-tickets" >
                                                    <i className="mr-1 fa fa-ticket"/>
                                                    Purchased Tickets
                                                </Dropdown.Item>
                                                <Dropdown.Item href="/tickets-for-sale" >
                                                    <i className="mr-1 fa fa-bars"/>
                                                    Tickets For Sale
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick= {()=> {
                                                    this.props.logout();
                                                    window.location.replace('/') 
                                                }}>
                                                    <i className="mr-1 fa fa-sign-out"/>
                                                    Logout
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </ul>
                                    :
                                    <ul className="d-flex align-items-center justify-content-md-end">
                                        <li><a href="/sign-up">Sign Up</a></li>
                                        <li><a href="/sign-in">Log In</a></li>
                                    </ul>
                                }
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="mainNav">
                    <Container fluid>
                        <Row className="align-items-center">
                            <Col sm={4} lg={3}>
                                <a className="siteLogo" href="/">
                                    <img src={require("../assets/logo.png")} alt="myTicket" />
                                </a>
                            </Col>
                            <Col sm={8} lg={9}>
                                <Navbar expand="md">
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="ml-auto">
                                            <Nav.Link href="/about">About Us</Nav.Link>
                                            <Nav.Link href="/events">Events</Nav.Link>
                                            <Nav.Link href="/news">News</Nav.Link>
                                            <Nav.Link href="/contact">Contact Us</Nav.Link>
                                            <Nav.Link href={`/sell`}>Sell Tickets</Nav.Link>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Navbar>
                            </Col>
                        </Row>
                        <hr />
                    </Container>
                </div>
            </header>
        );
    }
}
const mapStateToProps = state => {
    // console.log("Header --->  ", state)
    const { user, decodedToken , loggedIn} = state.authentication
    const { errorOccured } = state
    var auth = {}
    if(state.authentication && loggedIn){
        if(decodedToken){ 
            auth = (decodedToken)
        }
        if(user){
            auth = (user.token)
        }
    }
    return { 
        auth,
        loggedIn,
        // isError: errorOccured.isError
    }
}
const dispatchStates = { logout }

export default connect(mapStateToProps, dispatchStates)(Header)