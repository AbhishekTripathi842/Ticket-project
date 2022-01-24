import React, { Component } from 'react';
import { Row, Container, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
class CheckoutPage extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            localStorage.setItem("fromLocation", window.location.href);
            // this.props.history.push({pathname: '/sign-in', fromLocation:window.location.href})
            this.props.history.push('/sign-in');
        }
    }


    render() {
        return (
            <>
                <section className="innerBanner">
                    <Container>
                        <Row>
                            <Col sm={12}>
                                <h1>Checkout</h1>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="checkOut">
                    <Container fluid>
                        <Row className="justify-content-center">
                            <Col sm={12} lg={10}>
                                <div class="cart">
                                    <div class="promoCode">
                                        <label for="promo">Have A Promo Code?</label>
                                        <div className="form-group">
                                            <input type="text" name="promo" placholder="Enter Code" className="form-control" />
                                            <Button type="submit" variant="primary">Apply</Button>                                        
                                        </div>
                                    </div>
                                    <ul class="cartWrap">
                                        <li class="items odd">
                                            <div class="infoWrap">
                                                <div class="cartSection">
                                                    <img src="http://lorempixel.com/output/technics-q-c-300-300-4.jpg" alt="" class="itemImg" />
                                                    <h3>Item Name 1</h3>
                                                    <p> <input type="text" class="qty" placeholder="3" /> x $5.00</p>
                                                </div>
                                                <div class="prodTotal cartSection">
                                                    <p>$15.00</p>
                                                </div>
                                                <div class="cartSection removeWrap"><a href="#" class="remove">x</a></div>
                                            </div>
                                        </li>
                                        <li class="items even">
                                            <div class="infoWrap">
                                                <div class="cartSection">
                                                    <img src="http://lorempixel.com/output/technics-q-c-300-300-4.jpg" alt="" class="itemImg" />
                                                    <h3>Item Name 1</h3>
                                                    <p> <input type="text" class="qty" placeholder="3" /> x $5.00</p>
                                                </div>
                                                <div class="prodTotal cartSection"><p>$15.00</p></div>
                                                <div class="cartSection removeWrap"><a href="#" class="remove">x</a></div>
                                            </div>
                                        </li>
                                        <li class="items odd">
                                            <div class="infoWrap">
                                                <div class="cartSection">
                                                    <img src="http://lorempixel.com/output/technics-q-c-300-300-4.jpg" alt="" class="itemImg" />
                                                    <h3>Item Name 1</h3>
                                                    <p><input type="text" class="qty" placeholder="3" /> x $5.00</p>
                                                </div>
                                                <div class="prodTotal cartSection"><p>$15.00</p></div>
                                                <div class="cartSection removeWrap"><a href="#" class="remove">x</a></div>
                                            </div>
                                        </li>
                                        <li class="items even">
                                            <div class="infoWrap">
                                                <div class="cartSection info">
                                                    <img src="http://lorempixel.com/output/technics-q-c-300-300-4.jpg" alt="" class="itemImg" />
                                                    <h3>Item Name 1</h3>
                                                    <p> <input type="text" class="qty" placeholder="3" /> x $5.00</p>
                                                </div>
                                                <div class="prodTotal cartSection"><p>$15.00</p></div>
                                                <div class="cartSection removeWrap"><a href="#" class="remove">x</a></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="subtotal cf">
                                    <ul>
                                        <li class="totalRow"><span class="label">Subtotal</span><span class="value">$35.00</span></li>
                                        <li class="totalRow"><span class="label">Shipping</span><span class="value">$5.00</span></li>
                                        <li class="totalRow"><span class="label">Tax</span><span class="value">$4.00</span></li>
                                        <li class="totalRow final"><span class="label">Total</span><span class="value">$44.00</span></li>
                                        <li class="totalRow"><Button variant="primary" role="button" type="submit">Checkout</Button></li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </>
        )
    }
}
const mapStateToProps = state => {
    console.log("check out page ", state.authentication)
    const { loggedIn } = state.authentication
    return { loggedIn }
}

export default connect(mapStateToProps, null)(CheckoutPage)