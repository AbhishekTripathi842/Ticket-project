import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { sendQuery } from '../../actions/userActions';
import { toast } from 'react-toastify';
const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
toast.configure();
class ContactPage extends Component{
    constructor( props ){
        super( props );
        this.state = {
            fields :{
                FirstName:'',
                LastName:'',
                Message:'',
                Email:'',
                CellPhone:''
            },
            errors:{},
            loader: false,
            btnDisable: false,
        }

        this.initialState = JSON.parse(JSON.stringify(this.state));
    }


    componentDidMount(){
        window.scrollTo(0, 0)
    }

    validateForm = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        
        if(!fields["FirstName"]){
            formIsValid = false;
            errors["FirstName"] = " First Name is required";
        }

        if(typeof fields["FirstName"] !== "undefined" && !fields["FirstName"] === false){
            if(!fields["FirstName"].match(/^[a-zA-Z]+$/)){
               formIsValid = false;
               errors["FirstName"] = "Enter Only letters";
            }
        }
        
        if(!fields["LastName"]){
            formIsValid = false;
            errors["LastName"] = " Last Name is required";
        }
        if(typeof fields["LastName"] !== "undefined" && !fields["LastName"] === false){
            if(!fields["LastName"].match(/^[a-zA-Z]+$/)){
               formIsValid = false;
               errors["LastName"] = "Enter Only letters";
            }
        }

        if(!fields["Email"]){
            formIsValid = false;
            errors["Email"] = "Email is required";
        }
        if(typeof fields["Email"] !== "undefined" && !fields["Email"] === false){
            if (!emailRegex.test(fields["Email"])) {
               formIsValid = false;
               errors["Email"] = "Email is not valid";
            }
        }

        if(!fields["CellPhone"]){
            formIsValid = false;
            errors["CellPhone"] = "Cell Phone is required";
        }
        
        if(!fields['Message']){
            formIsValid = false;
            errors['Message'] = "Message is required";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleChange = (e) => {
        let fields = this.state.fields;
        const  { value, name } = e.target
        fields[name] = value;
        this.setState({ fields });
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        if(this.validateForm()){
            this.setState({ btnDisable: true })
            await this.props.sendQuery( this.state.fields )
            console.log( this.props.query )
            if( this.props.query.response ){
                this.setState({...this.initialState})
                toast.dismiss()
                toast.success( this.props.query.message, { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
                
            }else{
                this.setState({ btnDisable: false })
                toast.dismiss()
                toast.error( this.props.query.message, { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
            }
        }
    }

    render(){
        return (
            <>
                <section className="innerBanner">
                    <Container>
                        <Row>
                            <Col sm={12}>
                                <h1>Contact Us</h1>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="loginForm eventsMain pt-0">
                    <Container>
                        <Row className="justify-content-lg-center">
                            <Col sm={12} lg={8}>
                                <Form className="p-5" onSubmit={this.handleFormSubmit}>
                                    <Row>
                                        <Col sm={12} md={6}>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control type="text" id="FirstName" name="FirstName" onChange={ (e) => this.handleChange(e)} value={this.state.fields['FirstName']}/>
                                                <span style={{color: "red", fontSize:'12px'}}>{this.state.errors["FirstName"]}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12} md={6}>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control type="text" id="LastName" name="LastName" onChange={ (e) => this.handleChange(e)} value={this.state.fields['LastName']}/>
                                                <span style={{color: "red", fontSize:'12px'}}>{this.state.errors["LastName"]}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12} md={6}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" id="Email" name="Email" onChange={ (e) => this.handleChange(e)} value={this.state.fields['Email']}/>
                                                <span style={{color: "red", fontSize:'12px'}}>{this.state.errors["Email"]}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12} md={6}>
                                            <Form.Group controlId="formBasicPhone">
                                                <Form.Label>Cell Phone</Form.Label>
                                                <Form.Control type="text" id="CellPhone" name="CellPhone" onChange={ (e) => this.handleChange(e)} value={this.state.fields['CellPhone']}/>
                                                <span style={{color: "red", fontSize:'12px'}}>{this.state.errors["CellPhone"]}</span>
                                            </Form.Group>
                                        </Col>
                                        {/* <Col sm={12} md={6}>
                                            <Form.Group controlId="formBasicQuery">
                                                <Form.Label>Ask a Question</Form.Label>
                                                <Form.Control type="Text" required/>
                                            </Form.Group>
                                        </Col> */}
                                        <Col sm={12} md={12}>
                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Message</Form.Label>
                                                <Form.Control as="textarea" rows="5" id="Message" name="Message" onChange={ (e) => this.handleChange(e)} value={this.state.fields['Message']}/>
                                                <span style={{color: "red", fontSize:'12px'}}>{this.state.errors["Message"]}</span>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div className="text-center">
                                        <Button variant="primary" type="submit" disabled={ this.state.btnDisable }> { this.state.btnDisable ? 'Wait...' : 'Submit' } </Button>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </>
        )
    }
}

const mapStateToProps = state => {
    // console.log( state );
    return {
        query: state.user.query
    }
}

const dispatchState = { sendQuery }

export default connect( mapStateToProps, dispatchState )(ContactPage);