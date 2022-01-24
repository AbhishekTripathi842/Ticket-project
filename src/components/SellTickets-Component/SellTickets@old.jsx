import React, { Component } from 'react';
import { Row, Container, Col, Form, Button, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getEventsOnSearch } from '../../actions/seatgeak-api/eventActions';
import { uploadTicketListing, removeUploadedFile } from '../../actions/ticketListingActions';
import Loader from 'react-loader-spinner';
import Dropzone from "react-dropzone";
import axios from 'axios';
import ProgressBar from 'react-customizable-progressbar';
import { authHeader } from '../../helpers/auth-header';
import { toast } from 'react-toastify';

class SellTickets extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchInput: '',
            pageNumber: 1,
            totalEvents: 0,
            eventsList: [],
            searchList: false, // not in use
            loader: false,
            removeLoader:false,
            selectedEvent: {}, 
            eventId: null,
            // ----  Steps Starts ----- //
            showSearchEvent: true,
            showSelectedEvent: false,
            showUploadTicketFile: false,
            ShowOriginalPrice: false,
            ShowSellingPrice: false,
            ShowAddBankDetail: false,
            // ---- Steps Ends----- //
            enableSucessStep:false , // Finish Step,
            listingSuccessResponse:false, // Listing Response true/false
            listingSuccessMessage:'', // Listing Success/Failure Message in Response 

            btnDisable:true,
            // ticketFile:[],
            ticketFilePreview:null,
            showFileTypeError:'',
            ticketType:'S', // by default seats- seating will be selected
            ticketInfo:false,
            fileUploading:false,
            uploadedInPercent:0 ,


            // --- Ticket Details --//
            sellTicketsDetails:{
                SeatSection:'',
                SeatRow:'',
                SeatNumber:'',
                Currency:'',
                TicketOriginalPrice:'',
                SellerSellingPrice:'',
                DisplayPrice:'',
                SellerReceivingPrice:'',
                OriginalEventTicket:'',
                AdditionalTicketInfo:'',
            }
        }
    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            // this.props.history.push({pathname:'/sign-in', fromLocation:window.location.href});
            localStorage.setItem("fromLocation", window.location.href);
            this.props.history.push('/sign-in');
        }
    }

    convertDate = (date) => {
        var d = new Date(date);
        var gsDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var year = (new Date().getFullYear() === d.getFullYear()) ? '' : ", " + d.getFullYear();
        var weekDay = (new Date().getFullYear() === d.getFullYear()) ? gsDayNames[d.getDay()] + ', ' : '';
        var monthName = d.toLocaleString('default', { month: 'short' })
        return weekDay + (monthName) + " " + d.getDate() + year
    }

    timeTo12Format = (time24) => {
        var ts = time24;
        var H = +ts.substr(0, 2);
        var h = (H % 12) || 12;
        h = (h < 10) ? ("0" + h) : h;  // leading 0 at the left for 1 digit hours
        var ampm = H < 12 ? " AM" : "PM";
        ts = h + ts.substr(2, 3) + " " + ampm;
        return ts;
    }

    getEventsListBySearch = async (searchInput, pageNumber) => {
        // console.log(searchInput, pageNumber)
        // console.log(this.state)
        this.setState({ loader: true })
        await this.props.getEventsOnSearch(searchInput, pageNumber)
        // console.log(this.props.searchResults)
        if (this.props.searchResults) {
            if (this.props.searchResults.events.length) {
                this.setState({
                    eventsList: this.props.searchResults.events,
                    totalEvents: this.props.searchResults.meta.total,
                    loader: false,
                    searchList: true
                })
            } else {
                this.setState({ loader: false, searchList: false })
            }
        } else {
            this.setState({ loader: false })
        }
    }

    handleChange = (e) => {
        let searchInput = this.state.searchInput;
        searchInput = e.target.value;
        this.setState({
            searchInput,
            pageNumber: 1,
            totalEvents: 0,
            eventsList: [],
            searchList: false,
            loader: false,
        }, () => {

            if (searchInput.trim().length) {
                this.getEventsListBySearch(this.state.searchInput, this.state.pageNumber)
            } else {
                this.setState({
                    searchInput: '',
                    pageNumber: 1,
                    totalEvents: 0,
                    eventsList: [],
                    searchList: false,
                    loader: false,
                })
            }
        })
    }

    

    changeStep = (step) => {
        switch (step) {
            case 1: this.setState({
                showSearchEvent: true,
                showSelectedEvent: false,
                showUploadTicketFile: false,
                ShowOriginalPrice: false,
                ShowSellingPrice: false,
                ShowAddBankDetail: false,
                enableSucessStep:false,
            });
                break;
            case 2: this.setState({
                showSearchEvent: false,
                showSelectedEvent: true,
                showUploadTicketFile: false,
                ShowOriginalPrice: false,
                ShowSellingPrice: false,
                ShowAddBankDetail: false,
                enableSucessStep:false,
            });
                break;
            case 3: this.setState({
                showSearchEvent: false,
                showSelectedEvent: false,
                showUploadTicketFile: true,
                ShowOriginalPrice: false,
                ShowSellingPrice: false,
                ShowAddBankDetail: false,
                enableSucessStep:false,
            });
                break;
            case 4: this.setState({
                showSearchEvent: false,
                showSelectedEvent: false,
                showUploadTicketFile: false,
                ShowOriginalPrice: true,
                ShowSellingPrice: false,
                ShowAddBankDetail: false,
                enableSucessStep:false,
            });
                break;
            case 5: this.setState({
                showSearchEvent: false,
                showSelectedEvent: false,
                showUploadTicketFile: false,
                ShowOriginalPrice: false,
                ShowSellingPrice: true,
                ShowAddBankDetail: false,
                enableSucessStep:false,
            });
                break;
            case 6: this.setState({
                showSearchEvent: false,
                showSelectedEvent: false,
                showUploadTicketFile: false,
                ShowOriginalPrice: false,
                ShowSellingPrice: false,
                ShowAddBankDetail: true,
                enableSucessStep:false,
            });
                break;
            case 7: this.setState({
                showSearchEvent: false,
                showSelectedEvent: false,
                showUploadTicketFile: false,
                ShowOriginalPrice: false,
                ShowSellingPrice: false,
                ShowAddBankDetail: false,
                enableSucessStep:true,
            })
                break;
            default: break;
        }
    }

    // -------------------- Functions For Steps Starts------------------ //
    onSelectEvent = (eventId, eventDetail) => {
        this.setState({ eventId, selectedEvent: eventDetail, btnDisable:false }, () => console.log(this.state));
        this.changeStep(2)
    }

    // ------------>  At Step 1
    showSearchEvent = () => {
        const { eventsList, loader, totalEvents, btnDisable} = this.state;
        const pageNumbers = Math.ceil(totalEvents / 10);
        const nextPage = () => {
            this.setState({ pageNumber: this.state.pageNumber + 1 }, () => {
                this.getEventsListBySearch(this.state.searchInput, this.state.pageNumber)
            })
        }
        const prevPage = () => {
            this.setState({ pageNumber: this.state.pageNumber - 1 }, () => {
                this.getEventsListBySearch(this.state.searchInput, this.state.pageNumber)
            })
        }
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col sm={8}>
                        <Form>
                            <h2 className="mb-4 fa-3x">Select Event</h2>
                            <h4 className="mb-3 font-weight-normal">Which event would you like to sell tickets for?</h4>
                            <Form.Group controlId="formBasicEmail" className="text-right">
                                <Form.Control type="text" autoComplete="nope" className="form-control py-4 w-100" placeholder="Search for an event" onChange={(e) => this.handleChange(e)} value={this.state.searchInput} required />
                                <section className="searchResult">
                                    {
                                        loader ?
                                            <div className="loaderDiv"><Loader type="TailSpin" color="#e94d13" height={25} width={25} /></div>
                                            :
                                            eventsList.length > 0
                                            &&
                                            eventsList.map((e, i) => {
                                                var eventDetail = {}
                                                var venue = {}
                                                eventDetail.eventId = e.id
                                                eventDetail.Title = e.title
                                                eventDetail.EventDateTime = e.datetime_local
                                                venue.Name = e.venue.name
                                                venue.Address = e.venue.address
                                                venue.City = e.venue.city
                                                venue.State = e.venue.state
                                                venue.PostalCode = e.venue.postal_code
                                                eventDetail.Venue = venue
                                                return (
                                                    <div className="eventCell" key={i} onClick={() => this.onSelectEvent(e.id, eventDetail)} style={{ borderColor: this.state.eventId && this.state.eventId === e.id ? '#e94d13' : '' , cursor: 'pointer'}}>
                                                        <h3>
                                                            <span>
                                                                {e.title}
                                                                <small>
                                                                    {this.convertDate(e.datetime_local.split('T')[0])} {e.venue.name}, {e.venue.display_location}
                                                                </small>
                                                            </span>
                                                        </h3>
                                                    </div>
                                                )
                                            })
                                    }
                                    
                                </section>
                                {eventsList.length > 0 &&
                                    <span className="mt-2" style={{float:'left'}}>
                                        {this.state.pageNumber !== 1 && <span style={{ cursor: 'pointer', color: '#e94d13' }} onClick={() => prevPage()}><strong>Prev</strong> </span>}

                                        <strong> {this.state.pageNumber} / {pageNumbers} </strong>

                                        {this.state.pageNumber < pageNumbers && <span style={{ cursor: 'pointer', color: '#e94d13' }} onClick={() => nextPage()}> <strong> Next </strong></span>}
                                    </span>
                                }
                                {/* <Button type="submit" variant="primary" className="mt-2 py-2" disabled={btnDisable} onClick={() => this.changeStep(2)}>Continue</Button> */}
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }


    //  --------------------------
    onSelectTicketType = (code) => {
        this.setState({ ticketType:code })
    }
    //  --------------------------

    // ------------>  At Step 2


    showSelectedEvent = () => {
        const { selectedEvent } = this.state
        const ticketTypes = [{code:'R', type:'Regular'}, {code:'S', type:'Seats - Seating'}]
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm={12} xl={8}>
                        <div className="stepDiv">
                            <h4 className="mb-2 font-weight-normal">Selected Event</h4>
                            <div className="eventCell" style={{ border: '1px solid #e94d13', padding:'1.125rem 1rem', borderRadius:'5px'}}>
                                <h3>
                                    <span>
                                        {selectedEvent.Title}
                                        <small>
                                            {this.convertDate(selectedEvent.EventDateTime.split('T')[0])} - {selectedEvent.Venue.Name}, {selectedEvent.Venue.City} {selectedEvent.Venue.State} {selectedEvent.Venue.PostalCode}
                                        </small>
                                    </span>
                                </h3>
                            </div>
                            <h4 className="mt-3 font-weight-normal">What kind of tickets do you have?</h4>
                            <p className="mt-2">Keep in mind that you can only sell tickets for one type at a time. If you have multiple types of tickets, you’ll need to create a separate listing for each of them.</p>
                            {ticketTypes.map((ticket,i) => {
                                // console.log(this.state.ticketType)
                                return (
                                    <div className="eventCell" key={i} onClick={() => this.onSelectTicketType(ticket.code)} style={{  padding:'1.125rem 1rem', borderRadius:'5px', border: this.state.ticketType && this.state.ticketType === ticket.code ? '1px solid #e94d13' : '1px solid #FCFCFC' , cursor: 'pointer'}}>
                                        <h3>
                                            <span> {ticket.type}
                                                <small>
                                                    {this.convertDate(selectedEvent.EventDateTime.split('T')[0])} - {selectedEvent.Venue.Name}, {selectedEvent.Venue.City} {selectedEvent.Venue.State} {selectedEvent.Venue.PostalCode}
                                                </small>
                                            </span>
                                        </h3>
                                    </div>
                                )
                            })}
                            <div className="buttons-group d-flex justify-content-between align-items-center mt-3">
                                <Button type="submit" variant="secondary" onClick={() => this.changeStep(1)}><i className="fa fa-chevron-left"></i> Previous</Button>
                                <Button type="submit" variant="primary" className="py-2" onClick={() => this.changeStep(3)}>Continue</Button>                            
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }


    handleTicketDetailInput = (field, e) => {
        let sellTicketsDetails = this.state.sellTicketsDetails;
        sellTicketsDetails[field] = e.target.value;
        this.setState({sellTicketsDetails});
    }

    handleValidation = () =>{
        let sellTicketsDetails = this.state.sellTicketsDetails;
        let Valid = false;
        if(sellTicketsDetails['SeatSection']){
            Valid = true 
        }else{
            
            return Valid = false;
        }

        if(sellTicketsDetails['SeatRow']){
            Valid = true 
        }else{
            return Valid = false;
        }

        if(sellTicketsDetails['SeatNumber']){
            Valid = true 
        }else{
            return Valid = false;
        }

        return Valid;
    }

    removeFile = async (file) => {
        console.log(this.state.sellTicketsDetails['OriginalEventTicket'])
        this.setState({ removeLoader:true })
        await this.props.removeUploadedFile(file)
        console.log(this.props.removeResponse)
        if(this.props.removeResponse.response){
            let sellTicketsDetails = this.state.sellTicketsDetails
            sellTicketsDetails['OriginalEventTicket'] = ''
            this.setState({
                ticketInfo:false,
                showFileTypeError:'',
                sellTicketsDetails,
                ticketFilePreview:'',
                removeLoader:false
            })
        }else{
            this.setState({
                removeLoader:false
            })
            toast.dismiss()
            toast.error(this.props.removeResponse.message, { position: toast.POSITION.TOP_CENTER, hideProgressBar: true });
        }        
    }

    // ------------>  At Step 3
    showUploadTicketFile =  () => {
        
        const handleDrop = async acceptedFiles => {
            
            const file = acceptedFiles[0]
            if(file.type == "application/pdf"){
                console.log(file)
                this.setState({ 
                    // ticketFile: file.name,
                    ticketFilePreview: URL.createObjectURL(file),
                    showFileTypeError:'',
                    // ticketInfo:true,
                    fileUploading:true,
                })
                const fileData = new FormData()
                fileData.append('file',file)
                try{
                    const options = {
                        headers: { "Authorization":authHeader() },
                        onUploadProgress: (progressEvent) => {
                            var {loaded, total} = progressEvent;
                            var percent = Math.floor((loaded * 100) / total);
                            this.setState({
                                uploadedInPercent:percent
                            })
                            // console.log(  `${loaded/1024}kb of ${total/1024}kb |  ${percent}%`)
                        }
                    }
                    const res = await axios.post(`${process.env.REACT_APP_END_POINT}/v1/upload`, fileData, options)
                    const result = res.data;
                    console.log(result)
                    if(result){
                        if(result.response){
                            let sellTicketsDetails = this.state.sellTicketsDetails;
                            sellTicketsDetails['OriginalEventTicket'] = result.filename;
                            setTimeout(()=>{
                                this.setState({
                                    fileUploading:false,
                                    ticketInfo:true,
                                    showFileTypeError:'',
                                    sellTicketsDetails,
                                })
                            }, 1500) 
                        }else{
                            this.setState({
                                showFileTypeError:result.message,
                                fileUploading:false,
                                ticketFilePreview:null,
                                uploadedInPercent:null
                            })
                        }
                    }else{
                        this.setState({
                            showFileTypeError:'Failed To Upload',
                            fileUploading:false,
                            ticketFilePreview:null,
                            uploadedInPercent:null
                        })
                    }
                }catch(error){
                    this.setState({
                        showFileTypeError:'Failed To Upload',
                        fileUploading:false,
                        ticketFilePreview:null,
                        uploadedInPercent:null
                    })
                }
                
            }else{
                this.setState({showFileTypeError:'Its not a valid Ticket File'})
            } 
        }
        const { ticketInfo, ticketType, fileUploading, removeLoader } = this.state
        if(ticketType === 'S'){
            var isValid = this.handleValidation()
        }else{
            var isValid = true
        }
        
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm={12} xl={8}>
                        <div className="stepDiv">
                            <h2 className="mb-4 fa-3x">{ticketInfo ? "Add your ticket details" : ' Add Your ticket'}</h2>
                            <h4 className="mb-3 font-weight-normal">
                                {ticketInfo ?
                                'Buyers will feel more confident buying your ticket.'
                                :
                                'Fans will only be able to see your tickets once they’ve bought them.'
                                }
                            </h4>
                            {(!ticketInfo && !fileUploading) && <label className="fileUpload" for="ticketUpload">
                                {/* <input type="file" name="file" id="ticketUpload" multiple /> */}
                                <Dropzone onDrop={handleDrop} multiple={false}>
                                    {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
                                        const additionalClass = isDragAccept ? "accept" : isDragReject ? "reject" : '';  
                                        return (
                                            <div {...getRootProps({ className: `dropzone ${additionalClass}` })}>
                                                <input {...getInputProps()} />
                                                {isDragActive ?
                                                    <> 
                                                        <svg id="color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                            <path d="M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm-17 1h4v-8h2v8h4l-5 6-5-6z" fill="#2196f3"/>
                                                        </svg>
                                                        <p><strong>Drop file here</strong></p>
                                                    </>
                                                :   
                                                    <>
                                                        <svg id="color" viewBox="0 0 24 24">
                                                            <path d="m14.25 0h-11.5c-1.52 0-2.75 1.23-2.75 2.75v15.5c0 1.52 1.23 2.75 2.75 2.75h6.59c-.54-1.14-.84-2.41-.84-3.75 0-1.15.22-2.25.64-3.26.2-.51.45-1 .74-1.45.65-1.01 1.49-1.87 2.48-2.54.51-.35 1.05-.64 1.63-.86.93-.39 1.95-.61 3.01-.63v-5.76c0-1.52-1.23-2.75-2.75-2.75z" fill="#eceff1"/><g fill="#90a4ae"><path d="m14 9c0 .05 0 .1-.01.14-.58.22-1.12.51-1.63.86h-8.36c-.55 0-1-.45-1-1s.45-1 1-1h9c.55 0 1 .45 1 1z"/><path d="m9.88 12.54c-.29.45-.54.94-.74 1.45-.04.01-.09.01-.14.01h-5c-.55 0-1-.45-1-1s.45-1 1-1h5c.38 0 .72.22.88.54z"/><path d="m8 6h-4c-.552 0-1-.448-1-1s.448-1 1-1h4c.552 0 1 .448 1 1s-.448 1-1 1z"/></g><path d="m17.25 24c-3.722 0-6.75-3.028-6.75-6.75s3.028-6.75 6.75-6.75 6.75 3.028 6.75 6.75-3.028 6.75-6.75 6.75z" fill="#2196f3"/><path d="m17.25 21c-.552 0-1-.448-1-1v-5.5c0-.552.448-1 1-1s1 .448 1 1v5.5c0 .552-.448 1-1 1z" fill="#fff"/><path d="m20 18.25h-5.5c-.552 0-1-.448-1-1s.448-1 1-1h5.5c.552 0 1 .448 1 1s-.448 1-1 1z" fill="#fff"/>
                                                        </svg>
                                                        <p><strong>Drag or click to select file</strong></p>
                                                    </>
                                                }
                                                <p>Make Sure to Upload Original Ticket, one at a time. If Its found to be duplicate you may be banned from using services</p>
                                            </div>
                                        )
                                    }}
                                </Dropzone>
                            </label>}
                            {this.state.showFileTypeError &&

                            <div style={{textAlign:"center", marginTop:'1rem'}}>
                                <h4 style={{color:"#ff0000"}}><strong>{this.state.showFileTypeError}</strong></h4>
                            </div>
                            }
                            {this.state.fileUploading &&
                                <Row style={{textAlign:"center"}}>
                                    <Col sm={12} style={{backgroundColor: '#000000', zIndex:'222'}}>
                                        <embed className="mt-2" src={this.state.ticketFilePreview} width="100%" height="300"/>
                                        <ProgressBar 
                                            progress={this.state.uploadedInPercent} 
                                            radius={100}
                                            trackTransition= "1s ease"
                                            strokeWidth={4}
                                            strokeColor="indianred"
                                            trackStrokeWidth={4}
                                            pointerRadius={8}
                                            pointerStrokeWidth={5}
                                            pointerStrokeColor="indianred"
                                        >

                                            <div className="indicator" style={{color:"#e94d13"}}>
                                                {/* <div> {this.state.uploadedInPercent < 100 ? `Uploading... ` : ` Uploaded`} {this.state.uploadedInPercent}%</div> */}
                                                <div> {this.state.uploadedInPercent}% </div>
                                                {this.state.uploadedInPercent ===  100 &&  <div> Redirecting...</div>}
                                            </div>
                                        </ProgressBar>
                                    </Col>
                                </Row>
                            }
                            {(this.state.ticketFilePreview && ticketInfo) 
                                && 
                                <Row>
                                    <Col sm={12} md={4} lg={4}>
                                        <embed className="mt-2" src={this.state.ticketFilePreview} width="100%" height="250"/>
                                        <p onClick={()=> this.removeFile(this.state.sellTicketsDetails['OriginalEventTicket'])} style={{cursor:'pointer', pointerEvents: removeLoader ? 'none' : 'auto', padding:'0.5rem 0'}}>
                                            {removeLoader ? 
                                            <> 
                                                <Loader type="TailSpin" color="#e94d13" height={15} width={15} style={{display:'inline'}}/> Removing...
                                            </>
                                            : 
                                            <> 
                                                <i className="fa fa-trash"></i> Remove
                                            </>
                                            }
                                        </p>
                                    </Col>
                                    {(ticketType === 'R') 

                                    ?
                                        
                                    <Col sm={12} md={8} lg={8}>
                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Additional Information (optional) </Form.Label>
                                            <Form.Control as="textarea" style={{minHeight:215}} name="AdditionalTicketInfo" onChange={(e) => this.handleTicketDetailInput('AdditionalTicketInfo', e)} value={this.state.sellTicketsDetails['AdditionalTicketInfo']} />
                                        </Form.Group>
                                    </Col>
                                    :  
                                    <Col sm={12} md={8} lg={8}>
                                        <Form.Group style={{display:'block'}}>
                                            <Form.Label>Section</Form.Label>
                                            <Form.Control type="text" name="SeatSection" onChange={(e) => this.handleTicketDetailInput('SeatSection', e)} value={this.state.sellTicketsDetails['SeatSection']}/>
                                        </Form.Group>
                                        <Form.Group style={{display:'block'}}>
                                            <Form.Label>Row</Form.Label>
                                            <Form.Control type="text" name="SeatRow" onChange={(e) => this.handleTicketDetailInput('SeatRow', e)} value={this.state.sellTicketsDetails['SeatRow']}/>
                                        </Form.Group>
                                        <Form.Group style={{display:'block'}}>
                                            <Form.Label>Seat No.</Form.Label>
                                            <Form.Control type="text" name="SeatNumber" onChange={(e) => this.handleTicketDetailInput('SeatNumber', e)} value={this.state.sellTicketsDetails['SeatNumber']}/>
                                        </Form.Group>
                                    </Col>
                                    }
                                </Row>
                            }
                            <div className="buttons-group d-flex justify-content-between align-items-center mt-3">
                                <Button type="submit" variant="secondary" onClick={() => this.changeStep(2)}><i className="fa fa-chevron-left"></i> Previous</Button>
                                {ticketInfo && <Button type="submit" variant="primary" className="py-2" disabled={ !isValid} onClick={() => this.changeStep(4)}>Continue</Button>}                            
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }

    handleOriginalPriceInput = (field, e) => {
        let sellTicketsDetails = this.state.sellTicketsDetails;

        if(field === 'TicketOriginalPrice'){
            if(!isNaN(e.target.value)){
                sellTicketsDetails[field] = Number(e.target.value);
            }
        }else{
            sellTicketsDetails[field] = e.target.value;
        }
        
        this.setState({sellTicketsDetails});
    }

    handle_Step4_Validation = () =>{
        let sellTicketsDetails = this.state.sellTicketsDetails;
        let Valid = false;
        // console.log(this.state.sellTicketsDetails)
        if(sellTicketsDetails['Currency']){
            Valid = true 
        }else{
            return Valid = false;
        }

        if(sellTicketsDetails['TicketOriginalPrice']){
            Valid = true 
        }else{
            return Valid = false;
        }
        return Valid;
    }

    // ------------>  At Step 4
    showOriginalPrice = () => {
        let isValid = this.handle_Step4_Validation()
        // console.log(isValid)
        return (
            <Container>
                <Row className="justify-content-md-center">
                <Col sm={12} xl={9}>
                        <div className="stepDiv">
                            <h2 className="mb-4 fa-3x">Add the original price per ticket</h2>
                            <h4 className="mb-3 font-weight-normal">Make sure to include the service fees.</h4>
                            <Form>
                                <Row>
                                    <Col sm={3} xl={2}>
                                        <Form.Group>
                                            <Form.Control as="select" onChange={(e) => this.handleOriginalPriceInput('Currency', e)} value={this.state.sellTicketsDetails['Currency']}>
                                                <option value="" selected>Currency</option>
                                                <option value="USD">USD</option>
                                                <option value="CAD">CAD</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={9} xl={10}>
                                        <Form.Group>
                                            <Form.Control type="text" name="TicketOriginalPrice" onChange={(e) => this.handleOriginalPriceInput('TicketOriginalPrice', e)} value={this.state.sellTicketsDetails['TicketOriginalPrice']}/>
                                            <span>/ticket</span>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={3}>
                                        <p><strong>Total</strong></p>
                                    </Col>
                                    <Col sm={9}>
                                        <p className="text-right"><strong>{this.state.sellTicketsDetails['Currency']} {this.state.sellTicketsDetails['TicketOriginalPrice'] || '00.0'}  </strong> for 1 ticket</p>
                                    </Col>
                                </Row>
                            </Form>
                            <div className="buttons-group d-flex justify-content-between align-items-center mt-3">
                                <Button type="submit" variant="secondary" onClick={() => this.changeStep(3)}><i className="fa fa-chevron-left"></i> Previous</Button>
                                <Button type="submit" variant="primary" className="py-2" disabled={!isValid} onClick={() => this.changeStep(5)}>Continue</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }

    handleSellingPriceInput = (field, e) => {
        let sellTicketsDetails = this.state.sellTicketsDetails;

        if(field === 'SellerSellingPrice'){
            if(!isNaN(e.target.value)){
                sellTicketsDetails[field] = Number(e.target.value);
            }
        }else{
            sellTicketsDetails[field] = e.target.value;
        }                
        this.setState({sellTicketsDetails});
    }

    handle_Step5_Validation = () =>{
        let sellTicketsDetails = this.state.sellTicketsDetails;
        let Valid = false;
        // console.log(this.state.sellTicketsDetails)
        if(sellTicketsDetails['Currency']){
            Valid = true 
        }else{
            return Valid = false;
        }

        if(sellTicketsDetails['SellerSellingPrice']){
            Valid = true 
        }else{
            return Valid = false;
        }
        return Valid;
    }

    // ------------>  At Step 5
    showSellingPrice = () => {
        let isValid = this.handle_Step5_Validation();
        let sellTicketsDetails = this.state.sellTicketsDetails;
        sellTicketsDetails['SellerReceivingPrice'] = Number(this.state.sellTicketsDetails['SellerSellingPrice']) - Number((this.state.sellTicketsDetails['SellerSellingPrice']/100)*5);
        sellTicketsDetails['DisplayPrice'] = Number(this.state.sellTicketsDetails['SellerSellingPrice']) + Number((this.state.sellTicketsDetails['SellerSellingPrice']/100)*(5+3));
        let SellerReceivingPrice = sellTicketsDetails['SellerReceivingPrice'] || '';
        let DisplayPrice = sellTicketsDetails['DisplayPrice'] || '';
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm={12} xl={8}>
                        <div className="stepDiv">
                            <h2 className="mb-4 fa-3x">Set your ticket price</h2>
                            <h4 className="mb-3 font-weight-normal">Enter your price manually!</h4>
                            <Form>
                                <Row>
                                    <Col sm={3} xl={2}>
                                        <Form.Group>
                                            <Form.Control as="select" onChange={(e) => this.handleOriginalPriceInput('Currency', e)} value={this.state.sellTicketsDetails['Currency']}>
                                                <option value="" selected>Currency</option>
                                                <option value="USD">USD</option>
                                                <option value="CAD">CAD</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={9} xl={10}>
                                        <Form.Group>
                                            <Form.Control type="text" name="SellerSellingPrice" onChange={(e) => this.handleOriginalPriceInput('SellerSellingPrice', e)} value={this.state.sellTicketsDetails['SellerSellingPrice']}/>
                                            <span>/ticket</span>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={12}>
                                        {/* <Tabs defaultActiveKey="original" id="tab-example">
                                            <Tab eventKey="original" title="$122.23 (Original)">
                                                <OriginalPrice />
                                            </Tab>
                                            <Tab eventKey="maximum" title="$144.46 (Maximum)">
                                                <MaximumPrice />
                                            </Tab>
                                        </Tabs> */}
                                         <ul className="priceFund">
                                            <li>
                                                <p style={{float:'left'}}> You'll receive &nbsp; 
                                                    <span> Your price minus 5% service fee</span>
                                                </p>
                                                <p style={{float:'right', fontStyle:'bold'}}>
                                                    {SellerReceivingPrice ?  `${this.state.sellTicketsDetails['Currency']} ${SellerReceivingPrice}` : '-'} / ticket
                                                </p>
                                            </li>
                                            <li>
                                                <p style={{float:'left'}}>Buyers will pay &nbsp; 
                                                    <span> Your price plus 5% service fee and 3% transaction fee</span>
                                                </p>
                                                <p style={{float:'right', fontStyle:'bold'}}>
                                                    {DisplayPrice ? `${this.state.sellTicketsDetails['Currency']} ${this.state.sellTicketsDetails['DisplayPrice']}` : '-'} / ticket
                                                </p>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Form>
                            <div className="buttons-group d-flex justify-content-between align-items-center mt-3">
                                <Button type="submit" variant="secondary" onClick={() => this.changeStep(4)}><i className="fa fa-chevron-left"></i> Previous</Button>
                                <Button type="submit" variant="primary" className="py-2" disabled={!isValid} onClick={() => {
                                    this.setState({
                                        sellTicketsDetails
                                    })
                                    this.changeStep(6)
                                }}>Continue</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }

    

    // ------------>  At Step 6
    showAddBankDetail = () => {
        // setTimeout(()=>{
        //     alert('Currently We did not added the Functionality of Add Bank Details, You May Skip This Step and continue with Clicking on Finish Button')
        // }, 1500)
       
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm={12} xl={8}>
                        <div className="stepDiv">
                            <p className="mb-4" style={{background:'#e5bcbc', fontColor:'#ffffff', padding:'2rem 1rem', fontStyle:'bold', fontSize:'12px'}}> Currently we did not added the Functionality of Add Bank Details, You may skip this step and continue by clicking the Finish Button</p>
                            <h2 className="mb-4 fa-3x">Add your bank details</h2>
                            <h4 className="mb-3 font-weight-normal">When your tickets are sold we will transfer the money to a bank of your choice!</h4>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Country of your bank</Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Name on card</Form.Label>
                                    <Form.Control type="text" required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Account number</Form.Label>
                                    <Form.Control type="number" required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>BSB number</Form.Label>
                                    <Form.Control type="number" required />
                                </Form.Group>
                                <Row>
                                    <Col sm={12}>
                                        <Form.Label>Birth date</Form.Label>
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Group>
                                            <Form.Control type="number" placeholder="Day" required />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group>
                                            <Form.Control as="select">
                                                <option value="Jan" selected="selected">January</option>
                                                <option value="Feb">February</option>
                                                <option value="Mar">March</option>
                                                <option value="Apr">April</option>
                                                <option value="May">May</option>
                                                <option value="Jun">June</option>
                                                <option value="Jul">July</option>
                                                <option value="Aug">August</option>
                                                <option value="Sep">September</option>
                                                <option value="Oct">October</option>
                                                <option value="Nov">November</option>
                                                <option value="Dec">December</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Group>
                                            <Form.Control type="number" placeholder="Year" required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                            <div className="buttons-group d-flex justify-content-between align-items-center mt-3">
                                <Button type="submit" variant="secondary" onClick={() => this.changeStep(5)}><i className="fa fa-chevron-left"></i> Previous</Button>
                                <Button type="submit" variant="primary" className="py-2" onClick={() => this.finishProcess()}>Finish</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }

    finishProcess = async () => {
        this.changeStep(7)
        console.log(this.state)
        this.setState({loader:true})
        const data = {}
        data.eventDetails = {...this.state.selectedEvent};
        data.sellTicketsDetails = {...this.state.sellTicketsDetails, TicketType:this.state.ticketType}
        console.log("Ready Data:", data)
        await this.props.uploadTicketListing(data)
        console.log(this.props.listingResponse)
        if(this.props.listingResponse.sellticket.response){
            this.setState({
                listingSuccessResponse:this.props.listingResponse.sellticket.response,
                listingSuccessMessage:this.props.listingResponse.sellticket.message,
                loader:false
            })
        }else{
            this.setState({
                listingSuccessResponse:this.props.listingResponse.sellticket.response,
                listingSuccessMessage:this.props.listingResponse.sellticket.message,
                loader:false
            })
        }
    }


    // ------At Step 7
    successStep = () => {
        const { listingSuccessResponse, listingSuccessMessage, loader } = this.state
        
        
        if(loader){
            return (this.showLoader())
        }else{
            return (
                <Container>
                    <Row className="justify-content-md-center">
                        <Col sm={12} xl={8}>
                            <div className="stepDiv">
                                <p style={{background: listingSuccessResponse ? '#aac1ae' : '#e5bcbc', padding:'2rem 1rem', fontStyle:'bold', fontColor:'#ffffff', fontSize:'12px', textAlign:'center'}}> 
                                    {listingSuccessResponse ? <i className="fa fa-check"></i> : <i className="fa fa-times"></i> } {listingSuccessMessage}
                                </p>
                            </div>
                        </Col>
                        <div className="buttons-group d-flex justify-content-between align-items-center mt-3">
                            <Button type="submit" variant="secondary" className="py-2" onClick={() => window.location.reload()}> List Another Ticket </Button>
                            <Button type="submit" variant="primary" className="py-2" onClick={() => this.props.history.push('/tickets-for-sale')}>Check Sell Tickets Status</Button>
                        </div>
                    </Row>
                </Container>
            )
        }
    }

    // -------------------- Functions For Steps Ends ------------------ //

    showLoader = () => {
       return (<div className="loaderDiv"><Loader type="TailSpin" color="#e94d13" height={50} width={50} /></div>)
    }

    render() {
        const {
            showSearchEvent,
            showSelectedEvent,
            showUploadTicketFile,
            ShowOriginalPrice,
            ShowSellingPrice,
            ShowAddBankDetail,
            enableSucessStep,
        } = this.state
        return (
            <>
                <section className="innerBanner">
                    <Container>
                        <Row>
                            <Col sm={12}>
                                <h1>Sell Tickets</h1>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="sellPage">
                    {showSearchEvent && this.showSearchEvent()}
                    {showSelectedEvent && this.showSelectedEvent()}
                    {showUploadTicketFile && this.showUploadTicketFile()}
                    {ShowOriginalPrice && this.showOriginalPrice()}
                    {ShowSellingPrice && this.showSellingPrice()}
                    {ShowAddBankDetail && this.showAddBankDetail()}
                    {/* Final Step Success/Failure */}
                    {enableSucessStep && this.successStep()}  
                    {/* Final Step Success/Failure */}
                </section>
            </>
        )
    }
}

const mapStateToProps = state => {
    // console.log("Response of Sell Tickets ----> ", state);
    const { loggedIn } = state.authentication;
    const { search, listingResponse } = state;
    // console.log("Response Of Sell Ticket 2--->", listingResponse);
    return { loggedIn, searchResults: search.results, listingResponse:listingResponse, removeResponse:listingResponse.removeFile }
}
const dispatchState = { getEventsOnSearch, uploadTicketListing, removeUploadedFile }

export default connect(mapStateToProps, dispatchState)(SellTickets)