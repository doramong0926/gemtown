import React, { Component } from "react";
import PropTypes from "prop-types";
import Music from "./presenter";
import { WEBSITE_PATH } from "./../../config/constants"

class Container extends Component {
    constructor(props, context) {
        super(props, context);
        this.new_ref = React.createRef();
        this.rating_ref = React.createRef();
        this.social_ref = React.createRef();
    }

    static propTypes = {
        pathname: PropTypes.string.isRequired,
        music_filter: PropTypes.shape({
            genre: PropTypes.array,
            genre_detail: PropTypes.array,
            career: PropTypes.array,
        }),
        musicFilterList: PropTypes.string,

        FetchNewMusic: PropTypes.func.isRequired,
        SaveNewMusic: PropTypes.func.isRequired,
        new_music_list: PropTypes.array,

        FetchRatingMusic: PropTypes.func.isRequired,
        SaveRatingMusic: PropTypes.func.isRequired,
        rating_music_list: PropTypes.array,
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.new_music_list === undefined || this.props.new_music_list === null || this.props.new_music_list.length === 0) {
            this.props.FetchNewMusic(10, this.props.music_filter, true, this.FetchNewMusicCallback.bind(this))
        }
        if (this.props.rating_music_list === undefined || this.props.rating_music_list === null || this.props.rating_music_list.length === 0) {
            this.props.FetchRatingMusic(10, this.props.music_filter, true, this.FetchRatingMusicCallback.bind(this))
        }
    }

    componentWillReceiveProps(nextPros) {
        if (nextPros.pathname ===  WEBSITE_PATH.MUSIC
            && this.props.pathname !== nextPros.pathname
            && (this.props.new_music_list.length === 0 || this.props.rating_music_list.length === 0)) {
            this.props.FetchNewMusic('all', this.props.music_filter, true, this.FetchNewMusicCallback.bind(this))
            this.props.FetchRatingMusic(10, this.props.music_filter, true, this.FetchRatingMusicCallback.bind(this))
        }
    }

    render() {
        return (
            <Music
                new_music_list={this.props.new_music_list}
                rating_music_list={this.props.rating_music_list}
                musicFilterList={this.props.musicFilterList}
                scroll={this._scrollToElement.bind(this)}
                new_ref={this.new_ref}
                rating_ref={this.rating_ref}
                social_ref={this.social_ref}
            />
        )
    }

    FetchNewMusicCallback = (result, json) => {
        if (result === true) {
            this.props.SaveNewMusic(json.result)
        }
    }

    FetchRatingMusicCallback = (result, json) => {
        if (result === true) {
            this.props.SaveRatingMusic(json.result)
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
