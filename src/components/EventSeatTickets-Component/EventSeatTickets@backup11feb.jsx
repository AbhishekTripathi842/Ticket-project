import React , {Component} from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getSingleEventById, getRecomendedEvents } from '../../actions/seatgeak-api/eventActions';
import { eventTicketListing } from '../../actions/ticketListingActions';
import Loader from 'react-loader-spinner';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
var slugify = require('slugify')
toast.configure();


class EventSeatsTicketsPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            show:false,
            eventId:props.match.params.id,
            event:{},
            venue:{},
            performers:[],
            loader:false,
            recomended:[],
            eventTicket:{},
            errorMessage:'',
            openInfo:false,
        }
    }
    componentDidMount(){
        this.getEventDetails(this.state.eventId);
    }

    // getEventDetails = async (eventId)=>{
    //     this.setState({loader:true})
    //     await this.props.getSingleEventById(eventId)
    //     console.log(this.props.eventDetail)
    //     if(this.props.eventDetail){
    //         this.setState({
    //             event:this.props.eventDetail,
    //             venue:this.props.eventDetail.venue,
    //             performers:this.props.eventDetail.performers,
    //             loader:false,
    //         }, () => {
    //             this.getRecomendedEventsList(this.state.event.id)
    //         })
    //     }else{
    //         this.setState({loader:false})
    //     }
    // }



    getEventDetails = async (eventId)=>{
        this.setState({loader:true})
        await this.props.getSingleEventById(eventId)
        console.log(this.props.eventDetail)
        if(this.props.eventDetail){
            this.setState({
                event:this.props.eventDetail,
                venue:this.props.eventDetail.venue,
                performers:this.props.eventDetail.performers,
                loader:false,
            }, () => {
                this.getRecomendedEventsList(this.state.event.id)
                this.getEventsTicketsList(this.state.event.id)
            })
        }else{
            this.setState({loader:false})
        }
    }

    getEventsTicketsList = async (eventId) => {
        this.setState({ticketsLoader: true})
        await this.props.eventTicketListing(eventId);
        console.log(this.props.listingResponse)
        if(this.props.listingResponse.response === false){
            this.setState({
                errorMessage:this.props.listingResponse.message
            })
        }else {
            if (this.props.listingResponse.eventTickets.length){
                this.setState({ 
                    eventTicket: this.props.listingResponse.eventTickets
                })
            }else{
                this.setState({
                    eventTicket: this.props.listingResponse.eventTickets,
                    errorMessage:'No Tickets Available'
                })
            }
        }
    }

    getRecomendedEventsList = async (eventId) =>{
        this.setState({loader:true})
        await this.props.getRecomendedEvents(eventId);
        // console.log(this.props.recomended)
        if(this.props.recomended.recommendations.length > 0){
            this.setState({
                recomended:this.props.recomended.recommendations,
                loader:false
            })
        }else{
            this.setState({loader:false})
        }
    }

    handleClose = () => this.setState({show:false});
    handleShow = () => this.setState({show:true});

    getWeekDay = (date) => {
        var gsDayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        var d = new Date(date);
        return gsDayNames[d.getDay()];
    }

    convertDate = (date) => {
        var gsDayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
          var d = new Date(date);
          var year = (new Date().getFullYear() === d.getFullYear()) ? '' : ", " +  d.getFullYear()
          var monthName = d.toLocaleString('default', { month: 'short' })
          return  gsDayNames[d.getDay()] + " " + (monthName) + " " + d.getDate() +  year + " at" + " " + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }

    convertDateForTicketInfo = (date) => {
        var d = new Date(date);
        var monthName = d.toLocaleString('default', { month: 'short' })
        return  (monthName) + " " + d.getDate() +  ", " +  d.getFullYear();
    }

    convertTimeForTicketInfo = (date) => {
        var d = new Date(date);
        return  d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }


    timeTo12Format = (time24)=> {
        var ts = time24;
        var H = +ts.substr(0, 2);
        var h = (H % 12) || 12;
        h = (h < 10)?("0"+ h):h;  // leading 0 at the left for 1 digit hours
        var ampm = H < 12 ? " AM" : "PM";
        ts = h + ts.substr(2, 3) + " " + ampm;
        return ts;
    }

    stringToSlug = (string) => {
        var str = string.toLowerCase();
        return slugify(str, {
            replacement: '-',  // replace spaces with replacement character, defaults to `-`
            remove: /[*+~.,()'"!:@]/g, // remove characters that match regex, defaults to `/[*+~.()'"!:@]/g`
            lower: false,      // convert to lower case, defaults to `false`
            strict: false,     // strip special characters except replacement, defaults to `false`
            locale: 'vi'       // language code of the locale to use
          })
    }

    dateConvertForSlug = (date) => {
        var d = new Date(date);
        var year = (new Date().getFullYear() === d.getFullYear()) ? '' : ", " +  d.getFullYear()
        var monthName = d.toLocaleString('default', { month: 'short' })
        return  (monthName) + " " + d.getDate() +  year
    }

    truncate = (source, size = 45) => {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }
      

    componentDidUpdate(prevProps) {
        const newEventId = this.props.match.params.id
        const prevEventId = prevProps.match.params.id
        if(newEventId !== prevEventId){
            this.setState({
                eventId:newEventId,
                loader:false,
            }, () => this.getEventDetails( this.state.eventId ))
        }
    }

    openTicketInfo = (e) => {
        console.log("kkkkkkk",e)
        // this.setState({openInfo: true})
    }

    render(){
        const { show, loader, event, venue, performers, recomended , eventTicket, errorMessage, openInfo} =  this.state
        // const tickets_count = {...event.stats}
        // console.log("Seats of Events", event)
        // console.log("Seats of Events", recomended)
        return (
            <>
                <section className="innerBanner">
                    <Container>
                        <Row>
                            <Col sm={12}>
                                {loader ?
                                    <Loader
                                        type="ThreeDots"
                                        color="#e94d13"
                                        height={50}
                                        width={30}
                                        timeout={3000} //3 secs
                                    />
                                :
                                <h1> 
                                    { event.title } Tickets
                                </h1>}
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="ticketPage p-0">
                    <div className="breadcrumb">
                        <Container fluid>
                            <Row className="align-items-center">
                                <Col sm={12} lg={6}>
                                    { loader ?
                                        <Loader
                                            type="ThreeDots"
                                            color="#fff"
                                            height={50}
                                            width={30}
                                            timeout={3000} //3 secs
                                        />
                                    :
                                    <h3> 
                                        { event.title }
                                        <small> 
                                            { this.convertDate(event.datetime_local) } - { venue.name }, { venue.display_location } 
                                        </small>
                                    </h3>}
                                </Col>
                                <Col sm={12} lg={6}>
                                    <div className="infoCol text-right">
                                        <Button role="button" onClick={ this.handleShow } variant="outline-primary">Info</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>                
                    </div>
                </section>
                <section className="mapMain">
                    <Container fluid>
                        <Row>
                            <Col sm={12} lg={6} style={{borderRight: '1.5px solid #E04A02', padding:'1rem 0rem'}}>
                            {   loader ?
                                    <Loader
                                    type="ThreeDots"
                                    color="#e94d13"
                                    height={50}
                                    width={30}
                                    timeout={3000} //3 secs
                                    />
                                :
                                <>
                                    {eventTicket && eventTicket.Tickets && eventTicket.Tickets.length
                                        ?
                                        !openInfo ? 
                                            eventTicket.Tickets.map((e,i) => {
                                                return(
                                                    <ul key={i} style={{padding:'0rem 1rem'}}>
                                                        <li className="m-1">
                                                            { 
                                                            e.TicketType === 'R' 
                                                            ? 
                                                            <span> Regular Ticket </span> 
                                                            :
                                                            <> 
                                                                <span>Section { e.SeatSection.toUpperCase() } - Row { e.SeatRow }</span>
                                                                {/* <span><small>{ e.SeatNumber } tickets</small></span> */}
                                                            </>
                                                        }
                                                            
                                                            <Button role="button" variant="primary" onClick={()=> {
                                                                    this.openTicketInfo(e)
                                                                    this.setState({openInfo: true})
                                                            }}>{e.Currency} {e.DisplayPrice}/ea</Button>
                                                        </li>
                                                    </ul>
                                                )
                                            })
                                            :
                                            <div>
                                                <span style={{cursor:'pointer', display: 'block'}} onClick={()=> this.setState({openInfo: false})}><i className="fa fa-chevron-left"></i> Back</span>
                                                <p className="mt-3" style={{display: 'block'}}> How many tickets ? </p>
                                                <span>
                                                    <ul>
                                                        <li style={{display: 'inline'}}>1</li>
                                                        <li style={{display: 'inline'}}>2</li>
                                                        <li style={{display: 'inline'}}>3</li>
                                                    <li style={{display: 'inline'}}>4</li>
                                                    <li style={{display: 'inline'}}>5</li>
                                                    <li style={{display: 'inline'}}>6</li>
                                                </ul>
                                            </span>

                                            <p className="mt-3">
                                                <span> 
                                                        Price: (Qty.) X USD 00.0
                                                    <small style={{display: "block"}}> {`(No fees included)`} </small> 
                                                </span>
                                            </p>

                                        </div>
                                    :
                                    <div style={{padding:'0rem 1rem'}}>
                                       { errorMessage && 
                                       <p style={{background: '#e5bcbc', padding:'2rem 1rem', fontStyle:'bold', fontColor:'#ffffff', fontSize:'12px', textAlign:'center'}}> 
                                            { errorMessage }
                                        </p>}
                                    </div>
                                    }
                                
                                    {event && 
                                    <div className="text-center" style={{marginTop:'3rem', marginBottom:'3rem'}}>
                                        <Link to={
                                            { 
                                                pathname:'/sell',
                                                state:{ 
                                                eventId: event.id,
                                                eventDetail: {
                                                        eventId : event.id,
                                                        Title: event.title,
                                                        EventDateTime: event.datetime_local,
                                                        Venue:{
                                                            Name: venue.name,
                                                            Address: venue.address,
                                                            City: venue.city,
                                                            State: venue.state,
                                                            PostalCode: venue.postal_code,
                                                        }
                                                }
                                                }
                                            }
                                        }
                                        className="sell-button"
                                        style={{textDecoration: 'none', color:'#E04A02', border:'1px solid #E04A02', padding:'1rem 2rem'}}> 
                                            Sell tickets to this event
                                        </Link>
                                    </div>
                                    
                                    }
                                </>
                            }

                            
                            </Col>
                            <Col sm={12} lg={6}>
                                <div className="mapArea">
                                    <h4 style={{textAlign:'center'}}>
                                        Map Coming Soon
                                    </h4>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                {recomended.length > 0 && 
                <Container>
                    <hr style={{textAlign:"center", left:'50%'}}></hr>
                    <section> 
                        <Row className="justify-content-md-left mb-3">
                            <h5>Related Events </h5>
                        </Row>
                        <Row> 
                            {recomended.map((e, i) =>{
                                var eventName = this.stringToSlug(e.event.title);
                                var eventLocation = this.stringToSlug(e.event.venue.name + " " + e.event.venue.display_location + " " + this.dateConvertForSlug(e.event.datetime_local.split('T')[0]) + " " + this.timeTo12Format(e.event.datetime_local.split('T')[1]));
                                var toxonomy  = e.event.taxonomies[0].name
                                return (
                                    <Col sm={12} md={4} lg={4} key={i} style={{marginTop:'2px', padding:'0.35rem'}}>
                                        <Link style={{color:'#000', fontStyle:'bold'}} to={`/${eventName}/${eventLocation}/${toxonomy}/${e.event.id}`}>
                                            <span>
                                                {this.truncate(`${e.event.title} Tickets`)}
                                            </span>
                                            <span style={{borderBottom:'1px solid #e94d13', display:'block', content:''}}></span>
                                            <span style={{fontSize:'11px', display:'block'}}>
                                                {this.convertDateForTicketInfo(e.event.datetime_local)} | {this.convertTimeForTicketInfo(e.event.datetime_local)}
                                            </span>
                                        </Link>
                                    </Col>
                                )
                            })}
                        </Row>
                    </section>
                </Container>}
                <Modal className="infoModal" show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>{event.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={12} lg={6} className="text-center">
                                <h3> Stadium Seating Chart</h3>
                                <img src="/images/map.png" alt="" className="m-auto"/>
                            </Col>
                            <Col sm={12} lg={6} className="contentSec">
                                <h3>Event Details</h3>
                                <p><span>Address</span> {venue.address}, {venue.extended_address}</p>
                                <p><span>Date</span> {this.convertDateForTicketInfo(event.datetime_local)} </p>
                                <p><span>Time</span> {this.convertTimeForTicketInfo(event.datetime_local)} </p>
                                <p><span>Performer</span> 
                                {performers.length &&
                                    performers.map((performer,i) => { 
                                       return performer.name + ((i !== performers.length - 1) ? ', ' : '')
                                    })
                                }
                                </p>
                                <p><span>Venue</span> {venue.name}</p>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
const mapStateToProps = state => {
    // console.log(state)
    const { eventsByToxonomy, recomendation, listingResponse } = state
    return { 
        eventDetail: eventsByToxonomy.eventsByCategory,
        recomended: recomendation.recomendedResults,
        listingResponse:listingResponse.sellticket
    }
}
const dispatchState = { getSingleEventById, getRecomendedEvents, eventTicketListing }

export default connect(mapStateToProps, dispatchState)(EventSeatsTicketsPage);