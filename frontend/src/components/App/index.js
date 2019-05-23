import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { user, router: { location }, spinner, musicPlayer } = state;
    return {
        isLoggedIn: user.isLoggedIn,
        pathname: location.pathname,
        visibleDefaultSpinner: spinner.visibleDefaultSpinner,
        music: musicPlayer.music,
        userInfo: user.userInfo,
        userid: user.userid,
        token: user.token,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        GetUserInfo: (userid, token) => {
            dispatch(ActionCreator.GetUserInfo(userid, token));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);


