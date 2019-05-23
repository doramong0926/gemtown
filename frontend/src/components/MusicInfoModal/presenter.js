import React from "react";
import PropTypes from "prop-types";
import { 
    Modal, 
    Segment,
    Grid,
    Image,
} from 'semantic-ui-react'
import ReactSVG from 'react-svg';
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss"
import _ from "lodash";
import TextareaAutosize from 'react-textarea-autosize';

import { 
    MUSIC_CAREER,
    MUSIC_GENRE,
    MUSIC_GENRE_DETAIL
} from "../../config/constants";
import { pad } from "./../../utils/commonUtils"

const MusicInfoModal = (props, context) => {
    if (props.music === null) {
        return null 
    } else {
        return (        
            <Modal
                open={props.visible}
                onClose={props.handleClose}
                size={'small'}
                dimmer={'blurring'}
                className={styles.ModalDivision}
            >
                <Segment className={styles.OutterDivision}>
                    <Modal.Content className={styles.ModalContentDivision}>
                        <RenderTopLogo />
                        <RenderTitle 
                            icon={require("images/icons/svg/home_model_icon.svg")}
                            titleText={context.t("Music Info.")}
                        />
                        <RenderMusicInfo {...props} />
                        <RenderTitle 
                            icon={require("images/icons/svg/home_story_icon.svg")}
                            titleText={context.t("Music Categories.")}
                        />
                        <RenderCategories {...props} />
                        <RenderDescription description={props.music.description} />
                    </Modal.Content>
                    <Modal.Actions>
                        <div className={styles.ButtonDivision}>
                            <div 
                                className={styles.CloseButton}
                                onClick={props.handleClose}                                
                            >
                                <p className={styles.Text}>{context.t('CLOSE')}</p>
                            </div>
                        </div>
                    </Modal.Actions>
                </Segment>
            </Modal>
        )
    }
}

const RenderDescription = (props, context) => {
    if (props.description === null || props.description === undefined || props.description === "") {
        return null;
    } else {
        return (
            <React.Fragment>
                <RenderTitle 
                    icon={require("images/icons/svg/home_model_icon.svg")}
                    titleText={context.t("Introduce / Experience.")}
                />
                <div className={styles.DescriptionDivision}>
                <TextareaAutosize         
                    type='text' 
                    value={props.description}
                    className={styles.TextArea}                
                >
                </TextareaAutosize>
            </div>   
            </React.Fragment>
        )
    }
}


const RenderCategories = (props, context) => {
    const categorieList = [
        // genre
        { id: MUSIC_GENRE.BALLAD, name: context.t("발라드") },
        { id: MUSIC_GENRE.DANCE, name: context.t("댄스") },
        { id: MUSIC_GENRE.RAP_HIP_HOP, name: context.t("랩/힙합") },
        { id: MUSIC_GENRE.RNB_SOUL, name: context.t("R&B/SOUL") },
        { id: MUSIC_GENRE.ROCK_BAND, name: context.t("락/밴드") },
        { id: MUSIC_GENRE.JAZZ, name: context.t("JAZZ") },
        { id: MUSIC_GENRE.TROT, name: context.t("트로트") },
        { id: MUSIC_GENRE.FOLK_BLUES, name: context.t("포크/블루스") },
    
        // genre_detail
        { id: MUSIC_GENRE_DETAIL.OST, name: context.t("OST") },
        { id: MUSIC_GENRE_DETAIL.EDM, name: context.t("EMD") },
        { id: MUSIC_GENRE_DETAIL.RAVE, name: context.t("RAVE") },
        { id: MUSIC_GENRE_DETAIL.THECNO, name: context.t("THECNO") },
        { id: MUSIC_GENRE_DETAIL.CLUB, name: context.t("CLUB") },
        { id: MUSIC_GENRE_DETAIL.CAROL, name: context.t("CAROL") },
        { id: MUSIC_GENRE_DETAIL.CCM, name: context.t("CCM") },
        { id: MUSIC_GENRE_DETAIL.CM, name: context.t("CM") },

        // career
        { id: MUSIC_CAREER.UNDER_1YEAR, name: context.t("Under 1 Yr") },
        { id: MUSIC_CAREER._2YEAR, name: context.t("2 Yr") },
        { id: MUSIC_CAREER._3YEAR, name: context.t("3 Yr") },
        { id: MUSIC_CAREER._4YEAR, name: context.t("4 Yr") },
        { id: MUSIC_CAREER._5YEAR, name: context.t("5 Yr") },
        { id: MUSIC_CAREER._6YEAR_10YEAR, name: context.t("6~10 Yr") },
        { id: MUSIC_CAREER.OVER_10YEAR, name: context.t("Over 15 Yr") },
    ]
    
    let list = [];    
    list = _.concat(list, props.music.genre, props.music.genre_detail, props.music.career);
    return (
        <div className={styles.CategoriesDivision}>
            <Grid className={styles.Grid}>                    
                <Grid.Row className={styles.GridRow}>
                {
                    _.map(list, ( t, index ) => {
                        let found_item = _.find(categorieList, item => item.id === t);
                        if (found_item === undefined) {
                            return null;
                        } else {
                            return (
                                <Grid.Column key={index} className={styles.GridColumn}>
                                    <div className={styles.TextDivision}>
                                        <p className={styles.Text}>{
                                            `# ${_.find(categorieList, item => item.id === t).name}`
                                        }</p>
                                    </div>
                                </Grid.Column>
                            )
                        }
                    })
                }
                </Grid.Row>
            </Grid>
        </div>
    )
}

const RenderTitle = (props, context) => {
    return (
        <div className={styles.TitleDivision}>
            <ReactSVG
                className={styles.LeftSvgIcon} 
                src={props.icon}
                svgStyle={{width: "50px", height: "50px"}}
            />
            <p className={styles.Text}>{context.t(`${props.titleText}`)}</p>
        </div>
    )
}

const RenderMusicInfo = (props, context) => {
    return (
        <div className={styles.MusicInfoDivision}>
            <div className={styles.PhotoDivision}>
                <Image fluid className={styles.Photo} 
                    src={props.music.cover_image.file}
                />
            </div>
            <div className={styles.InfoDivision}>
                <div className={styles.InnerDivision}>
                    <div className={styles.LeftDivision}>
                        <p className={styles.Text}>{context.t("활동명(GEM Name.)")}</p>
                    </div>
                    <div className={styles.RightDivision}>
                        <p className={styles.Text}>{props.music.musician.nickname}</p>
                    </div>
                </div>
                <div className={styles.InnerDivision}>
                    <div className={styles.LeftDivision}>
                        <p className={styles.Text}>{context.t("앨범명(Album title.)")}</p>
                    </div>
                    <div className={styles.RightDivision}>
                        <p className={styles.Text}>{props.music.album_title}</p>
                    </div>
                </div>
                <div className={styles.InnerDivision}>
                    <div className={styles.LeftDivision}>
                        <p className={styles.Text}>{context.t("곡명(Music title.)")}</p>
                    </div>
                    <div className={styles.RightDivision}>
                        <p className={styles.Text}>{props.music.title}</p>
                    </div>
                </div>
                <div className={styles.InnerDivision}>
                    <div className={styles.LeftDivision}>
                        <p className={styles.Text}>{context.t("재생시간(Duration.)")}</p>
                    </div>
                    <div className={styles.RightDivision}>
                        <p className={styles.Text}>{pad(parseInt(props.music.duration/60), 2)}:{pad(props.music.duration%60, 2)}</p>                
                    </div>
                </div>
            </div>            
        </div>
    )
}

const RenderTopLogo = (props, context) => {
    return (
        <div className={styles.TopLogoDivision}> 
            <ReactSVG
                className={styles.LogoImage} 
                svgClassName='LogoImage'
                alt={"logo image"}
                src={require("images/logos/gemtown_logo_with_text.svg")}
            />
        </div>
    )
}

MusicInfoModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    music: PropTypes.object,
}

MusicInfoModal.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderTitle.contextTypes = {
    t: PropTypes.func.isRequired,
}

RenderCategories.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderDescription.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderMusicInfo.contextTypes = {
    t: PropTypes.func.isRequired
};


export default MusicInfoModal;
