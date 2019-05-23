import { connect } from "react-redux";
import Container from "./container";
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { user } = state;
    return {
        rememberme: user.rememberme,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Login: (username, password, isRememberme, callbackFunc) => {
            dispatch(ActionCreator.Login(username, password, isRememberme, callbackFunc));
        },
        SaveRememberMe: (username) => {
            dispatch(ActionCreator.SaveRememberMe(username));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);