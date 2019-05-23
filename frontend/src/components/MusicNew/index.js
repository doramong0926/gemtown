import { connect } from "react-redux";
import Container from "./container";
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { router: { location }, music } = state;
    return {
        pathname: location.pathname,

        new_music_expansion_list: music.new_music_expansion_list,
        
        music_filter: music.music_filter,
        musicFilterList: music.musicFilterList,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        FetchNewMusic: (numOfMusic, music_filter, isNeedSpinner, callbackFunc) => {
            dispatch(ActionCreator.FetchNewMusic(numOfMusic, music_filter, isNeedSpinner, callbackFunc));
        },
        SaveNewMusicExpansion: (new_music_expansion_list) => {
            dispatch(ActionCreator.SaveNewMusicExpansion(new_music_expansion_list));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)