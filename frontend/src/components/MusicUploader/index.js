import { connect } from "react-redux";
import Container from "./container";
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { router: {location}, user, music } = state;
    return {
        pathname: location.pathname,
        isLoggedIn: user.isLoggedIn,
        userid: user.userid,
        userInfo: user.userInfo,
        token: user.token,
        music_cover_list: music.music_cover_list,        
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        SaveMusicCoverList: (music_cover_list) => {
            dispatch(ActionCreator.SaveMusicCoverList(music_cover_list));
        },
        FetchMusicCover: (userid, token, callbackFunc) => {
            dispatch(ActionCreator.FetchMusicCover(userid, token, callbackFunc));
        },
        FetchRegisterMusic: (userid, isNeedSpinner, token, request_data, callbackFunc) => {
            dispatch(ActionCreator.FetchRegisterMusic(userid, isNeedSpinner, token, request_data, callbackFunc));
        },
        FetchMypostedMusic: (userid, isNeedSpinner, callbackFunc) => {
            dispatch(ActionCreator.FetchMypostedMusic(userid, isNeedSpinner, callbackFunc));
        },
        SaveMypostedMusic: (myposted_music_list) => {
            dispatch(ActionCreator.SaveMypostedMusic(myposted_music_list));
        },
        SaveNewMusic: (new_music_list) => {
            dispatch(ActionCreator.SaveNewMusic(new_music_list));
        },
        SaveNewMusicExpansion: (new_music_expansion_list) => {
            dispatch(ActionCreator.SaveNewMusicExpansion(new_music_expansion_list));
        },
        SaveRatingMusic: (rating_music_list) => {
            dispatch(ActionCreator.SaveRatingMusic(rating_music_list));
        },       
        SaveRatingMusicExpansion: (rating_music_expansion_list) => {
            dispatch(ActionCreator.SaveRatingMusicExpansion(rating_music_expansion_list));
        },   
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)