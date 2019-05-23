import React, { Component } from "react";
import PropTypes from "prop-types";
import ModelSearchBox from "./presenter";
import {
    SORTING_FILTER_ID,
    MODEL_GENDER,
    MODEL_AGE,
    MODEL_JOB,
    MODEL_ENTERTAINMENT,
    MODEL_STYLE,
    MODEL_CAREER,
    WEBSITE_PATH,
    SORTING_MENU_ID,
 } from "./../../config/constants"
import _ from "lodash";

class Container extends Component {
    GenderList = [
        { id: MODEL_GENDER.MALE, name: this.context.t("남자(국내)") },
        { id: MODEL_GENDER.FEMALE, name: this.context.t("남자(해외)") },
        { id: MODEL_GENDER.FOREGIN_MALE, name: this.context.t("여자(국내)") },
        { id: MODEL_GENDER.FOREGIN_FEMALE, name: this.context.t("여자(해외)") },
        { id: MODEL_GENDER.NOT_SPECIFIED, name: this.context.t("기타") },
    ]

    AgeList = [
        { id: MODEL_AGE.CHILD, name: this.context.t("아동") },
        { id: MODEL_AGE.AGE_10S, name: this.context.t("10대") },
        { id: MODEL_AGE.AGE_20S, name: this.context.t("20대") },
        { id: MODEL_AGE.AGE_30S, name: this.context.t("30대") },
        { id: MODEL_AGE.AGE_50S, name: this.context.t("50대") },
        { id: MODEL_AGE.AGE_60S, name: this.context.t("60대") },
    ]

    JobList = [
        { id: MODEL_JOB.BEAUTY, name: this.context.t("뷰티") },
        { id: MODEL_JOB.HAIR, name: this.context.t("헤어") },
        { id: MODEL_JOB.DRINK, name: this.context.t("음료") },
        { id: MODEL_JOB.EDUCATION, name: this.context.t("교육") },
        { id: MODEL_JOB.ENTERPRISE, name: this.context.t("기업") },
        { id: MODEL_JOB.FINANCE, name: this.context.t("금융") },
        { id: MODEL_JOB.SPORT, name: this.context.t("스포츠") },
        { id: MODEL_JOB.FASHION, name: this.context.t("패션") },
        { id: MODEL_JOB.WEDDING, name: this.context.t("웨딩") },
        { id: MODEL_JOB.SWIMSUIT, name: this.context.t("수영복") },
        { id: MODEL_JOB.UNDERWEAR, name: this.context.t("언더웨어") },
    ]

    EntertainmentList = [
        { id: MODEL_ENTERTAINMENT.PICTORIAL, name: this.context.t("화보") },
        { id: MODEL_ENTERTAINMENT.MAGAZINE, name: this.context.t("잡지") },
        { id: MODEL_ENTERTAINMENT.BROADCAST, name: this.context.t("방송") },
        { id: MODEL_ENTERTAINMENT.CF, name: this.context.t("CF") },
        { id: MODEL_ENTERTAINMENT.EVENT, name: this.context.t("행사") },
        { id: MODEL_ENTERTAINMENT.EXHIBITION, name: this.context.t("전시") },
        { id: MODEL_ENTERTAINMENT.RACING, name: this.context.t("레이싱") },
        { id: MODEL_ENTERTAINMENT.NARRATOR_DANCE, name: this.context.t("나레이터(댄스)") },
        { id: MODEL_ENTERTAINMENT.NARRATOR_ANNOUNCEMENT, name: this.context.t("나레이터(멘트)") },
    ]

    StyleList = [
        { id: MODEL_STYLE.PURE, name: this.context.t("순수") },
        { id: MODEL_STYLE.SEXY, name: this.context.t("섹시") },
        { id: MODEL_STYLE.CUTENESS, name: this.context.t("귀여움") },
        { id: MODEL_STYLE.BAGEL, name: this.context.t("베이글") },
        { id: MODEL_STYLE.TOUGH, name: this.context.t("터프") },
        { id: MODEL_STYLE.CHIC, name: this.context.t("시크") },
        { id: MODEL_STYLE.SMART, name: this.context.t("스마트") },
    ]

    CareerList = [
        { id: MODEL_CAREER.UNDER_1YEAR, name: this.context.t("Under 1 Yr") },
        { id: MODEL_CAREER.CAREER_2YEAR, name: this.context.t("2 Yr") },
        { id: MODEL_CAREER.CAREER_3YEAR, name: this.context.t("3 Yr") },
        { id: MODEL_CAREER.CAREER_4YEAR, name: this.context.t("4 Yr") },
        { id: MODEL_CAREER.CAREER_5YEAR, name: this.context.t("5 Yr") },
        { id: MODEL_CAREER.OVER_6YEAR, name: this.context.t("Over Yr") },
    ]

    constructor(props, context) {
        super(props, context);

        this.state = {
            model_filter: this.props.model_filter,
        }
    }

    static propTypes = {
        pathname: PropTypes.string.isRequired,
        SaveModelFilterList: PropTypes.func.isRequired,
        SaveModelFilter: PropTypes.func.isRequired,
        model_filter: PropTypes.shape({
            gender : PropTypes.array,
            age_range: PropTypes.array,
            job: PropTypes.array,
            entertainment: PropTypes.array,
            style: PropTypes.array,
            career: PropTypes.array,
        }),
        FetchNewModel: PropTypes.func.isRequired,
        SaveNewModel: PropTypes.func.isRequired,
        FetchRatingModel: PropTypes.func.isRequired,
        SaveRatingModel: PropTypes.func.isRequired,
        SaveNewModelExpansion: PropTypes.func.isRequired,
        SaveRatingModelExpansion: PropTypes.func.isRequired,
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
                model_filter: this.props.model_filter,
            })
        }
    }


    render() {
        return (
            <ModelSearchBox
                model_filter={this.state.model_filter}
                handleOnClick={this._handleOnClick}
                handleOnClickFilter={this._handleOnClickFilter}
                GenderList = {this.GenderList}
                AgeList = {this.AgeList}
                JobList = {this.JobList}
                EntertainmentList = {this.EntertainmentList}
                StyleList = {this.StyleList}
                CareerList = {this.CareerList}
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
            case SORTING_MENU_ID.LIVE_JOB:
                this.props.scroll(this.props.livejob_ref);
                break;
            default:
                break;
        }
    }

    _handleOnClick = (event) => {
        const { target: { id } } = event;
        if (id === 'sorting_icon' || id === 'sorting_image') {
            this.props.SaveModelFilter(this.state.model_filter);
            setTimeout(() => {
                switch(this.props.pathname) {
                    case WEBSITE_PATH.MODEL:
                        this.props.FetchNewModel(10, this.props.model_filter, true, this.FetchNewModelCallback.bind(this))
                        this.props.FetchRatingModel(10, this.props.model_filter, true, this.FetchRatingModelCallback.bind(this))
                        this.props.SaveNewModelExpansion([]);
                        this.props.SaveRatingModelExpansion([]);
                        break;
                    case WEBSITE_PATH.MODEL_NEW:
                        this.props.FetchNewModel('all', this.props.model_filter, true, this.FetchNewModelExpansionCallback.bind(this))
                        this.props.SaveNewModel([]);
                        this.props.SaveRatingModel([]);
                        this.props.SaveRatingModelExpansion([]);
                        break;

                    case WEBSITE_PATH.MODEL_RATING:
                        this.props.FetchRatingModel('all', this.props.model_filter, true, this.FetchRatingModelExpansionCallback.bind(this))
                        this.props.SaveNewModel([]);
                        this.props.SaveRatingModel([]);
                        this.props.SaveNewModelExpansion([]);
                        break;

                    default:
                        break;
                }

                let modelFilterListString = "";
                let foundString = null;
                if (this.props.model_filter.gender.length > 0) {
                    foundString = this.props.model_filter.gender.map(t => {
                        return this._getFilterStr(SORTING_FILTER_ID.GENDER, t)
                    })
                    if (foundString !== null) {
                        modelFilterListString = modelFilterListString + foundString;
                    }
                }
                if (this.props.model_filter.age_range.length > 0) {
                    foundString = this.props.model_filter.age_range.map(t => {
                        return this._getFilterStr(SORTING_FILTER_ID.AGE, t)
                    })
                    if (foundString !== null) {
                        if (modelFilterListString === "") {
                            modelFilterListString = foundString;
                        } else {
                            modelFilterListString = modelFilterListString + "," +foundString;
                        }
                    }
                }
                if (this.props.model_filter.job.length > 0) {
                    foundString = this.props.model_filter.job.map(t => {
                        return this._getFilterStr(SORTING_FILTER_ID.JOB, t)
                    })
                    if (foundString !== null) {
                        if (modelFilterListString === "") {
                            modelFilterListString = foundString;
                        } else {
                            modelFilterListString = modelFilterListString + "," +foundString;
                        }
                    }
                }
                if (this.props.model_filter.entertainment.length > 0) {
                    foundString = this.props.model_filter.entertainment.map(t => {
                        return this._getFilterStr(SORTING_FILTER_ID.ENTERTAINMENT, t)
                    })
                    if (foundString !== null) {
                        if (modelFilterListString === "") {
                            modelFilterListString = foundString;
                        } else {
                            modelFilterListString = modelFilterListString + "," +foundString;
                        }
                    }
                }
                if (this.props.model_filter.style.length > 0) {
                    foundString = this.props.model_filter.style.map(t => {
                        return this._getFilterStr(SORTING_FILTER_ID.STYLE, t)
                    })
                    if (foundString !== null) {
                        if (modelFilterListString === "") {
                            modelFilterListString = foundString;
                        } else {
                            modelFilterListString = modelFilterListString + "," +foundString;
                        }
                    }
                }
                if (this.props.model_filter.career.length > 0) {
                    foundString = this.props.model_filter.career.map(t => {
                        return this._getFilterStr(SORTING_FILTER_ID.CAREER, t)
                    })
                    if (foundString !== null) {
                        if (modelFilterListString === "") {
                            modelFilterListString = foundString;
                        } else {
                            modelFilterListString = modelFilterListString + "," +foundString;
                        }
                    }
                }
                if (modelFilterListString === '') {
                    this.props.SaveModelFilterList(this.context.t("ALL"));
                } else {
                    this.props.SaveModelFilterList(modelFilterListString);
                }
            }, );
        }
    }

    _getFilterStr = (filterId, filterStr) => {
        let checkList;
        if (filterId === SORTING_FILTER_ID.GENDER) {
            checkList = this.GenderList;
        } else if (filterId === SORTING_FILTER_ID.AGE) {
            checkList = this.AgeList;
        } else if (filterId === SORTING_FILTER_ID.JOB) {
            checkList = this.JobList;
        } else if (filterId === SORTING_FILTER_ID.ENTERTAINMENT) {
            checkList = this.EntertainmentList;
        } else if (filterId === SORTING_FILTER_ID.STYLE) {
            checkList = this.StyleList;
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
            case SORTING_FILTER_ID.GENDER:
                array = this.state.model_filter.gender;
                break;
            case SORTING_FILTER_ID.AGE:
                array = this.state.model_filter.age_range;
                break;
            case SORTING_FILTER_ID.JOB:
                array = this.state.model_filter.job;
                break;
            case SORTING_FILTER_ID.ENTERTAINMENT:
                array = this.state.model_filter.entertainment;
                break;
            case SORTING_FILTER_ID.STYLE:
                array = this.state.model_filter.style;
                break;
            case SORTING_FILTER_ID.CAREER:
                array = this.state.model_filter.career;
                break;
            default:
                break;
        }

        if (array === null) {
            return;
        }

        if(_.find(array, t=>t === id) === undefined) {
            this.setState({
                model_filter: {
                    ...this.state.model_filter,
                    [category]: _.concat(array, id),
                }
            })
        } else {
            this.setState({
                model_filter: {
                    ...this.state.model_filter,
                    [category]: _.pull(array, id),
                }
            })
        }
    }

    FetchNewModelCallback = (result, json) => {
        if (result === true) {
            this.props.SaveNewModel(json.result)
        }
    }

    FetchNewModelExpansionCallback = (result, json) => {
        if (result === true) {
            this.props.SaveNewModelExpansion(json.result)
        }
    }

    FetchRatingModelCallback = (result, json) => {
        if (result === true) {
            this.props.SaveRatingModel(json.result)
        }
    }

    FetchRatingModelExpansionCallback = (result, json) => {
        if (result === true) {
            this.props.SaveRatingModelExpansion(json.result)
        }
    }
}

export default Container;
