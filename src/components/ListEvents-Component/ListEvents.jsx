import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getEventByTaxomonies } from '../../actions/seatgeak-api/eventActions';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
var slugify = require('slugify');
// import Loader from 'react-loader-spinner';

class ListEventsPage extends Component {
    constructor(props){
        super(props)
        this.iScroll = React.createRef();
        this.state = {
            toxonomy:props.match.params.toxonomy,
            pageNumber:1,
            totalEvents:0,
            eventsList:[],
            loader:false,
            weekDay:null,
            hasMoreParam:false,
            loadingState: false
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        const { toxonomy, pageNumber } = this.state
        this.getEventsByCategories();
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll = (event)  => {
        // let scrollTop = event.srcElement.body.scrollTop,
        // if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        // // you're at the bottom of the page
        //     alert("Bottom of page");
        // }
        const { pageNumber,hasMoreParam, checkHasParam} = this.state

        // if ((window.innerHeight + window.scrollY) >= (document.querySelector('.eventSingle').offsetHeight + document.querySelector('.innerBanner').offsetHeight)) {
            
        //     this.setState({
        //         pageNumber: pageNumber + 1,
        //         hasMoreParam:true,
        //     }, ()=> {
        //         this.getEventsByCategories()
        //     })

        // }

        // if(checkHasParam){
            // if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 100)) {
            //     // window.scrollTo(0, 0)
            //     // setTimeout(()=>{
                     
            //         this.setState({
            //             pageNumber: pageNumber + 1,
            //             hasMoreParam:true,
            //             // checkHasParam:false,
            //         }, ()=> {
            //             this.getEventsByCategories()
            //         })
            //     // }, 3000);
            // }

            if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 100)) {
                this.loadMoreItems();
            }

        // }
        
    }

    // window.onscroll = (ev) => {
    //     if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
    //     // you're at the bottom of the page
    //     console.log("Bottom of page");
    //     }
    // };

    loadMoreItems() {

        var { pageNumber} = this.state

        if(this.state.loadingState){
            return;
        }

        pageNumber ++;
        // console.log('page',pageNumber)
        this.setState({ loadingState: true, pageNumber: pageNumber });


        setTimeout(() => {
        // this.setState({ items: this.state.items + 10, loadingState: false });
            this.getEventsByCategories();
        }, 1000);
    }




    getEventsByCategories = async ( ) => {
        const { toxonomy, pageNumber, loadingState } = this.state

        // console.log('pageno',pageNumber)
        if(pageNumber == 1){

            this.setState({loader:true, loadingState: true})
        }

        // if(this.state.loadingState){
        //     return;
        // }
        await this.props.getEventByTaxomonies( toxonomy, pageNumber )
        // this.setState({loadingState: false})
        // console.log(this.props.eventsByCategory.events)
        // setTimeout(function(){ this.setState({checkHasParam: false}); }, 3000);
        // this.setState({checkHasParam: false});
        if(this.props.eventsByCategory){
            if(this.props.eventsByCategory.events.length){

                var tracks = this.state.eventsList;
                // this.props.eventsByCategory.events.forEach((track) => {
                //     if(!tracks.includes(track)){

                //         tracks.push(track);
                //     }
                // });
                Array.prototype.push.apply(tracks,this.props.eventsByCategory.events);
                tracks = tracks.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
                // console.log('hasMoreParam',pageNumber)
                // if(hasMoreParam){

                    // Array.prototype.push.apply(tracks,this.props.eventsByCategory.events);
                    // this.setState({hasMoreParam: false})
                // }

                this.setState({
                    eventsList: tracks,
                    totalEvents: this.props.eventsByCategory.meta.total,
                    loader:false,
                    loadingState:false,
                    // checkHasParam:true,
                })
            }else{
                this.setState({loader:false})
            }
        }else{
            this.setState({loader:false})
        }
    }

    convertToxonomyToTitle = (toxonomy) =>{
        return toxonomy.toLowerCase().replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function(key, p1) { return key.toUpperCase() });
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
            remove: /[*/+~.,()'"!:@#]/g, // remove characters that match regex, defaults to `/[*+~.()'"!:@]/g`
            lower: false,      // convert to lower case, defaults to `false`
            strict: false,     // strip special characters except replacement, defaults to `false`
            locale: 'vi'       // language code of the locale to use
          })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render(){
        const { toxonomy, eventsList, loader, totalEvents, hasMoreParam,loadingState } = this.state
        // const pageNumbers = Math.ceil(totalEvents / 10 );
        // const paginate = e => {    
        // this.setState({
        //     pageNumber:e.selected + 1
        // }, ()=> {
        //     // this.getEventsByCategories(toxonomy, this.state.pageNumber)
        // })
        // return true;
        
        // };
        
        return (
            <>
                <section className="innerBanner">
                    <Container>
                        <Row>
                            <Col sm={12}>
                                <h1>{`${this.convertToxonomyToTitle(toxonomy)} Tickets`}</h1>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="eventSingle">
                    <Container fluid>
                        <Row className="justify-content-md-center">
                            {loader 
                            ?
                            <div><Loader type="Rings" color="#e94d13" height={80} width={80} />Please Wait...</div>
                            :
                            <>
                            <Col sm={12} xl={10} id="scrollableDiv" ref={this.iScroll}  style={{ height: "100%", overflowY: "scroll" }}>
                                 <InfiniteScroll
                                    pageStart={0}
                                    loadMore={this.getEventsByCategories.bind(this)}
                                    hasMore={loadingState}
                                    loader={<div style={{textAlign:'center'}}><Loader type="Audio" color="#000" height={30} width={30} /></div>}
                                    scrollableTarget="scrollableDiv"
                                    >

                                    {eventsList.length > 0 &&                                    
                                        eventsList.map((e,i) => {
                                            // if(e.stats.visible_listing_count){
                                                var eventName = this.stringToSlug(e.title);
                                                var eventLocation = this.stringToSlug(e.venue.name + " " + e.venue.display_location + " " + this.convertDate(e.datetime_local.split('T')[0]) + " " + this.timeTo12Format(e.datetime_local.split('T')[1]));
                                            // }
                                            return (
                                                // <Link className="eventCell" style={{color:'#000', pointerEvents: e.stats.visible_listing_count ? 'auto': 'none'}} key={i} to={e.stats.visible_listing_count ? `/${eventName}/${eventLocation}/${toxonomy}/${e.id}`: '#'}></Link>
                                                // <Link className="eventCell" style={{color:'#000'}} key={i} to={`/${eventName}/${eventLocation}/${toxonomy}/${e.id}`} key={i}>
                                                <Button role="button" 
                                                    onClick={()=> 
                                                                {
                                                                    this.props.history.push(`/${eventName}/${eventLocation}/${toxonomy}/${e.id}`);
                                                                     window.location.reload();
                                                                
                                                                }} className="eventCell" style={{color:'#000'}} key={i}>
                                                    
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
                                                        {/* {(!e.date_tbd && !e.time_tbd && !e.stats.visible_listing_count) && 'Tickets N/A'}
                                                        {(!e.date_tbd && !e.time_tbd && e.stats.visible_listing_count) &&  <Button variant="primary" type="button"> Get Ticket </Button> } */}
                                                        {e.stats.visible_listing_count ? <Button variant="primary" type="button"> Get Ticket </Button> : 'Tickets N/A'}
                                                    </div>
                                                {/* </Link> */}
                                                </Button>
                                            )
                                        })
                                    }
                                </InfiniteScroll>
                            </Col>
                            </>}
                        </Row>
                        {eventsList.length > 0 && 
                        <section className="pagination">
                            {/* <ReactPaginate
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
                                /> */}

                        </section>
                        }
                    </Container>
                </section>
            </>
        );
    }
}


const mapStateToProps = state => {
    // console.log(state)
    const { eventsByToxonomy } = state
    return { 
        eventsByCategory: eventsByToxonomy.eventsByCategory,
    }
}
const dispatchState = { getEventByTaxomonies }

export default connect(mapStateToProps, dispatchState)(ListEventsPage);