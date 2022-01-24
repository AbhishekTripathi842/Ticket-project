import React from 'react';
import { Container, Row, Col, Media, Card } from 'react-bootstrap';

function AboutPage() {
    return (
        <>
            <section className="innerBanner">
                <Container>
                    <Row>
                        <Col sm={12}>
                            <h1>About Us</h1>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="aboutPage">
                <Container>
                    <Row>
                        <Col sm={12} className="mb-3">
                            <Media>
                                <img
                                    width={200}
                                    height={200}
                                    className="mr-3 rounded-circle"
                                    src="/images/search-tickets.png"
                                    alt="..."
                                />
                                <Media.Body>
                                    <h5><span>Search Tickets</span>The largest inventory on the web</h5>
                                    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                    ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                                    tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                                    Donec lacinia congue felis in faucibus.</p>
                                </Media.Body>
                            </Media>
                            <Media>
                                <Media.Body>
                                    <h5><span>Save MOney</span>The most bang for your dollar</h5>
                                    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                    ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                                    tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                                    Donec lacinia congue felis in faucibus.</p>
                                </Media.Body>
                                <img
                                    width={200}
                                    height={200}
                                    className="ml-3 rounded-circle"
                                    src="/images/save-money.png"
                                    alt="..."
                                />
                            </Media>
                            <Media>
                                <img
                                    width={200}
                                    height={200}
                                    className="mr-3 rounded-circle"
                                    src="/images/seated.png"
                                    alt="..."
                                />
                                <Media.Body>
                                    <h5><span>Be Seated</span>Know where you'll sit</h5>
                                    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                    ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                                    tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                                    Donec lacinia congue felis in faucibus.</p>
                                </Media.Body>
                            </Media>
                        </Col>
                        <Col sm={4}>
                            <Card>
                                <Card.Img variant="top" src="./images/like.svg" />
                                <Card.Body>
                                    <Card.Title>Recommendations</Card.Title>
                                    <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card>
                                <Card.Img variant="top" src="./images/notification.svg" />
                                <Card.Body>
                                    <Card.Title>Notifications</Card.Title>
                                    <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card>
                                <Card.Img variant="top" src="./images/customer-service.svg" />
                                <Card.Body>
                                    <Card.Title>Support</Card.Title>
                                    <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default AboutPage;