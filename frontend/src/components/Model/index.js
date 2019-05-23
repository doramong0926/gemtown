import { connect } from "react-redux";
import Container from "./container";
import ActionCreator from "./../../redux/actions";

const mapStateToProps = (state, ownProps) => {
    const { router: { location }, model } = state;
    return {
        pathname: location.pathname,

        new_model_list: model.new_model_list,
        rating_model_list: model.rating_model_list,
        
        model_filter: model.model_filter,
        modelFilterList: model.modelFilterList,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        FetchNewModel: (numOfModel, model_filter, isNeedSpinner, callbackFunc) => {
            dispatch(ActionCreator.FetchNewModel(numOfModel, model_filter, isNeedSpinner, callbackFunc));
        },
        SaveNewModel: (new_model_list) => {
            dispatch(ActionCreator.SaveNewModel(new_model_list));
        },
        FetchRatingModel: (numOfModel, model_filter, isNeedSpinner, callbackFunc) => {
            dispatch(ActionCreator.FetchRatingModel(numOfModel, model_filter, isNeedSpinner, callbackFunc));
        },
        SaveRatingModel: (rating_model_list) => {
            dispatch(ActionCreator.SaveRatingModel(rating_model_list));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)