import React from "react";
import PropTypes from "prop-types";
import ReactSVG from 'react-svg';
import MusicVerifier from "./../MusicVerifier";
import ModelVerifier from "./../ModelVerifier";
import styles from "./styles.module.scss";
import { 
    CONTENTS_TYPE,
    GEMTOWN_COPYRIGHT_TEXT,
    COMPANY_INFO,
} from "../../config/constants"

const VerifyContents = (props, context) => (
    <div className={styles.RootDivision}>
        <div className={styles.OutterDivision}>
            <RenderTopLogo />
            <RenderTitle title={context.t("CONTENT VERIFY")} />                   
            <RenderSubMenu {...props} />
            <RenderVerifier selectedMenu={props.selectedMenu}/> 
        </div>
        <RenderFooter />            
    </div>
)

const RenderVerifier = (props) => {
    switch(props.selectedMenu) {
        case CONTENTS_TYPE.MUSIC: 
            return <MusicVerifier />
        case CONTENTS_TYPE.MODEL:   
            return <ModelVerifier />
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
const RenderTitle = (props, context) => {
    return (
        <div className={styles.TitleDivision}> 
            <p className={styles.Text}>{props.title}</p>
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

VerifyContents.propTypes = {
    selectedMenu: PropTypes.string.isRequired,
    handleOnClickSubMenu: PropTypes.func.isRequired,
}

VerifyContents.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderFooter.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderSubMenu.contextTypes = {
    t: PropTypes.func.isRequired
};

export default VerifyContents;