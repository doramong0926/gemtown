import React, { Component } from "react";
import PropTypes from "prop-types";
import MusicRating from "./presenter";
import { WEBSITE_PATH } from "./../../config/constants"

class Container extends Component {

    static propTypes = {
        pathname: PropTypes.string.isRequired,
        music_filter: PropTypes.shape({
            genre: PropTypes.array,
            genre_detail: PropTypes.array,
            career: PropTypes.array,
        }),
        musicFilterList: PropTypes.string,

        FetchRatingMusic: PropTypes.func.isRequired,   
        SaveRatingMusicExpansion: PropTypes.func.isRequired,
        rating_music_expansion_list: PropTypes.array, 
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.rating_music_expansion_list === null 
        || this.props.rating_music_expansion_list === undefined 
        || this.props.rating_music_expansion_list === []
        || this.props.rating_music_expansion_list.length === 0) {
                this.props.FetchRatingMusic("all", this.props.music_filter, true, this.FetchRatingMusicCallback.bind(this))
        }
    }

    componentWillReceiveProps(nextPros) {
        if (nextPros.pathname ===  WEBSITE_PATH.MUSIC_NEW
            && this.props.pathname !== nextPros.pathname 
            && this.props.rating_music_expansion_list.length === 0) {
            this.props.FetchRatingMusic("all", this.props.music_filter, true, this.FetchRatingMusicCallback.bind(this))
        }
    }

    render() {
        return (
            <MusicRating 
                music_list={this.props.rating_music_expansion_list}      
            />
        )
    }

    FetchRatingMusicCallback = (result, json) => {
        if (result === true) {
            this.props.SaveRatingMusicExpansion(json.result)
        }
    }
}

export default Container;