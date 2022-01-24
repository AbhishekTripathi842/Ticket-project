import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { display_categories } from '../../categories/categories-list';

class EventsPage extends Component {
    constructor(){
        super();
    }

    render(){
        return (
            <>
                <section className="innerBanner">
                    <Container>
                        <Row>
                            <Col sm={12}>
                                <h1>Events</h1>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="eventsMain pt-0">
                    <Container>
                        <Row>
                            <Col sm={6} md={4}>
                                <a href="#" className="eventList">
                                    <img src="./images/concert.jpg" alt="Concerts" />
                                    <span className="titleOverlay">Concerts</span>
                                </a>
                            </Col>
                            <Col sm={6} md={4}>
                                <a href="#" className="eventList">
                                    <img src="./images/sports.jpg" alt="Sports" />
                                    <span className="titleOverlay">NFL</span>
                                </a>
                            </Col>
                            <Col sm={6} md={4}>
                                <a href="#" className="eventList">
                                    <img src="./images/comedy.jpg" alt="Comedy" />
                                    <span className="titleOverlay">Comedy</span>
                                </a>
                            </Col>
                            <Col sm={6} md={4}>
                                <a href="#" className="eventList">
                                    <img src="./images/broadway.jpg" alt="Broadway" />
                                    <span className="titleOverlay">Broadway</span>
                                </a>
                            </Col>
                            <Col sm={6} md={4}>
                                <a href="#" className="eventList">
                                    <img src="./images/nba.jpg" alt="NBA" />
                                    <span className="titleOverlay">NBA</span>
                                </a>
                            </Col>
                            <Col sm={6} md={4}>
                                <a href="#" className="eventList">
                                    <img src="./images/theatre.jpg" alt="Theaters" />
                                    <span className="titleOverlay">Theaters</span>
                                </a>
                            </Col>
                            <Col sm={6} md={4}>
                                <a href="#" className="eventList">
                                    <img src="./images/concert.jpg" alt="Concerts" />
                                    <span className="titleOverlay">Fighting</span>
                                </a>
                            </Col>
                            <Col sm={6} md={4}>
                                <a href="#" className="eventList">
                                    <img src="./images/sports.jpg" alt="Sports" />
                                    <span className="titleOverlay">Golf</span>
                                </a>
                            </Col>
                            <Col sm={6} md={4}>
                                <a href="#" className="eventList">
                                    <img src="./images/comedy.jpg" alt="Comedy" />
                                    <span className="titleOverlay">Tennis</span>
                                </a>
                            </Col>
                            <Col sm={6} md={4}>
                                <a href="#" className="eventList">
                                    <img src="./images/broadway.jpg" alt="Broadway" />
                                    <span className="titleOverlay">NCAA FB</span>
                                </a>
                            </Col>
                            <Col sm={6} md={4}>
                                <a href="#" className="eventList">
                                    <img src="./images/nba.jpg" alt="NBA" />
                                    <span className="titleOverlay">Nba</span>
                                </a>
                            </Col>
                            <Col sm={6} md={4}>
                                <a href="#" className="eventList">
                                    <img src="./images/theatre.jpg" alt="Theaters" />
                                    <span className="titleOverlay">Theaters</span>
                                </a>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </>
        );
    }
}

export default EventsPage;