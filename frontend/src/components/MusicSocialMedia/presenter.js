import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import {
    Divider,
} from "semantic-ui-react";

import {
    WEBSITE_PATH,
    CONTENTS_TYPE,
} from "./../../config/constants"

import styles from "./styles.module.scss";

import TopSlideBox from "./../TopSlideBox";
import MusicSocialMediaTable from "../MusicSocialMediaTable/presenter";

const MusicSocialMedia = (props, context) => {
    const SOCIAL_TITLE = `${context.t("SOCIAL MEDIA.")}`
    const SOCIAL_DISCRIPTION = `${context.t("GEMTOWN의 이야기를 확인해 보세요.")}`
    return (
        <div className={styles.RootDivision}>
            <TopSlideBox slideType={CONTENTS_TYPE.MUSIC} />
            <div className={styles.OutterDivision}>
                <RenerTopDivision title={SOCIAL_TITLE} description={SOCIAL_DISCRIPTION} />
                <Divider className={styles.Divider} />
                <MusicSocialMediaTable />
                <RenderGoBack linkPath={WEBSITE_PATH.MODEL} />
            </div>
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

MusicSocialMedia.propTypes = {
}

MusicSocialMedia.contextTypes = {
    t: PropTypes.func.isRequired
};

RenerTopDivision.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderGoBack.contextTypes = {
    t: PropTypes.func.isRequired
};

export default MusicSocialMedia;
