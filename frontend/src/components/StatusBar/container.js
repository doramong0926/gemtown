import React, { Component } from "react";
import PropTypes from "prop-types";
import StatusBar from "./presenter";

class Container extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoggedIn: false,
            usertype: "ARTIST",
            visibleLogoutConfirmModal: false,
        };    
    }

    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        Logout: PropTypes.func.isRequired,
        pathname: PropTypes.string.isRequired,
        userInfo: PropTypes.shape({
            username: PropTypes.string,
            gem_amount: PropTypes.number.isRequired,
        })
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidMount() 
    {
    }

    componentWillReceiveProps(nextProps) 
    {
    }

    render() {
        return (
            <StatusBar 
                isLoggedIn={this.props.isLoggedIn}
                userInfo={this.props.userInfo}
                usertype={this.state.usertype}              
                visibleLogoutConfirmModal={this.state.visibleLogoutConfirmModal}
                handleOnClickLogInOut={this._handleOnClickLogInOut}
                handleCloseLogoutModal={this._handleCloseLogoutModal}
                handleLogoutConfirm={this._handleLogoutConfirm}
                pathname={this.props.pathname}
            />
        )
    }

    _handleOnClickLogInOut = () => {
        if (this.props.isLoggedIn === true) {
            this.setState({
                visibleLogoutConfirmModal: true,
            })
        } else {
        }
    }

    _handleCloseLogoutModal = () => {
        this.setState({
            visibleLogoutConfirmModal: false,
        })
    }

    _handleLogoutConfirm = () => {
        this.setState({
            visibleLogoutConfirmModal: false,
        })
        this.props.Logout();
    }
}

export default Container;