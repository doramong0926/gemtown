import React, { Component } from "react";
import PropTypes from "prop-types";
import ModelRating from "./presenter";
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

        FetchRatingModel: PropTypes.func.isRequired,   
        SaveRatingModelExpansion: PropTypes.func.isRequired,
        rating_model_expansion_list: PropTypes.array, 
    }
    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.rating_model_expansion_list === null 
        || this.props.rating_model_expansion_list === undefined 
        || this.props.rating_model_expansion_list === []
        || this.props.rating_model_expansion_list.length === 0) {
            this.props.FetchRatingModel("all", this.props.model_filter, true, this.FetchRatingModelCallback.bind(this))
        }
    }

    componentWillReceiveProps(nextPros) {
        if (nextPros.pathname ===  WEBSITE_PATH.MODEL_NEW
            && this.props.pathname !== nextPros.pathname 
            && this.props.rating_model_expansion_list.length === 0) {
            this.props.FetchRatingModel("all", this.props.model_filter, true, this.FetchRatingModelCallback.bind(this))
        }
    }

    render() {
        return (
            <ModelRating 
                model_list={this.props.rating_model_expansion_list}      
            />
        )
    }

    FetchRatingModelCallback = (result, json) => {
        if (result === true) {
            this.props.SaveRatingModelExpansion(json.result)
        }
    }
}

export default Container;