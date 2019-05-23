import React from "react";
import PropTypes from "prop-types";
import {
    Image,
    Sticky,
} from "semantic-ui-react";
import styles from "./styles.module.scss";
import {
    SORTING_MENU_ID,
    SORTING_FILTER_ID,
    WEBSITE_PATH,
} from "./../../config/constants";

const ModelSearchBox = (props, context) => {
    return (
        <div className={styles.RootDivision}>
            <RenderFilter {...props} />
            <RenderMenuItem {...props} />
        </div>
    )
}

const RenderFilter = (props, context) => {
    return (
        <div className={styles.TopDivision}>
            <div className={styles.SortingFilterDivision}>
                <div className={styles.LeftDivision}>
                    <div className={styles.ContentDivision}>
                        <div className={styles.SubTitleDivision}>
                            <p className={styles.Text}>{context.t("성별")}</p>
                        </div>
                        <div className={styles.CategoryDivision}>
                            {
                                props.GenderList.map((t, index) => {
                                    if (props.model_filter.gender !== undefined
                                        && props.model_filter.gender.includes(t.id)) {
                                        return (
                                            <p
                                                id={t.id} key={index}
                                                className={styles.SelectedText}
                                                onClick={() => {
                                                    props.handleOnClickFilter(SORTING_FILTER_ID.GENDER, t.id)
                                                }}
                                            >
                                                {t.name}
                                            </p>
                                        )
                                    } else {
                                        return (
                                            <p
                                                id={t.id} key={index}
                                                className={styles.Text}
                                                onClick={() => {
                                                    props.handleOnClickFilter(SORTING_FILTER_ID.GENDER, t.id)
                                                }}
                                            >
                                                {t.name}
                                            </p>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.ContentDivision}>
                        <div className={styles.SubTitleDivision}>
                            <p className={styles.Text}>{context.t("연령")}</p>
                        </div>
                        <div className={styles.CategoryDivision}>
                            {
                                props.AgeList.map((t, index) => {
                                    if (props.model_filter.age_range !== undefined
                                        && props.model_filter.age_range.includes(t.id)) {
                                            return (
                                                <p
                                                    id={t.id} key={index}
                                                    className={styles.SelectedText}
                                                    onClick={() => {
                                                        props.handleOnClickFilter(SORTING_FILTER_ID.AGE, t.id)
                                                    }}
                                                >
                                                    {t.name}
                                                </p>
                                            )
                                    } else {
                                        return (
                                            <p
                                                id={t.id} key={index}
                                                className={styles.Text}
                                                onClick={() => {
                                                    props.handleOnClickFilter(SORTING_FILTER_ID.AGE, t.id)
                                                }}
                                            >
                                                {t.name}
                                            </p>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.ContentDivision}>
                        <div className={styles.SubTitleDivision}>
                            <p className={styles.Text}>{context.t("업종")}</p>
                        </div>
                        <div className={styles.CategoryDivision}>
                            {
                                props.JobList.map((t, index) => {
                                    if (props.model_filter.job !== undefined
                                        && props.model_filter.job.includes(t.id)) {
                                            return (
                                                <p
                                                    id={t.id} key={index}
                                                    className={styles.SelectedText}
                                                    onClick={() => {
                                                        props.handleOnClickFilter(SORTING_FILTER_ID.JOB, t.id)
                                                    }}
                                                >
                                                    {t.name}
                                                </p>
                                            )
                                    } else {
                                        return (
                                            <p
                                                id={t.id} key={index}
                                                className={styles.Text}
                                                onClick={() => {
                                                    props.handleOnClickFilter(SORTING_FILTER_ID.JOB, t.id)
                                                }}
                                            >
                                                {t.name}
                                            </p>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.ContentDivision}>
                        <div className={styles.SubTitleDivision}>
                            <p className={styles.Text}>{context.t("엔터테인먼트")}</p>
                        </div>
                        <div className={styles.CategoryDivision}>
                            {
                                props.EntertainmentList.map((t, index) => {
                                    if (props.model_filter.entertainment !== undefined
                                        && props.model_filter.entertainment.includes(t.id)) {
                                            return (
                                                <p
                                                    id={t.id} key={index}
                                                    className={styles.SelectedText}
                                                    onClick={() => {
                                                        props.handleOnClickFilter(SORTING_FILTER_ID.ENTERTAINMENT, t.id)
                                                    }}
                                                >
                                                    {t.name}
                                                </p>
                                            )
                                    } else {
                                        return (
                                            <p
                                                id={t.id} key={index}
                                                className={styles.Text}
                                                onClick={() => {
                                                    props.handleOnClickFilter(SORTING_FILTER_ID.ENTERTAINMENT, t.id)
                                                }}
                                            >
                                                {t.name}
                                            </p>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.ContentDivision}>
                        <div className={styles.SubTitleDivision}>
                            <p className={styles.Text}>{context.t("스타일")}</p>
                        </div>
                        <div className={styles.CategoryDivision}>
                            {
                                props.StyleList.map((t, index) => {
                                    if (props.model_filter.style !== undefined
                                        && props.model_filter.style.includes(t.id)) {
                                            return (
                                                <p
                                                    id={t.id} key={index}
                                                    className={styles.SelectedText}
                                                    onClick={() => {
                                                        props.handleOnClickFilter(SORTING_FILTER_ID.STYLE, t.id)
                                                    }}
                                                >
                                                    {t.name}
                                                </p>
                                            )
                                    } else {
                                        return (
                                            <p
                                                id={t.id} key={index}
                                                className={styles.Text}
                                                onClick={() => {
                                                    props.handleOnClickFilter(SORTING_FILTER_ID.STYLE, t.id)
                                                }}
                                            >
                                                {t.name}
                                            </p>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.ContentDivision}>
                        <div className={styles.SubTitleDivision}>
                            <p className={styles.Text}>{context.t("경력")}</p>
                        </div>
                        <div className={styles.CategoryDivision}>
                            {
                                props.CareerList.map((t, index) => {
                                    if (props.model_filter.career !== undefined
                                        && props.model_filter.career.includes(t.id)) {
                                            return (
                                                <p
                                                    id={t.id} key={index}
                                                    className={styles.SelectedText}
                                                    onClick={() => {
                                                        props.handleOnClickFilter(SORTING_FILTER_ID.CAREER, t.id)
                                                    }}
                                                >
                                                    {t.name}
                                                </p>
                                            )
                                    } else {
                                        return (
                                            <p
                                                id={t.id} key={index}
                                                className={styles.Text}
                                                onClick={() => {
                                                    props.handleOnClickFilter(SORTING_FILTER_ID.CAREER, t.id)
                                                }}
                                            >
                                                {t.name}
                                            </p>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.RightDivision}>
                    <div
                        id='sorting_icon'
                        onClick={props.handleOnClick}
                        className={styles.SortingIconDivision}
                    >
                        <Image
                            id='sorting_image'
                            src={require("images/icons/png/sorting_icon.png")}
                            onClick={props.handleOnClick}
                            className={styles.SortingIcon}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const RenderMenuItem = (props, context) => {
    const MenuList = [
        { id: SORTING_MENU_ID.NEW_UPDATE, path: WEBSITE_PATH.MODEL_NEW ,name: context.t("NEW UPDATE") },
        { id: SORTING_MENU_ID.RATING, path: WEBSITE_PATH.MODEL_RATING, name: context.t("RATING") },
        { id: SORTING_MENU_ID.LIVE_JOB, path: WEBSITE_PATH.MODEL_LIVE_JOB, name: context.t("LIVE JOB") },
    ]
    if (props.pathname !==  WEBSITE_PATH.MODEL
        && props.pathname !== WEBSITE_PATH.MODEL
        && props.pathname !==  WEBSITE_PATH.MODEL) {
        return null
    }
    return (
        <Sticky context={props.contextRef}>
            <div className={styles.BottomDivision}>
                <div className={styles.MenuItemDivision}>
                    {
                        MenuList.map((t, index) => {
                            return (
                                <p
                                    key={index}
                                    id={t.id}
                                    onClick={
                                        () => {
                                            props.handleOnClickMenu(t.id);
                                        }
                                    }
                                    className={styles.Text}
                                >
                                    {t.name}
                                </p>
                            )
                        })
                    }
                </div>
            </div>
        </Sticky>
    )
}

ModelSearchBox.propTypes = {
    model_filter: PropTypes.object,
    handleOnClick: PropTypes.func.isRequired,
    handleOnClickFilter: PropTypes.func.isRequired,
    GenderList: PropTypes.array.isRequired,
    AgeList: PropTypes.array.isRequired,
    JobList: PropTypes.array.isRequired,
    EntertainmentList: PropTypes.array.isRequired,
    StyleList: PropTypes.array.isRequired,
    CareerList: PropTypes.array.isRequired,
    pathname: PropTypes.string.isRequired,
    handleOnClickMenu: PropTypes.func.isRequired,
}

ModelSearchBox.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderFilter.contextTypes = {
    t: PropTypes.func.isRequired
};
RenderMenuItem.contextTypes = {
    t: PropTypes.func.isRequired
};

export default ModelSearchBox;
