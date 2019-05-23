import React, { Component } from "react";
import PropTypes from "prop-types";
import TopSlideBox from "./presenter";
import { CONTENTS_TYPE, ADVERTISING_TYPE } from "./../../config/constants"
import _ from "lodash";

class Container extends Component {
    static propTypes = {
        slideType: PropTypes.string.isRequired,
        SaveAdvertising: PropTypes.func.isRequired,
        FetchAdvertising: PropTypes.func.isRequired,
        advertising_list: PropTypes.array,
    }

    componentDidMount() {
        this.props.FetchAdvertising(this._callbackFetchAdvertising.bind(this));
    }

    render() {
        return (
            <TopSlideBox
                slideInfo={this._getSlideInfo()}
                handleOnClick={this._handleOnClick}
            />
        )
    }

    _handleOnClick = () => {
        ;
    }

    _getSlideInfo = () => {
        let array = []
        if (this.props.advertising_list.length === 0) {
            return null;
        }
        switch (this.props.slideType) {
            case CONTENTS_TYPE.MUSIC :
                array = _.filter(this.props.advertising_list, (item) => {
                    return (
                        item.advertising_type === ADVERTISING_TYPE.TOP_MUSIC
                        && item.activate === true
                    )
                })
                break;
            case CONTENTS_TYPE.MODEL :
                array = _.filter(this.props.advertising_list, (item) => {
                    return (
                        item.advertising_type === ADVERTISING_TYPE.TOP_MODEL
                        && item.activate === true
                    )
                })
                break;
            case CONTENTS_TYPE.STROY :
                array = _.filter(this.props.advertising_list, (item) => {
                    return (
                        item.advertising_type === ADVERTISING_TYPE.TOP_STORY
                        && item.activate === true
                    )
                })
                break;
            case CONTENTS_TYPE.VIDEO :
                array = _.filter(this.props.advertising_list, (item) => {
                    return (
                        item.advertising_type === ADVERTISING_TYPE.TOP_VIDEO
                        && item.activate === true
                    )
                })
                break;
            default :
                return null;
        }
        return _.orderBy(array, 'priority', 'asc');
    }

    _callbackFetchAdvertising = (result, data) => {

    }
}

export default Container;

