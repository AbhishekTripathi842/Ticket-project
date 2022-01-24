import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { userLogin, logout, sendEmailVerication, resetPassword } from '../../actions/userActions';
import { toast } from "react-toastify";
import { Modal } from "react-responsive-modal";

toast.configure()
// const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            fields: {
                Email:'',
                Password:'',
            },
            modalFields:{
                Email:''
            },
            errors: {},
            mErrors:{},
            remember:false,
            disable: false,
            mdisable:false, // for Model Button
            openModel:false,
            emailVerification:false,
            resetPassword:false,
            toLocation:localStorage.getItem("fromLocation") ? localStorage.getItem("fromLocation") : null // coming from checkout page if user doesn't have an account
        }
    }

    
    componentDidMount = () =>{
        window.scrollTo(0, 0)
    //    console.log(this.state.toLocation)
        if(this.props.auth.loggedIn){
            return this.props.history.push('/')
        }else{
             this.props.logout();
             let rememberMe = JSON.parse(localStorage.getItem('RememberMe'));
             if(rememberMe){
                 console.log(rememberMe)
                 let fields = this.state.fields
                 fields['Email'] = rememberMe.email
                 fields['Password'] = rememberMe.password
                 this.setState({ fields })
             }
        }
    }

    handleValidation = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if(!fields["Email"]){
            formIsValid = false;
            errors["Email"] = "Email is required";
        }

        if(!fields["Password"]){
            formIsValid = false;
            errors["Password"] = " Password is required";
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
            await this.props.userLogin(this.state.fields)
            if(this.props.auth.user.response){
                this.setState({ disable:false })
                toast.dismiss()
                toast.success(this.props.auth.user.message, { position: toast.POSITION.TOP_CENTER, hideProgressBar: true });
                if(this.state.toLocation !=null && this.state.toLocation != ''){
                    setTimeout( () => {
                        window.location.replace(this.state.toLocation);
                    }, 1500)
                }else{
                    setTimeout( () => {
                        this.props.history.push('/events');
                    }, 1500)
                }
                
            }else{
                toast.dismiss()
                toast.error(this.props.auth.user.message, { position: toast.POSITION.TOP_CENTER, hideProgressBar: true });
                this.setState({ disable:false });
            }
        }else{
            this.setState({ disable:false });
        }
    }

    onCloseModel = () => {
        let modalFields = this.state.modalFields;
        modalFields.Email = ''
        this.setState({ openModel: false, mdsable: false, modalFields });
    }

    handleModelFieldChange = (field, e) =>{
        let modalFields = this.state.modalFields;
        modalFields[field] = e.target.value;
        this.setState({modalFields});
    }

    handleModelFieldValidation = () =>{
        let modalFields = this.state.modalFields;
        let mErrors = {};
        let formIsValid = true;
        if(!modalFields["Email"]){
            formIsValid = false;
            mErrors["Email"] = "Email is required";
        }
        this.setState({mErrors: mErrors});
        return formIsValid;
    }


    handleModelSubmit = async (e) =>{
        const { emailVerification, resetPassword } = this.state
        e.preventDefault();
        if(this.handleModelFieldValidation()){
            this.setState({ mdisable:true });            
            if(emailVerification) await this.props.sendEmailVerication(this.state.modalFields)
            if(resetPassword) await this.props.resetPassword(this.state.modalFields)
            if(this.props.user.response){
                this.setState({ mdisable:false });
                toast.dismiss()
                toast.success(this.props.user.message, { position: toast.POSITION.TOP_CENTER, hideProgressBar: true });
                setTimeout( () => {
                        this.onCloseModel();
                }, 1500)
            }else{
                toast.dismiss()
                toast.error(this.props.user.message, { position: toast.POSITION.TOP_CENTER, hideProgressBar: true });
                this.setState({ mdisable:false });
            }
        }else{
            this.setState({ mdisable:false });
        }
    }

    handleRememberMe = () => {
        let remember  = this.state.remember;

        if(this.state.remember){
            remember = false
        }else{
            remember = true
        }

        this.setState({ remember }, ()=>{
            if ( this.state.remember ){
                const data = { email: this.state.fields['Email'], password: this.state.fields['Password']}
                localStorage.setItem('RememberMe', JSON.stringify(data));
            }else{
                if( localStorage.getItem('RememberMe') ){
                    localStorage.removeItem('RememberMe')
                }
            }
        });
    }

    render(){
        const { emailVerification, resetPassword } = this.state
        return (
            <>  
                <Modal 
                    open={this.state.openModel} 
                    onClose={this.onCloseModel} 
                    center 
                    styles={{
                    modal: {
                        animation: `${
                            this.state.openModel ? 'customEnterAnimation' : 'customLeaveAnimation'
                        } 500ms`,
                    },
                    }}
                >   
                    <h4 className="mb-3">{emailVerification ? 'Re-send Email Verification link' : 'Reset Password'}</h4>
                     <Form onSubmit = {this.handleModelSubmit}>
                        <Row className="align-items-lg-stretch">
                            <Col sm={12}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" refs="mEmail" onChange={(e) => this.handleModelFieldChange("Email", e)} value={this.state.modalFields["Email"]} required/>
                                    <span style={{color: "red", fontSize:'12px'}}>{this.state.mErrors["Email"]}</span>
                                </Form.Group>
                                <div className="text-center">
                                    <Button variant="primary" type="submit" disabled={this.state.mdisable}>
                                            {this.state.mdisable ? 'wait...' : 'Submit'}
                                    </Button>
                                </div>
                            </Col>                                
                        </Row>
                    </Form>
                </Modal>
                <section className="innerBanner">
                    <Container>
                        <Row>
                            <Col sm={12}>
                                <h1>Log In</h1>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="loginForm">
                    <Container>
                        <Row className="justify-content-lg-center">
                            <Col sm={12} lg={10}>
                                <Form onSubmit = {this.handleSubmit}>
                                    <Row className="align-items-lg-stretch">
                                        <Col sm={12} lg={6}>
                                            <div className="formTitle">
                                                <h3><span>Welcome back to</span></h3>
                                                <img src="/images/logo.png" alt=".." />
                                            </div>
                                        </Col>
                                        <Col sm={12} lg={6} className="my-4">
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
                                            <Form.Group controlId="formBasicCheckbox" className="d-flex align-items-center justify-content-between" >
                                                <Form.Check type="checkbox" label="Remember Me" name="remember" onChange={(e)=> this.handleRememberMe(e)} checked={this.state.remember}/>
                                                <a href="javascript:void(0)" onClick={()=> this.setState({openModel:true, emailVerification: false, resetPassword: true})} >Forgot Password</a>
                                            </Form.Group>
                                            <div className="text-center">
                                            <Button variant="primary" type="submit" disabled={this.state.disable}>
                                                    {this.state.disable ? 'Logging...' : 'Log In'}
                                                </Button>
                                                <p className="m-0 mt-2"><a href="javascript:void(0)" onClick={()=> this.setState({openModel:true, emailVerification: true, resetPassword: false})}>Resend Verification Link?</a></p>
                                                <p className="m-0 mt-2">Don't have an account? <a href="/sign-up">Create an account</a></p>                                                
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
    return { user: user.user, auth: authentication }
}
const dispatchState = { userLogin, logout, sendEmailVerication, resetPassword }

export default connect(mapStateToProps, dispatchState)(LoginPage);