import React, { Component } from "react";
import PropTypes from "prop-types";
import Model from "./presenter";
import { WEBSITE_PATH } from "./../../config/constants"

class Container extends Component {
    constructor(props, context) {
        super(props, context);
        this.new_ref = React.createRef();
        this.rating_ref = React.createRef();
        this.livejob_ref = React.createRef();
    }

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
        SaveNewModel: PropTypes.func.isRequired,
        new_model_list: PropTypes.array,

        FetchRatingModel: PropTypes.func.isRequired,
        SaveRatingModel: PropTypes.func.isRequired,
        rating_model_list: PropTypes.array,
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.new_model_list === undefined || this.props.new_model_list === null || this.props.new_model_list.length === 0) {
            this.props.FetchNewModel(10, this.props.model_filter, true, this.FetchNewModelCallback.bind(this))
        }
        if (this.props.rating_model_list === undefined || this.props.rating_model_list === null || this.props.rating_model_list.length === 0) {
            this.props.FetchRatingModel(10, this.props.model_filter, true, this.FetchRatingModelCallback.bind(this))
        }
    }

    componentWillReceiveProps(nextPros) {
        if (nextPros.pathname ===  WEBSITE_PATH.MODEL
            && this.props.pathname !== nextPros.pathname
            && (this.props.new_model_list.length === 0 || this.props.rating_model_list.length === 0)) {
            this.props.FetchNewModel('all', this.props.model_filter, true, this.FetchNewModelCallback.bind(this))
            this.props.FetchRatingModel(10, this.props.model_filter, true, this.FetchRatingModelCallback.bind(this))
        }
    }

    render() {
        return (
            <Model
                new_model_list={this.props.new_model_list}
                rating_model_list={this.props.rating_model_list}
                modelFilterList={this.props.modelFilterList}
                scroll={this._scrollToElement.bind(this)}
                new_ref={this.new_ref}
                rating_ref={this.rating_ref}
                livejob_ref={this.livejob_ref}
            />
        )
    }

    FetchNewModelCallback = (result, json) => {
        if (result === true) {
            this.props.SaveNewModel(json.result)
        }
    }

    FetchRatingModelCallback = (result, json) => {
        if (result === true) {
            this.props.SaveRatingModel(json.result)
        }
    }

    _scrollToElement = (ref) => {
        if (ref.current === null) {
            return;
        }
        window.scrollTo({
            top: ref === null ? 0 : ref.current.offsetTop,
            behavior: "smooth"
        })
    }
}

export default Container;
