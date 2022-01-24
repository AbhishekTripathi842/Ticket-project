import React from 'react';
import { Container, Row, Col, Button, Accordion, Card } from 'react-bootstrap';

function FaqPage() {
    return (
        <>
            <section className="innerBanner">
                <Container>
                    <Row>
                        <Col sm={12}>
                            <h1>FAQ's</h1>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="helpPage faqPage">
                <Container>
                    <Row>
                        <Col sm={12} lg={7}>
                            <Accordion>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Can I trust the tickets sold on myTicket?
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        Can I change, cancel, or get a refund for my tickets after an order is placed?
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="1">
                                    <Card.Body>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                        Why aren't my orchestra tickets aren't in the center of the row?
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="2">
                                    <Card.Body>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="3">
                                        My tickets are closer than what I ordered. What happened?
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="3">
                                    <Card.Body>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="4">
                                        Do I have to print my tickets or can I use my phone to get into the event?
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="4">
                                    <Card.Body>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="5">
                                            Can I add another ticket to my order after it’s been placed?
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="5">
                                    <Card.Body>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="6">
                                        My tickets are closer than what I ordered. What happened?
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="6">
                                    <Card.Body>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="7">
                                        Do I have to print my tickets or can I use my phone to get into the event?
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="7">
                                    <Card.Body>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="8">
                                            Can I add another ticket to my order after it’s been placed?
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="8">
                                    <Card.Body>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default FaqPage;