import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ReactSVG from 'react-svg'
import styles from "./styles.module.scss";
import ConfirmModal from "../ConfirmModal";
import { WEBSITE_PATH } from "./../../config/constants"

const StatusBar = (props, context) => {
    const logoutConfirmButtonString = context.t("로그아웃");
    const logoutConfirmModalTitle = context.t("로그아웃");
    const logoutConfirmModalContents = [
        {
            title: null,
            text: [
                context.t("지금 바로 로그아웃 하시겠습니까?"),
            ]
        },
    ];
    if (props.pathname === '/auth' || props.pathname === '/') {
        return null
    } else {
        return (
            <React.Fragment>
                <div className={styles.RootDivision}>
                    <div className={styles.DestopHeader}>
                        <div className={styles.DestopInnerHeader}>
                            <LeftItem {...props} />
                            <RightItem {...props} />
                        </div>
                    </div>
                </div>
                <ConfirmModal 
                    visible = {props.visibleLogoutConfirmModal}
                    handleClose = {props.handleCloseLogoutModal}
                    handleConfirm = {props.handleLogoutConfirm}
                    buttonString = {logoutConfirmButtonString}
                    size={"mini"} 
                    title={logoutConfirmModalTitle}
                    contents={logoutConfirmModalContents}                
                />
            </React.Fragment>
        )
    }
}

const LeftItem = (props, context) => {
    return (
        <div className={styles.LeftItemDivision}>
            <ReactSVG 
                src={require("images/icons/svg/user_icon.svg")} 
                svgClassName='SvgUserIcon'
                className={styles.SvgUserIcon}
            />    
            <UserTypeAndName {...props} />
            <div className={styles.LogInOutDivision}>
                <LogInOutButton {...props} />
            </div>
            {
                props.isLoggedIn 
                ? <ReactSVG 
                        src={require("images/icons/svg/setup_icon.svg")} 
                        svgClassName='SvgIconSetup'
                        className={styles.SvgIconSetup}
                    /> 
                : null
            }         
        </div>
    )
}

const RightItem = (props, context) => {
    if (props.isLoggedIn === true) {
        return (
            <div className={styles.RightItemDivision}>
                <React.Fragment>
                    <Link 
                        to={WEBSITE_PATH.UPLOAD_CONTENTS}
                    >
                        <div className={styles.UploadDivision}>
                            <ReactSVG 
                                src={require("images/icons/svg/upload_icon.svg")} 
                                svgClassName='SvgIconSetup'
                                className={styles.SvgIconUpload}
                            />
                            <div className={styles.UploadTextDivision}>
                                <p> {context.t("UPLOAD YOUR DATA")}</p>
                            </div>
                        </div>
                    </Link>
                </React.Fragment>
                <React.Fragment>
                    <Link 
                        to={WEBSITE_PATH.VERIFY_CONTENTS}
                    >
                        <div className={styles.VerifyDivision}>
                            <ReactSVG 
                                src={require("images/icons/svg/upload_icon.svg")} 
                                svgClassName='SvgIconSetup'
                                className={styles.SvgIconUpload}
                            />
                            <div className={styles.VerifyTextDivision}>
                                <p> {context.t("VERUFY YOUR DATA")}</p>
                            </div>
                        </div>
                    </Link>
                </React.Fragment>
                <div className={styles.MyGemDivision}>
                    <ReactSVG 
                        src={require("images/icons/svg/gem_icon.svg")} 
                        svgClassName='SvgIconSetup'
                        className={styles.SvgIconGem}
                    />
                    <div className={styles.MyGemTextDivision}>
                        <p className={styles.MyGemText}>{context.t("MY GEM")}</p>
                    </div>
                    <div className={styles.AmountOfGemDivision}>
                        <p className={styles.AmountOfGemText}>{props.userInfo.gem_amount}</p>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            null
        )
    }
}

const UserTypeAndName = (props, context) => {
    if (props.isLoggedIn === true) {
        return (
            <React.Fragment>
                <div className={styles.UserTypeDivision}>
                    <p>{props.usertype}</p>    
                </div>
                <div className={styles.UsernameDivision}>
                    <p>{props.userInfo.username}</p>
                </div>                
            </React.Fragment>  
        )
    } else {
        return null
    }
}

const LogInOutButton = (props, context) => {
    if (props.isLoggedIn === true) {
        return (
            <p 
                className={styles.LogInOutText}
                onClick={props.handleOnClickLogInOut}
            >
                {context.t("LOG OUT")}
            </p>
        )
    } else {
        return (
            <Link 
                to={WEBSITE_PATH.AUTH}
                className={styles.LogInOutText}
            >
                {context.t("LOG IN")}
            </Link>
        )
    }
}

StatusBar.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    userInfo: PropTypes.shape({
        username: PropTypes.string,
    }),
    usertype: PropTypes.string,
    handleOnClickLogInOut: PropTypes.func.isRequired,
    visibleLogoutConfirmModal: PropTypes.bool.isRequired,
    handleCloseLogoutModal: PropTypes.func.isRequired,
    handleLogoutConfirm: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
}

StatusBar.contextTypes = {
    t: PropTypes.func.isRequired
};

LeftItem.contextTypes = {
    t: PropTypes.func.isRequired
};

RightItem.contextTypes = {
    t: PropTypes.func.isRequired
};

LogInOutButton.contextTypes = {
    t: PropTypes.func.isRequired
};

export default StatusBar;