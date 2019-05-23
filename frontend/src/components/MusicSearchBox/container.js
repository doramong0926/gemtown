import React, { Component } from "react";
import PropTypes from "prop-types";
import MusicSearchBox from "./presenter";
import {
    SORTING_FILTER_ID,
    MUSIC_CAREER,
    MUSIC_GENRE,
    MUSIC_GENRE_DETAIL,
    WEBSITE_PATH,
    SORTING_MENU_ID,
 } from "./../../config/constants"
import _ from "lodash";

class Container extends Component {
    GenreList = [
        { id: MUSIC_GENRE.BALLAD, name: this.context.t("발라드") },
        { id: MUSIC_GENRE.DANCE, name: this.context.t("댄스") },
        { id: MUSIC_GENRE.RAP_HIP_HOP, name: this.context.t("랩/힙합") },
        { id: MUSIC_GENRE.RNB_SOUL, name: this.context.t("R&B/SOUL") },
        { id: MUSIC_GENRE.ROCK_BAND, name: this.context.t("락/밴드") },
        { id: MUSIC_GENRE.JAZZ, name: this.context.t("JAZZ") },
        { id: MUSIC_GENRE.TROT, name: this.context.t("트로트") },
        { id: MUSIC_GENRE.FOLK_BLUES, name: this.context.t("포크/블루스") },
    ]

    GenreDetailList = [
        { id: MUSIC_GENRE_DETAIL.OST, name: this.context.t("OST") },
        { id: MUSIC_GENRE_DETAIL.EDM, name: this.context.t("EDM") },
        { id: MUSIC_GENRE_DETAIL.RAVE, name: this.context.t("RAVE") },
        { id: MUSIC_GENRE_DETAIL.THECNO, name: this.context.t("THECNO") },
        { id: MUSIC_GENRE_DETAIL.TRANCE, name: this.context.t("TRANCE") },
        { id: MUSIC_GENRE_DETAIL.CLUB, name: this.context.t("CLUB") },
        { id: MUSIC_GENRE_DETAIL.CAROL, name: this.context.t("CAROL") },
        { id: MUSIC_GENRE_DETAIL.CCM, name: this.context.t("CCM") },
        { id: MUSIC_GENRE_DETAIL.CM, name: this.context.t("CM") },
    ]

    CareerList = [
        { id: MUSIC_CAREER.UNDER_1YEAR, name: this.context.t("Under 1 Yr") },
        { id: MUSIC_CAREER._2YEAR, name: this.context.t("2 Yr") },
        { id: MUSIC_CAREER._3YEAR, name: this.context.t("3 Yr") },
        { id: MUSIC_CAREER._4YEAR, name: this.context.t("4 Yr") },
        { id: MUSIC_CAREER._5YEAR, name: this.context.t("5 Yr") },
        { id: MUSIC_CAREER._6YEAR_10YEAR, name: this.context.t("6~10 Yr") },
        { id: MUSIC_CAREER.OVER_10YEAR, name: this.context.t("Over 10 Yr") },
    ]

    constructor(props, context) {
        super(props, context);

        this.state = {
            music_filter: this.props.music_filter,
        }
    }

    static propTypes = {
        pathname: PropTypes.string.isRequired,
        SaveMusicFilterList: PropTypes.func.isRequired,
        SaveMusicFilter: PropTypes.func.isRequired,
        music_filter: PropTypes.shape({
            genre: PropTypes.array,
            genre_detail: PropTypes.array,
            career: PropTypes.array,
        }),
        FetchNewMusic: PropTypes.func.isRequired,
        SaveNewMusic: PropTypes.func.isRequired,
        FetchRatingMusic: PropTypes.func.isRequired,
        SaveRatingMusic: PropTypes.func.isRequired,
        SaveNewMusicExpansion: PropTypes.func.isRequired,
        SaveRatingMusicExpansion: PropTypes.func.isRequired,
        userid: PropTypes.string,
        contextRef: PropTypes.any,
        scroll: PropTypes.func,
        new_ref: PropTypes.object,
        rating_ref: PropTypes.object,
        social_ref: PropTypes.object,
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.pathname !== nextProps.pathname) {
            this.setState({
                music_filter: this.props.music_filter,
            })
        }
    }


    render() {
        return (
            <MusicSearchBox
                music_filter={this.state.music_filter}
                handleOnClick={this._handleOnClick}
                handleOnClickFilter={this._handleOnClickFilter}
                CareerList = {this.CareerList}
                GenreList = {this.GenreList}
                GenreDetailList = {this.GenreDetailList}
                pathname = {this.props.pathname}
                contextRef = {this.props.contextRef}
                handleOnClickMenu = {this._handleOnClickMenu}
            />
        )
    }

    _handleOnClickMenu = (menu_id) => {
        switch(menu_id) {
            case SORTING_MENU_ID.NEW_UPDATE:
                this.props.scroll(this.props.new_ref);
                break;
            case SORTING_MENU_ID.RATING:
                this.props.scroll(this.props.rating_ref);
                break;
            case SORTING_MENU_ID.SOCIAL:
                this.props.scroll(this.props.social_ref);
                break;
            default:
                break;
        }
    }

    _handleOnClick = (event) => {
        const { target: { id } } = event;
        if (id === 'sorting_icon' || id === 'sorting_image') {
            this.props.SaveMusicFilter(this.state.music_filter);
            setTimeout(() => {
                switch(this.props.pathname) {
                    case WEBSITE_PATH.MUSIC:
                        this.props.FetchNewMusic(10, this.props.music_filter, true, this.FetchNewMusicCallback.bind(this))
                        this.props.FetchRatingMusic(10, this.props.music_filter, true, this.FetchRatingMusicCallback.bind(this))
                        this.props.SaveNewMusicExpansion([]);
                        this.props.SaveRatingMusicExpansion([]);
                        break;
                    case WEBSITE_PATH.MUSIC_NEW:
                        this.props.FetchNewMusic('all', this.props.music_filter, true, this.FetchNewMusicExpansionCallback.bind(this))
                        this.props.SaveNewMusic([]);
                        this.props.SaveRatingMusic([]);
                        this.props.SaveRatingMusicExpansion([]);
                        break;

                    case WEBSITE_PATH.MUSIC_RATING:
                        this.props.FetchRatingMusic('all', this.props.music_filter, true, this.FetchRatingMusicExpansionCallback.bind(this))
                        this.props.SaveNewMusic([]);
                        this.props.SaveRatingMusic([]);
                        this.props.SaveNewMusicExpansion([]);
                        break;

                    default:
                        break;
                }

                let musicFilterListString = "";
                let foundString = null;
                if (this.props.music_filter.genre.length > 0) {
                    foundString = this.props.music_filter.genre.map(t => {
                        return this._getFilterStr(SORTING_FILTER_ID.GENRE, t)
                    })
                    if (foundString !== null) {
                        musicFilterListString = musicFilterListString + foundString;
                    }
                }
                if (this.props.music_filter.genre_detail.length > 0) {
                    foundString = this.props.music_filter.genre_detail.map(t => {
                        return this._getFilterStr(SORTING_FILTER_ID.GENRE_DETAIL, t)
                    })
                    if (foundString !== null) {
                        if (musicFilterListString === "") {
                            musicFilterListString = foundString;
                        } else {
                            musicFilterListString = musicFilterListString + "," +foundString;
                        }
                    }
                }
                if (this.props.music_filter.career.length > 0) {
                    foundString = this.props.music_filter.career.map(t => {
                        return this._getFilterStr(SORTING_FILTER_ID.CAREER, t)
                    })
                    if (foundString !== null) {
                        if (musicFilterListString === "") {
                            musicFilterListString = foundString;
                        } else {
                            musicFilterListString = musicFilterListString + "," +foundString;
                        }
                    }
                }
                if (musicFilterListString === '') {
                    this.props.SaveMusicFilterList(this.context.t("ALL"));
                } else {
                    this.props.SaveMusicFilterList(musicFilterListString);
                }
            }, );
        }
    }

    _getFilterStr = (filterId, filterStr) => {
        let checkList;
        if (filterId === SORTING_FILTER_ID.GENRE) {
            checkList = this.GenreList;
        } else if (filterId === SORTING_FILTER_ID.GENRE_DETAIL) {
            checkList = this.GenreDetailList;
        } else if (filterId === SORTING_FILTER_ID.CAREER) {
            checkList = this.CareerList;
        }
        const foundStr = _.find(checkList, t => t.id === filterStr).name
        if (foundStr === undefined) {
            return null;
        } else {
            return foundStr;
        }
    }

    _handleOnClickFilter = (category, id) => {
        let array = null;
        switch(category) {
            case SORTING_FILTER_ID.GENRE:
                array = this.state.music_filter.genre;
                break;
            case SORTING_FILTER_ID.GENRE_DETAIL:
                array = this.state.music_filter.genre_detail;
                break;
            case SORTING_FILTER_ID.CAREER:
                array = this.state.music_filter.career;
                break;
            default:
                break;
        }

        if (array === null) {
            return;
        }

        if(_.find(array, t=>t === id) === undefined) {
            this.setState({
                music_filter: {
                    ...this.state.music_filter,
                    [category]: _.concat(array, id),
                }
            })
        } else {
            this.setState({
                music_filter: {
                    ...this.state.music_filter,
                    [category]: _.pull(array, id),
                }
            })
        }
    }

    FetchNewMusicCallback = (result, json) => {
        if (result === true) {
            this.props.SaveNewMusic(json.result)
        }
    }

    FetchNewMusicExpansionCallback = (result, json) => {
        if (result === true) {
            this.props.SaveNewMusicExpansion(json.result)
        }
    }

    FetchRatingMusicCallback = (result, json) => {
        if (result === true) {
            this.props.SaveRatingMusic(json.result)
        }
    }

    FetchRatingMusicExpansionCallback = (result, json) => {
        if (result === true) {
            this.props.SaveRatingMusicExpansion(json.result)
        }
    }
}

export default Container;
