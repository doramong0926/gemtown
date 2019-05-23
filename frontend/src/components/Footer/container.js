import React, { Component } from "react";
import PropTypes from "prop-types";
import Footer from "./presenter";

class Container extends Component {
    static propTypes = {
        pathname: PropTypes.string.isRequired,
    }
    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    render() {
        return (
            <Footer       
                pathname={this.props.pathname}
                handleOnClick={this._handleOnClick}
            />
        )
    }    

    _handleOnClick = () => {
        ;
    }
}

export default Container;

