import React from "react";
import PropTypes from "prop-types";
import ReactSVG from 'react-svg';
import MusicUploader from "./../MusicUploader";
import ModelUploader from "./../ModelUploader";
import styles from "./styles.module.scss";
import { 
    Divider, 
} from 'semantic-ui-react'
import { 
    USER_CLASS, 
    CONTENTS_TYPE,
    GEMTOWN_COPYRIGHT_TEXT,
    COMPANY_INFO,
    MODEL_PHOTO_TYPE,
} from "./../../config/constants"

import _ from "lodash";

const USER_INFO_TYPE = {
    USERNAME: "username",
    USERNAME_ENG: "username_eng",
    NICKNAME: "nickname",
    EMAIL: "email",
    USER_CLASS: "user_class",
    COUNTRY: "country",
    USER_REGISTED_FILE: "registed_file",
}


const UploadContents = (props, context) => (
    <div className={styles.RootDivision}>
        <div className={styles.OutterDivision}>
            <RenderTopLogo />
            <RenderMyGem {...props}/>
            <RenderTitle title={context.t("회원정보")} />
            <RenderUserInfo {...props} />            
            <RenderTitle title={context.t("나의 컨텐츠 목록")} />            
            <RenderRegistedFileList {...props} />
            <RenderTitle title={context.t("내 컨텐츠 등록하기")} />                   
            <RenderSubMenu {...props} />
            <RenderUploader selectedMenu={props.selectedMenu}/> 
        </div>
        <RenderFooter />            
    </div>
)

const RenderRegistedDescription = (props) => {
    return (
        <div className={styles.WarningDeivision}>
            <p className={styles.Text}>
                {props.message}
            </p>
        </div>        
    )
}

const RenderUploader = (props) => {
    switch(props.selectedMenu) {
        case CONTENTS_TYPE.MUSIC: 
            return <MusicUploader />
        case CONTENTS_TYPE.MODEL:   
            return <ModelUploader />
        case CONTENTS_TYPE.STORY: 
            return null
        case CONTENTS_TYPE.VIDEO:   
            return null
        default:
            return null
    }
}

const RenderFooter = (props, context) => {
    return (
        <div className={styles.FooterDivision}>
            <div className={styles.TopDivision}>
                <div className={styles.TextDivision}>
                    <p className={styles.Text}>{context.t("이용약관") }</p>
                </div>
                <div className={styles.DividerDivision} />
                <div className={styles.TextDivision}>
                    <p className={styles.Text}>{context.t("개인정보처리방침") }</p>
                </div>
                <div className={styles.DividerDivision} />
                <div className={styles.TextDivision}>
                    <p className={styles.Text}>{context.t("청소년보호정책") }</p>
                </div>
                <div className={styles.DividerDivision} />
                <div className={styles.TextDivision}>
                    <p className={styles.Text}>{context.t("청소년보호정책") }</p>
                </div>
            </div>
            <div className={styles.BottomDivision}>
                <div className={styles.TextDivision}>
                    <p className={styles.Text}>{context.t(`문의전화 : ${COMPANY_INFO.TEL}(평일 09:00~18:00, 유료)  |  이메일 : ${COMPANY_INFO.EMAIL}`) }</p>
                    <p className={styles.Text}>{context.t(`${GEMTOWN_COPYRIGHT_TEXT}`) }</p>
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

const RenderMyGem = (props, context) => {
    return (
        <div className={styles.MyGemDivision}> 
            <div className={styles.LeftTextDivision}>
                <p className={styles.LeftText}>{context.t("MY GEM")}</p>
                <p className={styles.MiddleText}>{props.userInfo.gem_amount}</p>
                <p className={styles.RightText}>G</p>
            </div>
            <div 
                className={styles.DefaultIconDivision}
                onClick={props.handlePurchaseGem}
            >
                <p className={styles.DefaultIconText}>{context.t("GEM 충전")}</p>
            </div>
        </div>
    )
}

const RenderTitle = (props, context) => {
    return (
        <div className={styles.TitleDivision}> 
            <p className={styles.Text}>{props.title}</p>
        </div>
    )
}

const RenderUserInfo = (props, context) => {
    return (
        <div className={styles.UserInfoDivision}> 
            <div className={styles.TextDivision}> 
                <p className={styles.LeftText}>{context.t("Creator Name")}</p>
                <p className={styles.RightText}>{getUserInfo(props, USER_INFO_TYPE.USERNAME)}</p>  
            </div>
            <div className={styles.TextDivision}> 
                <p className={styles.LeftText}>{context.t("Creator Nickname.")}</p>
                <p className={styles.RightText}>{getUserInfo(props, USER_INFO_TYPE.NICKNAME)}</p>  
            </div>        
            <div className={styles.TextDivision}> 
                <p className={styles.LeftText}>{context.t("Registedred e-mail.")}</p>
                <p className={styles.RightText}>{getUserInfo(props, USER_INFO_TYPE.EMAIL)}</p>  
            </div>    
            <div className={styles.TextDivision}> 
                <p className={styles.LeftText}>{context.t("Country.")}</p>
                <p className={styles.RightText}>{getUserInfo(props, USER_INFO_TYPE.COUNTRY)}</p>  
            </div>          
            <div className={styles.TextDivision}> 
                <p className={styles.LeftText}>{context.t("Registedred Class.")}</p>
                <p className={styles.RightText}>{getUserInfo(props, USER_INFO_TYPE.USER_CLASS)}</p>  
            </div>         
            <div className={styles.TextDivision}> 
                <p className={styles.LeftText}>{context.t("Registedred File.")}</p>
                <p className={styles.RightText}>{getUserInfo(props, USER_INFO_TYPE.USER_REGISTED_FILE)}</p>  
            </div>         
        </div>
    )
}

const RenderSubMenu = (props, context) => {
    const SubMenu = [
        { id: CONTENTS_TYPE.MUSIC, text: context.t("MUSIC") },
        { id: CONTENTS_TYPE.MODEL, text: context.t("MODEL") },
        { id: CONTENTS_TYPE.STORY, text: context.t("STORY") },
        { id: CONTENTS_TYPE.VIDEO, text: context.t("VIDEO") },
    ]
    return (
        <div className={styles.SubMenuDivision}> 
            <div className={styles.OutterDivision}>
            {
                SubMenu.map((t, index) => {
                    if (props.selectedMenu === t.id) {
                        return <p key={index} className={styles.TextSelected}>{t.text}</p>
                    } else {
                        return <p key={index}  className={styles.Text}  id={t.id} onClick={props.handleOnClickSubMenu}>{t.text}</p>
                    }
                })
            }
            </div>
        </div>
    )
}

const RenderRegistedFileList = (props) => {
    switch(props.selectedMenu) {
        case CONTENTS_TYPE.MUSIC: 
            return <RenderRegistedMusicFileList {...props}/>
        case CONTENTS_TYPE.MODEL:   
            return <RenderRegistedModelFileList {...props}/>
        case CONTENTS_TYPE.STORY: 
            return null
        case CONTENTS_TYPE.VIDEO:   
            return null
        default:
        return null
    }
}


const RenderRegistedMusicFileList = (props, context) => {
    if (props.myposted_music_list.length === 0 || props.myposted_music_list === null || props.myposted_music_list === undefined) {
        return (
            <div className={styles.RegistedFileDivision}> 
                <RenderRegistedDescription message={context.t("아직 등록된 컨텐츠가 없습니다.")} />            
            </div>
        );
    }
    else {
        return (        
            <div className={styles.RegistedFileDivision}> 
                <RenderRegistedDescription message={context.t("젬타운에 업로드된 모든 데이터는 블럭체인에 의해 관리됨으로 한번 등록하신 파일의 수정은 절대 불가능 합니다.")} />            
                {
                    props.myposted_music_list.map((t, index) => {
                        return (    
                            <React.Fragment key={index}>
                                <div className={styles.OutterDivision}>            
                                    <div className={styles.RegistedTitleDivision}>
                                        <p className={styles.IndexText}>{index  + 1}. </p>
                                        <p className={styles.Text}>{t.title}</p>
                                    </div>
                                    <div className={styles.RightDivision}>
                                        <div className={styles.DefaultIconDivision}>
                                            <p className={styles.DefaultIconText}>{context.t("MODIFY")}</p>
                                        </div>
                                        <div className={styles.DefaultIconDivision}>
                                            <p className={styles.DefaultIconText}>{context.t("DELETE")}</p>
                                        </div>
                                    </div>                        
                                </div>
                                <Divider className={styles.Divider} />
                            </React.Fragment>
                        )
                    })
                }
            </div>
        )
    }
}


const RenderRegistedModelFileList = (props, context) => {
    if (props.myposted_model_list.length === 0 || props.myposted_model_list === null || props.myposted_model_list === undefined) {
        return (
            <div className={styles.RegistedFileDivision}> 
                <RenderRegistedDescription message={context.t("아직 등록된 컨텐츠가 없습니다.")} />            
            </div>
        );
    }
    else {
        const content_cover = _.find(props.myposted_model_list, t => t.photo_type === MODEL_PHOTO_TYPE.COVER)
        const content_full = _.find(props.myposted_model_list, t => t.photo_type === MODEL_PHOTO_TYPE.FULL)
        const content_half = _.find(props.myposted_model_list, t => t.photo_type === MODEL_PHOTO_TYPE.HALF)
        
        return (       
            <div className={styles.RegistedFileDivision}> 
                <RenderRegistedDescription message={context.t("젬타운에 업로드된 모든 데이터는 블럭체인에 의해 관리됨으로 한번 등록하신 파일의 수정은 절대 불가능 합니다.")} />            
                <div className={styles.OutterDivision}>
                    <div className={styles.RegistedTitleDivision}>
                        <p className={styles.IndexText}>1. </p>                                    
                        <RenerModelPhotoType photo_type={content_cover.photo_type} />
                        <p className={styles.FileNameText}>{content_cover.file.toString().split('ModelPhoto/')[1]}</p>
                    </div>
                    <div className={styles.RightDivision}>
                        <div className={styles.DefaultIconDivision}>
                            <p className={styles.DefaultIconText}>{context.t("MODIFY")}</p>
                        </div>
                        <div className={styles.DefaultIconDivision}>
                            <p className={styles.DefaultIconText}>{context.t("DELETE")}</p>
                        </div>
                    </div>      
                </div>
                <Divider className={styles.Divider} />
                <div className={styles.OutterDivision}>
                    <div className={styles.RegistedTitleDivision}>
                        <p className={styles.IndexText}>2. </p>                                    
                        <RenerModelPhotoType photo_type={content_full.photo_type} />
                        <p className={styles.FileNameText}>{content_full.file.toString().split('ModelPhoto/')[1]}</p>
                    </div>
                    <div className={styles.RightDivision}>
                        <div className={styles.DefaultIconDivision}>
                            <p className={styles.DefaultIconText}>{context.t("MODIFY")}</p>
                        </div>
                        <div className={styles.DefaultIconDivision}>
                            <p className={styles.DefaultIconText}>{context.t("DELETE")}</p>
                        </div>
                    </div>    
                </div>
                <Divider className={styles.Divider} />
                <div className={styles.OutterDivision}>
                    <div className={styles.RegistedTitleDivision}>
                        <p className={styles.IndexText}>3. </p>                                    
                        <RenerModelPhotoType photo_type={content_half.photo_type} />
                        <p className={styles.FileNameText}>{content_half.file.toString().split('ModelPhoto/')[1]}</p>                        
                    </div>
                    <div className={styles.RightDivision}>
                        <div className={styles.DefaultIconDivision}>
                            <p className={styles.DefaultIconText}>{context.t("MODIFY")}</p>
                        </div>
                        <div className={styles.DefaultIconDivision}>
                            <p className={styles.DefaultIconText}>{context.t("DELETE")}</p>
                        </div>
                    </div>    
                </div>
                <Divider className={styles.Divider} />
                {
                    props.myposted_model_list.map((t, index) => {
                        if (t.photo_type === MODEL_PHOTO_TYPE.ETC) {
                            return (    
                                <React.Fragment key={index}>
                                    <div className={styles.OutterDivision}>
                                        <div className={styles.RegistedTitleDivision}>
                                            <p className={styles.IndexText}>{index  + 1}. </p>                                    
                                            <RenerModelPhotoType photo_type={t.photo_type} />
                                            <p className={styles.FileNameText}>{t.file.toString().split('ModelPhoto/')[1]}</p>
                                        </div>
                                        <div className={styles.RightDivision}>
                                            <div className={styles.DefaultIconDivision}>
                                                <p className={styles.DefaultIconText}>{context.t("MODIFY")}</p>
                                            </div>
                                            <div className={styles.DefaultIconDivision}>
                                                <p className={styles.DefaultIconText}>{context.t("DELETE")}</p>
                                            </div>
                                        </div>                        
                                    </div>
                                    <Divider className={styles.Divider} />
                                </React.Fragment>
                            )
                        } else {
                            return null
                        }
                    })
                }
            </div>
        )
    }
}

const RenerModelPhotoType = (props, context) => {
    switch(props.photo_type) {
        case MODEL_PHOTO_TYPE.COVER:
            return <p className={styles.PhotoTypeText}>[{context.t("커버")}]</p>
        case MODEL_PHOTO_TYPE.FULL:
            return <p className={styles.PhotoTypeText}>[{context.t("전신")}]</p>
        case MODEL_PHOTO_TYPE.HALF:
            return <p className={styles.PhotoTypeText}>[{context.t("반신")}]</p>
        case MODEL_PHOTO_TYPE.ETC:
            return <p className={styles.PhotoTypeText}>[{context.t("기타")}]</p>
        default:
            return null;
    }
}

const getUserInfo = (props, userInfoType) => {
    switch(userInfoType) {
        case USER_INFO_TYPE.USER_REGISTED_FILE:
            switch(props.selectedMenu) {
                case CONTENTS_TYPE.MUSIC:
                    if (props.userInfo === null || props.userInfo === undefined 
                        || props.myposted_music_list === null || props.myposted_music_list === undefined) {
                            return "0 ea";
                    } else {
                        return `${props.myposted_music_list.length} ea`;
                    }
                case CONTENTS_TYPE.MODEL:
                    if (props.userInfo === null || props.userInfo === undefined 
                        || props.myposted_model_list === null || props.myposted_model_list === undefined) {
                            return "0 ea";
                    } else {
                        return `${props.myposted_model_list.length} ea`;
                    }
                default :
                    return "";
            }            

        case USER_INFO_TYPE.USERNAME:
            if (props.userInfo === null || props.userInfo === undefined 
                || props.userInfo.username === null || props.userInfo.username === undefined) {
                    return "";
            } else {
                return props.userInfo.username;
            }

        case USER_INFO_TYPE.USERNAME_ENG:
            if (props.userInfo === null || props.userInfo === undefined 
                || props.userInfo.username_eng === null || props.userInfo.username_eng === undefined) {
                    return "";
            } else {
                return props.userInfo.username_eng;
            }

        case USER_INFO_TYPE.EMAIL:
            if (props.userInfo === null || props.userInfo === undefined 
                || props.userInfo.email === null || props.userInfo.email === undefined) {
                    return "";
            } else {
                return props.userInfo.email;
            }

        case USER_INFO_TYPE.USER_CLASS:
            if (props.userInfo === null || props.userInfo === undefined 
                || props.userInfo.user_class === null || props.userInfo.user_class === undefined) {
                    return "";
            } else {
                if (props.userInfo.user_class === USER_CLASS.COMMON) {
                    return "COMMON";
                } else if (props.userInfo.user_class === USER_CLASS.ARTIST) {
                    return "ARTIST";
                } else if (props.userInfo.user_class === USER_CLASS.ARTIST) {
                    return "COMPANY";
                }  else {
                    return "";
                }
            }

        case USER_INFO_TYPE.NICKNAME:
            switch(props.selectedMenu) {
                case CONTENTS_TYPE.MUSIC:
                    if (props.userInfo === null || props.userInfo === undefined 
                        || props.userInfo.musician === null || props.userInfo.musician === undefined
                        || props.userInfo.musician.nickname === null || props.userInfo.musician.nickname === undefined) {
                            return "";
                    } else {
                        return props.userInfo.musician.nickname;
                    }
                case CONTENTS_TYPE.MODEL:
                    if (props.userInfo === null || props.userInfo === undefined 
                        || props.userInfo.modeler === null || props.userInfo.modeler === undefined
                        || props.userInfo.modeler.nickname === null || props.userInfo.modeler.nickname === undefined) {
                            return "";
                    } else {
                        return props.userInfo.modeler.nickname;
                    }
                default :
                    return "";
            }            

        case USER_INFO_TYPE.COUNTRY:
            if (props.userInfo === null || props.userInfo === undefined 
                || props.userInfo.country === null || props.userInfo.country === undefined) {
                    return "";
            } else {
                return props.userInfo.country;
            }
        
        default:
            return ""
    }
}

UploadContents.propTypes = {
    userInfo: PropTypes.shape({
        username: PropTypes.string.isRequired,
        musician_creator: PropTypes.shape({
            nickname: PropTypes.string,
        }),
        gem_amount: PropTypes.number.isRequired,
        email: PropTypes.string,
        user_class: PropTypes.string.isRequired,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        country: PropTypes.string,     
    }),
    myposted_music_list: PropTypes.array,
    myposted_model_list: PropTypes.array,
    selectedMenu: PropTypes.string.isRequired,
    handleOnClickSubMenu: PropTypes.func.isRequired,
    handlePurchaseGem:PropTypes.func.isRequired,
}

UploadContents.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderMyGem.contextTypes = {
    t: PropTypes.func.isRequired
};

RenerModelPhotoType.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderFooter.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderUserInfo.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderRegistedFileList.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderRegistedMusicFileList.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderRegistedModelFileList.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderSubMenu.contextTypes = {
    t: PropTypes.func.isRequired
};

export default UploadContents;