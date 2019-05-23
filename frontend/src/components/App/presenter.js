import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

import Spinner from "./../Spinner";
import StatusBar from "./../StatusBar";
import Navigation from "./../Navigation";
import AuthScreen from "./../AuthScreen";
import HomeScreen from "./../HomeScreen";
import Music from "./../Music";
import MusicNew from "./../MusicNew";
import MusicRating from "./../MusicRating";
import MusicSocialMedia from "./../MusicSocialMedia";
import Model from "./../Model";
import ModelNew from "./../ModelNew";
import ModelRating from "./../ModelRating";
import ModelLiveJob from "./../ModelLiveJob";
import MusicPlayer from "./../MusicPlayer";
import UploadContents from "./../UploadContents";
import VerifyContents from "../VerifyContents";
import Footer from "./../Footer";
import { WEBSITE_PATH } from "./../../config/constants"

const App = (props, context) => {    
    return (
        props.isLoading === true ? 
        <Spinner key={2} size="small" visible={true} />
        : <RenderRootDivision {...props} />
    )
}

const RenderRootDivision = (props, context) => {
    return (       
        <div className={styles.RootDivision}>
            <Spinner key={2} size="small" visible={props.visibleDefaultSpinner}>
                <StatusBar />
                <Navigation key={1}>
                    <Spinner key={2} size="small" visible={props.visibleDefaultSpinner}>
                        <Routes kye={3} isLoggedIn={props.isLoggedIn}/>
                        <Footer />
                    </Spinner>                              
                </Navigation>
            </Spinner>
            {
                props.music !== null && props.music !== undefined && props.music !== "" 
                    ? <MusicPlayer />
                    : null
            }          
        </div>
    )
}

const Routes = (props) => (
    <Switch>
        <Route exact path = {WEBSITE_PATH.HOME} component={HomeScreen} />        
        <Route exact path = {WEBSITE_PATH.MUSIC} component={Music} />        
        <Route exact path = {WEBSITE_PATH.MUSIC_NEW} component={MusicNew} />
        <Route exact path = {WEBSITE_PATH.MUSIC_RATING} component={MusicRating} />
        <Route exact path = {WEBSITE_PATH.MUSIC_SOCIAL} component={MusicSocialMedia} />        
        <Route exact path = {WEBSITE_PATH.MODEL} component={Model} />
        <Route exact path = {WEBSITE_PATH.MODEL_NEW} component={ModelNew} />
        <Route exact path = {WEBSITE_PATH.MODEL_RATING} component={ModelRating} />
        <Route exact path = {WEBSITE_PATH.MODEL_LIVE_JOB} component={ModelLiveJob} />      
        
        <Route exact path = {WEBSITE_PATH.UPLOAD_CONTENTS} 
            render={() => (
                props.isLoggedIn === false ? (
                    <Redirect to={`${WEBSITE_PATH.HOME}`} />
                ) : (
                    <UploadContents />
                )
            )}
        />
        <Route exact path = {WEBSITE_PATH.VERIFY_CONTENTS} 
            render={() => (
                props.isLoggedIn === false ? (
                    <Redirect to={`${WEBSITE_PATH.HOME}`} />
                ) : (
                    <VerifyContents />
                )
            )}
        />
        <Route exact path = {WEBSITE_PATH.AUTH}         
            render={() => (
                props.isLoggedIn === true ? (
                    <Redirect to={`${WEBSITE_PATH.MUSIC}`} />
                ) : (
                    <AuthScreen />
                )
            )}
        />
    </Switch>
);

App.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    pathname: PropTypes.any.isRequired,
    visibleDefaultSpinner: PropTypes.bool.isRequired,
    music: PropTypes.object,
}

App.contextTypes = {
    t: PropTypes.func.isRequired
};

RenderRootDivision.contextTypes = {
    t: PropTypes.func.isRequired
};

export default App;
