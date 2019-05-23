import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { router: {location}, music, user } = state;
    return {
        pathname: location.pathname,
        music_filter: music.music_filter,
        music_filter_genre: music.music_filter.genre,
        music_filter_genre_detail: music.music_filter.genre_detail,
        music_filter_career: music.music_filter.career,
        userid: user.userid,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        SaveMusicFilter: (music_filter) => {
            dispatch(ActionCreator.SaveMusicFilter(music_filter));
        },
        FetchNewMusic: (numOfMusic, music_filter, isNeedSpinner, callbackFunc) => {
            dispatch(ActionCreator.FetchNewMusic(numOfMusic, music_filter, isNeedSpinner, callbackFunc));
        },
        SaveNewMusic: (new_music_list) => {
            dispatch(ActionCreator.SaveNewMusic(new_music_list));
        },
        SaveNewMusicExpansion: (new_music_expansion_list) => {
            dispatch(ActionCreator.SaveNewMusicExpansion(new_music_expansion_list));
        },
        FetchRatingMusic: (numOfMusic, music_filter, isNeedSpinner, callbackFunc) => {
            dispatch(ActionCreator.FetchRatingMusic(numOfMusic, music_filter, isNeedSpinner, callbackFunc));
        },
        SaveRatingMusic: (rating_music_list) => {
            dispatch(ActionCreator.SaveRatingMusic(rating_music_list));
        },        
        SaveMusicFilterList: (musicFilterList) => {
            dispatch(ActionCreator.SaveMusicFilterList(musicFilterList));
        },
        SaveRatingMusicExpansion: (rating_music_expansion_list) => {
            dispatch(ActionCreator.SaveRatingMusicExpansion(rating_music_expansion_list));
        },         
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)