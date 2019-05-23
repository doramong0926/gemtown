import React, { Component } from "react";
import PropTypes from "prop-types";
import App from "./presenter";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'

class Container extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: false,
        };    
    }

    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        pathname: PropTypes.any.isRequired,
        visibleDefaultSpinner: PropTypes.bool.isRequired,
        music: PropTypes.object,
        userInfo: PropTypes.object,
        GetUserInfo: PropTypes.func.isRequired,
        userid: PropTypes.string,
        token: PropTypes.string,
        
    }

    componentDidMount() {
        library.add(faUser)
        if (this.props.isLoggedIn === true && this.props.userInfo === null) {
            this.props.GetUserInfo(this.props.userid, this.props.token)
        }
    }

    render() {
        if (this.props.isLoggedIn === true && this.props.userInfo === null) {
            return null;
        }
        else {
            return (
                <App 
                    isLoading={this.state.isLoading}
                    isLoggedIn={this.props.isLoggedIn}
                    pathname={this.props.pathname}
                    visibleDefaultSpinner={this.props.visibleDefaultSpinner}
                    music={this.props.music}
                />
            )
        }
    }   
}
export default Container;
