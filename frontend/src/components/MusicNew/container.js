import React, { Component } from "react";
import PropTypes from "prop-types";
import MusicNew from "./presenter";
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

        FetchNewMusic: PropTypes.func.isRequired,   
        SaveNewMusicExpansion: PropTypes.func.isRequired,
        new_music_expansion_list: PropTypes.array, 
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.new_music_expansion_list === null 
        || this.props.new_music_expansion_list === undefined 
        || this.props.new_music_expansion_list === []
        || this.props.new_music_expansion_list.length === 0) {
            this.props.FetchNewMusic("all", this.props.music_filter, true, this.FetchNewMusicCallback.bind(this))
        }
    }

    componentWillReceiveProps(nextPros) {
        if (nextPros.pathname ===  WEBSITE_PATH.MUSIC_NEW
            && this.props.pathname !== nextPros.pathname 
            && this.props.new_music_expansion_list.length === 0) {
            this.props.FetchNewMusic("all", this.props.music_filter, true, this.FetchNewMusicCallback.bind(this))
        }
    }

    render() {
        return (
            <MusicNew 
                music_list={this.props.new_music_expansion_list}      
            />
        )
    }

    FetchNewMusicCallback = (result, json) => {
        if (result === true) {
            this.props.SaveNewMusicExpansion(json.result)
        }
    }
}

export default Container;