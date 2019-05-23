import React, { Component } from "react";
import PropTypes from "prop-types";
import ModelTable from "./presenter";

class Container extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visibleModelInfoModal: false,
            selectedModelId: null,
        }
    }   

    static propTypes = {
        pathname: PropTypes.string.isRequired,
        model_list: PropTypes.array,       
        tableType: PropTypes.string.isRequired, 
    }

    render() {
        return (
            <ModelTable 
                model_list={this.props.model_list}
                tableType={this.props.tableType}
                handleOnClick={this._handleOnClick}
                visibleModelInfoModal={this.state.visibleModelInfoModal}
                handleCloseModelInfoModal={this._handleCloseModelInfoModal}
                selectedModelId={this.state.selectedModelId}
            />
        )
    }

    _handleCloseModelInfoModal = () => {
        this.setState({
            visibleModelInfoModal: false,
            selectedModelId: null,
        })
    }

    _handleOnClick = (model) => {
        this.setState({
            selectedModelId: model.id,
            visibleModelInfoModal: true,
        })
    }
}

export default Container;