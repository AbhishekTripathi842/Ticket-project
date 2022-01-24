import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import  {TicketData}  from './TicketData.js';
import { isLoggedIn, decodedToken } from '../../helpers/decode-token';
import swal from 'sweetalert';


const data = `var ticketData = [
    {
        tgUserSec:"Section 100", 
        tgUserRow:"C", 
        tgUserSeats:"5-6",
        tgQty:2, 
        tgPrice:55.00, 
        tgID:1, 
        tgNotes:"Comes with a free soda", 
        tgMark:1, 
        tgType:1, 
        tgClientData:"SomeTrackingCode", 
        tgCType:"R",
        tgDisclaimers:['This seller is committing to procure these tickets for you upon receipt']
    },
    {
        tgUserSec:"Section 122", 
        tgUserRow:"T", 
        tgUserSeats:"7-8", 
        tgQty:2, 
        tgPrice:34.00, 
        tgID:2, 
        tgNotes:"Obstructed view", 
        tgMark:0, 
        tgType:1, 
        tgClientData:"SomeTrackingCode2", 
        tgCType:"R",
        tgDisclaimers:['This seller is committing to procure these tickets for you upon receipt']
    },
    {
        tgUserSec:"Section 204", 
        tgUserRow:"Z", 
        tgQty:4, 
        tgPrice:22.00, 
        tgID:3, 
        tgMark:0, 
        tgType:1, 
        tgClientData:"SomeTrackingCode3", 
        tgCType:"C", 
        tgDisclaimers:["This seller is committing to procure these tickets for you upon receipt of your order. If the seller is unable to provide the tickets or equivalent or better ones, you will receive a full refund."]
    }, 

]`
class BuildVenueMap extends Component {

    constructor(props){
        super(props)
        this.state = {
            // seaticsEndPoint:'https://sandbox.tn-apis.com/maps/v3/EventAndVenueInfo',
            // seaticsEndPoint:'https://sandbox.tn-apis.com/maps/v3/MapAndLayout',
            seaticsEndPoint:'https://www.tn-apis.com/maps/v3/MapAndLayout',  // production url
            websiteConfigId:Number(26852), // WCID
            // consumerKey:'ndunPAN5S2af9MYHWBCQE328LMMa', // Sandbox version of key
            consumerKey: 'FuOvBPQVkv3diAWuewnzQHm32nwa', // production
            // authToken: '9a70a687-7c24-3e6d-93bb-228681559304', // production
            authToken:'519a21d0-f9b5-3e6b-b963-6a2899113c53', // sandbox
            eventName: this.props.event.title,
            venue: this.props.venue.name,
            dateTime: this.changeDateFormat(this.props.event.datetime_local) ,
            TicketData: this.props.TicketData,
            check:true,
            // eventName: "Boston Red Sox vs. New York Yankees",
            // venue: "Fenway Park (Boston)",
            // dateTime: "201907251910" ,
            // dateTime: "202108092000" ,
            
            
        }
        // console.log(this.changeDateFormat(this.props.event.datetime_local))
        // this.state = {
        //     // seaticsEndPoint:'https://sandbox.tn-apis.com/maps/v3/EventAndVenueInfo',
        //     seaticsEndPoint:'https://sandbox.tn-apis.com/maps/v3/MapAndLayout',
        //     websiteConfigId:Number(26852), // WCID
        //     // consumerKey:'ndunPAN5S2af9MYHWBCQE328LMMa', // Sandbox version of key
        //     consumerKey: 'FuOvBPQVkv3diAWuewnzQHm32nwa', // production
        //     authToken: '9a70a687-7c24-3e6d-93bb-228681559304', // production
        //     // authToken:'519a21d0-f9b5-3e6b-b963-6a2899113c53', // sandbox
        //     eventName: 'Tootsie - The Musical',   // this.props.event.title, //'Boston Red Sox vs. New York Yankees'
        //     venue:'Citizens Bank Opera House', //this.props.venue.name,
        //     dateTime: '202109051300' , //this.changeDateFormat(this.props.event.datetime_local),
        // }
    }
    componentDidMount = async () => {
        // document.getElementById('tn-maps').innerHTML = "";
        // if(this.state.check){

        //     window.location.reload();
        // }

        this.setState({check:false})
        var { seaticsEndPoint, websiteConfigId, consumerKey, eventName, venue, dateTime, TicketData } = this.state
        // await this.createMap();
        // const abs = (typef dateTime);
        // console.log('dateTime',(abs))
        console.log("bjnmb",TicketData)
        const _head = document.getElementsByTagName('head')['0']

        const _jQuery = document.createElement("script");
        _jQuery.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"
        // _jQuery.src = "https://code.jquery.com/jquery-1.11.1.min.js";
        // _jQuery.src ="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js";
        // _jQuery.src ="https://code.jquery.com/jquery-3.5.1.min.js";
        const _bootstrapJs = document.createElement("script");
        _bootstrapJs.src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js";
        // _bootstrapJs.src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js";
        // _bootstrapJs.async = true
        _head.appendChild(_jQuery);
        _head.appendChild(_bootstrapJs);

              
        // const apiCall  = await this.apiResponse()
        // console.log('apiCall',apiCall)
        // var defaultOptions = new Seatics.FilterOptions(); 
        // dateTime = dateTime + 10000; 
        const embedScript = document.createElement('script');

        // ------ Danny -------- //

        embedScript.src = `${seaticsEndPoint}?websiteConfigId=${websiteConfigId}&consumerKey=${consumerKey}&eventName=${eventName}&venue=${venue}&dateTime=${parseInt(dateTime)}`
        console.log('embedScript.src',embedScript.src)
        // ----     Danny --------- //

        // embedScript.src =  "https://mapwidget3.seatics.com/js?eventId=4679886&websiteConfigId=26255";// working

        // embedScript.src = "https://www.tn-apis.com/maps/v3/MapAndLayout?websiteConfigId=26252&consumerKey=FuOvBPQVkv3diAWuewnzQHm32nwa&eventName=Sporting+Kansas+City+vs.+Houston+Dynamo&venue=Children's+Mercy+Park&dateTime=20210529"

        // embedScript.src =  "https://www.tn-apis.com/maps/v3/MapAndLayout?websiteConfigId=26252&consumerKey=FuOvBPQVkv3diAWuewnzQHm32nwa&eventName=South Dakota Coyotes at Illinois State Redbirds Football Tickets&venue=Hancock Stadium&dateTime=202203271200";



        // embedScript.src = "https://www.tn-apis.com/maps/v3/MapAndLayout?consumerKey=FuOvBPQVkv3diAWuewnzQHm32nwa&eventName=Arizona Cardinals vs. Dallas Cowboys&venue=State Farm Stadium Parking Lots&dateTime=20210730&websiteConfigId=26852"


        //  ------ Faminal Link ------ //
        // embedScript.src = "https://mapwidget3.seatics.com/js?eventId=4406739&websiteConfigId=26255"
        // ------ Faminal Link  ----- //


        // embedScript.src =  "https://www.tn-apis.com/maps/v3/MapAndLayout?callback=ticketMap&websiteConfigId=26852&consumerKey=FuOvBPQVkv3diAWuewnzQHm32nwa&eventName=Toronto FC  
        embedScript.async = true ;

        document.getElementsByTagName("head")[0].appendChild(embedScript);

        
        setTimeout(function(){ 
            if(window.Seatics !== undefined && window.Seatics !== null ){
                // console.log('wind.seat',window.Seatics.mapData)
                if(TicketData.length > 0){
                    window.Seatics.addTicketData(TicketData); 
                    window.Seatics.config.preCheckoutButtonHtml  = "Buy Ticket Now";
                    // document.getElementById("list-tickets").style.visibility="visible";
                }else{
                    // window.Seatics.config.noTicketsHandler = "No Tickets Available";
                    
                    // document.getElementById("list-tickets").style.visibility="hidden";
                }

                window.Seatics.Presentation.redirectToCheckout = function(ticketGroup, quantitySelected) {
                    // console.log('ticketGroup',ticketGroup.tgClientData);

                        console.log('decodedToken',decodedToken)
                    if(decodedToken !==null){

                        if(ticketGroup.tgClientData == decodedToken.UserId){
                            swal("You can't buy you own sold ticket", { icon: "error" });

                        }else{
                            swal("Your Ticket is Purchased Successfully", { icon: "success" });
                        }
                    }else{
                        swal("Please Login Fisrt to Purchase Ticket", { icon: "error" });
                    }


                    // alert("Replace with your own go-to-checkout  method");
                    // this.props.history.push('/checkout')
                    // window.location.replace('/checkout')
                }

                

            }  
                
            }, 3000);

        setInterval(function(){ 
            if(document.getElementById("tn-maps") != null){

                document.getElementById("tn-maps").classList.add("abc");
            }
            // console.log(document.getElementsByClassName('mapMain').querySelectorAll('ul > li'))
            // document.getElementsByClassName('mapMain').querySelectorAll('ul > li').removeAttribute("padding");
            // document.querySelectorAll('.mapMain > ul > li').style.padding= "0px";
            // $(".mapMain ul li").css({padding: "0px"});
            // $('#tn-maps').addClass("abc");   
        }, 100);
   
        // console.log('Seatics',document.scripts[4].innerHTML)
        // console.log('Seatics',window.mapCreated )
        // console.log('Seatics',document.getElementsByTagName("script")[3].innerHTML)
        // console.log('Seatics',window.initialData )
        return () => {
            _head.removeChild(_jQuery);
            _head.removeChild(_bootstrapJs);
            // this.mapDivRef.removeChild(embedScript);

            document.getElementsByTagName("head")[0].removeChild(embedScript);
            // document.body.removeChild(apiCall.data);
            // this.mapDivRef.removeChild(_ticketData);  
        }
    }

    

    // componentDidUpdate(prevProps,prevState) {

    //     document.getElementById('tn-maps').innerHTML = "";
    //     const newEventId = this.props.event.title
    //     const prevEventId = prevProps.event.title

    //     var { seaticsEndPoint, websiteConfigId, consumerKey, eventName, venue, dateTime, TicketData } = this.state
    //     console.log('prevProps',prevProps.eventName)
    //     console.log('this.props.event.title',this.props.event.title)
    //     const _head = document.getElementsByTagName('head')['0']

    //     const _jQuery = document.createElement("script");
    //     _jQuery.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"
        
    //     const _bootstrapJs = document.createElement("script");
    //     _bootstrapJs.src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js";
        
    //     _head.appendChild(_jQuery);
    //     _head.appendChild(_bootstrapJs);

              
        
    //     const embedScript = document.createElement('script');

    //     // ------ Danny -------- //

    //     embedScript.src = `${seaticsEndPoint}?websiteConfigId=${websiteConfigId}&consumerKey=${consumerKey}&eventName=${this.props.event.title}&venue=${this.props.venue.name}&dateTime=${parseInt(this.changeDateFormat(this.props.event.datetime_local))}`
    //     console.log('embedScript.src',embedScript.src)
    //     // ----     Danny --------- //

    //     // embedScript.src =  "https://mapwidget3.seatics.com/js?eventId=4679886&websiteConfigId=26255";// working

    //     // embedScript.src = "https://www.tn-apis.com/maps/v3/MapAndLayout?websiteConfigId=26252&consumerKey=FuOvBPQVkv3diAWuewnzQHm32nwa&eventName=Sporting+Kansas+City+vs.+Houston+Dynamo&venue=Children's+Mercy+Park&dateTime=20210529"

    //     // embedScript.src =  "https://www.tn-apis.com/maps/v3/MapAndLayout?websiteConfigId=26252&consumerKey=FuOvBPQVkv3diAWuewnzQHm32nwa&eventName=South Dakota Coyotes at Illinois State Redbirds Football Tickets&venue=Hancock Stadium&dateTime=202203271200";



    //     // embedScript.src = "https://www.tn-apis.com/maps/v3/MapAndLayout?consumerKey=FuOvBPQVkv3diAWuewnzQHm32nwa&eventName=Arizona Cardinals vs. Dallas Cowboys&venue=State Farm Stadium Parking Lots&dateTime=20210730&websiteConfigId=26852"


    //     //  ------ Faminal Link ------ //
    //     // embedScript.src = "https://mapwidget3.seatics.com/js?eventId=4406739&websiteConfigId=26255"
    //     // ------ Faminal Link  ----- //


    //     // embedScript.src =  "https://www.tn-apis.com/maps/v3/MapAndLayout?callback=ticketMap&websiteConfigId=26852&consumerKey=FuOvBPQVkv3diAWuewnzQHm32nwa&eventName=Toronto FC  
    //     embedScript.async = true ;

    //     document.getElementsByTagName("head")[0].appendChild(embedScript);

        
    //     setTimeout(function(){ 
    //         if(window.Seatics !== undefined && window.Seatics !== null ){
    //             // console.log('wind.seat',window.Seatics.mapData)
    //             if(TicketData.length > 0){
    //                 window.Seatics.addTicketData(TicketData); 
    //                 window.Seatics.config.preCheckoutButtonHtml  = "Buy Ticket Now";
    //                 // document.getElementById("list-tickets").style.visibility="visible";
    //             }else{
    //                 // window.Seatics.config.noTicketsHandler = "No Tickets Available";
                    
    //                 // document.getElementById("list-tickets").style.visibility="hidden";
    //             }

    //             window.Seatics.Presentation.redirectToCheckout = function(ticketGroup, quantitySelected) {
    //                 // console.log('ticketGroup',ticketGroup.tgClientData);

    //                     console.log('decodedToken',decodedToken)
    //                 if(decodedToken !==null){

    //                     if(ticketGroup.tgClientData == decodedToken.UserId){
    //                         swal("You can't buy you own sold ticket", { icon: "error" });

    //                     }else{
    //                         swal("Your Ticket is Purchased Successfully", { icon: "success" });
    //                     }
    //                 }else{
    //                     swal("Please Login Fisrt to Purchase Ticket", { icon: "error" });
    //                 }
    //             }

                

    //         }  
                
    //         }, 3000);

    //     setInterval(function(){ 
    //         if(document.getElementById("tn-maps") != null){

    //             document.getElementById("tn-maps").classList.add("abc");
    //         }
               
    //     }, 100);
   
    //     return () => {
    //         _head.removeChild(_jQuery);
    //         _head.removeChild(_bootstrapJs);
    //         // this.mapDivRef.removeChild(embedScript);

    //         document.getElementsByTagName("head")[0].removeChild(embedScript);
            
    //     }

    //     // if(newEventId !== prevEventId){
    //         // window.location.reload()
    //         // this.setState({
    //         //     eventId:newEventId,
    //         //     loader:false,
    //         // }, () => this.getEventDetails( this.state.eventId ))
    //     // }
    // }

   

    changeDateFormat = (date) => {
        if(date){
            let d = new Date(date.split('T')[0])
            let t = date.split('T')[1].split(':')
            let m = d.getMonth()+1
            // console.log(`${d.getFullYear()}` + `${m < 10 ? '0'+m : m}` + `${d.getDate()}` + `${t[0]}` + `${t[1]}`)
            return (`${d.getFullYear()}` + `${m < 10 ? '0'+m : m}` + `${d.getDate() < 10 ? '0'+d.getDate() : d.getDate()}` + `${t[0]}` + `${t[1]}`)
        }else {
            return null
        }
    }


    apiResponse = async () => {
        const { seaticsEndPoint, websiteConfigId, consumerKey, eventName, venue, dateTime } = this.state
        const apiCall = await axios.get(`${seaticsEndPoint}?websiteConfigId=${websiteConfigId}&consumerKey=${consumerKey}&eventName=${eventName}&venue=${venue}&dateTime=${dateTime}`)
        // const apiCall = await axios.get("https://www.tn-apis.com/maps/v3/MapAndLayout?websiteConfigId=26852&consumerKey=FuOvBPQVkv3diAWuewnzQHm32nwa&eventName=Lakers at Heat&venue=american-airlines-arena&dateTime=202104081930")
        return apiCall
    }

    render(){
        // console.log('Seatics',_jQuery(createPresentationLayer))
         
        return (
            <>
            <div id="tn-maps" style={{height:"800px"}} ></div>
            </>
        )
    }
}


export default BuildVenueMap