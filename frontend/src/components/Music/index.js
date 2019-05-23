import { connect } from "react-redux";
import Container from "./container";
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { router: { location }, music } = state;
    return {
        pathname: location.pathname,

        new_music_list: music.new_music_list,
        rating_music_list: music.rating_music_list,
        
        music_filter: music.music_filter,
        musicFilterList: music.musicFilterList,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        FetchNewMusic: (numOfMusic, music_filter, isNeedSpinner, callbackFunc) => {
            dispatch(ActionCreator.FetchNewMusic(numOfMusic, music_filter, isNeedSpinner, callbackFunc));
        },
        SaveNewMusic: (new_music_list) => {
            dispatch(ActionCreator.SaveNewMusic(new_music_list));
        },
        FetchRatingMusic: (numOfMusic, music_filter, isNeedSpinner, callbackFunc) => {
            dispatch(ActionCreator.FetchRatingMusic(numOfMusic, music_filter, isNeedSpinner, callbackFunc));
        },
        SaveRatingMusic: (rating_music_list) => {
            dispatch(ActionCreator.SaveRatingMusic(rating_music_list));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)