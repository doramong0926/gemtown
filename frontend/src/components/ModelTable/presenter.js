import React from "react";
import PropTypes from "prop-types";
import ReactSVG from 'react-svg'
import styles from "./styles.module.scss";
import {
    Grid,
    Image,
} from "semantic-ui-react";
import _ from "lodash";

import ModelInfoModal from "./../ModelInfoModal";

import { TABLE_TYPE, COUNTRY } from "../../config/constants"

const ModelTable = (props, context) => (
    <div className={styles.RootDivision}>
        {
            (props.tableType === TABLE_TYPE.TYPE_A)
            ? (
                <div className={styles.ModelListTypeADivision}>
                    <RenderModelListTypeA
                        model_list={props.model_list}
                        handleOnClick={props.handleOnClick}
                    />
                </div>
            ) : (
                <div className={styles.ModelListTypeBDivision}>
                    <RenderModelListTypeB
                        model_list={props.model_list}
                        handleOnClick={props.handleOnClick}
                    />
                </div>
            )
        }
        <ModelInfoModal
            visible={props.visibleModelInfoModal}
            handleClose={props.handleCloseModelInfoModal}
            modelId={props.selectedModelId}
        />
    </div>
)

const RenderModelListTypeA = (props, context) => {
    if (props.model_list === null || props.model_list === undefined || props.model_list.length === 0) {
        return (
            <div className={styles.EmptyDivision}>
                <p className={styles.Text}>{context.t("등록된 컨텐츠가 아직 없습니다.")}</p>
            </div>
        )
    }
    else {
        return (
            <Grid className={styles.ModelGrid}>
                <Grid.Row className={styles.ModelRow}>
                    {
                        _.map(props.model_list, (t, index) => {
                            return (
                                <Grid.Column
                                    key={index}
                                    className={styles.ModelColumn}
                                    onClick={() => {
                                        props.handleOnClick(t)}
                                    }
                                >
                                    <RenderCoverImage
                                        cover_image_custom={t.cover_image_custom }
                                        cover_image={t.cover_image }
                                    />
                                    <p className={styles.ModelNameText}>{t.nickname}</p>
                                </Grid.Column>
                            )
                        })
                    }
                </Grid.Row>
            </Grid>
        )
    }
}

const RenderModelListTypeB = (props, context) => {
    if (props.model_list === null || props.model_list === undefined || props.model_list.length === 0) {
        return (
            <div className={styles.EmptyDivision}>
                <p className={styles.Text}>{context.t("등록된 컨텐츠가 아직 없습니다.")}</p>
            </div>
        )
    }
    else {
        return (
            _.map(props.model_list, (t, index) => {
                return (
                    <div className={styles.ModelDivision} key={index}>
                        <div className={styles.ListNumberDivision}>
                            <p>{index+1}</p>
                        </div>
                        <div className={styles.CoverImageDivision}>
                            {
                                <RenderCoverImage
                                    cover_image_custom={t.cover_image_custom }
                                    cover_image={t.cover_image }
                                />
                            }
                        </div>
                        <div className={styles.TitleDivision}>
                            <p className={styles.DescriptionText}>{context.t("NAME")}</p>
                            <p className={styles.Text}>{t.nickname}</p>
                        </div>
                        <div className={styles.DividerDivision}>
                        </div>
                        <div className={styles.CountryDivision}>
                            <p className={styles.DescriptionText}>{context.t("COUNTRY")}</p>
                            <RenderCountry country={t.country} />
                        </div>
                        <div className={styles.HeartDivision}>
                            <ReactSVG
                                src={require("images/icons/svg/heart_outline_icon.svg")}
                                svgClassName='HeartIcon'
                                className={styles.HeartIcon}
                            />
                            <p className={styles.Text}>{t.like_count}</p>
                        </div>
                        <div className={styles.CheckInfoDivision}>
                            <p className={styles.DescriptionText}>{context.t("CHECK INFO")}</p>
                        </div>
                        <RenderShowAllBtn {...props} model={t}/>
                        <div className={styles.RankingDivision}>
                            <Image className={styles.RankingIcon} />
                            <ReactSVG
                                src={require("images/icons/svg/arrow_state_icon.svg")}
                                svgClassName='RankingIcon'
                                className={styles.RankingIcon}
                            />
                        </div>
                    </div>
                )
            })
        )
    }
}

const RenderShowAllBtn = (props, context) => {
    return (
        <div
            className={styles.PriceIconDivision}
            onClick={() => {
                props.handleOnClick(props.model)}
            }
        >
            <div className={styles.HoverDivision}>
                <p className={styles.PriceText}>{context.t("10 GEM")}</p>
            </div>
            <div className={styles.NomalDivision}>
                <p className={styles.PriceText}>{context.t("SHOW ALL")}</p>
            </div>
        </div>
    )
}

const RenderCountry = (props) => {
    return (
        COUNTRY.map((t, index) => {
            if (t.id === props.country) {
                return <p key={index} className={styles.Text}>{t.text}</p>
            } else {
                return null;
            }
        })
    )
}

const RenderCoverImage = (props) => {
    if (props.cover_image_custom === null || props.cover_image_custom === undefined) {
        if (props.cover_image === null || props.cover_image === undefined) {
            return null
        } else {
            return (
                <div className={styles.ImageDivision}>
                    <Image
                        src= {`${props.cover_image.file}`}
                        className={styles.ModelCoverImage}
                        alt="model cover image"
                    />
                </div>
            )
        }
    } else {
        return (
            <div className={styles.ImageDivision}>
                <Image
                    src= {`${props.cover_image_custom }`}
                    size="small"
                    className={styles.ModelCoverImage}
                    alt="model cover image"
                />
            </div>
        )
    }
}

ModelTable.propTypes = {
    model_list: PropTypes.array,
    tableType: PropTypes.string.isRequired,
    handleOnClick: PropTypes.func.isRequired,
    visibleModelInfoModal: PropTypes.bool.isRequired,
    handleCloseModelInfoModal: PropTypes.func.isRequired,
    selectedModelId: PropTypes.number,
}

ModelTable.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderModelListTypeA.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderModelListTypeB.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderShowAllBtn.contextTypes = {
    t: PropTypes.func.isRequired
};

export default ModelTable;
