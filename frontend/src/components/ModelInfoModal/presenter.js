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
    MODEL_GENDER,
    MODEL_AGE,
    MODEL_JOB,
    MODEL_ENTERTAINMENT,
    MODEL_STYLE,
    MODEL_CAREER,
    MODEL_BLOOD_TYPE,
} from "../../config/constants";


const ModelInfoModal = (props, context) => {
    if (props.model === null) {
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
                            titleText={context.t("Model Info.")}
                        />
                        <RenderModelInfo {...props} />
                        <RenderTitle 
                            icon={require("images/icons/svg/home_story_icon.svg")}
                            titleText={context.t("Model Categories.")}
                        />
                        <RenderCategories {...props} />
                        <RenderDescription description={props.model.description} />
                        <RenderTitle 
                            icon={require("images/icons/svg/home_music_icon.svg")}
                            titleText={context.t("Profile Photo.")}
                        />
                        <RednerPhotos {...props} />                                 
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

const RednerPhotos = (props, context) => {
    return (
        <div className={styles.PhotoDivision}>
            <Grid className={styles.Grid}>                    
                <Grid.Row className={styles.GridRow}>
                    <Grid.Column className={styles.GridColumn}>
                        <div className={styles.PhotoDivision}>
                            <Image fluid className={styles.Photo} 
                                src={props.model.cover_image.file}
                            />
                        </div>
                    </Grid.Column>
                    <Grid.Column className={styles.GridColumn}>
                        <div className={styles.PhotoDivision}>
                            <Image fluid className={styles.Photo} 
                                src={props.model.full_image.file}
                            />
                        </div>
                    </Grid.Column>
                    <Grid.Column className={styles.GridColumn}>
                        <div className={styles.PhotoDivision}>
                            <Image className={styles.Photo} 
                                src={props.model.half_image.file}
                            />
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

const RenderCategories = (props, context) => {
    const categorieList = [
        // gender
        { id: MODEL_GENDER.MALE, name: context.t("남자(국내)") },
        { id: MODEL_GENDER.FEMALE, name: context.t("남자(해외)") },
        { id: MODEL_GENDER.FOREGIN_MALE, name: context.t("여자(국내)") },
        { id: MODEL_GENDER.FOREGIN_FEMALE, name: context.t("여자(해외)") },
        { id: MODEL_GENDER.NOT_SPECIFIED, name: context.t("기타") },

        // age
        { id: MODEL_AGE.CHILD, name: context.t("아동") },
        { id: MODEL_AGE.AGE_10S, name: context.t("10대") },
        { id: MODEL_AGE.AGE_20S, name: context.t("20대") },
        { id: MODEL_AGE.AGE_30S, name: context.t("30대") },
        { id: MODEL_AGE.AGE_50S, name: context.t("50대") },
        { id: MODEL_AGE.AGE_60S, name: context.t("60대") },

        // job
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

        // entertainment
        { id: MODEL_ENTERTAINMENT.PICTORIAL, name: context.t("화보") },
        { id: MODEL_ENTERTAINMENT.MAGAZINE, name: context.t("잡지") },
        { id: MODEL_ENTERTAINMENT.BROADCAST, name: context.t("방송") },
        { id: MODEL_ENTERTAINMENT.CF, name: context.t("CF") },
        { id: MODEL_ENTERTAINMENT.EVENT, name: context.t("행사") },
        { id: MODEL_ENTERTAINMENT.EXHIBITION, name: context.t("전시") },
        { id: MODEL_ENTERTAINMENT.RACING, name: context.t("레이싱") },
        { id: MODEL_ENTERTAINMENT.NARRATOR_DANCE, name: context.t("나레이터(댄스)") },
        { id: MODEL_ENTERTAINMENT.NARRATOR_ANNOUNCEMENT, name: context.t("나레이터(멘트)") },

        // style
        { id: MODEL_STYLE.PURE, name: context.t("순수") },
        { id: MODEL_STYLE.SEXY, name: context.t("섹시") },
        { id: MODEL_STYLE.CUTENESS, name: context.t("귀여움") },
        { id: MODEL_STYLE.BAGEL, name: context.t("베이글") },
        { id: MODEL_STYLE.TOUGH, name: context.t("터프") },
        { id: MODEL_STYLE.CHIC, name: context.t("시크") },
        { id: MODEL_STYLE.SMART, name: context.t("스마트") },

        // career
        { id: MODEL_CAREER.UNDER_1YEAR, name: context.t("Under 1 Yr") },
        { id: MODEL_CAREER.CAREER_2YEAR, name: context.t("2 Yr") },
        { id: MODEL_CAREER.CAREER_3YEAR, name: context.t("3 Yr") },
        { id: MODEL_CAREER.CAREER_4YEAR, name: context.t("4 Yr") },
        { id: MODEL_CAREER.CAREER_5YEAR, name: context.t("5 Yr") },
        { id: MODEL_CAREER.OVER_6YEAR, name: context.t("Over 6Yr") },
    ]
    
    let list = [];    
    list = _.concat(list, props.model.gender, props.model.age_range, props.model.career, props.model.job, props.model.entertainment, props.model.style);
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

const RenderModelInfo = (props, context) => {
    const BloodTypeList = _.map(MODEL_BLOOD_TYPE, item => {
        return (
            {key: item.value, text: item.text, value: item.value }
        )
    })
    return (
        <div className={styles.ModelInfoDivision}>
            <div className={styles.InfoDivision}>
                <div className={styles.LeftDivision}>
                    <p className={styles.Text}>{context.t("이름(GEM Name.)")}</p>
                </div>
                <div className={styles.RightDivision}>
                    <p className={styles.Text}>{props.model.nickname}</p>
                </div>
            </div>
            <div className={styles.InfoDivision}>
                <div className={styles.LeftDivision}>
                    <p className={styles.Text}>{context.t("생년월일(Birthday.)")}</p>
                </div>
                <div className={styles.RightDivision}>
                    <p className={styles.Text}>{`${props.model.birth_year}-${props.model.birth_month}-${props.model.birth_day} (Age.${props.model.age})`}</p>
                </div>
            </div>
            <div className={styles.InfoDivision}>
                <div className={styles.LeftDivision}>
                    <p className={styles.Text}>{context.t("신장(Height.)")}</p>
                </div>
                <div className={styles.RightDivision}>
                    <p className={styles.Text}>{props.model.height}</p>
                </div>
            </div>
            <div className={styles.InfoDivision}>
                <div className={styles.LeftDivision}>
                    <p className={styles.Text}>{context.t("몸무게(Weight.)")}</p>
                </div>
                <div className={styles.RightDivision}>
                    <p className={styles.Text}>{props.model.weight}</p>
                </div>
            </div>
            <div className={styles.InfoDivision}>
                <div className={styles.LeftDivision}>
                    <p className={styles.Text}>{context.t("신체 사이즈(Body Size.)")}</p>
                </div>
                <div className={styles.RightDivision}>
                    <p className={styles.Text}>{`${props.model.bust}-${props.model.wiast}-${props.model.hip}`}</p>
                </div>
            </div>
            <div className={styles.InfoDivision}>
                <div className={styles.LeftDivision}>
                    <p className={styles.Text}>{context.t("혈액형(Blood Type.)")}</p>
                </div>
                <div className={styles.RightDivision}>
                    <p className={styles.Text}
                    >
                        {
                            _.find(BloodTypeList, t=>t.value===props.model.blood_type) === undefined
                            ? "NONE" : _.find(BloodTypeList, t=>t.value===props.model.blood_type).text
                        }
                    </p>
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

ModelInfoModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    model: PropTypes.object,
}

ModelInfoModal.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderTitle.contextTypes = {
    t: PropTypes.func.isRequired,
}

RenderCategories.contextTypes = {
    t: PropTypes.func.isRequired
};

RednerPhotos.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderDescription.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderModelInfo.contextTypes = {
    t: PropTypes.func.isRequired
};


export default ModelInfoModal;
