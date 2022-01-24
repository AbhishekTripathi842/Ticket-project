import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; //listPurchasedTickets
import { newsListing } from '../../actions/newsActions';
import Loader from 'react-loader-spinner';
import ReactHtmlParser from 'react-html-parser';
var slugify = require('slugify')
class NewsPage extends Component {

    constructor(props){
      super(props)
      this.state = {
        displayMessage:'',
        sucessMessage:'',
        failedMessage:'',
        news:[],
        loader:false
      }
    }

    componentDidMount(){
        this.listNews()
        
    }

    listNews = async () => {
        this.setState({ loader: true})
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

    render(){
        const { sucessMessage, failedMessage, news, loader } = this.state
      return (
        <>
            <section className="innerBanner">
                <Container>
                    <Row>
                        <Col sm={12}>
                            <h1>Event News</h1>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="newsMain">
                <Container>
                    
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
                            <Row >
                                {news.length > 0 &&
                                    news.map((single, i) => {
                                        return (
                                            <Col sm={12} md={4} className="mb-4">
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
                                                    <h3><Link className="btn-read" to= {{ 
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
    //   console.log(state)
    const { news } = state
    return {  news:news.news }
}

const dispatchState = { newsListing }

export default connect(mapStateToProps, dispatchState)(NewsPage);

// export default NewsPage;