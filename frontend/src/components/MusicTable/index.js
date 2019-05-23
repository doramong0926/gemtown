import { connect } from "react-redux";
import Container from "./container";
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { router: { location }, musicPlayer, user} = state;
    return {
        pathname: location.pathname,
        music: musicPlayer.music,
        isPlay: musicPlayer.isPlay,
        token: user.token,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        TogglePlayMusic: (music) => {
            dispatch(ActionCreator.TogglePlayMusic(music));
        },
        FetchPlayMusic:  (songid, token, callbackFunc) => {
            dispatch(ActionCreator.FetchPlayMusic (songid, token, callbackFunc));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);