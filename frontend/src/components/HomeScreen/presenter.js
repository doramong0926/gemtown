import React from "react";
import { Link } from "react-router-dom";
import ReactSVG from 'react-svg'

import PropTypes from "prop-types";
import { Image } from 'semantic-ui-react'

import styles from "./styles.module.scss";
import { WEBSITE_PATH } from "../../config/constants"

const HomeScreen = (props, context) => (
    <div className={styles.RootDivision}>
        <div className={styles.OutterDivision} >
            <div className={styles.TopDivision}>
                {/*
                <ReactSVG
                    className={styles.LeftLogoImage} 
                    src={require("images/logos/gemtown_logo.svg")}
                />
                */}         
                <Image className={styles.LogoImage} 
                    src={require("images/logos/gemtown_logo_with_text_white.png")}
                    // size="small"
                />
            </div>
            <div className={styles.Top2Division}>
                <Image className={styles.IconImage} 
                    src={require("images/icons/png/home_star.png")}
                    // size="small"
                />
                <ReactSVG
                    className={styles.DescriptionSvgIcon} 
                    src={require("images/icons/svg/home_description_text.svg")}
                    svgStyle={{width: "250px", height: "100px"}}
                />
            </div>
            <div className={styles.MiddleDivision}>
                <div className={styles.MenuDivision}>
                    <Link 
                        to={WEBSITE_PATH.MUSIC}
                    >
                        <div className={styles.InnerDivision}>
                            <ReactSVG
                                className={styles.LeftSvgIcon} 
                                src={require("images/icons/svg/home_music_icon.svg")}
                                svgStyle={{width: "30px", height: "30px"}}
                            />
                            <ReactSVG
                                className={styles.RightSvgIcon} 
                                src={require("images/icons/svg/home_music_text.svg")}
                                svgStyle={{width: "150px", height: "40px"}}
                            />
                        </div>
                    </Link>
                </div>
                <div className={styles.MenuDivision}>
                    <Link 
                        to={WEBSITE_PATH.MODEL}
                    >
                        <div className={styles.InnerDivision}>
                            <ReactSVG
                                className={styles.LeftSvgIcon} 
                                src={require("images/icons/svg/home_model_icon.svg")}
                                svgStyle={{width: "30px", height: "30px"}}
                            />
                            <ReactSVG
                                className={styles.RightSvgIcon} 
                                src={require("images/icons/svg/home_model_text.svg")}
                                svgStyle={{width: "150px", height: "40px"}}
                            />
                        </div>
                    </Link>
                </div>
                <div className={styles.MenuDivision}>
                    <div className={styles.InnerDivision}>
                        <ReactSVG
                            className={styles.LeftSvgIcon} 
                            src={require("images/icons/svg/home_story_icon.svg")}
                            svgStyle={{width: "30px", height: "30px"}}
                        />
                        <ReactSVG
                            className={styles.RightSvgIcon} 
                            src={require("images/icons/svg/home_story_text.svg")}
                            svgStyle={{width: "150px", height: "40px"}}
                        />
                    </div>
                </div>
                <div className={styles.MenuDivision}>
                    <div className={styles.InnerDivision}>
                        <ReactSVG
                            className={styles.LeftSvgIcon} 
                            src={require("images/icons/svg/home_video_icon.svg")}
                            svgStyle={{width: "30px", height: "30px"}}
                        />
                        <ReactSVG
                            className={styles.RightSvgIcon} 
                            src={require("images/icons/svg/home_video_text.svg")}
                            svgStyle={{width: "150px", height: "40px"}}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.BottomDivision}>
                <div className={styles.InnerDivision}>
                    <ReactSVG
                        className={styles.LeftSvgIcon} 
                        src={require("images/icons/svg/home_logo_symbol.svg")}
                        svgStyle={{width: "25px", height: "25px"}}
                    />
                    <p className={styles.Text}>©2019 GEMTOWN CORP. ALL RIGHTS RESERVED</p>
                </div>
            </div>
        </div>
    </div>
)

HomeScreen.propTypes = {
}

HomeScreen.contextTypes = {
    t: PropTypes.func.isRequired
};


export default HomeScreen;