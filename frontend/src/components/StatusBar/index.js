import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { user, router: {location}} = state;
    return {
        userInfo: user.userInfo,
        isLoggedIn: user.isLoggedIn,
        pathname: location.pathname,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Logout: () => {
            dispatch(ActionCreator.Logout());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)