import React, { Component } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { connect } from 'react-redux'; //listPurchasedTickets
import { listPurchasedTickets } from '../../actions/ticketListingActions';
import Loader from 'react-loader-spinner';
class MyBookedTickets extends Component {

    constructor(props){
      super(props)
      this.state = {
        displayMessage:'',
        sucessMessage:'',
        failedMessage:'',
        tickets:[],
        loader:false
      }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        if(!this.props.loggedIn){
            localStorage.setItem("fromLocation", window.location.href);
            this.props.history.push('/sign-in');
        }else{
            this.listMyBookedTickets()
        }
    }

    listMyBookedTickets = async () => {
        this.setState({ loader: true})
        await this.props.listPurchasedTickets();
        console.log(this.props.purchasedTickets)
        if(this.props.purchasedTickets.response){
            this.setState({
                loader:false,
                sucessMessage:this.props.purchasedTickets.tickets.length ? '' : this.props.purchasedTickets.message ,
                tickets: this.props.purchasedTickets.tickets,
                failedMessage:''
            })
        }else{
            this.setState({
                loader:false,
                failedMessage: this.props.purchasedTickets.message,
                sucessMessage:''
            })
        }
    }

    render(){
        const { sucessMessage, failedMessage, tickets, loader } = this.state
      return (
        <>
          <section className="innerBanner">
              <Container>
                  <Row>
                      <Col sm={12}>
                          <h1>Purchased Tickets</h1>
                      </Col>
                  </Row>
              </Container>
          </section>
          <section className="upcomingMain">
            <Container fluid>
                {loader 
                    ?
                    <Row className="justify-content-md-center">  
                        <Loader
                            type="ThreeDots"
                            color="#e94d13"
                            height={50}
                            width={30}
                        // timeout={3000} //3 secs
                        />
                    </Row>
                    :
                    <>
                        {( sucessMessage || failedMessage ) && 
                        <p style={{ background: sucessMessage ? '#aac1ae' : '#e5bcbc', padding:'2rem 1rem', fontStyle:'bold', fontColor:'#ffffff', fontSize:'14px', textAlign:'center'}}> 
                            { sucessMessage || failedMessage }
                        </p>}
                        <Row className="justify-content-md-center">
                            {tickets.length > 0 &&
                                tickets.map((ticket, i) => {
                                    return (
                                        <Col sm={12} lg={3} key={i}>
                                            <div className="sampleTicket">
                                                <a href="javascript:void(0)">
                                                    <img src={"../images/sampleticket.jpg"} alt="" />
                                                    <span className="download"><i className="fa fa-download"></i></span>                            
                                                </a>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </>

                }
            </Container>
          </section>
        </>
      )
    }
  }
const mapStateToProps = state => {
    const { loggedIn } = state.authentication
    const { listingResponse } = state
    return { loggedIn, purchasedTickets:listingResponse.purchasedTickets }
}

const dispatchState = { listPurchasedTickets }

export default connect(mapStateToProps, dispatchState)(MyBookedTickets);