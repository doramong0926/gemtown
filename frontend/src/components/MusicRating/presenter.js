import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { 
    Divider,
} from "semantic-ui-react";

import TopSlideBox from "./../TopSlideBox";
import MusicTable from "./../MusicTable";
import MusicSearchBox from "./../MusicSearchBox";

import { 
    WEBSITE_PATH,    
    TABLE_TYPE,
    CONTENTS_TYPE,
} from "./../../config/constants"

import styles from "./styles.module.scss";

const MusicRating = (props, context) => (
    <div className={styles.RootDivision}>
        <TopSlideBox slideType={CONTENTS_TYPE.MUSIC} />
        <MusicSearchBox />
        <RenderMusicScreen {...props} />
    </div>
)

const RenderMusicScreen = (props, context) => {
    const RATING_TITLE = `${context.t("인기순.")}`
    const RATING_DISCRIPTION = `${context.t("이슈가 되는 음원과 아티스트들의 인기 컨텐츠 입니다.")}`
    return (
        <div className={styles.MusicListDivision}>
            <RenerTopDivision title={RATING_TITLE} description={RATING_DISCRIPTION} />
            <Divider className={styles.Divider}/>
            <RenerMusicFilter musicFilterList={props.musicFilterList} />
            <MusicTable     
                music_list={props.music_list}
                tableType={TABLE_TYPE.TYPE_B}
            />
            <RenderGoBack linkPath={WEBSITE_PATH.MUSIC} />
        </div>
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

const RenderGoBack = (props, context) => {
    return (
        <div className={styles.GoBackDivision}>
            <div className={styles.Text}>
                <Link
                    to={props.linkPath}
                >
                    {context.t("GO BACK")}
                </Link>
            </div>
        </div>
    )
}

MusicRating.propTypes = {
    music_list: PropTypes.array,
}

MusicRating.contextTypes = {
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

RenderGoBack.contextTypes = {
    t: PropTypes.func.isRequired
};


export default MusicRating;