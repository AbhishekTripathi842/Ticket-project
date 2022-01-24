import React, { Component } from 'react';
import { connect } from 'react-redux';

class ErrorCode500 extends Component{

    componentDidMount(){
        // if(!this.props.isError){
        //     window.location.replace('/');
        // }
    }
    render(){
        return(
            <div id="notfound">
                <div className="notfound">
                    <div class="notfound-404">
                        <h3>Oops! Something went wrong</h3>
                        <h1><span>5</span><span>0</span><span>0</span></h1>
                    </div>
                    <h2>we are sorry, things are a little <span style={{color:'#e94d13'}}>UNSTABLE</span> here</h2>
                    <h2>I suggest come back later</h2>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    // console.log("500 --->  ", state)
    const { errorOccured } = state
    return {
        isError: errorOccured.isError
    }
}

export default connect(mapStateToProps, null)(ErrorCode500)