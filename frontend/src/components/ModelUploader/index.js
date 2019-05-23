import { connect } from "react-redux";
import Container from "./container";
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { router: {location}, user } = state;
    return {
        pathname: location.pathname,
        isLoggedIn: user.isLoggedIn,
        userid: user.userid,
        userInfo: user.userInfo,
        token: user.token,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        FetchAddModelProfile: (userid, isNeedSpinner, token, request_data, callbackFunc) => {
            dispatch(ActionCreator.FetchAddModelProfile(userid, isNeedSpinner, token, request_data, callbackFunc));
        },
        FetchMypostedModel: (userid, isNeedSpinner, callbackFunc) => {
            dispatch(ActionCreator.FetchMypostedModel(userid, isNeedSpinner, callbackFunc));
        },
        SaveMypostedModel: (myposted_model_list) => {
            dispatch(ActionCreator.SaveMypostedModel(myposted_model_list));
        },
        SaveNewModel: (new_model_list) => {
            dispatch(ActionCreator.SaveNewModel(new_model_list));
        },
        SaveNewModelExpansion: (new_model_expansion_list) => {
            dispatch(ActionCreator.SaveNewModelExpansion(new_model_expansion_list));
        },
        SaveRatingModel: (rating_model_list) => {
            dispatch(ActionCreator.SaveRatingModel(rating_model_list));
        },      
        SaveRatingModelExpansion: (rating_model_expansion_list) => {
            dispatch(ActionCreator.SaveRatingModelExpansion(rating_model_expansion_list));
        },   
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)