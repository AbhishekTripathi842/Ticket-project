import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEventsOnSearch } from '../../actions/seatgeak-api/eventActions';
import Loader from 'react-loader-spinner';
import ReactPaginate from 'react-paginate';
import queryString from 'query-string';
var slugify = require('slugify')

class SearchResults extends Component {
    constructor(props){
        super(props)
        this.state = {
            params:queryString.parse(props.location.search),
            pageNumber:1,
            totalEvents:0,
            eventsList:[],
            searchList:false,
            loader:false,
            weekDay:null,
            searchInput:''
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        const { params, pageNumber } = this.state
        // console.log(params)
        this.getEventsBySearchResults( params.q, pageNumber );
    }

    getEventsBySearchResults = async ( params, pageNumber ) => {
        this.setState({loader:true})
        await this.props.getEventsOnSearch( params, pageNumber )
        console.log(this.props.searchResults)
        if(this.props.searchResults){
            if(this.props.searchResults.events.length){
                this.setState({
                    eventsList: this.props.searchResults.events,
                    totalEvents: this.props.searchResults.meta.total,
                    loader:false,
                    searchList:true
                })
            }else{
                this.setState({loader:false, searchList:false})
            }
        }else{
            this.setState({loader:false})
        }
    }

    convertToxonomyToTitle = (params) =>{
        return params.toLowerCase().replace(/-/g, ' ').replace(/(?: |\b)(\w)/g, function(key, p1) { return key.toUpperCase() });
    }

    getWeekDay = (date) => {
        var gsDayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        var d = new Date(date);
        return gsDayNames[d.getDay()];
    }

    convertDate = (date) => {
          var d = new Date(date);
          var year = (new Date().getFullYear() === d.getFullYear()) ? '' : ", " +  d.getFullYear()
          var monthName = d.toLocaleString('default', { month: 'short' })
          return  (monthName) + " " + d.getDate() +  year
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
            remove: /[*/+~.,()'"!:@]/g, // remove characters that match regex, defaults to `/[*+~.()'"!:@]/g`
            lower: false,      // convert to lower case, defaults to `false`
            strict: false,     // strip special characters except replacement, defaults to `false`
            locale: 'vi'       // language code of the locale to use
          })
    }

    handleChange = (e) => {
        let searchInput = this.state.searchInput;
        searchInput = e.target.value;
        this.setState({searchInput});
    }
  
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.searchInput.trim().length){
            this.props.history.replace({
            pathname:'search',
            search:`?q=${this.stringToSlug(this.state.searchInput.trim())}`
            })
        }
    }

    componentDidUpdate(prevProps) {
        const currentSearch = queryString.parse(this.props.location.search)
        const prevSearch = queryString.parse(prevProps.location.search)
        if(currentSearch.q !== prevSearch.q){
            this.setState({
                params:queryString.parse(this.props.location.search),
                pageNumber:1,
                totalEvents:0,
                eventsList:[],
            }, () => this.getEventsBySearchResults( this.state.params.q, this.state.pageNumber ))
        }
    }
    render(){
        const { params, eventsList, loader, totalEvents} = this.state
        var query = params.q;
        const pageNumbers = Math.ceil(totalEvents / 10 );
        const paginate = e => {    
            this.setState({
                pageNumber:e.selected + 1
            }, ()=> {
                this.getEventsBySearchResults(query, this.state.pageNumber)
            })
        };
        
        return (
            <>
                <section className="innerBanner">
                    <Container>
                        <Row>
                            <Col sm={12}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="formBasicEmail" className="d-flex">
                                        <Form.Control type="text" placeholder="Search by Events, Concerts or Venue" onChange={(e) => this.handleChange(e)} value={this.state.searchInput} required/>
                                        <Button type="submit" variant="primary" className="ml-2">Search</Button>
                                    </Form.Group>
                                </Form>
                                <h4 style={{color:'#fff'}}>{`Search: Results for '${this.convertToxonomyToTitle(query)} Tickets' `}</h4>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="eventSingle">
                    <Container fluid>
                        <Row className="justify-content-md-center">
                            {loader 
                            ?
                                <p><Loader type="Rings" color="#e94d13" height={80} width={80} />Please Wait...</p>
                            :
                            <>
                            <Col sm={12} xl={10}>
                                {eventsList.length > 0
                                    ?                                   
                                    eventsList.map((e,i) => {
                                        // if(e.stats.visible_listing_count){
                                            var eventName = this.stringToSlug(e.title);
                                            // var convertedDate = this.convertDate(e.datetime_local.split('T')[0])
                                            var toxonomy  = e.taxonomies[0].name
                                            var eventLocation = this.stringToSlug(e.venue.name + " " + e.venue.display_location + " " + this.convertDate(e.datetime_local.split('T')[0]) + " " + this.timeTo12Format(e.datetime_local.split('T')[1]));
                                            // console.log(convertedDate, eventLocation)
                                        // }
                                        return (
                                            // <Link className="eventCell" style={{color:'#000', pointerEvents: e.stats.visible_listing_count ? 'auto': 'none'}} key={i} to={e.stats.visible_listing_count ? `/${eventName}/${eventLocation}/${toxonomy}/${e.id}`: null}>
                                            <Link className="eventCell" style={{color:'#000'}} key={i} to={`/${eventName}/${eventLocation}/${toxonomy}/${e.id}`}>
                                                <h3>
                                                    <p className="eventDate">
                                                        <strong>
                                                            {e.date_tbd ? 'TBD' :  this.getWeekDay(e.datetime_local.split('T')[0])}
                                                        </strong>                                                        
                                                        {e.date_tbd && e.time_tbd ?
                                                        <span> 
                                                            Date: TBD
                                                            <span>
                                                              Time: TBD
                                                            </span> 
                                                        </span>
                                                        :
                                                        <span>
                                                            {!e.date_tbd && this.convertDate(e.datetime_local.split('T')[0])}
                                                            <span>
                                                                {e.time_tbd? 'Time: TBD' : this.timeTo12Format(e.datetime_local.split('T')[1])}
                                                            </span>
                                                        </span>}
                                                    </p>
                                                    <span> { e.title } <small> { e.venue.name }, { e.venue.display_location } </small></span>
                                                </h3>
                                                <div className="d-flex align-items-center">
                                                    <span className="eventPrice mr-xl-5 mr-2"> {e.stats.lowest_sg_base_price ? `$${e.stats.lowest_sg_base_price}` : ''} </span>
                                                    {e.stats.visible_listing_count ? <Button variant="primary" type="button" onClick={()=> this.props.history.push(`/${eventName}/${eventLocation}/${toxonomy}/${e.id}`)}> Get Ticket </Button> : 'Tickets N/A'}
                                                </div>
                                            </Link>
                                        )
                                    })

                                    :

                                    <div>
                                        <h2> {totalEvents === 0 ? 'Sorry, No Results Found' : 'Something went wrong'}</h2>
                                    </div>
                                }
                            </Col>
                            </>}
                        </Row>
                        {eventsList.length > 0 && 
                        <section className="pagination">
                            <ReactPaginate
                                previousLabel={'<<'}
                                nextLabel={'>>'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={pageNumbers}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={paginate}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                                activeClassName={'active'}
                                />
                        </section>}
                    </Container>
                </section>
            </>
        );
    }
}


const mapStateToProps = state => {
    // console.log(state)
    const { search } = state
    return { 
        searchResults: search.results,
    }
}
const dispatchState = { getEventsOnSearch }

export default connect(mapStateToProps, dispatchState)(SearchResults);
