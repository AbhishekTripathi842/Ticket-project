import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

function NewsPage() {
    return (
        <>
            <section className="innerBanner">
                <Container>
                    <Row>
                        <Col sm={12}>
                            <h1>Event News</h1>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="newsMain">
                <Container>
                    <Row>
                        <Col sm={12} md={4}>
                            <div className="newsCol">
                                <div className="imageWrap">
                                    <a href="#">
                                        <img src="./images/news.jpg" alt="" />
                                        <span className="dateTag"><strong>10</strong>Oct 2020</span>
                                    </a>
                                </div>
                                <h3><a href="#">Lorem ipsum dolor sit amet</a></h3>
                                <p>Lorem ipsum dolor sit amet, consectetur ipis adipisicing elit, sed do eiusmod tempor incididunt ut labore et do...</p>
                                <a className="btn-read" href="#">Read More</a>
                            </div>
                        </Col>
                        <Col sm={12} md={4}>
                            <div className="newsCol">
                                <div className="imageWrap">
                                    <a href="#">
                                        <img src="./images/news.jpg" alt="" />
                                        <span className="dateTag"><strong>10</strong>Oct 2020</span>
                                    </a>
                                </div>
                                <h3><a href="#">Lorem ipsum dolor sit amet</a></h3>
                                <p>Lorem ipsum dolor sit amet, consectetur ipis adipisicing elit, sed do eiusmod tempor incididunt ut labore et do...</p>
                                <a className="btn-read" href="#">Read More</a>
                            </div>
                        </Col>
                        <Col sm={12} md={4}>
                            <div className="newsCol">
                                <div className="imageWrap">
                                    <a href="#">
                                        <img src="./images/news.jpg" alt="" />
                                        <span className="dateTag"><strong>10</strong>Oct 2020</span>
                                    </a>
                                </div>
                                <h3><a href="#">Lorem ipsum dolor sit amet</a></h3>
                                <p>Lorem ipsum dolor sit amet, consectetur ipis adipisicing elit, sed do eiusmod tempor incididunt ut labore et do...</p>
                                <a className="btn-read" href="#">Read More</a>
                            </div>
                        </Col>
                        <Col sm={12} md={4}>
                            <div className="newsCol">
                                <div className="imageWrap">
                                    <a href="#">
                                        <img src="./images/news.jpg" alt="" />
                                        <span className="dateTag"><strong>10</strong>Oct 2020</span>
                                    </a>
                                </div>
                                <h3><a href="#">Lorem ipsum dolor sit amet</a></h3>
                                <p>Lorem ipsum dolor sit amet, consectetur ipis adipisicing elit, sed do eiusmod tempor incididunt ut labore et do...</p>
                                <a className="btn-read" href="#">Read More</a>
                            </div>
                        </Col>
                        <Col sm={12} md={4}>
                            <div className="newsCol">
                                <div className="imageWrap">
                                    <a href="#">
                                        <img src="./images/news.jpg" alt="" />
                                        <span className="dateTag"><strong>10</strong>Oct 2020</span>
                                    </a>
                                </div>
                                <h3><a href="#">Lorem ipsum dolor sit amet</a></h3>
                                <p>Lorem ipsum dolor sit amet, consectetur ipis adipisicing elit, sed do eiusmod tempor incididunt ut labore et do...</p>
                                <a className="btn-read" href="#">Read More</a>
                            </div>
                        </Col>
                        <Col sm={12} md={4}>
                            <div className="newsCol">
                                <div className="imageWrap">
                                    <a href="#">
                                        <img src="./images/news.jpg" alt="" />
                                        <span className="dateTag"><strong>10</strong>Oct 2020</span>
                                    </a>
                                </div>
                                <h3><a href="#">Lorem ipsum dolor sit amet</a></h3>
                                <p>Lorem ipsum dolor sit amet, consectetur ipis adipisicing elit, sed do eiusmod tempor incididunt ut labore et do...</p>
                                <a className="btn-read" href="#">Read More</a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default NewsPage;