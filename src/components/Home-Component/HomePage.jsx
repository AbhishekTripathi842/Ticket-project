import React, { Component } from 'react';
import { Container, Row, Col, Button, Carousel, Form, Dropdown } from 'react-bootstrap';
import { display_categories } from '../../categories/categories-list';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getEventsByGeoIP } from '../../actions/seatgeak-api/eventActions';
import { newsListing } from '../../actions/newsActions';
import Loader from 'react-loader-spinner';
import ReactHtmlParser from 'react-html-parser';
import {Img} from 'react-image'
var slugify = require('slugify')


class HomePage extends Component {
    constructor(props){
      super(props);
      this.state = { 
        geoLocation:null,
        nearByEvents:[],
        news:[],
        pageNumber:1,
        totalEvents:0,
        loader:false,
        searchInput:'',
        sucessMessage:'',
        failedMessage:'',
      }
    }

    componentDidMount = async () => {
      window.scrollTo(0, 0)
      const { pageNumber } = this.state
      this.getNearByEvents(pageNumber)
      this.listNews()
    }

    getNearByEvents = async (pageNumber) => {
      
      this.setState({loader:true})
      await this.props.getEventsByGeoIP(pageNumber);
      if(this.props.geolocation){
        this.setState({
          totalEvents:this.props.geolocation.total,
          geoLocation:this.props.geolocation.geolocation.display_name || this.props.geolocation.geolocation.city || this.props.geolocation.geolocation.country,
          nearByEvents:this.props.nearByEvents.events.length ? this.props.nearByEvents.events : []
          // loader:false
        })
      }else{
        this.setState({
          loader:false
        })
      }
    }

    listNews = async () => {
        // this.setState({ loader: true})
        await this.props.newsListing();
        // console.log(this.props.purchasedTickets)
        if(this.props.news.response){
            this.setState({
                loader:false,
                sucessMessage:this.props.news.message ,
                news: this.props.news.news,
                failedMessage:''
            })
        }else{
            this.setState({
                loader:false,
                failedMessage: this.props.news.message,
                sucessMessage:''
            })
        }
    }

    convertDate = (date) => {
      var d = new Date(date);
      var year = d.getFullYear()
      var monthName = d.toLocaleString('default', { month: 'short' })
      return  {
        showDate:d.getDate(), 
        showMonth:(monthName) + " " + year
      }
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

    timeTo12Format = (time24)=> {
      var ts = time24;
      var H = +ts.substr(0, 2);
      var h = (H % 12) || 12;
      h = (h < 10)?("0"+ h):h;  // leading 0 at the left for 1 digit hours
      var ampm = H < 12 ? " AM" : "PM";
      ts = h + ts.substr(2, 3) + " " + ampm;
      return ts;
    }
    
    
    handleChange = (e) => {
      let searchInput = this.state.searchInput;
      searchInput = e.target.value;
      this.setState({searchInput});
    }

    convertDate = ( TZdate ) =>{
        let date = new Date( TZdate )
        return date.getDate();
    }

    convertMonth = ( TZdate ) =>{
        let date = new Date( TZdate )
        var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var d = months[date.getMonth()] + ' '+ date.getFullYear();
        return d;
    }

    
    truncate = (source, size = 10) => {
        // console.log("desc",source)
        return source.length > 0 ? source[0].props.children[0].substring(0,size - 1) + "…" : source;

    }

    handleSubmit = (e) => {
      e.preventDefault();
      if(this.state.searchInput.trim().length){
        this.props.history.push({
          pathname:'search',
          search:`?q=${this.stringToSlug(this.state.searchInput.trim())}`
        })
      }
    }
    
    render(){
      const { geoLocation, nearByEvents, loader, totalEvents, news } =  this.state
      const pageNumbers = Math.ceil(totalEvents / 6 );
      const nextPage = () => {
        this.setState({pageNumber:this.state.pageNumber + 1}, ()=> {
          this.getNearByEvents(this.state.pageNumber)
        })
      }
      const prevPage = () => {
        this.setState({pageNumber:this.state.pageNumber - 1}, ()=> {
          this.getNearByEvents(this.state.pageNumber)
        })
      }
      return (
        <>
          <section className="bannerMain p-0">
              <Carousel>
                  <Carousel.Item>
                      <img
                          className="d-block w-100"
                          src="../images/banner-image.jpg"
                          alt="..."
                      />
                      <Carousel.Caption>
                          <h1>Life's an event. We have the tickets</h1>
                          <Form onSubmit={this.handleSubmit}>
                              <Form.Group controlId="formBasicEmail" className="d-flex">
                                  <Form.Control type="text" placeholder="Search by Events, Concerts or Venue" onChange={(e) => this.handleChange(e)} value={this.state.searchInput} required/>
                                  <Button type="submit" variant="primary" className="ml-2">Search</Button>
                                  <i className="fa fa-search"></i>
                              </Form.Group>
                          </Form>
                          <div className="locationTag">
                            <strong><i className="fa fa-map-marker"></i></strong>
                            <Dropdown>
                              <Dropdown.Toggle id="dropdown-basic">
                                { geoLocation || 'Detecting...'}
                              </Dropdown.Toggle>
                              {/* <Dropdown.Menu>
                                <Dropdown.Item href="javascript:void(0)">New York</Dropdown.Item>
                                <Dropdown.Item href="javascript:void(0)">Manhattan</Dropdown.Item>
                                <Dropdown.Item href="javascript:void(0)">London</Dropdown.Item>
                              </Dropdown.Menu> */}
                            </Dropdown>
                          </div>                     
                      </Carousel.Caption>
                  </Carousel.Item>
              </Carousel>
          </section>
          <section className="upcomingMain">
            <Container fluid>
              <Row className="justify-content-center">
                <Col sm={12} lg={7}>
                  <div className="sectionTitle">
                    <h2>  
                        Upcoming Events 
                        {geoLocation && 
                          <span className="mt-2" style={{display:'block', fontSize:'24px'}}> 
                            Near <span style={{color:'#e94d13'}}> {geoLocation} </span>
                          </span>}
                    </h2>   
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam</p>
                  </div>
                </Col>
              </Row>
              {loader ?
                <Row className="justify-content-md-center">
                  <Loader
                    type="ThreeDots"
                    color="#e94d13"
                    height={50}
                    width={30}
                    timeout={3000} //3 secs
                  />
                </Row>
                  :
                <Row className="justify-content-center">
                  {nearByEvents.length > 0
                    ? 
                    // Slider Starts Here 
                    <>  
                        { nearByEvents.map((event, i) => {
                          // if(event.stats.visible_listing_count){
                            var eventName = this.stringToSlug(event.title);
                            var convertedDate = this.convertDate(event.datetime_local.split('T')[0])
                            var toxonomy  = event.taxonomies[0].name
                            var eventLocation = this.stringToSlug(event.venue.name + " " + event.venue.display_location + " " + convertedDate.showDate + " " + convertedDate.showMonth + " " + this.timeTo12Format(event.datetime_local.split('T')[1]));
                          // } 
                          return (
                            <Col sm={8} md={6} lg={4} key={i} className="mb-3">
                              <div className="eventCol">
                                {/* <img src={"../images/event-image.jpg"} alt="" /> */}
                                <img src={event.performers[0].image || "../images/event-image.jpg"} alt="" />
                                <div className="eventDesc">
                                  <p>
                                    <span className="eventDate">
                                      <strong> {this.convertDate(event.datetime_local.split('T')[0]).showDate} </strong> {this.convertDate(event.datetime_local.split('T')[0]).showMonth}
                                    </span>
                                    <span className="eventPrice">{event.stats.lowest_sg_base_price ? `$${event.stats.lowest_sg_base_price}` : 'N/A'}</span>
                                  </p>
                                  <h3>
                                    <span> 
                                    {/* <Link 
                                      style={{color:'#fff', pointerEvents: event.stats.visible_listing_count ? 'auto': 'none'}}  
                                      to={event.stats.visible_listing_count ? `/${eventName}/${eventLocation}/${toxonomy}/${event.id}`: null}>
                                        {event.title}
                                      </Link>  */}
                                      <Link 
                                      style={{color:'#fff'}}  
                                      to={`/${eventName}/${eventLocation}/${toxonomy}/${event.id}`}>
                                        {event.title}
                                      </Link> 
                                      <small> {event.venue.name} {event.venue.display_location}</small>
                                    </span>
                                    {event.stats.visible_listing_count ? 
                                    <Button 
                                      variant="primary" 
                                      type="button" 
                                      onClick={()=> this.props.history.push(`/${eventName}/${eventLocation}/${toxonomy}/${event.id}`)}
                                    > 
                                      Get Ticket 
                                    </Button> 
                                    : 
                                    <span style={{fontSize:'14px'}} className="mr-1 ml-1">No Tickets Available</span>}
                                  </h3>
                                </div>
                              </div>
                            </Col>
                          )
                        })}
                      <Col sm={12} className="mt-3">
                            <span>
                                {this.state.pageNumber !== 1 && <span style={{cursor:'pointer', color:'#e94d13'}} onClick={()=> prevPage()}><strong>Prev</strong> </span>}

                                  <strong> {this.state.pageNumber} / {pageNumbers} </strong>

                                {this.state.pageNumber < pageNumbers && <span style={{cursor:'pointer', color:'#e94d13'}} onClick={()=>nextPage()}> <strong> Next </strong></span>}
                            </span> 
                      </Col>
                    </>
                    :
                    <Col sm={12} lg={7}>
                      {geoLocation ?
                      <div className="sectionTitle">
                          No upcoming events found near <span> <strong>{ geoLocation }</strong> </span> 
                      </div>
                      :
                      <div className="sectionTitle">
                          It Seems Your location not detected 
                      </div>
                      }
                    </Col>
                  }
                </Row>
              }
            </Container>
          </section>
          <section className="eventsMain">
            <Container fluid>
              <Row className="justify-content-center">
                <Col sm={6} md={7}>
                  <div className="sectionTitle">
                    <h2>Events</h2>
                  </div>
                </Col>
              </Row>
              <Row>
                {
                    display_categories.map((category, i) => {
                        if(i < 3)
                        return (
                            <Col sm={6} md={4} key={i}>
                                <Link 
                                  to= {{ 
                                      pathname: `/event/${ category.toxonomy }`,
                                      // state: { displayTitle: `${ category.name } Tickets`, toxonomy:category.toxonomy } 
                                  }} 
                                  className="eventList"
                                >
                                    {/* <img src={`./images/${category.imgSrc}`} alt={category.name} /> */}
                                    <Img
                                        src={`./images/${category.imgSrc}`}
                                        alt={category.name} 
                                        loader={<img src={`./images/loading.gif`} width='320px'/>}
                                    />
                                    <span className="titleOverlay">{category.name}</span>
                                </Link>
                            </Col>
                        )
                    })
                }
                
                <Col sm={12} className="text-center mt-3">
                  <Link to={'/events'}>
                    <Button type="button" variant="outline-primary">View All Events</Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="cta text-center">
            <Container>
              <Row>
                <Col sm={12}>
                    <h2>Share experiences with your friends</h2>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.</p>
                    <Button type="button" onClick={()=> this.props.history.replace('/sign-up')} variant="primary">Register</Button>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="newsMain">
            <Container>
              <Row className="justify-content-center">
                <Col sm={12} md={7}>
                  <div className="sectionTitle">
                    <h2>Latest News</h2>
                  </div>
                </Col>
              </Row>
              <Row>
                {news.length > 0 &&
                  news.map((single, i) => {
                     if(i < 6)
                    return (
                    // <Col sm={12} md={4}>
                    //   <div className="newsCol">
                    //     <div className="imageWrap">
                    //       <a href="#">
                    //         <img src="./images/news.jpg" alt="" />
                    //         <span className="dateTag"><strong>10</strong>Oct 2020</span>                    
                    //       </a>
                    //     </div>
                    //     <h3><a href="#">Lorem ipsum dolor sit amet</a></h3>
                    //     <p>Lorem ipsum dolor sit amet, consectetur ipis adipisicing elit, sed do eiusmod tempor incididunt ut labore et do...</p>
                    //     <a className="btn-read" href="#">Read More</a>
                    //   </div>
                    // </Col>
                    <Col sm={12} md={4} className="mb-4" key={i}>
                      <div className="newsCol">
                          <div className="imageWrap">
                              <Link 
                                  to= {{ 
                                      pathname: `/news/${ this.stringToSlug(single.NewsTitle)}/${single._id}`   
                                  }} 
                                  
                              >
                                  <img src={`${process.env.REACT_APP_SERVER_PATH}`+`/news/`+`${single.Media}`} alt="" />
                                  <span className="dateTag"><strong>{ this.convertDate( single.createdAt ) }</strong>{ this.convertMonth( single.createdAt ) }</span>
                              </Link>
                          </div>
                          <h3><Link  to= {{ 
                                      pathname: `/news/${ this.stringToSlug(single.NewsTitle)}/${single._id}`   
                                  }}  >{single.NewsTitle}</Link></h3>
                          <p> {this.truncate(ReactHtmlParser(single.Description))}</p>
                          <Link className="btn-read" to= {{ 
                              pathname: `/news/${ this.stringToSlug(single.NewsTitle)}/${single._id}`   
                          }}  >Read More</Link>
                      </div>
                  </Col>
                    )
                  })
                }
                
                <Col sm={12} className="text-center mt-3">
                  <Button type="button" variant="primary" onClick={() => this.props.history.push('/news')}>View All</Button>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="subscribeMain text-center">
            <Container>
              <Row>
                <Col sm={12}>
                    <h2>Stay Up to date With Your Favorite Events!</h2>
                    <Form>
                      <Form.Group controlId="formEmail">
                        <Form.Control type="email" placeholder="Your Email Address"  required/>
                        <Button type="submit" variant="primary">Subscribe</Button>
                      </Form.Group>
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
  // console.log(state)
  const { eventsByLocation } = state.nearByEvents;
  const { news } = state
  return { 
      nearByEvents: eventsByLocation,
      geolocation:eventsByLocation.meta,
      news:news.news,
  }
}
const dispatchState = { getEventsByGeoIP,newsListing }

export default connect(mapStateToProps, dispatchState)(HomePage);