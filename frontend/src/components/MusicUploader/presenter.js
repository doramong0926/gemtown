import React from "react";
import PropTypes from "prop-types";
import TextareaAutosize from 'react-textarea-autosize';
import styles from "./styles.module.scss";
import ReactSVG from 'react-svg'
import { 
    Divider, 
    Input,
    Checkbox,
    Button,
} from 'semantic-ui-react'
import { 
    MUSIC_GENRE,
    MUSIC_GENRE_DETAIL,
    MUSIC_CAREER,
} from "./../../config/constants"

import MusicCoverSelectorModal from "./../MusicCoverSelectorModal"
import BasicModal from "../BasicModal"
import MusicUploadConfirmModal from "./../MusicUploadConfirmModal"


const MusicUploader = (props, context) => {
    const modalSuccessTitle = context.t("업로드 성공");
    const modalSuccessContents = [
        {
            title: null,
            text: [
                context.t("음악 업로드가 완료되었습니다."),
                context.t(`${props.resultMessage}`),
            ]
        },
    ];
    const modalFailTitle = context.t("업로드 실패");
    const modalFaileContents = [
        {
            title: null,
            text: [
                context.t("음악 업로드에 실패하였습니다."),
                context.t(`${props.resultMessage}`),
            ]
        },
    ];

    return(
        <div className={styles.RootDivision}>
            <div className={styles.UploadDivision}>            
                <RenderFilter {...props} />
                <div className={styles.SelectFileFormDivision}>
                    <RenderSelectFile {...props} />
                    <RenderSelectCoverImage {...props} />
                </div>
                <RenderTextInput {...props} />
                <RenerTerms {...props} />
            </div>        
            <Divider />
            <RenderSubmitButton {...props} />  
            <MusicCoverSelectorModal 
                visible = {props.visibleMusicCoverSelectorModal}
                music_cover_list={props.music_cover_list}
                handleClose = {props.handleCloseMusicCoverSelectorModal}
                handleSelect = {props.handleSelectMusicCover}
            />
            <BasicModal 
                visible = {props.visibleResultModal}
                handleClose = {props.handleCloseResultModal}
                size={"mini"} 
                title={props.upload_result === true ? modalSuccessTitle : modalFailTitle}
                contents={props.upload_result === true ? modalSuccessContents : modalFaileContents}
            />
            <MusicUploadConfirmModal
                visible={props.visibleConfirmModal}
                handleClose={props.handleCloseConfirmModal}
                handleConfirm={props.handleConfirm}
                confirmData={props.confirmData}
            />
        </div>
    )
}

const RenderSubmitButton = (props, context) => {
    return (
        <div className={styles.SubmitDivision}>
            <Button 
                disabled={                    
                    props.selected_music_genre === '' || props.selected_music_genre_detail === '' || props.selected_music_career === ''
                    || props.selected_music_cover_image === null || props.selected_music_cover_image === undefined
                    || props.selected_music_file === null || props.selected_music_file === undefined
                    || props.music_title === null || props.music_title === undefined || props.music_title === ''
                    || props.terms === false
                }
                className={styles.SubmitButton}
                onClick={props.handleOnSubmit}
            >
                {context.t('SUBMIT')}
            </Button>
        </div>
    )
}

const RenderFilter = (props, context) => {
    const genre = [
        { id: MUSIC_GENRE.BALLAD, text: context.t("발라드") },
        { id: MUSIC_GENRE.DANCE, text: context.t("댄스") },
        { id: MUSIC_GENRE.RAP_HIP_HOP, text: context.t("랩/힙합") },
        { id: MUSIC_GENRE.RNB_SOUL, text: context.t("R&B/SOUL") },
        { id: MUSIC_GENRE.ROCK_BAND, text: context.t("락/밴드") },
        { id: MUSIC_GENRE.JAZZ, text: context.t("JAZZ") },
        { id: MUSIC_GENRE.TROT, text: context.t("트로트") },
        { id: MUSIC_GENRE.FOLK_BLUES, text: context.t("포크/블루스") },
    ]

    const genre_detail = [
        { id: MUSIC_GENRE_DETAIL.OST, text: context.t("OST") },
        { id: MUSIC_GENRE_DETAIL.EDM, text: context.t("EMD") },
        { id: MUSIC_GENRE_DETAIL.RAVE, text: context.t("RAVE") },
        { id: MUSIC_GENRE_DETAIL.THECNO, text: context.t("THECNO") },
        { id: MUSIC_GENRE_DETAIL.CLUB, text: context.t("CLUB") },
        { id: MUSIC_GENRE_DETAIL.CAROL, text: context.t("CAROL") },
        { id: MUSIC_GENRE_DETAIL.CCM, text: context.t("CCM") },
        { id: MUSIC_GENRE_DETAIL.CM, text: context.t("CM") },
    ]

    const career = [
        { id: MUSIC_CAREER.UNDER_1YEAR, text: context.t("Under 1 Yr") },
        { id: MUSIC_CAREER._2YEAR, text: context.t("2 Yr") },
        { id: MUSIC_CAREER._3YEAR, text: context.t("3 Yr") },
        { id: MUSIC_CAREER._4YEAR, text: context.t("4 Yr") },
        { id: MUSIC_CAREER._5YEAR, text: context.t("5 Yr") },
        { id: MUSIC_CAREER._6YEAR_10YEAR, text: context.t("6~10 Yr") },
        { id: MUSIC_CAREER.OVER_10YEAR, text: context.t("Over 15 Yr") },
    ]
    return(
        <div className={styles.FilterDivision}>
            <div className={styles.InnderDivision}>
                <div className={styles.DefaultIconDivision}>
                    <p className={styles.DefaultIconText}>{context.t("장르")}</p>
                </div>      
                <div className={styles.TextDivision}>
                    {
                        genre.map((t, index) => {
                            return (
                                <p 
                                    id={t.id}
                                    name={"selected_music_genre"}
                                    className={props.selected_music_genre === t.id ? styles.TextSelected : styles.Text} 
                                    key={index}
                                    onClick={props.handleOnClickFilter}
                                >
                                    {t.text}
                                </p>
                            )
                        })
                    }            
                </div>                          
            </div>    
            <div className={styles.InnderDivision}>
                <div className={styles.DefaultIconDivision}>
                    <p className={styles.DefaultIconText}>{context.t("세부 장르")}</p>
                </div>
                <div className={styles.TextDivision}>
                    {
                        genre_detail.map((t, index) => {
                            return (
                                <p 
                                    id={t.id}
                                    name={"selected_music_genre_detail"}
                                    className={props.selected_music_genre_detail === t.id ? styles.TextSelected : styles.Text} 
                                    key={index}
                                    onClick={props.handleOnClickFilter}
                                >
                                    {t.text}
                                </p>
                            )
                        })
                    }         
                </div>    
            </div>
            <div className={styles.InnderDivision}>
                <div className={styles.DefaultIconDivision}>
                    <p className={styles.DefaultIconText}>{context.t("경력")}</p>
                </div>
                <div className={styles.TextDivision}>
                    {
                        career.map((t, index) => {
                            return (
                                <p 
                                    id={t.id}
                                    name={"selected_music_career"}
                                    className={props.selected_music_career === t.id ? styles.TextSelected : styles.Text} 
                                    key={index}
                                    onClick={props.handleOnClickFilter}
                                >
                                    {t.text}
                                </p>
                            )
                        })
                    }
                </div>                
            </div>
        </div>
    )
}
const RenderSelectCoverImage = (props, context) => {
    return (
        <div className={styles.SelectFileDivision}>
            <div className={styles.SelectedInput}>
                <input 
                    type='text' 
                    onChange={props.handleInputChange}
                    id='selected_music_cover_image_title'
                />
                <p 
                    className={
                        (props.selected_music_cover_image === undefined || props.selected_music_cover_image === null)
                        ?  styles.FilenamePlaceholderText : styles.FilenameText
                    }
                >
                    <span className={styles.StarText}>*</span>
                    {
                        props.selected_music_cover_image === undefined || props.selected_music_cover_image === null
                        ? context.t('앨범커버 이미지 (Album Image)')
                        : props.selected_music_cover_image.title
                    }
                </p>
            </div>
            <div className={styles.RightDivision}>
                <div className={styles.DefaultIconDivision}>
                    <p 
                        className={styles.DefaultIconText}
                        onClick={props.handleOpenMusicCoverSelectorModal}
                    >
                        {context.t("REGISTER")}
                    </p>
                </div>
            </div>                
        </div>
    )
}

const RenderSelectFile = (props, context) => {
    let musicFileRef = React.createRef();
    return (        
        <div className={styles.SelectFileDivision}>
            <div className={styles.SelectedInput}>
                <input 
                    type='file' 
                    accept="audio/mp3, audio/wav"
                    onChange={props.handleInputChange}
                    id='selected_music_file'
                    ref={musicFileRef}                        
                />
                <p className={
                    (props.selected_music_file === undefined || props.selected_music_file === null)
                    ?  styles.FilenamePlaceholderText : styles.FilenameText}
                >
                    <span className={styles.StarText}>*</span>
                    {
                        props.selected_music_file === undefined || props.selected_music_file === null
                        ? context.t('파일선택 (Choose Your File)') 
                        : props.selected_music_file.name
                    }
                </p>
            </div>
            <div className={styles.FileRegisterRightDivision}>
                <div 
                    className={styles.DefaultIconDivision}
                    onClick={()=> {
                        musicFileRef.current.click()
                    }}
                >
                    <p className={styles.DefaultIconText}>{context.t("REGISTER")}</p>
                    <ReactSVG 
                        src={require("images/icons/svg/gem_icon.svg")} 
                        svgClassName='GemIcon'
                        className={styles.GemIcon}         
                        svgStyle={{width: "10px", height: "10px"}}
                    />   
                    <p className={styles.GemText}>{context.t("10")}</p>
                </div>
            </div>                
        </div>
    )
}

const RenderTextInput = (props, context) => {
    return (
        <React.Fragment>
            <div className={styles.DetailInfoDivision}>
                <div className={styles.BoxDivision}>
                    <p className={styles.Text}>{context.t("Title Infomation")}</p>
                </div>
                <div className={styles.TextInputDivision}>
                    <div className={styles.TextDivision}>
                        <p className={styles.TitleText}>
                            <span className={styles.StarText}>*</span>
                            {context.t('활동명 (Gem Name)')}
                        </p>
                        <Input 
                            fluid
                            type='text' 
                            onChange={props.handleInputChange}
                            id='musician_nickname'
                            value={
                                (props.userInfo_musician_nickname !== null && props.userInfo_musician_nickname !== undefined && props.userInfo_musician_nickname !== "") 
                                ? (
                                    props.userInfo_musician_nickname
                                ) : (
                                    props.musician_nickname === null || props.musician_nickname === undefined || props.musician_nickname === "" 
                                    ? ''
                                    : props.musician_nickname
                                )
                            }
                            className={styles.InputBox}       
                            disabled={
                                (props.userInfo_musician_nickname !== null && props.userInfo_musician_nickname !== undefined && props.userInfo_musician_nickname !== "") 
                                ? true : false
                            }                

                        >
                        </Input>
                    </div>
                    <div className={styles.TextDivision}>
                        <p className={styles.TitleText}>
                            <span className={styles.StarText}>*</span>
                            {context.t('곡명 (Title)')}
                        </p>
                        <Input 
                            fluid
                            type='text' 
                            onChange={props.handleInputChange}
                            id='music_title'
                            value={
                                props.music_title === null || props.music_title === undefined || props.music_title === "" 
                                ? ''
                                : props.music_title
                            }
                            className={styles.InputBox}                       
                        >
                        </Input>
                    </div>
                    <div className={styles.TextDivision}>
                        <p className={styles.TitleText}>{context.t('앨범명 (Album Title)')}</p>
                        <Input 
                            fluid
                            type='text' 
                            onChange={props.handleInputChange}
                            id='music_album_title'
                            value={
                                props.music_album_title === null || props.music_album_title === undefined || props.music_album_title === "" 
                                ? ''
                                : props.music_album_title
                            }
                            className={styles.InputBox}                       
                        >
                        </Input>
                    </div>
                </div>
            </div>
            <div className={styles.DescriptionDivision}>
                <div className={styles.DescriptionTextDivision}>
                    <TextareaAutosize         
                        type='text' 
                        onChange={props.handleInputChange}
                        id='music_description'
                        placeholder={context.t('곡 설명 (Describe the your Music)')}
                        value={
                            props.music_description === null || props.music_description === undefined || props.music_description === "" 
                            ? ''
                            : props.music_description
                        }
                        className={styles.InputBox}                       
                    >
                    </TextareaAutosize>
                </div>
            </div>
        </React.Fragment>
    )
}

const RenerTerms = (props, context) => {   
    return (        
        <div className={styles.TermsDivision}>
            <div className={styles.checkBoxDivision}>
                <Checkbox                            
                    checked={props.terms}
                    onChange={props.handleInputChange}
                    id='terms'
                    className={styles.TermsCheckBox}
                />
                <p className={styles.Text}>{context.t("약관 동의")}</p>
            </div>
            <p className={styles.Text}>{context.t("귀하가 등록하는 모든 파일 및 콘텐츠는 본 젬타운 플렛폼의 보호와 관리에 의해 운영됩니다.")}</p>
            <p className={styles.Text}>{context.t("이용약관 및 정책사항을 꼭 확인하시고 등록해 주시기 바랍니다.")}</p>
        </div> 
    )
}

MusicUploader.propTypes = {
    selected_music_genre: PropTypes.string,
    selected_music_genre_detail: PropTypes.string,
    selected_music_career: PropTypes.string,    
    selected_music_file: PropTypes.any,    
    selected_music_cover_image: PropTypes.object,
    musician_nickname: PropTypes.string,
    music_album_title: PropTypes.string,    
    music_title: PropTypes.string,    
    music_description: PropTypes.string,    
    terms: PropTypes.bool.isRequired,    
    handleOnClickFilter: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
    visibleMusicCoverSelectorModal:PropTypes.bool.isRequired,
    music_cover_list:PropTypes.array,
    handleOpenMusicCoverSelectorModal: PropTypes.func.isRequired,
    handleCloseMusicCoverSelectorModal: PropTypes.func.isRequired,
    handleSelectMusicCover: PropTypes.func.isRequired,
    visibleResultModal: PropTypes.bool.isRequired,
    upload_result: PropTypes.bool.isRequired,
    resultMessage: PropTypes.string.isRequired,
    handleCloseResultModal: PropTypes.func.isRequired,
    userInfo_musician_nickname: PropTypes.string,

    visibleConfirmModal: PropTypes.bool.isRequired,
    handleCloseConfirmModal: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    confirmData: PropTypes.object,
}

MusicUploader.contextTypes = {
    t: PropTypes.func.isRequired
};


RenderSubmitButton.contextTypes = {
    t: PropTypes.func.isRequired
};

RenerTerms.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderFilter.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderSelectFile.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderSelectCoverImage.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderTextInput.contextTypes = {
    t: PropTypes.func.isRequired
};

export default MusicUploader;