import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { userSignup } from '../../actions/userActions';
// import { history } from '../../helpers/history';
import { toast } from "react-toastify";

toast.configure()
const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

class SignUpPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            fields: {
                FirstName:'',
                LastName:'',
                Email:'',
                Password:'',
            },
            errors: {},
            disable: false,
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        if(this.props.auth.loggedIn){
            return this.props.history.push('/')
        }
    }

    handleValidation = () => {
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

        if(!fields["Password"]){
            formIsValid = false;
            errors["Password"] = " Password is required";
        }
        if(typeof fields["Password"] !== "undefined" && !fields["Password"] === false){
            if(fields["Password"].length < 8){
               formIsValid = false;
               errors["Password"] = "Password length must be minimum 8";
            }
        }
       
        this.setState({errors: errors});
        return formIsValid;
    }

    handleChange = (field, e) => {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
    }

    handleSubmit = async (e) => {  
        e.preventDefault();
        if(this.handleValidation()){
            this.setState({ disable:true });
            await this.props.userSignup(this.state.fields)
            console.log(this.props.user)
            if(this.props.user.response){
                this.setState({ disable:false })
                toast.dismiss()
                toast.success(this.props.user.message, { position: toast.POSITION.TOP_CENTER, hideProgressBar: true });
                setTimeout( () => {
                        console.log("Redirect To Login");
                        this.props.history.push('/sign-in');
                }, 1500)
            }else{
                toast.dismiss()
                toast.error(this.props.user.message, { position: toast.POSITION.TOP_CENTER, hideProgressBar: true });
                this.setState({ disable:false });
            }
        }else{
            this.setState({ disable:false });
        }
    }

    render(){
        return (
            <>
                <section className="innerBanner">
                    <Container>
                        <Row>
                            <Col sm={12}>
                                <h1>Sign Up</h1>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="loginForm">
                    <Container>
                        <Row className="justify-content-lg-center">
                            <Col sm={12} lg={8}>
                                <Form onSubmit = {this.handleSubmit}>
                                    <Row className="align-items-lg-stretch">
                                        <Col sm={12} lg={6}>
                                            <div className="formTitle">
                                                <h3><span>Welcome to</span></h3>
                                                <img src="/images/logo.png" alt=".." />
                                                <h3>Create An Account</h3>
                                            </div>
                                        </Col>
                                        <Col sm={12} lg={6} className="my-4">
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control type="text" refs="FirstName" onChange={(e) => this.handleChange("FirstName", e)} value={this.state.fields["FirstName"]} required />
                                                <span style={{color: "red", fontSize:'12px'}}>{this.state.errors["FirstName"]}</span>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control type="text" refs="LastName" onChange={(e) => this.handleChange("LastName", e)} value={this.state.fields["LastName"]} required />
                                                <span style={{color: "red", fontSize:'12px'}}>{this.state.errors["LastName"]}</span>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" refs="Email" onChange={(e) => this.handleChange("Email", e)} value={this.state.fields["Email"]} required />
                                                <span style={{color: "red", fontSize:'12px'}}>{this.state.errors["Email"]}</span>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" refs="Password" onChange={(e) => this.handleChange("Password", e)} value={this.state.fields["Password"]} required />
                                                <span style={{color: "red", fontSize:'12px'}}>{this.state.errors["Password"]}</span>
                                            </Form.Group>
                                            <div className="text-center">
                                                <Button variant="primary" type="submit" disabled={this.state.disable}>
                                                    {this.state.disable ? 'Processing...' : 'Sign Up'}
                                                </Button>
                                                <p className="m-0 mt-2">Already have an account? <a href="/sign-in">Log In here</a></p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </>
        );
    }
}
const mapStateToProps = state => {
    const { user, authentication } = state
    return { user:user.user, auth:authentication }
}
const dispatchStates = { userSignup }

export default connect(mapStateToProps, dispatchStates)(SignUpPage);