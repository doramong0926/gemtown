import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactSVG from 'react-svg'
import {
    Container,
    Menu,
    Responsive,
    Segment,
    Visibility,
    Sidebar,
    Icon,
    Image,
} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.module.scss";
import { WEBSITE_PATH } from "./../../config/constants"

const Navigation = (props, context) => {
    if (props.pathname === WEBSITE_PATH.AUTH 
        || props.pathname === WEBSITE_PATH.UPLOAD_CONTENTS
        || props.pathname === WEBSITE_PATH.VERIFY_CONTENTS
        || props.pathname === WEBSITE_PATH.HOME) {
        return (
            <React.Fragment>
                {props.children}
            </React.Fragment>            
        )
    } else {
        return (
            <div className={styles.RootDivision}>
                <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
                    <NavBarMobile {...props} />
                </Responsive>
                <Responsive minWidth={Responsive.onlyTablet.maxWidth}>
                    <NavBarDesktop {...props} />
                </Responsive>
            </div>
        )
    }
}

const NavBarDesktop = (props, context) => {
    return (   
        <React.Fragment>
            <Visibility  onUpdate={props.handleVisibilityUpdate}>
                <Segment
                    basic
                    textAlign='center'
                    className={getClassnameWithPathname(false, props.pathname)}
                >
                    <Menu 
                        text secondary fixed={props.fixedMenu ? 'top' : null}
                        className={props.fixedMenu ? styles.MenuFixed: styles.Menu}
                    >
                        <Container className={styles.Container}>
                            <Menu.Menu className={styles.DestopMeneItem}>
                                <LeftLogoItem {...props} />
                                <CategoryMenuItem {...props} />
                                <GemshopMenuItem {...props} mobile={false} /> 
                            </Menu.Menu>
                        </Container>
                    </Menu>        
                    {/* { props.pathname==="/" ? <HomeHeading mobile={false}/> : null } */}
                </Segment>
            </Visibility>
            {props.children}
        </React.Fragment>
    )
};

const NavBarMobile = (props, context) => (  
    <React.Fragment>
        <Visibility  onUpdate={props.handleVisibilityUpdate}>
            <Sidebar
                as={Menu}
                animation="overlay"
                direction='top'
                icon="labeled"
                inverted
                vertical
                visible={props.visible}
                width='thin'
                color="blue"
                className={styles.Sidebar}
                fixed='top'
            >
                <Menu.Menu position="right">
                    <CategoryMenuItem {...props} />
                    <GemshopMenuItem {...props} mobile={true}/>
                </Menu.Menu>
            </Sidebar>
            <Segment
                basic
                inverted
                textAlign='center'
                className={getClassnameWithPathname(true, props.pathname)}
                vertical                    
            >
                <Menu 
                    text secondary fixed={props.fixedMenu ? 'top' : null}
                    className={props.fixedMenu ? styles.MenuFixed: styles.Menu}
                >
                    <Container className={styles.Container}>              
                        <LeftLogoItem {...props} />
                        <BurgerItem {...props} />                                  
                    </Container> 
                </Menu> 
                <Sidebar.Pushable>
                    <Sidebar.Pusher            
                        onClick={props.handlePusher}
                        // style={{ minHeight: "100vh"}}
                        className={styles.SidebarPusher}
                    >
                        {/* { props.pathname==="/" ? <HomeHeading mobile={true}/> : null } */}
                        {props.children}                
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Segment>
        </Visibility>
    </React.Fragment>     
);

const LeftLogoItem = (props) => {
    return (
        <Menu.Item 
            header
            as={Link}
            to={WEBSITE_PATH.HOME}
            onClick={
                () => {
                    props.handleOnClickMenuItem("home")
                } 
            }
            className={styles.LeftLogoMenuItem}
        >
            <ReactSVG
                svgClassName={styles.LeftLogoImage}
                className={styles.LeftLogoImage} 
                src={require("images/logos/gemtown_logo_with_text.svg")}
            />
        </Menu.Item>
    )
}

const BurgerItem = (props) => {
    return (
        <Menu.Item 
            onClick={props.handleToggle} 
            position="right"
            className={styles.BugerItem}
            
        >
            <Icon size="large" name="sidebar" />
        </Menu.Item>
    )
}

const CategoryMenuItem = (props, context) => {
    return (
        <div className={styles.CategoryMenuDivision}>
            <Menu.Item 
                as={Link}
                to={WEBSITE_PATH.MUSIC}
                name={context.t("MUSIC")}
                onClick={
                    () => {
                        props.handleOnClickMenuItem("music")
                    } 
                }
                className={
                    props.pathname === WEBSITE_PATH.MUSIC 
                        || props.pathname === WEBSITE_PATH.MUSIC_NEW
                        || props.pathname === WEBSITE_PATH.MUSIC_RATING
                        || props.pathname === WEBSITE_PATH.MUSIC_SOCIAL
                    ? styles.MenuItemMusicSelected 
                    : styles.MenuItemMusic}
            />  
            <Menu.Item 
                as={Link}
                to={WEBSITE_PATH.MODEL}
                name={context.t("MODEL")}
                onClick={
                    () => {
                        props.handleOnClickMenuItem("model")
                    } 
                }                
                className={
                    props.pathname === WEBSITE_PATH.MODEL 
                        || props.pathname === WEBSITE_PATH.MODEL_NEW
                        || props.pathname === WEBSITE_PATH.MODEL_RATING
                        || props.pathname === WEBSITE_PATH.MODEL_LIVE_JOB
                    ? styles.MenuItemModelSelected 
                    : styles.MenuItemModel}
            />   
            <Menu.Item 
                as={Link}
                to={WEBSITE_PATH.STORY}
                name={context.t("STORY")}
                onClick={
                    () => {
                        props.handleOnClickMenuItem("story")
                    } 
                }
                className={props.pathname === "/story" 
                ? styles.MenuItemStorySelected 
                : styles.MenuItemStory}
            />   
            <Menu.Item 
                as={Link}
                to={WEBSITE_PATH.VIDEO}
                name={context.t("VIDEO")}
                onClick={
                    () => {
                        props.handleOnClickMenuItem("video")
                    } 
                }
                className={props.pathname === "/video" 
                ? styles.MenuItemVideoSelected 
                : styles.MenuItemVideo}
            />   
        </div>
    )
}

const GemshopMenuItem = (props, context) => {
    return (
        <React.Fragment>            
            <Menu.Item 
                as={Link}
                to={WEBSITE_PATH.GEMSHOP}
                onClick={
                    () => {
                        props.handleOnClickMenuItem("gemshop")
                    } 
                }
                className={styles.MenuItemButton}
            >
                <Image className={styles.GmshopLogoImage} 
                    src={require("images/logos/gem_shop_logo.png")}                    
                />
            </Menu.Item>
        </React.Fragment>
    )
}

const getClassnameWithPathname = (isMobile, pathname) => {        
    switch(pathname) {     
        default:
            if (isMobile === false) {
                return styles.DesktopSegment
            } else {
                return styles.MobileSegment
            }
    }   
}

Navigation.propTypes = {
    visible:  PropTypes.bool.isRequired,
    handleOnClickMenuItem: PropTypes.func.isRequired,
    children: PropTypes.any,
    fixedMenu: PropTypes.bool.isRequired,
    handlePusher: PropTypes.func.isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleVisibilityUpdate: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
}

Navigation.contextTypes = {
    t: PropTypes.func.isRequired
};

NavBarDesktop.contextTypes = {
    t: PropTypes.func.isRequired
};

NavBarMobile.contextTypes = {
    t: PropTypes.func.isRequired
};

CategoryMenuItem.contextTypes = {
    t: PropTypes.func.isRequired
};

GemshopMenuItem.contextTypes = {
    t: PropTypes.func.isRequired
};

export default Navigation;
