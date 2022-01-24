import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import ROUTES, { RenderRoutes } from "../routing/Routes";

class Layout extends Component{
    render(){
        return(
            <div className="homePage">
                <Header/>
                <RenderRoutes routes={ROUTES} />
                <Footer/>        
            </div>
        )
    }
}

export default Layout;