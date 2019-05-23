import React, { createRef } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import {
    Divider,
} from "semantic-ui-react";

import TopSlideBox from "./../TopSlideBox";
import MusicTable from "./../MusicTable";
import MusicSearchBox from "./../MusicSearchBox";
import BottomAdvertising from "./../BottomAdvertising"
import MusicSocialMediaTable from "./../MusicSocialMediaTable";

import {
    WEBSITE_PATH,
    TABLE_TYPE,
    CONTENTS_TYPE,
} from "./../../config/constants"

import styles from "./styles.module.scss";

const Music = (props, context) => {
    let contextRef = createRef();
    return (
        <div
            className={styles.RootDivision}
            ref={contextRef}
        >
            <TopSlideBox slideType={CONTENTS_TYPE.MUSIC} />
            <MusicSearchBox
                contextRef={contextRef}
                scroll={props.scroll}
                new_ref={props.new_ref}
                rating_ref={props.rating_ref}
                social_ref={props.social_ref}
            />
            <RenderMusicScreen {...props} />
        </div>
    )
}

const RenderMusicScreen = (props, context) => {
    const NEW_TITLE = `${context.t("최신등록.")}`
    const NEW_DISCRIPTION = `${context.t("최근에 등록된 순서대로 보여집니다.")}`
    const RATING_TITLE = `${context.t("인기순.")}`
    const RATING_DISCRIPTION = `${context.t("이슈가 되는 음원과 아티스트들의 인기 컨텐츠 입니다.")}`
    const SOCIAL_TITLE = `${context.t("SOCIAL MEDIA.")}`
    const SOCIAL_DISCRIPTION = `${context.t("GEMTOWN의 이야기를 확인해 보세요.")}`
    return (
        <React.Fragment>
            <div
                className={styles.MusicListDivision}
                ref={props.new_ref}
            >
                {/* New music list */}
                <RenerTopDivision title={NEW_TITLE} description={NEW_DISCRIPTION} />
                <Divider className={styles.Divider}/>
                <RenerMusicFilter musicFilterList={props.musicFilterList} />
                <MusicTable
                    music_list={props.new_music_list}
                    tableType={TABLE_TYPE.TYPE_A}
                />
                <RenderShowAll linkPath={WEBSITE_PATH.MUSIC_NEW} />
            </div>
            <div
                className={styles.MusicListDivision}
                ref={props.rating_ref}
            >
                {/* Rating music list */}
                <RenerTopDivision title={RATING_TITLE} description={RATING_DISCRIPTION} />
                <Divider className={styles.Divider}/>
                <RenerMusicFilter musicFilterList={props.musicFilterList} />
                <MusicTable
                    music_list={props.rating_music_list}
                    tableType={TABLE_TYPE.TYPE_B}
                    scroll={props.scroll}
                />
                <RenderShowAll linkPath={WEBSITE_PATH.MUSIC_RATING} />
            </div>
            <BottomAdvertising advertisingType={CONTENTS_TYPE.MUSIC} />
            <div
                className={styles.MusicListDivision}
                ref={props.social_ref}
            >
                {/* live job list */}
                <RenerTopDivision title={SOCIAL_TITLE} description={SOCIAL_DISCRIPTION} />
                <Divider className={styles.Divider} />
                <MusicSocialMediaTable />
                <RenderShowAll linkPath={WEBSITE_PATH.MUSIC_SOCIAL} />
            </div>
        </React.Fragment>
    )
}

const RenerTopDivision = (props, context) => {
    return (
        <div className={styles.TitleDivision}>
            <div className={styles.TitleText}>
                <p>{props.title}</p>
            </div>
            <div className={styles.DescriptionText}>
                <p>{props.description}</p>
            </div>
        </div>
    )
}

const RenerMusicFilter = (props, context) => {
    return (
        <div className={styles.FilterDivision}>
            <div className={styles.FilterTitleText}>
                <p>{context.t("RESULTS FOR :")}</p>
            </div>
            <div className={styles.FilterDescriptionText}>
                {
                    (props.musicFilterList === undefined || props.musicFilterList === null)
                    ? <p>{context.t("ALL")}</p>
                    : <p>{props.musicFilterList.toString()}</p>
                }

            </div>
        </div>
    )
}

const RenderShowAll = (props, context) => {
    return (
        <div className={styles.ShowAllDivision}>
            <div className={styles.Text}>
                <Link
                    to={props.linkPath}
                >
                    {context.t("SHOW ALL RESULTS")}
                </Link>
            </div>
        </div>
    )
}

Music.propTypes = {
    new_music_list: PropTypes.array,
    rating_music_list: PropTypes.array,
    musicFilterList: PropTypes.string,
    scroll: PropTypes.func.isRequired,
    new_ref: PropTypes.object,
    rating_ref: PropTypes.object,
    social_ref: PropTypes.object,
}

Music.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderMusicScreen.contextTypes = {
    t: PropTypes.func.isRequired
};

RenerMusicFilter.contextTypes = {
    t: PropTypes.func.isRequired
};

RenerTopDivision.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderShowAll.contextTypes = {
    t: PropTypes.func.isRequired
};


export default Music;
