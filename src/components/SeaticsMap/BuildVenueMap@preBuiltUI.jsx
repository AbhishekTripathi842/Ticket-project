import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import * as TicketDataArray from './TicketData'
export class BuildVenueMap extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            // seaticsEndPoint:'https://sandbox.tn-apis.com/maps/v3/EventAndVenueInfo',
            seaticsEndPoint:'https://sandbox.tn-apis.com/maps/v3/MapAndLayout',
            mapWidget:"https://mapwidget3-sandbox.seatics.com/Api/framework",
            websiteConfigId:Number(26852), // WCID
            consumerKey:'ndunPAN5S2af9MYHWBCQE328LMMa', // Sandbox version of key
            authToken:'519a21d0-f9b5-3e6b-b963-6a2899113c53',
            eventName: 'Tootsie - The Musical',   // this.props.event.title, //'Boston Red Sox vs. New York Yankees'
            venue:'Citizens Bank Opera House, Boston, MA', //this.props.venue.name,
            dateTime: '202109051300' , //this.changeDateFormat(this.props.event.datetime_local),
            scriptTag:''
        }
    }

    componentDidMount = async () => {
        const { seaticsEndPoint, websiteConfigId, consumerKey, eventName, venue, dateTime } = this.state
        // await this.createMap();
        const _head = document.getElementsByTagName('head')['0']
        const _jQuery = document.createElement("script");
        _jQuery.src = "https://code.jquery.com/jquery-1.11.1.min.js";
        // _jQuery.async = true
        
        
        const _bootstrapJs = document.createElement("script");
        _bootstrapJs.src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js";
        // _bootstrapJs.async = true
        
        const _scriptAPICall = document.createElement("script");
        _scriptAPICall.src = `${seaticsEndPoint}?websiteConfigId=${websiteConfigId}&consumerKey=${consumerKey}&eventName=${eventName}&venue=${venue}&dateTime=${dateTime}`
        
        const _ticketData = document.createElement('script');
        _ticketData.src = "./TicketData.js";
        
        const _detectElemResize = document.createElement('script');
        _detectElemResize.src = './detect-element-resize.js';
        
        const _jQueryResize = document.createElement('script');
        _jQueryResize.src = './jquery.resize.js';
        
        
        // const _mapWidget = document.createElement('script');
        // _mapWidget.src = this.state.mapWidget
        _head.appendChild(_jQuery);
        _head.appendChild(_bootstrapJs);
        _head.appendChild(_detectElemResize);
        _head.appendChild(_jQueryResize);
        
        console.log(_head)
        // document.body.appendChild(_mapWidget);

        this.mapDivRef.appendChild(_scriptAPICall);
        this.mapDivRef.appendChild(_ticketData);

        return () => {
            _head.removeChild(_bootstrapJs);
            _head.removeChild(_jQuery);
            _head.removeChild(_detectElemResize);
            _head.removeChild(_jQueryResize);
            // document.body.removeChild(_mapWidget);

            this.mapDivRef.removeChild(_scriptAPICall);
            this.mapDivRef.removeChild(_ticketData);
        }
    }


    // createMap = async () => {
       
    //     const { seaticsEndPoint, websiteConfigId, consumerKey, eventName, venue, dateTime, cb } = this.state
    //     let options = {
    //         header: {
    //             'Authorization': `Bearer ${this.state.authToken}`
    //         }
    //     }
    //     try {
    //         const response = await axios.get(`${seaticsEndPoint}?websiteConfigId=${websiteConfigId}&consumerKey=${consumerKey}&eventName=${eventName}&venue=${venue}&dateTime=${dateTime}`, options); 
    //         console.log(response)
    //         if(response.data){
    //             this.setState({ map: response.data })
    //         }else{
    //             this.setState({ map:'' })
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         return 'Map Coming Soon'
    //     }
    // }

    // changeDateFormat = (date) => {
    //      if(date){0
    //         let d = new Date(date.split('T')[0])
    //         let t = date.split('T')[1].split(':')
    //         let m = d.getMonth()+1
    //         return (`${d.getFullYear()}` + `${m < 10 ? '0'+m : m}` + `${d.getDate()}` + `${t[0]}` + `${t[1]}`)
    //      }else {
    //          return null
    //      }
    // }


    render(){
        // console.log(this.props)
        return ( 
            <Container ref = { elem => this.mapDivRef = elem }/>
        )
    }
}