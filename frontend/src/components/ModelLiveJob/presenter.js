import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import {
    Divider,
} from "semantic-ui-react";

import TopSlideBox from "../TopSlideBox";
import ModelLiveJobTable from "./../ModelLiveJobTable";

import {
    WEBSITE_PATH,
    CONTENTS_TYPE,
} from "../../config/constants"

import styles from "./styles.module.scss";

const ModelLiveJob = (props, context) => {
    const LIVE_JOB_TITLE = `${context.t("LIVE JOB.")}`
    const LIVE_JOB_DISCRIPTION = `${context.t("모델을 필요로 하는 촬영, 행사, 진행등 일자리 대행 서비스 현황입니다.")}`
    return (
        <div className={styles.RootDivision}>
            <TopSlideBox slideType={CONTENTS_TYPE.MODEL} />
            <div className={styles.OutterDivision}>
                <RenerTopDivision title={LIVE_JOB_TITLE} description={LIVE_JOB_DISCRIPTION} />
                <Divider className={styles.Divider} />
                <ModelLiveJobTable />
                <RenderGoBack linkPath={WEBSITE_PATH.MODEL} />
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

ModelLiveJob.propTypes = {
}

ModelLiveJob.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderGoBack.contextTypes = {
    t: PropTypes.func.isRequired
};

RenerTopDivision.contextTypes = {
    t: PropTypes.func.isRequired
};


export default ModelLiveJob;
