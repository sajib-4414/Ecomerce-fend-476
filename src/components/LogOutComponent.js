import React, { Component } from "react";

class LogOutComponent extends Component{
    componentDidMount() {
        localStorage.removeItem('currentUser');
        this.props.notifyAppJSLogOut()
    }

    render() {
        return(
            <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h1 className="display-5">You have logged out</h1>
                <p className="lead">Please login again to get a customized experience</p>
            </div>
        );
    }
}
export default LogOutComponent