import { connect } from "react-redux";
import Container from "./container"
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { router: {location}, model, user } = state;
    return {
        pathname: location.pathname,
        model_filter: model.model_filter,
        userid: user.userid,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        SaveModelFilter: (model_filter) => {
            dispatch(ActionCreator.SaveModelFilter(model_filter));
        },
        FetchNewModel: (numOfModel, model_filter, isNeedSpinner, callbackFunc) => {
            dispatch(ActionCreator.FetchNewModel(numOfModel, model_filter, isNeedSpinner, callbackFunc));
        },
        SaveNewModel: (new_model_list) => {
            dispatch(ActionCreator.SaveNewModel(new_model_list));
        },
        SaveNewModelExpansion: (new_model_expansion_list) => {
            dispatch(ActionCreator.SaveNewModelExpansion(new_model_expansion_list));
        },
        FetchRatingModel: (numOfModel, model_filter, isNeedSpinner, callbackFunc) => {
            dispatch(ActionCreator.FetchRatingModel(numOfModel, model_filter, isNeedSpinner, callbackFunc));
        },
        SaveRatingModel: (rating_model_list) => {
            dispatch(ActionCreator.SaveRatingModel(rating_model_list));
        },        
        SaveModelFilterList: (modelFilterList) => {
            dispatch(ActionCreator.SaveModelFilterList(modelFilterList));
        },
        SaveRatingModelExpansion: (rating_model_expansion_list) => {
            dispatch(ActionCreator.SaveRatingModelExpansion(rating_model_expansion_list));
        },         
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)