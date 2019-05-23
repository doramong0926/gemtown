import React, { Component } from "react";
import PropTypes from "prop-types";
import ModelNew from "./presenter";
import { WEBSITE_PATH } from "../../config/constants"

class Container extends Component {
    static propTypes = {
        pathname: PropTypes.string.isRequired,
        model_filter: PropTypes.shape({
            gender: PropTypes.array,
            age_range: PropTypes.array,
            job: PropTypes.array,
            entertainment: PropTypes.array,
            style: PropTypes.array,
            career: PropTypes.array,
        }),
        modelFilterList: PropTypes.string,

        FetchNewModel: PropTypes.func.isRequired,   
        SaveNewModelExpansion: PropTypes.func.isRequired,
        new_model_expansion_list: PropTypes.array, 
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.new_model_expansion_list === null 
        || this.props.new_model_expansion_list === undefined 
        || this.props.new_model_expansion_list === []
        || this.props.new_model_expansion_list.length === 0) {
            this.props.FetchNewModel("all", this.props.model_filter, true, this.FetchNewModelCallback.bind(this))
        }
    }

    componentWillReceiveProps(nextPros) {
        if (nextPros.pathname ===  WEBSITE_PATH.MODEL_NEW
            && this.props.pathname !== nextPros.pathname 
            && this.props.new_model_expansion_list.length === 0) {
            this.props.FetchNewModel("all", this.props.model_filter, true, this.FetchNewModelCallback.bind(this))
        }
    }

    render() {
        return (
            <ModelNew 
                model_list={this.props.new_model_expansion_list}      
            />
        )
    }

    FetchNewModelCallback = (result, json) => {
        if (result === true) {
            this.props.SaveNewModelExpansion(json.result)
        }
    }
}

export default Container;