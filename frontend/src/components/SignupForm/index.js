import { connect } from "react-redux";
import Container from "./container";
import ActionCreator from "./../../redux/actions";

function mapStateToProps(state) {
    const { user } = state;
    return {
        isLoggedIn: user.isLoggedIn,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Signup: (username, password1, password2, callback) => {
            dispatch(ActionCreator.Signup(username, password1, password2, callback));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);