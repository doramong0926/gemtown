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
        FetchDetailModel: (modelId, isNeedSpinner, callbackFunc) => {
            dispatch(ActionCreator.FetchDetailModel(modelId, isNeedSpinner, callbackFunc));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)