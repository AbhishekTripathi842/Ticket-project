import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; //listPurchasedTickets
import { newsListing, getSingleNewsById } from '../../actions/newsActions';
import Loader from 'react-loader-spinner';
import ReactHtmlParser from 'react-html-parser';
var slugify = require('slugify')

class NewsSingleComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            newsId:props.match.params.newsId,
            displayMessage:'',
            sucessMessage:'',
            failedMessage:'',
            single_news:[],
            news:[],
            loader:false,
            error:false
        }
    }
    componentDidMount(){
        window.scrollTo(0, 0)
        // console.log("params",this.props.match.params)
        this.getNewsDetails(this.state.newsId);
    }

    // componentDidUpdate(prevProps) {
    //     const newEventId = this.props.match.params.id
    //     const prevEventId = prevProps.match.params.id
    //     if(this.props.event !== undefined){

    //         // const newEventId = this.props.event.eventDetail.title
    //         // const prevEventId = prevProps.event.title
    //         // console.log('newEventId',newEventId)
    //         // console.log('prevEventId',prevEventId)
    //         window.scrollTo(0, 0)
    //         if(newEventId !== prevEventId){
    //             this.setState({
    //                 eventId:newEventId,
    //                 loader:false,
    //             }, () => this.getEventDetails( this.state.eventId ))
    //         }
    //     }
    // }

    getNewsDetails = async (newsId)=>{
        // console.log(newsId)
        this.setState({loader:true})
        await this.props.getSingleNewsById(newsId)
        console.log('single',this.props.single_news)
        if(this.props.single_news.response){
            this.setState({
                single_news:this.props.single_news.data,
                loader:false,
            }, () => {
                this.getRecentNewsList(newsId)
                // this.getEventsTicketsList(this.state.event.id)
            })
        }else{
            this.setState({loader:false})
            console.log("error has come")
            if(this.props.single_news.status == 400){
                this.setState({error:true})
            }

        }
    }

    getRecentNewsList = async (newsId) =>{
        this.setState({loader:true})
        await this.props.newsListing(newsId);
        // console.log('totoal news',this.props.news)
        if(this.props.news.response){
            this.setState({
                news:this.props.news.news.filter(
                    (item) => item._id != newsId
                ),
                loader:false
            })
        }else{
            this.setState({loader:false})
            // if(this.props.news.status == 400){
            //     this.setState({error:true})
            // }
        }
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

    truncate = (source, size = 5) => {
        // console.log("desc",source)
        return source.length > 0 ? source[0].props.children[0].substring(0,size - 1) + "…" : source;

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

    componentDidUpdate(prevProps) {
        const new_NewsId = this.props.match.params.newsId
        const prev_NewsId = prevProps.match.params.newsId
        if(new_NewsId !== prev_NewsId){
            console.log(new_NewsId)
            this.setState({
                newsId:new_NewsId,
                // loader:false,
            }, () => this.getNewsDetails(this.state.newsId))
        }
    }

    render() {
        const { sucessMessage, failedMessage, single_news, news, loader, error } = this.state
        if(error){
            return (
                <>
                <div id="notfound">
                    <div className="notfound">
                        <div class="notfound-404">
                            <h3>Oops! Page not found</h3>
                            <h1><span>4</span><span>0</span><span>4</span></h1>
                        </div>
                        <h2>we are sorry, the page you requested was not found</h2>
                    </div>
                </div>
                </>
            )

        }
        return (
            <>
                <section className="innerBanner">
                    <Container>
                        <Row>
                            <Col sm={12}>
                                <h1>{single_news.NewsTitle}</h1>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="newsMain">
                    <Container>
                        <Row>
                            <Col sm={12} md={8}>
                                <div className="newsCol h-auto text-left">
                                    <div className="imageWrap">
                                        <img src={`${process.env.REACT_APP_SERVER_PATH}`+`/news/`+`${single_news.Media}`} alt="" />
                                        <span class="dateTag"><strong>{ this.convertDate( single_news.createdAt ) }</strong>{ this.convertMonth( single_news.createdAt ) }</span>
                                    </div>
                                    <p>
                                    {ReactHtmlParser(single_news.Description)}
                                    </p>
                                    
                                </div>
                            </Col>
                            <Col sm={12} md={4}>
                                <div className="newsPanel">
                                    <h4>Recent News</h4>
                                    <ul>
                                    {news.length > 0 &&
                                        news.slice(0, 5).map((single, i) => {
                                            return (
                                            <li>
                                                <Link to= {{ 
                                                            pathname: `/news/${ this.stringToSlug(single.NewsTitle)}/${single._id}`   
                                                }} >
                                                    <img src={`${process.env.REACT_APP_SERVER_PATH}`+`/news/`+`${single.Media}`} />
                                                    <h5>{single.NewsTitle}</h5>
                                                    <p>{this.truncate(ReactHtmlParser(single.Description))}</p>
                                                </Link>
                                            </li>

                                            )
                                        })
                                    }
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </>
        );
    }
}

const mapStateToProps = state => {
    console.log("State", state)
    const { news, errorOccured } = state
    return {  
        single_news:news.single_news,
        news:news.news,
        isError: errorOccured.isError
    }
}

const dispatchState = { getSingleNewsById, newsListing }

export default connect(mapStateToProps, dispatchState)(NewsSingleComponent);

