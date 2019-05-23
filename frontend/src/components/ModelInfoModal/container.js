import React, { Component } from "react";
import PropTypes from "prop-types";
import ModelInfoModal from "./presenter";

class Container extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            model: null,
        }
    }   

    static propTypes = {
        handleClose: PropTypes.func.isRequired,
        visible: PropTypes.bool.isRequired,
        modelId: PropTypes.number,
        FetchDetailModel: PropTypes.func.isRequired,
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.modelId !== undefined && this.props.modelId !== null) {
            this.props.FetchDetailModel(this.props.modelId, false, this.FetchDetailModelCallback.bind(this))
        }
    } 

    componentWillReceiveProps(nextPros) {
        if (nextPros.modelId !==  this.props.modelId && nextPros.modelId !== null && nextPros.modelId !== undefined) {
            this.props.FetchDetailModel(nextPros.modelId, false, this.FetchDetailModelCallback.bind(this))
        }
        if (nextPros.visible === false) {
            this.setState({
                model: null,
            })
        }
    }
    
    FetchDetailModelCallback = (result, json) => {
        if (result === true) {
            this.setState({
                model: json.result,
            })
        }
    }

    render() {
        return (
            <ModelInfoModal
                visible={this.props.visible}
                handleClose={this.props.handleClose}
                model={this.state.model}
            />
        )
    }
}

export default Container;

