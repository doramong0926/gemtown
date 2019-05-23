import { connect } from "react-redux";
import Container from "./container";
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { router: {location}, user, music, model } = state;
    return {
        pathname: location.pathname,
        userInfo: user.userInfo,
        isLoggedIn: user.isLoggedIn,
        userid: user.userid,
        token: user.token,

        myposted_music_list: music.myposted_music_list,
        myposted_model_list: model.myposted_model_list,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        FetchMypostedMusic: (userid, isNeedSpinner, callbackFunc) => {
            dispatch(ActionCreator.FetchMypostedMusic(userid, isNeedSpinner, callbackFunc));
        },
        SaveMypostedMusic: (myposted_music_list) => {
            dispatch(ActionCreator.SaveMypostedMusic(myposted_music_list));
        },
        FetchMypostedModel: (userid, isNeedSpinner, callbackFunc) => {
            dispatch(ActionCreator.FetchMypostedModel(userid, isNeedSpinner, callbackFunc));
        },
        SaveMypostedModel: (myposted_model_list) => {
            dispatch(ActionCreator.SaveMypostedModel(myposted_model_list));
        },
        FetchPurchaseGem: (userid, isNeedSpinner, token, request_data, callbackFunc) => {
            dispatch(ActionCreator.FetchPurchaseGem(userid, isNeedSpinner, token, request_data, callbackFunc));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)