import { connect } from "react-redux";
import Container from "./container";
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { router: { location }, music } = state;
    return {
        pathname: location.pathname,

        rating_music_expansion_list: music.rating_music_expansion_list,
        
        music_filter: music.music_filter,
        musicFilterList: music.musicFilterList,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        FetchRatingMusic: (numOfMusic, music_filter, isNeedSpinner, callbackFunc) => {
            dispatch(ActionCreator.FetchRatingMusic(numOfMusic, music_filter, isNeedSpinner, callbackFunc));
        },           
        SaveRatingMusicExpansion: (rating_music_expansion_list) => {
            dispatch(ActionCreator.SaveRatingMusicExpansion(rating_music_expansion_list));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)