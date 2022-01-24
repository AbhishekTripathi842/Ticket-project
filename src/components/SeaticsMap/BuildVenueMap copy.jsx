import React, { Component } from 'react';
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
            venue:'Citizens Bank Opera House', //this.props.venue.name,
            dateTime: '202109051300' , //this.changeDateFormat(this.props.event.datetime_local),
            scriptTag:''
        }
    }

    componentDidMount = async () => {
        const { seaticsEndPoint, websiteConfigId, consumerKey, eventName, venue, dateTime } = this.state
        // await this.createMap();
        const _head = document.getElementsByTagName('head')['0']

        const _jQuery = document.createElement("script");
        // _jQuery.src = "https://code.jquery.com/jquery-1.11.1.min.js";
        // _jQuery.src ="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js";
        _jQuery.src ="https://code.jquery.com/jquery-3.5.1.min.js";

        // _jQuery.async = true
        
        const _bootstrapJs = document.createElement("script");
        _bootstrapJs.src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js";
        // _bootstrapJs.async = true
        
        const _bootstrapCss = document.createElement("link");
        _bootstrapCss.href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"
        _bootstrapCss.rel = "stylesheet";

        // const _mapWidgetFramework = document.createElement('script');
        // _mapWidgetFramework.src = "https://mapwidget3.seatics.com/api/framework";

        // const _tikecketList = document.createElement('script')
        // _tikecketList.src = "https://s3.amazonaws.com/tn-maps-api-demo/CustomUI/ticketList.js";

        // const _ticketFilterControl = document.createElement('script');
        // _ticketFilterControl.src = "https://s3.amazonaws.com/tn-maps-api-demo/CustomUI/filterControls.js";

        // const _mapInterface = document.createElement('script');
        // _mapInterface.src = "https://s3.amazonaws.com/tn-maps-api-demo/CustomUI/mapsInterfaceCustomUI.js";

        // const _mapWidgetCss = document.createElement('link');
        // _mapWidgetCss.href = "https://mapwidget3.seatics.com/styles";
        // _mapWidgetCss.rel = "stylesheet";

        const _scriptAPICall = document.createElement("script");
        _scriptAPICall.src = `${seaticsEndPoint}?websiteConfigId=${websiteConfigId}&consumerKey=${consumerKey}&eventName=${eventName}&venue=${venue}&dateTime=${dateTime}`
        
        // const _ticketData = document.createElement('script');
        // _ticketData.src = "../../TicketData";
        
        // const _mapWidget = document.createElement('script');
        // _mapWidget.src = this.state.mapWidget
        // _head.appendChild(_bootstrapCss);
        _head.appendChild(_jQuery);
        _head.appendChild(_bootstrapJs);

        // document.body.appendChild(_mapWidget);

        this.mapDivRef.appendChild(_scriptAPICall);
        // this.mapDivRef.appendChild(_ticketData);
       
        setTimeout(() =>{ 
            console.log("Logs here : Seatics ------->>" , window.Seatics)
            if(window.Seatics){

                window.Seatics.addTicketData(TicketDataArray)
                window.Seatics.MapComponent.create({
                    tickets: TicketDataArray,
                    vfsUrl: 'https://vfs.seatics.com',
                    presentationInterface: {
                        updateTicketsList: this.myCreateListFunction()
                    },
                    container: this.mapDivRef,
                    mapWidth: 525,
                    mapHeight: 545, 
                })
            }
            // window.Seatics.Presentation.redirectToCheckout = function(ticketGroup, quantitySelected) {
            //     console.log(ticketGroup, quantitySelected);
            //     alert("Replace with your own go-to-checkout  method");
            // }
        }, 3000);
        
        return () => {
            _head.removeChild(_jQuery);
            _head.removeChild(_bootstrapJs);
            // _head.removeChild(_bootstrapCss);
            // document.body.removeChild(_mapWidget);

            this.mapDivRef.removeChild(_scriptAPICall);
            // this.mapDivRef.removeChild(_ticketData);
        }
    }

    myCreateListFunction = (e) => {
        console.log("Inside Presentation Interface", e)
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
        // console.log( " Map Div " , this.mapDivRef )
        return ( 
            <Container ref = { elem => this.mapDivRef = elem }>
                {window.Seatics ?

                    window.Seatics.MapDisplay
                     :

                     <h3 className="text-center">Unable To Display Map</h3>
                

                }

            </Container>
        )
    }
}