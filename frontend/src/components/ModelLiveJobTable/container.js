import React, { Component } from "react";
import PropTypes from "prop-types";
import ModelLiveJobTable from "./presenter";

class Container extends Component {
    static propTypes = {
        pathname: PropTypes.string.isRequired,
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    render() {
        return (
            <ModelLiveJobTable />
        )
    }
}

export default Container;
