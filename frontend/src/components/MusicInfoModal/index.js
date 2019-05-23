import { connect } from "react-redux";
import Container from "./container";
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { router: { location } } = state;
    return {
        pathname: location.pathname,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        FetchDetailMusic: (musicId, isNeedSpinner, callbackFunc) => {
            dispatch(ActionCreator.FetchDetailMusic(musicId, isNeedSpinner, callbackFunc));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)