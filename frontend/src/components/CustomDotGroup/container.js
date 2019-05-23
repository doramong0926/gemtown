import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomDotGroup from "./presenter";

class Container extends Component {
    static propTypes = {
        slides: PropTypes.number.isRequired,
        size: PropTypes.string
    }

    render() {
        return (
            <CustomDotGroup 
                slides={this.props.slides}
                size={this.props.size}
            />
        )
    }
}

export default Container;