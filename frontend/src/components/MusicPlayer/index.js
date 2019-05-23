import { connect } from "react-redux";
import MusicPlayer from "./presenter";
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const {musicPlayer} = state;
    return {
        music: musicPlayer.music,
        isPlay: musicPlayer.isPlay,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        AddMusic: (music) => {
            dispatch(ActionCreator.AddMusic(music));
        },
        DeleteMusic: (music) => {
            dispatch(ActionCreator.DeleteMusic(music));
        },
        TogglePlayMusic: (music) => {
            dispatch(ActionCreator.TogglePlayMusic(music));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);