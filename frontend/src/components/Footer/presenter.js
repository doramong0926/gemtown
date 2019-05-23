import React from "react";
import PropTypes from "prop-types";
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss";
import { WEBSITE_PATH } from "./../../config/constants"

const Footer = (props, context) => {
    const Menu = [
        { title: context.t("회사소개"), link: "https://bluecots.io", },
        { title: context.t("이용약관"), link: "https://bluecots.io", },
        { title: context.t("개인정보처리방침"), link: "https://bluecots.io", },
        { title: context.t("청소년보호정책"), link: "https://bluecots.io", },
        { title: context.t("제휴/프로모션문의"), link: "https://bluecots.io", },
        { title: context.t("이메일주소무단수집거부"), link: "https://bluecots.io", },
        { title: context.t("파트너센터"), link: "https://bluecots.io", },
        { title: context.t("사업자정보확인"), link: "https://bluecots.io", },
    ]
    const CompanyInfo = [
        { title: context.t("(주)비손에프엔씨"), link: "https://bluecots.io", },
        { title: context.t("서울시 강남구 테헤란로 99길 블루빌딩 7층"), link: "https://bluecots.io", },
        { title: context.t("공동대표이사:홍길동"), link: "https://bluecots.io", },
        { title: context.t("사업자등록번호:119-86-34021"), link: "https://bluecots.io", },
        { title: context.t("통신판매업신고번호:제2015-강남-0032호"), link: "https://bluecots.io", },
        { title: context.t("문의전화:1566-0000(평일09:00~18:00,유료)"), link: "https://bluecots.io", },
        { title: context.t("이메일:INFO@GEMTOWN.CO.KR"), link: "https://bluecots.io", },
        { title: context.t("호스팅서비스사업자:(주)비손에프엔씨"), link: "https://bluecots.io", },
    ]
    if (props.pathname === WEBSITE_PATH.AUTH 
        || props.pathname === WEBSITE_PATH.UPLOAD_CONTENTS
        || props.pathname === WEBSITE_PATH.VERIFY_CONTENTS
        || props.pathname === WEBSITE_PATH.HOME) {
        return null;
    } else {
        return (
            <div className={styles.RootDivision}>
                <div className={styles.OutterDivision}>
                    <div className={styles.MenuDivision}>
                        {
                            Menu.map((t, index) => {
                                if (Menu.length === index+1) {
                                    return <p key={index} className={styles.Text}>{t.title}</p>
                                } else {
                                    return (
                                        <React.Fragment key={index} >
                                            <p className={styles.Text}>{t.title}</p>
                                            <div className={styles.DividerDivision} />
                                        </React.Fragment>
                                    )
                                }
                            })
                        }                    
                    </div>
                    <div className={styles.CompanyInfoDivision}>
                        <div className={styles.InnerDivision}>
                            {
                                CompanyInfo.map((t,index) => {
                                    if ( index === 0) {
                                        return (
                                            <React.Fragment key={index}>
                                                <p className={styles.Text}>{t.title}</p>
                                            </React.Fragment>
                                        )
                                    } else {
                                        return (
                                            <React.Fragment key={index}>
                                                <div className={styles.DividerDivision} />
                                                <p className={styles.Text}>{t.title}</p>
                                            </React.Fragment>
                                        )
                                    }
                                })
                            }                        
                        </div>
                    </div>
                    <div className={styles.CompanyCopyright}>
                        <p className={styles.Text}>{context.t("©2019 GEMTOWN CORP. ALL RIGHTS RESERVED")}</p>
                    </div>
                </div>
            </div>
        )
    }   
}


Footer.propTypes = {
    pathname: PropTypes.string.isRequired,
    handleOnClick: PropTypes.func.isRequired,
}

Footer.contextTypes = {
    t: PropTypes.func.isRequired
};

export default Footer;