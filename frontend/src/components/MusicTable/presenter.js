import React from "react";
import PropTypes from "prop-types";
import ReactSVG from 'react-svg'
import styles from "./styles.module.scss";
import {
    Grid,
    Image,
    Icon,
} from "semantic-ui-react";
import _ from "lodash";

import { TABLE_TYPE } from "./../../config/constants"
import { pad } from "./../../utils/commonUtils"
import MusicInfoModal from "./../MusicInfoModal"

const MusicTable = (props, context) => (
    <div className={styles.RootDivision}>
        {
            (props.tableType === TABLE_TYPE.TYPE_A)
            ? (
                <div className={styles.MusicListTypeADivision}>
                    <RenderMusicListTypeA
                        music_list={props.music_list}
                        hadleTogglePlay={props.hadleTogglePlay}
                        isPlay={props.isPlay}
                        music={props.music}
                        handleOnClick={props.handleOnClick}
                    />
                </div>
            ) : (
                <div className={styles.MusicListTypeBDivision}>
                    <RenderMusicListTypeB
                        music_list={props.music_list}
                        hadleTogglePlay={props.hadleTogglePlay}
                        isPlay={props.isPlay}
                        music={props.music}
                        handleOnClick={props.handleOnClick}
                    />
                </div>
            )
        }
        <MusicInfoModal
            visible={props.visibleMusicInfoModal}
            handleClose={props.handleCloseMusicInfoModal}
            musicId={props.selectedMusicId}
        />
    </div>
)

const RenderMusicListTypeA = (props, context) => {
    if (props.music_list === null || props.music_list === undefined || props.music_list.length === 0) {
        return (
            <div className={styles.EmptyDivision}>
                <p className={styles.Text}>{context.t("등록된 컨텐츠가 아직 없습니다.")}</p>
            </div>
        )
    }
    else {
        return (
            <Grid className={styles.MusicGrid}>
                <Grid.Row className={styles.MusicRow}>
                    {
                        _.map(props.music_list, (t, index) => {
                            return (
                                <Grid.Column
                                    key={index}
                                    className={styles.MusicColumn}
                                >
                                    <RenderCoverImage
                                        cover_image_custom={t.cover_image_custom }
                                        cover_image={t.cover_image }
                                    />
                                    <div className={styles.IconDivision}>
                                        <Icon
                                            onClick={() => {props.hadleTogglePlay(t)}}
                                            name={
                                                (props.isPlay === true  && props.music !== null && props.music !== undefined && props.music.id === t.id)
                                                    ? "pause circle outline"
                                                    : "play circle outline"
                                            }
                                            className={styles.PlayIcon}
                                            size='big'
                                        />
                                        <Icon
                                            name={"info circle"}
                                            className={styles.InfoIcon}
                                            size='big'
                                            onClick={() => {props.handleOnClick(t)}}
                                        />
                                        <Icon
                                            name={"share alternate"}
                                            className={styles.ShareIcon}
                                            size='large'
                                        />
                                    </div>
                                    <p className={styles.TitleText}>{t.title}</p>
                                    <p className={styles.MusicianNameText}>{t.musician.nickname}</p>
                                </Grid.Column>
                            )
                        })
                    }
                </Grid.Row>
            </Grid>
        )
    }
}

const RenderMusicListTypeB = (props, context) => {
    if (props.music_list === null || props.music_list === undefined || props.music_list.length === 0) {
        return (
            <div className={styles.EmptyDivision}>
                <p className={styles.Text}>{context.t("등록된 컨텐츠가 아직 없습니다.")}</p>
            </div>
        )
    }
    else {
        return (
            _.map(props.music_list, (t, index) => {
                return (
                    <div
                        className={styles.MusicDivision} key={index}
                        onClick={() => {props.handleOnClick(t)}}
                    >
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
                        <div className={styles.PlayStopIconDivision}>
                            <Icon
                                onClick={() => {props.hadleTogglePlay(t)}}
                                name={
                                    (props.isPlay === true  && props.music !== null && props.music !== undefined && props.music.id === t.id)
                                        ? "pause circle outline"
                                        : "play circle outline"
                                }
                                className={styles.PlayIcon}
                                size='large'
                            />
                            {/*
                            <ReactSVG
                                src={require("images/icons/svg/play_icon.svg")}
                                svgClassName='PlayIcon'
                                className={styles.PlayIcon}
                            />
                            */}
                        </div>
                        <div className={styles.TitleDivision}>
                            <p className={styles.DescriptionText}>{context.t("TITEL")}</p>
                            <p className={styles.Text}>{t.title}</p>
                        </div>
                        <div className={styles.DividerDivision}>
                        </div>
                        <div className={styles.CreatorDivision}>
                            <p className={styles.DescriptionText}>{context.t("CREATOR")}</p>
                            <p className={styles.Text}>{t.musician.nickname}</p>
                        </div>
                        <div className={styles.HeartDivision}>
                            <ReactSVG
                                src={require("images/icons/svg/heart_outline_icon.svg")}
                                svgClassName='HeartIcon'
                                className={styles.HeartIcon}
                            />
                            <p className={styles.Text}>{t.play_count}</p>
                        </div>
                        <div className={styles.TimeDivision}>
                            <p className={styles.DescriptionText}>{context.t("TIME")}</p>
                            <p className={styles.Text}>{pad(parseInt(t.duration/60), 2)}:{pad(t.duration%60, 2)}</p>
                        </div>
                        <RenderShowAllBtn {...props} music={t}/>
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
            onClick={() => {props.hadleTogglePlay(props.music)}}
        >
            <div className={styles.HoverDivision}>
                <p className={styles.PriceText}>{context.t("10 GEM")}</p>
            </div>
            <div className={styles.NomalDivision}>
                <p className={styles.PriceText}>{context.t("PLAY ALL")}</p>
            </div>
        </div>
    )
}

const RenderCoverImage = (props) => {
    if (props.cover_image_custom === null || props.cover_image_custom === undefined) {
        if (props.cover_image === null || props.cover_image === undefined) {
            return null
        } else {
            return (
                <Image
                    src= {`${props.cover_image.file}`}
                    size="small"
                    className={styles.MusicCoverImage}
                    alt="music cover image"
                />
            )
        }
    } else {
        return (
            <Image
                src= {`${props.cover_image_custom }`}
                size="small"
                className={styles.MusicCoverImage}
                alt="music cover image"
            />
        )
    }

}


MusicTable.propTypes = {
    music_list: PropTypes.array,
    tableType: PropTypes.string.isRequired,
    hadleTogglePlay: PropTypes.func.isRequired,
    isPlay: PropTypes.bool.isRequired,
    music: PropTypes.object,
    handleOnClick: PropTypes.func.isRequired,
    visibleMusicInfoModal: PropTypes.bool.isRequired,
    handleCloseMusicInfoModal: PropTypes.func.isRequired,
    selectedMusicId: PropTypes.number,
}

MusicTable.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderMusicListTypeA.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderMusicListTypeB.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderShowAllBtn.contextTypes = {
    t: PropTypes.func.isRequired
};

export default MusicTable;
