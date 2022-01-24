import React, { Component } from 'react';
import { Row, Container, Col, Button, Table, Badge } from 'react-bootstrap';
import { listTicketsForSale, removeFromListing } from '../../actions/ticketListingActions';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import { Modal } from "react-responsive-modal";
import { toast } from "react-toastify";
toast.configure()

class SaleTickets extends Component {

    constructor(props){
      super(props)
      this.state = {
          ticketsList:[],
          meta:{},
          errorMessage:'',
          loader:false,
          removeLoader:false,
          openModel:false,
          ticketFileName:'',
          loaderId:null
      }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        if(!this.props.loggedIn){
            localStorage.setItem("fromLocation", window.location.href);
            this.props.history.push('/sign-in');
        }else{
            this.ticketsForSale()
        }
    }

    ticketsForSale = async () => {
        this.setState({loader:true})
        await this.props.listTicketsForSale();
        console.log(this.props.listingResponse)
        if(this.props.listingResponse.response){
            this.setState({
                ticketsList:this.props.listingResponse.ticketsForSale,
                errorMessage:'',
                loader:false
            })
        }else{
            this.setState({
                ticketsList:[],
                errorMessage:this.props.listingResponse.message,
                loader:false
            })
        }
    }

    removeTicket = async (ticketId) => {
        this.setState({ removeLoader: true, loaderId:ticketId })
        console.log( ticketId )
        await this.props.removeFromListing(ticketId)
        console.log(this.props.removeResponse)
        if(this.props.removeResponse.response){
            this.setState({  removeLoader: false }, () => this.ticketsForSale())
            toast.dismiss()
            toast.success(this.props.removeResponse.message, { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
        }else{
            this.setState({  removeLoader: false }, () => this.ticketsForSale())
            toast.dismiss()
            toast.error( this.props.removeResponse.message, { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
        }
    }

    onCloseModel = () => {
        this.setState({ openModel: false, ticketFileName:'' });
    }

    render(){
        const { ticketsList, errorMessage, loader, removeLoader, loaderId } = this.state
        // console.log(`${process.env.REACT_APP_SERVER_PATH}/ticket/${this.state.ticketFileName}`)
      return (
        <>
            <section className="innerBanner">
                <Container>
                    <Row>
                        <Col sm={12}>
                            <h1>Tickets for Sale</h1>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="upcomingMain" >
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
                            ticketsList.length  ?
                                <Row className="justify-content-md-center">
                                    <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            {/* <th>#</th> */}
                                            <th>Event Details</th>
                                            <th>Receiving Price </th>
                                            <th>Status</th>
                                            <th>Action</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {ticketsList.map((t, i) => {
                                  
                                        return (
                                            <tr key={i}>
                                                {/* <td>2</td> */}
                                                <td>
                                                    <strong> {t.Event.Title}</strong>
                                                    <small style={{display: "block"}}> {`${t.Event.Venue.Name} ${t.Event.Venue.City} ${t.Event.Venue.State}`}</small>
                                                </td>
                                                <td>
                                                    {t.Currency} {t.SellerReceivingPrice}
                                                </td>
                                                <td>
                                                    <Badge style={{background: t.ListingStatus ? t.SoldOutStatus ? '#aac1ae' : '#aac1ae' : '#e5bcbc' , padding:'0.5rem 1rem', fontStyle:'bold' }}> 
                                                        {t.ListingStatus 
                                                            ? 
                                                                t.SoldOutStatus 
                                                                ? 
                                                                <span> <i className="fa fa-check"></i> Sold </span> 
                                                                : 
                                                                'Listed' 
                                                            : 
                                                            <span >
                                                                 <i className="fa fa-times"></i> Not Verified 
                                                            </span>
                                                        } 
                                                    </Badge>
                                                </td>
                                                <td>
                                                    {!t.SoldOutStatus ?

                                                        <span style={{  cursor: 'pointer', padding:'0.5rem 1rem', fontStyle:'bold' }} onClick={()=> this.setState({ openModel: true, ticketFileName:t.OriginalEventTicket })}>
                                                            View Ticket
                                                        </span>
                                                        :
                                                        <span style={{  pointerEvents: 'none', padding:'0.5rem 1rem', fontStyle:'bold' }}>
                                                            <strike> View Ticket  </strike> 
                                                        </span>
                                                    }
                                                </td>
                                                <td>
                                                    { !t.SoldOutStatus 
                                                     
                                                     ?
                                                        <>
                                                        {(removeLoader && (loaderId === t._id)) 
                                                        ?
                                                        <span> 
                                                            <Loader type="TailSpin" color="#e94d13" height={25} width={25} /> 
                                                        </span>
                                                        :
                                                        <span> 
                                                            <i className="fa fa-trash" style={{ cursor: 'pointer', color:'#000' }} onClick={ ()=> this.removeTicket(t._id) }></i>
                                                        </span>}
                                                        </>
                                                    :
                                                        <strike> 
                                                            <i className="fa fa-ban" style={{ pointerEvents: 'none', color:'#000' }}></i>
                                                        </strike>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                    </Table>
                                </Row>

                            :
                                <p style={{background: '#e5bcbc', padding:'2rem 1rem', fontStyle:'bold', fontColor:'#ffffff', fontSize:'12px', textAlign:'center'}}> 
                                    { errorMessage }
                                    {/* <Button role="button" variant="primary" onClick={()=> this.props.history.push('/sell')}>Create Your First Listing</Button> */}
                                </p>
                        }     
                </Container>
            </section>
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
                <embed className="mt-2 mb-2 pdf-viewer" src={`${process.env.REACT_APP_SERVER_PATH}/ticket/${this.state.ticketFileName}`} width="100%" height="100%"/>
            </Modal>    
        </>
      )
    }
  }
const mapStateToProps = state => {
    // console.log("check out page ", state.authentication)
    const { loggedIn } = state.authentication
    const { listingResponse } = state
    return { loggedIn, listingResponse:listingResponse.sellticket, removeResponse:listingResponse.deleteTicket }
}

const dispatchState = { listTicketsForSale, removeFromListing }

export default connect(mapStateToProps, dispatchState)(SaleTickets);