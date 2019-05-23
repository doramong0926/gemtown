import React, { createRef } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import {
    Divider,
} from "semantic-ui-react";

import TopSlideBox from "./../TopSlideBox";
import ModelTable from "./../ModelTable";
import ModelLiveJobTable from "./../ModelLiveJobTable";
import ModelSearchBox from "./../ModelSearchBox";
import BottomAdvertising from "./../BottomAdvertising"

import {
    WEBSITE_PATH,
    TABLE_TYPE,
    CONTENTS_TYPE,
} from "./../../config/constants"

import styles from "./styles.module.scss";

const Model = (props, context) => {
    let contextRef = createRef();
    return (
        <div
            className={styles.RootDivision}
            ref={contextRef}
        >
            <TopSlideBox slideType={CONTENTS_TYPE.MODEL} />
            <ModelSearchBox
                contextRef={contextRef}
                scroll={props.scroll}
                new_ref={props.new_ref}
                rating_ref={props.rating_ref}
                livejob_ref={props.livejob_ref}
            />
            <RenderModelScreen {...props} />
        </div>
    )
}

const RenderModelScreen = (props, context) => {
    const NEW_TITLE = `${context.t("최신등록.")}`
    const NEW_DISCRIPTION = `${context.t("최근에 등록한 모델의 순서대로 보여집니다.")}`
    const RATING_TITLE = `${context.t("인기순.")}`
    const RATING_DISCRIPTION = `${context.t("이슈가 되는 모델의 순서대로 보여집니다.")}`
    const LIVE_JOB_TITLE = `${context.t("LIVE JOB.")}`
    const LIVE_JOB_DISCRIPTION = `${context.t("모델을 필요로 하는 촬영, 행사, 진행등 일자리 대행 서비스 현황입니다.")}`
    return (
        <React.Fragment>
            <div
                className={styles.ModelListDivision}
                ref={props.new_ref}
            >
                {/* New model list */}
                <RenerTopDivision title={NEW_TITLE} description={NEW_DISCRIPTION} />
                <Divider className={styles.Divider}/>
                <RenerModelFilter modelFilterList={props.modelFilterList} />
                <ModelTable
                    model_list={props.new_model_list}
                    tableType={TABLE_TYPE.TYPE_A}
                />
                <RenderShowAll linkPath={WEBSITE_PATH.MODEL_NEW} />
            </div>
            <div
                className={styles.ModelListDivision}
                ref={props.rating_ref}
            >
                {/* Rating model list */}
                <RenerTopDivision title={RATING_TITLE} description={RATING_DISCRIPTION} />
                <Divider className={styles.Divider}/>
                <RenerModelFilter modelFilterList={props.modelFilterList} />
                <ModelTable
                    model_list={props.rating_model_list}
                    tableType={TABLE_TYPE.TYPE_B}
                />
                <RenderShowAll linkPath={WEBSITE_PATH.MODEL_RATING} />
            </div>
            <BottomAdvertising advertisingType={CONTENTS_TYPE.MODEL} />
            <div
                className={styles.ModelListDivision}
                ref={props.livejob_ref}
            >
                {/* live job list */}
                <RenerTopDivision title={LIVE_JOB_TITLE} description={LIVE_JOB_DISCRIPTION} />
                <Divider className={styles.Divider} />
                <ModelLiveJobTable />
                <RenderShowAll linkPath={WEBSITE_PATH.MODEL_LIVE_JOB} />
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

const RenerModelFilter = (props, context) => {
    return (
        <div className={styles.FilterDivision}>
            <div className={styles.FilterTitleText}>
                <p>{context.t("RESULTS FOR :")}</p>
            </div>
            <div className={styles.FilterDescriptionText}>
                {
                    (props.modelFilterList === undefined || props.modelFilterList === null)
                    ? <p>{context.t("ALL")}</p>
                    : <p>{props.modelFilterList.toString()}</p>
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

Model.propTypes = {
    new_model_list: PropTypes.array,
    rating_model_list: PropTypes.array,
    modelFilterList: PropTypes.string,
    scroll: PropTypes.func.isRequired,
    new_ref: PropTypes.object,
    rating_ref: PropTypes.object,
    livejob_ref: PropTypes.object,
}

Model.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderModelScreen.contextTypes = {
    t: PropTypes.func.isRequired
};

RenerModelFilter.contextTypes = {
    t: PropTypes.func.isRequired
};

RenerTopDivision.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderShowAll.contextTypes = {
    t: PropTypes.func.isRequired
};


export default Model;
