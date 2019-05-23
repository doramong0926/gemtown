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
    MUSIC_GENRE,
    MUSIC_GENRE_DETAIL,
    MUSIC_CAREER,
} from "../../config/constants";


const MusicUploadConfirmModal = (props, context) => {
    if (props.confirmData === null) {
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
                        <div className={styles.WarningTitleDivision}>
                            <p className={styles.Text}>{context.t("RE-CHECK YOUR INFOMATION")}</p>
                        </div>
                        <div className={styles.WarningDetailDivision}>
                            <p className={styles.Text}>{context.t("젬타운에 업로드된 모든 데이터는 블럭체인에 의해 관리되므로 한번 등록하신 파일의 수정은 절대 불가능 합니다. 귀하께서 등록하실 정보를 한번 더 확인하시고 등록하여주시기 바랍니다.")}</p>
                        </div>
                        <RenderTitle 
                            icon={require("images/icons/svg/home_music_icon.svg")}
                            titleText={context.t("Personal Info.")}
                        />
                        <RenderPersonalInfo {...props} />
                        <RenderTitle 
                            icon={require("images/icons/svg/home_story_icon.svg")}
                            titleText={context.t("Your Categories.")}
                        />
                        <RenderCategories {...props} />
                        <RenderTitle 
                            icon={require("images/icons/svg/home_model_icon.svg")}
                            titleText={context.t("Music Info.")}
                        />
                        <RednerMusic {...props} />
                        <RenderDescription description={props.confirmData.description}/>                        
                        <RenderTotalGem gemAmountToRegister={props.confirmData.gemAmountToRegister}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <div className={styles.ButtonDivision}>
                            <div 
                                className={styles.CancelButton}
                                onClick={props.handleClose}                                
                            >
                                <p className={styles.Text}>{context.t('CANCLE')}</p>
                            </div>
                            <div 
                                className={styles.SubmitButton}
                                onClick={props.handleConfirm}
                            >
                                <p className={styles.Text}>{context.t('SUBMIT')}</p>
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

const RednerMusic = (props, context) => {
    return (
        <div className={styles.MusicDivision}>
            <div className={styles.MusicConverImageDivision}>
                <Image fluid className={styles.Image} 
                    src={props.confirmData.cover_image.file}
                />
            </div>
            <div className={styles.InfoDivision}>            
                <div className={styles.InnerDivision}>
                    <div className={styles.LeftDivision}>
                    <p className={styles.Text}>{context.t("파일명(Filename.)")}</p>
                    </div>
                    <div className={styles.RightDivision}>
                        <p className={styles.Text}>{props.confirmData.music.name}</p>
                    </div>
                </div>
                <div className={styles.InnerDivision}>
                    <div className={styles.LeftDivision}>
                    <p className={styles.Text}>{context.t("앨범명(Album Title.)")}</p>
                    </div>
                    <div className={styles.RightDivision}>
                        <p className={styles.Text}>{props.confirmData.music_album_title}</p>
                    </div>
                </div>
                <div className={styles.InnerDivision}>
                    <div className={styles.LeftDivision}>
                        <p className={styles.Text}>{context.t("타이틀(Title).")}</p>
                    </div>
                    <div className={styles.RightDivision}>
                        <p className={styles.Text}>{props.confirmData.music_title}</p>
                    </div>
                </div>
            </div>            
        </div>
    )
}

const RenderTotalGem = (props, context) => { 
    if (props.gemAmountToRegister === null || props.gemAmountToRegister === undefined) {
        return null;
    } else {
        return (
            <div className={styles.GemAmountDivision}>
                <p className={styles.Text}>{`${context.t("TOTAL GEM")} : ${props.gemAmountToRegister}G`}</p>
            </div>
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
    list = _.concat(list, props.confirmData.genre, props.confirmData.genre_detail, props.confirmData.career);
    return (
        <div className={styles.CategoriesDivision}>
            <Grid className={styles.Grid}>                    
                <Grid.Row className={styles.GridRow}>
                {
                    _.map(list, ( t, index ) => {
                        return (
                            <Grid.Column key={index} className={styles.GridColumn}>
                                <div className={styles.TextDivision}>
                                    <p className={styles.Text}>{
                                        `# ${_.find(categorieList, item => item.id === t).name}`
                                    }</p>
                                </div>
                            </Grid.Column>
                        )
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

const RenderPersonalInfo = (props, context) => {
    return (
        <div className={styles.PersonalInfoDivision}>
            <div className={styles.InfoDivision}>
                <div className={styles.LeftDivision}>
                    <p className={styles.Text}>{context.t("이름(GEM Name.)")}</p>
                </div>
                <div className={styles.RightDivision}>
                    <p className={styles.Text}>{props.confirmData.musician_nickname}</p>
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

MusicUploadConfirmModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    confirmData: PropTypes.shape({
        genre: PropTypes.string,
        genre_detail: PropTypes.string,
        career: PropTypes.string,
        musician_nickname: PropTypes.string,
        music: PropTypes.object,
        cover_image: PropTypes.object,
        music_album_title: PropTypes.string,
        music_title: PropTypes.string,
        description: PropTypes.string,
        register_block_chain: PropTypes.string,
        gemAmountToRegister: PropTypes.number,
    })
}

MusicUploadConfirmModal.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderTotalGem.contextTypes = {
    t: PropTypes.func.isRequired,
}

RenderTitle.contextTypes = {
    t: PropTypes.func.isRequired,
}

RenderPersonalInfo.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderCategories.contextTypes = {
    t: PropTypes.func.isRequired
};

RednerMusic.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderDescription.contextTypes = {
    t: PropTypes.func.isRequired
};

export default MusicUploadConfirmModal;
