import { connect } from "react-redux";
import Container from "./container";
import ActionCreator from "./../../redux/actions";

function mapStateToProps(state) {
    const { advertising } = state;
    return {
        advertising_list: advertising.advertising_list,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        SaveAdvertising: (advertising_list) => {
            dispatch(ActionCreator.SaveAdvertising(advertising_list));
        },
        FetchAdvertising: (callbackFunc) => {
            dispatch(ActionCreator.FetchAdvertising(callbackFunc));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
