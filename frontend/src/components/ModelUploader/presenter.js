import React from "react";
import PropTypes from "prop-types";
import TextareaAutosize from 'react-textarea-autosize';
import styles from "./styles.module.scss";
import { 
    Divider, 
    Input,
    Checkbox,
    Button,
    Dropdown,
} from 'semantic-ui-react'
import { 
    MODEL_GENDER,
    MODEL_AGE,
    MODEL_JOB,
    MODEL_ENTERTAINMENT,
    MODEL_STYLE,
    MODEL_CAREER,
    MODEL_BLOOD_TYPE,
} from "../../config/constants";
import BasicModal from "../BasicModal";
import ModelUploadConfirmModal from "../ModelUploadConfirmModal";
import _ from "lodash";

const ModelUploader = (props, context) => {
    const modalSuccessTitle = context.t("업로드 성공");
    const modalSuccessContents = [
        {
            title: null,
            text: [
                context.t("모델 등록이 완료되었습니다."),
                context.t(`${props.resultMessage}`),
            ]
        },
    ];
    const modalFailTitle = context.t("업로드 실패");
    const modalFaileContents = [
        {
            title: null,
            text: [
                context.t("모델 등록이 실패하였습니다."),
                context.t(`${props.resultMessage}`),
            ]
        },
    ];
    return (
        <div className={styles.RootDivision}>
            <div className={styles.UploadDivision}>            
                <RenderFilter {...props} />
                <div className={styles.SelectFileFormDivision}>
                    <RenderSelectFile {...props} />
                </div>
                <RenderTextInput {...props} />
                <RenerTerms {...props} />
            </div>        
            <Divider />
            <RenderSubmitButton {...props} />  
            <ModelUploadConfirmModal
                visible={props.visibleConfirmModal}
                handleClose={props.handleCloseConfirmModal}
                handleConfirm={props.handleConfirm}
                confirmData={props.confirmData}
            />
            <BasicModal 
                visible = {props.visibleResultModal}
                handleClose = {props.handleCloseResultModal}
                size={"mini"} 
                title={props.upload_result === true ? modalSuccessTitle : modalFailTitle}
                contents={props.upload_result === true ? modalSuccessContents : modalFaileContents}                
            />
        </div>
    )
}

const RenderSubmitButton = (props, context) => {
    return (
        <div className={styles.SubmitDivision}>
            <Button 
                disabled={                    
                    props.selected_model_gender === '' || props.selected_model_age_range === '' || props.selected_model_career === ''
                    || props.selected_model_job  === null || props.selected_model_job  === undefined || props.selected_model_job.length  === 0 
                    || props.selected_model_entertainment  === null || props.selected_model_entertainment  === undefined || props.selected_model_entertainment.length  === 0 
                    || props.selected_model_style  === null || props.selected_model_style  === undefined || props.selected_model_style.length  === 0 
                    || props.selected_model_cover_image_file === null || props.selected_model_cover_image_file === undefined
                    || props.selected_model_full_image_file === null || props.selected_model_full_image_file === undefined
                    || props.selected_model_half_image_file === null || props.selected_model_half_image_file === undefined
                    || props.model_height === null || props.model_height === undefined || props.model_height === ''
                    || props.model_weight === null || props.model_weight === undefined || props.model_weight === ''
                    || props.model_blood_type === null || props.model_blood_type === undefined || props.model_blood_type === ''
                    || props.model_age === null || props.model_age === undefined || props.model_age === ''
                    || props.model_body_size_bust === null || props.model_body_size_bust === undefined || props.model_body_size_bust === ''
                    || props.model_body_size_wiast === null || props.model_body_size_wiast === undefined || props.model_body_size_wiast === ''
                    || props.model_body_size_hip === null || props.model_body_size_hip === undefined || props.model_body_size_hip === ''                    
                    || props.model_birth_year === null || props.model_birth_year === undefined || props.model_birth_year === ''                    
                    || props.model_birth_month === null || props.model_birth_month === undefined || props.model_birth_month === ''                    
                    || props.model_birth_day === null || props.model_birth_day === undefined || props.model_birth_day === ''                    
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
    const GenderList = [
        { id: MODEL_GENDER.MALE, name: context.t("남자(국내)") },
        { id: MODEL_GENDER.FEMALE, name: context.t("남자(해외)") },
        { id: MODEL_GENDER.FOREGIN_MALE, name: context.t("여자(국내)") },
        { id: MODEL_GENDER.FOREGIN_FEMALE, name: context.t("여자(해외)") },
        { id: MODEL_GENDER.NOT_SPECIFIED, name: context.t("기타") },
    ]

    const AgeList = [
        { id: MODEL_AGE.CHILD, name: context.t("아동") },
        { id: MODEL_AGE.AGE_10S, name: context.t("10대") },
        { id: MODEL_AGE.AGE_20S, name: context.t("20대") },
        { id: MODEL_AGE.AGE_30S, name: context.t("30대") },
        { id: MODEL_AGE.AGE_50S, name: context.t("50대") },
        { id: MODEL_AGE.AGE_60S, name: context.t("60대") },
    ]

    const JobList = [
        { id: MODEL_JOB.BEAUTY, name: context.t("뷰티") },
        { id: MODEL_JOB.HAIR, name: context.t("헤어") },
        { id: MODEL_JOB.DRINK, name: context.t("음료") },
        { id: MODEL_JOB.EDUCATION, name: context.t("교육") },
        { id: MODEL_JOB.ENTERPRISE, name: context.t("기업") },
        { id: MODEL_JOB.FINANCE, name: context.t("금융") },
        { id: MODEL_JOB.SPORT, name: context.t("스포츠") },
        { id: MODEL_JOB.FASHION, name: context.t("패션") },
        { id: MODEL_JOB.WEDDING, name: context.t("웨딩") },
        { id: MODEL_JOB.SWIMSUIT, name: context.t("수영복") },
        { id: MODEL_JOB.UNDERWEAR, name: context.t("언더웨어") },
    ]

    const EntertainmentList = [
        { id: MODEL_ENTERTAINMENT.PICTORIAL, name: context.t("화보") },
        { id: MODEL_ENTERTAINMENT.MAGAZINE, name: context.t("잡지") },
        { id: MODEL_ENTERTAINMENT.BROADCAST, name: context.t("방송") },
        { id: MODEL_ENTERTAINMENT.CF, name: context.t("CF") },
        { id: MODEL_ENTERTAINMENT.EVENT, name: context.t("행사") },
        { id: MODEL_ENTERTAINMENT.EXHIBITION, name: context.t("전시") },
        { id: MODEL_ENTERTAINMENT.RACING, name: context.t("레이싱") },
        { id: MODEL_ENTERTAINMENT.NARRATOR_DANCE, name: context.t("나레이터(댄스)") },
        { id: MODEL_ENTERTAINMENT.NARRATOR_ANNOUNCEMENT, name: context.t("나레이터(멘트)") },
    ]

    const StyleList = [
        { id: MODEL_STYLE.PURE, name: context.t("순수") },
        { id: MODEL_STYLE.SEXY, name: context.t("섹시") },
        { id: MODEL_STYLE.CUTENESS, name: context.t("귀여움") },
        { id: MODEL_STYLE.BAGEL, name: context.t("베이글") },
        { id: MODEL_STYLE.TOUGH, name: context.t("터프") },
        { id: MODEL_STYLE.CHIC, name: context.t("시크") },
        { id: MODEL_STYLE.SMART, name: context.t("스마트") },
    ]

    const CareerList = [
        { id: MODEL_CAREER.UNDER_1YEAR, name: context.t("Under 1 Yr") },
        { id: MODEL_CAREER.CAREER_2YEAR, name: context.t("2 Yr") },
        { id: MODEL_CAREER.CAREER_3YEAR, name: context.t("3 Yr") },
        { id: MODEL_CAREER.CAREER_4YEAR, name: context.t("4 Yr") },
        { id: MODEL_CAREER.CAREER_5YEAR, name: context.t("5 Yr") },
        { id: MODEL_CAREER.OVER_6YEAR, name: context.t("Over 6Yr") },
    ]
    
    return(
        <div className={styles.FilterDivision}>
            <div className={styles.InnderDivision}>
                <div className={styles.DefaultIconDivision}>
                    <p className={styles.DefaultIconText}>{context.t("성별")}</p>
                </div>      
                <div className={styles.TextDivision}>
                    {
                        GenderList.map((t, index) => {
                            return (
                                <p 
                                    id={t.id}
                                    name={"selected_model_gender"}
                                    className={props.selected_model_gender === t.id ? styles.TextSelected : styles.Text} 
                                    key={index}
                                    onClick={props.handleOnClickFilter}
                                >
                                    {t.name}
                                </p>
                            )
                        })
                    }            
                </div>                          
            </div>    
            <div className={styles.InnderDivision}>
                <div className={styles.DefaultIconDivision}>
                    <p className={styles.DefaultIconText}>{context.t("연령")}</p>
                </div>
                <div className={styles.TextDivision}>
                    {
                        AgeList.map((t, index) => {
                            return (
                                <p 
                                    id={t.id}
                                    name={"selected_model_age_range"}
                                    className={props.selected_model_age_range === t.id ? styles.TextSelected : styles.Text} 
                                    key={index}
                                    onClick={props.handleOnClickFilter}
                                >
                                    {t.name}
                                </p>
                            )
                        })
                    }         
                </div>    
            </div>
            <div className={styles.InnderDivision}>
                <div className={styles.DefaultIconDivision}>
                    <p className={styles.DefaultIconText}>{context.t("업종")}</p>
                </div>
                <div className={styles.TextDivision}>
                    {
                        JobList.map((t, index) => {
                            return (
                                <p 
                                    id={t.id}
                                    name={"selected_model_job"}
                                    className={_.find(props.selected_model_job, item=>item === t.id) ? styles.TextSelected : styles.Text} 
                                    key={index}
                                    onClick={props.handleOnClickFilter}
                                >
                                    {t.name}
                                </p>
                            )
                        })
                    }
                </div>                
            </div>
            <div className={styles.InnderDivision}>
                <div className={styles.DefaultIconDivision}>
                    <p className={styles.DefaultIconText}>{context.t("엔터테인먼트")}</p>
                </div>
                <div className={styles.TextDivision}>
                    {
                        EntertainmentList.map((t, index) => {
                            return (
                                <p 
                                    id={t.id}
                                    name={"selected_model_entertainment"}
                                    className={_.find(props.selected_model_entertainment, item=>item === t.id) ? styles.TextSelected : styles.Text} 
                                    key={index}
                                    onClick={props.handleOnClickFilter}
                                >
                                    {t.name}
                                </p>
                            )
                        })
                    }
                </div>                
            </div>
            <div className={styles.InnderDivision}>
                <div className={styles.DefaultIconDivision}>
                    <p className={styles.DefaultIconText}>{context.t("스타일")}</p>
                </div>
                <div className={styles.TextDivision}>
                    {
                        StyleList.map((t, index) => {
                            return (
                                <p 
                                    id={t.id}
                                    name={"selected_model_style"}
                                    className={_.find(props.selected_model_style, item=>item === t.id) ? styles.TextSelected : styles.Text} 
                                    key={index}
                                    onClick={props.handleOnClickFilter}
                                >
                                    {t.name}
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
                        CareerList.map((t, index) => {
                            return (
                                <p 
                                    id={t.id}
                                    name={"selected_model_career"}
                                    className={props.selected_model_career === t.id ? styles.TextSelected : styles.Text} 
                                    key={index}
                                    onClick={props.handleOnClickFilter}
                                >
                                    {t.name}
                                </p>
                            )
                        })
                    }
                </div>                
            </div>
        </div>
    )
}

const RenderSelectFile = (props, context) => {
    let modelCoverImageRef = React.createRef();
    let modelFullImageRef = React.createRef();
    let modelHalfImageRef = React.createRef();
    
    return (    
        <React.Fragment>
            <div className={styles.SelectFileDivision}>
                <div className={styles.SelectedInput}>
                    <input 
                        type='file' 
                        accept="image/jpeg"
                        onChange={props.handleInputChange}
                        id='selected_model_cover_image_file'
                        ref={modelCoverImageRef}                        
                    />
                    <p
                        className={
                            (props.selected_model_cover_image_file === undefined || props.selected_model_cover_image_file === null)
                            ?  styles.FilenamePlaceholderText : styles.FilenameText
                        }
                    >
                        <span className={styles.StarText}>*</span>
                        {props.selected_model_cover_image_file === undefined || props.selected_model_cover_image_file === null
                            ? context.t('대표 프로필 (Main Face Photo)') 
                            : props.selected_model_cover_image_file.name}
                    </p>
                </div>
                <div className={styles.RightDivision}>
                    <div className={styles.DefaultIconDivision}>
                        <p 
                            className={styles.DefaultIconText}
                            onClick={()=> {
                                modelCoverImageRef.current.click()
                            }}
                        >
                            {context.t("REGISTER")}
                        </p>
                    </div>
                </div>       
            </div>

            <div className={styles.SelectFileDivision}>
                <div className={styles.SelectedInput}>
                    <input 
                        type='file' 
                        accept="image/jpeg"
                        onChange={props.handleInputChange}
                        id='selected_model_half_image_file'
                        ref={modelHalfImageRef}                        
                    />                     
                    <p 
                        className={
                            (props.selected_model_half_image_file === undefined || props.selected_model_half_image_file === null)
                            ?  styles.FilenamePlaceholderText : styles.FilenameText
                        }
                    >
                        <span className={styles.StarText}>*</span>
                        {props.selected_model_half_image_file === undefined || props.selected_model_half_image_file === null
                            ? context.t('반신 프로필 (Half-Length Photo)') 
                            : props.selected_model_half_image_file.name}
                    </p>
                </div>
                <div className={styles.RightDivision}>
                    <div className={styles.DefaultIconDivision}>
                        <p 
                            className={styles.DefaultIconText}
                            onClick={()=> {
                                modelHalfImageRef.current.click()
                            }}
                        >
                            {context.t("REGISTER")}
                        </p>
                    </div>
                </div>    
            </div>

            <div className={styles.SelectFileDivision}>
                <div className={styles.SelectedInput}>
                    <input 
                        type='file' 
                        accept="image/jpeg"
                        onChange={props.handleInputChange}
                        id='selected_model_full_image_file'
                        ref={modelFullImageRef}                        
                    />
                    <p 
                        className={
                            (props.selected_model_full_image_file === undefined || props.selected_model_full_image_file === null)
                            ?  styles.FilenamePlaceholderText : styles.FilenameText
                        }
                    >
                        <span className={styles.StarText}>*</span>
                        {props.selected_model_full_image_file === undefined || props.selected_model_full_image_file === null
                            ? context.t('전신 프로필 (Full-Length Photo)') 
                            : props.selected_model_full_image_file.name}
                    </p>
                </div>
                <div className={styles.RightDivision}>
                    <div className={styles.DefaultIconDivision}>
                        <p 
                            className={styles.DefaultIconText}
                            onClick={()=> {
                                modelFullImageRef.current.click()
                            }}
                        >
                            {context.t("REGISTER")}
                        </p>
                    </div>
                </div>                
            </div>
        </React.Fragment>    
    )
}

const RenderTextInput = (props, context) => {
    const BloodTypeList = _.map(MODEL_BLOOD_TYPE, item => {
        return (
            {key: item.value, text: item.text, value: item.value }
        )
    })
    return (
        <React.Fragment>
            <div className={styles.DetailInfoDivision}>
                <div className={styles.LeftBoxDivision}>
                    <p className={styles.Text}>{context.t("Personal Infomation")}</p>
                </div>
                <div className={styles.RightInputDivision}>
                    <div className={styles.OutterDivision}>
                        <div className={styles.TitleTextDivision} >
                            <p className={styles.Text}>
                                <span className={styles.StarText}>*</span>
                                {context.t('활동명 / 필명 (Gem Name)')}
                            </p>
                        </div>
                        <Input 
                            fluid
                            type='text' 
                            onChange={props.handleInputChange}
                            id='modeler_nickname'
                            value={
                                (props.userInfo_modeler_nickname !== null && props.userInfo_modeler_nickname !== undefined && props.userInfo_modeler_nickname !== "") 
                                ? (
                                    props.userInfo_modeler_nickname
                                ) : (
                                    props.modeler_nickname === null || props.modeler_nickname === undefined || props.modeler_nickname === "" 
                                    ? ''
                                    : props.modeler_nickname
                                )
                            }
                            className={styles.InputBox}       
                            disabled={
                                (props.userInfo_modeler_nickname !== null && props.userInfo_modeler_nickname !== undefined && props.userInfo_modeler_nickname !== "") 
                                ? true : false
                            }    
                        >
                        </Input>
                    </div>
                    <div className={styles.OutterDivision}>
                        <div className={styles.TitleTextDivision} >
                            <p className={styles.Text}>
                                <span className={styles.StarText}>*</span>
                                {context.t('생년월일 (Birthday)')}
                            </p>
                        </div>
                        <div className={styles.BirthdayDivision}>
                            <div className={styles.InputDivision}>
                                <Input 
                                    fluid
                                    type='number' 
                                    placeholder={context.t('Year')}
                                    onChange={props.handleInputChange}
                                    id='model_birth_year'
                                    value={
                                        props.model_birth_year === null || props.model_birth_year === undefined || props.model_birth_year === "" 
                                        ? ''
                                        : props.model_birth_year
                                    }
                                    className={styles.InputBox}                       
                                >
                                </Input>
                            </div>
                            <div className={styles.TextDivision}>
                                <p className={styles.Text}>-</p>
                            </div>
                            <div className={styles.InputDivision}>
                                <Input 
                                    fluid
                                    type='number' 
                                    placeholder={context.t('Month')}
                                    onChange={props.handleInputChange}
                                    id='model_birth_month'
                                    value={
                                        props.model_birth_month === null || props.model_birth_month === undefined || props.model_birth_month === "" 
                                        ? ''
                                        : props.model_birth_month
                                    }
                                    className={styles.InputBox}                       
                                >
                                </Input>
                            </div>
                            <div className={styles.TextDivision}>
                                <p className={styles.Text}>-</p>
                            </div>
                            <div className={styles.InputDivision}>
                                <Input 
                                    fluid
                                    type='number' 
                                    placeholder={context.t('Day')}
                                    onChange={props.handleInputChange}                                    
                                    id='model_birth_day'
                                    value={
                                        props.model_birth_day === null || props.model_birth_day === undefined || props.model_birth_day === "" 
                                        ? ''
                                        : props.model_birth_day
                                    }
                                    className={styles.InputBox}                       
                                >
                                </Input>
                            </div>
                        </div>
                    </div>   
                    <div className={styles.Outter2Division}>
                        <div className={styles.LeftInputDivision}>
                            <div className={styles.InnerDivision}>
                                <div className={styles.TitleTextDivision} >
                                    <p className={styles.Text}>
                                        <span className={styles.StarText}>*</span>
                                        {context.t('신장 (Height)')}
                                    </p>
                                </div>
                                <Input 
                                    fluid
                                    type='number' 
                                    onChange={props.handleInputChange}
                                    id='model_height'
                                    value={
                                        props.model_height === null || props.model_height === undefined || props.model_height === "" 
                                        ? ''
                                        : props.model_height
                                    }
                                    className={styles.InputBox}                       
                                >
                                </Input>
                                <p className={styles.UnitText}>{context.t('cm')}</p>
                            </div>
                        </div>
                        <div className={styles.rightInputDivision}>
                            <div className={styles.InnerDivision}>
                                <div className={styles.TitleTextDivision} >
                                    <p className={styles.Text}>
                                        <span className={styles.StarText}>*</span>
                                        {context.t('몸무게 (Weight)')}
                                    </p>
                                </div>
                                <Input 
                                    fluid
                                    type='number' 
                                    onChange={props.handleInputChange}
                                    id='model_weight'
                                    value={
                                        props.model_weight === null || props.model_weight === undefined || props.model_weight === "" 
                                        ? ''
                                        : props.model_weight
                                    }
                                    className={styles.InputBox}                       
                                >
                                </Input>
                                <p className={styles.UnitText}>{context.t('kg')}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.OutterDivision}>
                        <div className={styles.TitleTextDivision} >
                            <p className={styles.Text}>
                                <span className={styles.StarText}>*</span>
                                {context.t('신체 사이즈 (Body Size)')}
                            </p>
                        </div>
                        <div className={styles.BodySizeDivision}>
                            <div className={styles.InputDivision}>
                                <Input 
                                    fluid
                                    type='number' 
                                    placeholder={context.t('Bust')}
                                    onChange={props.handleInputChange}
                                    id='model_body_size_bust'
                                    value={
                                        props.model_body_size_bust === null || props.model_body_size_bust === undefined || props.model_body_size_bust === "" 
                                        ? ''
                                        : props.model_body_size_bust
                                    }
                                    className={styles.InputBox}                       
                                >
                                </Input>
                            </div>
                            <div className={styles.TextDivision}>
                                <p className={styles.Text}>-</p>
                            </div>
                            <div className={styles.InputDivision}>
                                <Input 
                                    fluid
                                    type='number' 
                                    placeholder={context.t('Wiast')}
                                    onChange={props.handleInputChange}
                                    id='model_body_size_wiast'
                                    value={
                                        props.model_body_size_wiast === null || props.model_body_size_wiast === undefined || props.model_body_size_wiast === "" 
                                        ? ''
                                        : props.model_body_size_wiast
                                    }
                                    className={styles.InputBox}                       
                                >
                                </Input>
                            </div>
                            <div className={styles.TextDivision}>
                                <p className={styles.Text}>-</p>
                            </div>
                            <div className={styles.InputDivision}>
                                <Input 
                                    fluid
                                    type='number' 
                                    placeholder={context.t('Hip')}
                                    onChange={props.handleInputChange}                                    
                                    id='model_body_size_hip'
                                    value={
                                        props.model_body_size_hip === null || props.model_body_size_hip === undefined || props.model_body_size_hip === "" 
                                        ? ''
                                        : props.model_body_size_hip
                                    }
                                    className={styles.InputBox}                       
                                >
                                </Input>
                            </div>
                        </div>
                    </div>   
                    <div className={styles.Outter2Division}>
                        <div className={styles.LeftInputDivision}>
                            <div className={styles.InnerDivision}>
                                <div className={styles.TitleTextDivision} >
                                    <p className={styles.Text}>
                                        <span className={styles.StarText}>*</span>
                                        {context.t('혈액형 (Blood Type)')}
                                    </p>
                                </div>
                                <div className={styles.DropDownDivision}>
                                    <Dropdown 
                                        fluid
                                        selection 
                                        id='model_blood_type'
                                        options={BloodTypeList} 
                                        onChange={props.handleInputChange}
                                    />
                                </div>
                                
                            </div>
                        </div>
                        <div className={styles.rightInputDivision}>
                            <div className={styles.InnerDivision}>
                                <div className={styles.TitleTextDivision} >
                                    <p className={styles.Text}>
                                        <span className={styles.StarText}>*</span>
                                        {context.t('나이 Age)')}
                                    </p>
                                </div>
                                <Input 
                                    fluid
                                    type='number' 
                                    onChange={props.handleInputChange}
                                    id='model_age'
                                    value={
                                        props.model_age === null || props.model_age === undefined || props.model_age === "" 
                                        ? ''
                                        : props.model_age
                                    }
                                    className={styles.InputBox}                       
                                >
                                </Input>
                            </div>
                        </div>
                    </div>         
                </div>
            </div>
            <div className={styles.DescriptionTextDivision}>
                <TextareaAutosize         
                    type='text' 
                    onChange={props.handleInputChange}
                    id='model_description'
                    placeholder={context.t('자기소개 / 경력 (Introduce / Experience)')}
                    value={
                        props.model_description === null || props.model_description === undefined || props.model_description === "" 
                        ? ''
                        : props.model_description
                    }
                    className={styles.InputBox}                       
                >
                </TextareaAutosize>
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

ModelUploader.propTypes = {
    selected_model_gender: PropTypes.string,
    selected_model_age_range: PropTypes.string,
    selected_model_job: PropTypes.array,
    selected_model_entertainment: PropTypes.array,
    selected_model_style: PropTypes.array,
    selected_model_career: PropTypes.string,    
    selected_model_cover_image_file: PropTypes.any,  
    selected_model_full_image_file: PropTypes.any,  
    selected_model_half_image_file: PropTypes.any,
    musician_nickname: PropTypes.string, 
    model_height: PropTypes.string,    
    model_weight: PropTypes.string,    
    model_body_size_bust: PropTypes.string,    
    model_body_size_wiast: PropTypes.string,
    model_body_size_hip: PropTypes.string,
    model_description: PropTypes.string,    
    model_blood_type: PropTypes.string,
    model_age: PropTypes.string,
    model_birth_year: PropTypes.string,
    model_birth_month: PropTypes.string,
    model_birth_day: PropTypes.string,
    terms: PropTypes.bool.isRequired,    
    handleOnClickFilter: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
    visibleResultModal: PropTypes.bool.isRequired,
    upload_result: PropTypes.bool.isRequired,
    resultMessage: PropTypes.string.isRequired,
    handleCloseResultModal: PropTypes.func.isRequired,
    userInfo_modeler_nickname: PropTypes.string,
    visibleConfirmModal: PropTypes.bool.isRequired,
    handleCloseConfirmModal: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    confirmData: PropTypes.object,
}

ModelUploader.contextTypes = {
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

RenderTextInput.contextTypes = {
    t: PropTypes.func.isRequired
};

export default ModelUploader;