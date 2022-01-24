import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { display_categories } from '../../categories/categories-list';
import { Link } from 'react-router-dom';
import {Img} from 'react-image'


class EventsPage extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    ImageExist = (url) => 
    {
      var img = new Image();
      img.src = url;
      
      if(img.src.indexOf('null') == -1 ){

        return true;
      }
      return false;
    }

   

    render(){
        return (
            <>
                <section className="innerBanner">
                    <Container>
                        <Row>
                            <Col sm={12}>
                                <h1>Events</h1>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="eventsMain pt-0">
                    <Container>
                        <Row>
                            {
                                display_categories.map((category, i) => {
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
                                                {/* {this.ImageExist(`./images/${category.imgSrc}`) ?
                                                <img src={this.ImageExist(`./images/${category.imgSrc}`) ? `./images/${category.imgSrc}`  : `./images/loading.gif`} alt={category.name} />
                                                : 
                                                <img src={`./images/loading.gif`} alt={category.name} />
                                                }                */}
                                                <Img
                                                    src={`./images/${category.imgSrc}`}
                                                    alt={category.name} 
                                                    loader={<img src={`./images/loading.gif`} width='340px'/>}
                                                />


                                                <span className="titleOverlay">{category.name}</span>
                                            </Link>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Container>
                </section>
            </>
        );
    }
}

export default EventsPage;