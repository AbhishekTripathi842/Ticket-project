import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from './containers/Layout';
import './stylesheets/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './App.css';

class App extends Component {

  componentDidMount() {
    if(this.props.loggedIn){
      console.log("Logged In --------------> ", this.props.loggedIn);
    }else{
      console.log("Logged In --------------> ",false)
    }
    // this.geoFindMe();
  }
  
  // geoFindMe = () => {
  //     if (!navigator.geolocation){
  //         console.log("Geolocation is not supported by your browser");
  //         return;
  //     }
  //     function success(position) {
  //       console.log(position)
  //       // var latitude  = position.coords.latitude;
  //       // var longitude = position.coords.longitude;
  //       // reverseGeocodingWithGoogle(longitude, latitude)
  //     }
  //     function error() {
  //       console.log("Unable to retrieve your location");
  //     }
  //     navigator.geolocation.getCurrentPosition(success, error);
  // }

  render(){
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    return (
      <div className="App">
        <Layout/>          
      </div>
    );
  }
}


const mapStateToProps = state => {
    // console.log(state.authentication);
    const { loggedIn } = state.authentication;
    return { loggedIn }
}
export default connect( mapStateToProps, null )( App );
