import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import {
    Divider,
} from "semantic-ui-react";

import TopSlideBox from "../TopSlideBox";
import ModelTable from "../ModelTable";
import ModelSearchBox from "../ModelSearchBox";

import {
    WEBSITE_PATH,
    TABLE_TYPE,
    CONTENTS_TYPE,
} from "../../config/constants"

import styles from "./styles.module.scss";

const ModelRating = (props, context) => (
    <div className={styles.RootDivision}>
        <TopSlideBox slideType={CONTENTS_TYPE.MODEL} />
        <ModelSearchBox />
        <RenderModelScreen {...props} />
    </div>
)

const RenderModelScreen = (props, context) => {
    const RATING_TITLE = `${context.t("인기순.")}`
    const RATING_DISCRIPTION = `${context.t("이슈가 되는 모델의 순서대로 보여집니다.")}`
    return (
        <div className={styles.ModelListDivision}>
            <RenerTopDivision title={RATING_TITLE} description={RATING_DISCRIPTION} />
            <Divider className={styles.Divider}/>
            <RenerModelFilter modelFilterList={props.modelFilterList} />
            <ModelTable
                model_list={props.model_list}
                tableType={TABLE_TYPE.TYPE_B}
            />
            <RenderGoBack linkPath={WEBSITE_PATH.MODEL} />
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

ModelRating.propTypes = {
    model_list: PropTypes.array,
}

ModelRating.contextTypes = {
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

RenderGoBack.contextTypes = {
    t: PropTypes.func.isRequired
};


export default ModelRating;
