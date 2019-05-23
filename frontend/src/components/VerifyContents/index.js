import { connect } from "react-redux";
import Container from "./container";
import ActionCreator from "../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { router: {location}, user } = state;
    return {
        pathname: location.pathname,
        isLoggedIn: user.isLoggedIn,
        userid: user.userid,
        token: user.token,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        FetchMypostedMusic: (userid, isNeedSpinner, callbackFunc) => {
            dispatch(ActionCreator.FetchMypostedMusic(userid, isNeedSpinner, callbackFunc));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)