import React, { Component } from "react";
import PropTypes from "prop-types";
import ModelUploadConfirmModal from "./presenter";

class Container extends Component {

    static propTypes = {
        handleClose: PropTypes.func.isRequired,
        handleConfirm: PropTypes.func.isRequired,
        visible: PropTypes.bool.isRequired,
        confirmData: PropTypes.object,
    }
    render() {
        return (
            <ModelUploadConfirmModal
                visible={this.props.visible}
                handleClose={this.props.handleClose}
                handleConfirm={this.props.handleConfirm}
                confirmData={this.props.confirmData}
            />
        )
    }    
}

export default Container;

