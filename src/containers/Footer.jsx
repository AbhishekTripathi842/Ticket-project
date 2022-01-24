import React, { Component } from 'react';
import {Container, Row, ListGroup, Col} from 'react-bootstrap';

class Footer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <footer>
                <Container>
                    <Row>
                        <Col sm={12}>
                            <ListGroup as="ul" className="footList">
                                <ListGroup.Item href="/about" as="a">
                                    <i className="fa fa-angle-double-right"></i> About
                                </ListGroup.Item>
                                <ListGroup.Item href="#" as="a">
                                    <i className="fa fa-angle-double-right"></i> Partnership
                                </ListGroup.Item>
                                <ListGroup.Item href="/help&support" as="a">
                                    <i className="fa fa-angle-double-right"></i> Help & Support
                                </ListGroup.Item>
                                <ListGroup.Item href="/news" as="a">
                                    <i className="fa fa-angle-double-right"></i> Event News
                                </ListGroup.Item>
                                <ListGroup.Item href="/contact" as="a">
                                    <i className="fa fa-angle-double-right"></i> Contact Us
                                </ListGroup.Item>
                                <ListGroup.Item href="/faq" as="a">
                                    <i className="fa fa-angle-double-right"></i> FAQ
                                </ListGroup.Item>
                                <ListGroup.Item href="#" as="a">
                                    <i className="fa fa-angle-double-right"></i> Sitemap
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col sm={12}>
                            <h3>Connect With Us</h3>
                            <ListGroup as="ul" className="socialGroup">
                                <ListGroup.Item href="#" as="a" target="_blank">
                                    <i className="fa fa-facebook"></i>
                                </ListGroup.Item>
                                <ListGroup.Item href="#" as="a" target="_blank">
                                    <i className="fa fa-twitter"></i>
                                </ListGroup.Item>
                                <ListGroup.Item href="#" as="a" target="_blank">
                                    <i className="fa fa-youtube-play"></i>
                                </ListGroup.Item>
                            </ListGroup>
                            <hr/>
                        </Col>
                        <Col sm={12} md={6}>
                            <ListGroup as="ul" className="bottomList">
                                <ListGroup.Item href="#" as="a">
                                    Privacy Policy
                                </ListGroup.Item>
                                <ListGroup.Item href="#" as="a">
                                    Terms of Use
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col sm={12} md={6} className="text-md-right text-center">
                            <p>Copyright &copy; 2020 myTicket. All Rights Reserved</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        )
    }
}

export default Footer;